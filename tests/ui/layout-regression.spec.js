import { expect, test } from '@playwright/test';

const articleTitle = 'PicoCTF & Web Security 實戰解題思路與攻擊防禦筆記';

async function expectNoHorizontalOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
}

test.beforeEach(async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { name: /Youchen Jiang/ })).toBeVisible();
});

test('keeps navigation usable and content inside the viewport', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Search articles' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'GitHub profile' })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  const header = await page.locator('.navbar-header').boundingBox();
  expect(header).not.toBeNull();
  if ((await page.viewportSize()).width > 640) {
    expect(header.height).toBeLessThanOrEqual(71);
  }
  if ((await page.viewportSize()).width === 1140) {
    const tagline = await page.locator('.navbar-brand-tagline').boundingBox();
    expect(tagline).not.toBeNull();
    expect(tagline.height).toBeLessThanOrEqual(34);
  }

  const fullHero = await page.locator('.hero-terminal').boundingBox();
  await page.getByRole('button', { name: 'Projects 作品集' }).click();
  await expect(page.locator('.projects-card')).toHaveCount(4);
  await expect(page.locator('.hero-terminal')).toHaveClass(/compact/);
  const compactHero = await page.locator('.hero-terminal').boundingBox();
  expect(compactHero.height).toBeLessThan(fullHero.height);
  if ((await page.viewportSize()).width > 640) {
    const cardLayout = await page.locator('.projects-card').evaluateAll((cards) =>
      cards.map((card) => {
        const cardRect = card.getBoundingClientRect();
        const footerRect = card.querySelector('.projects-footer').getBoundingClientRect();
        const summaryRect = card.querySelector('.projects-summary').getBoundingClientRect();
        return {
          footerBottomGap: Math.round(cardRect.bottom - footerRect.bottom),
          summaryHeight: Math.round(summaryRect.height),
        };
      }),
    );
    const footerGaps = cardLayout.map(({ footerBottomGap }) => footerBottomGap);
    expect(Math.max(...footerGaps) - Math.min(...footerGaps)).toBeLessThanOrEqual(1);
    expect(cardLayout.every(({ summaryHeight }) => summaryHeight <= 72)).toBe(true);
  }
  await expectNoHorizontalOverflow(page);

  await page.getByRole('button', { name: 'Blog 文章' }).click();
  await expect(page.locator('.article-card')).toHaveCount(2);
  await expect(page.getByRole('button', { name: 'ALL', exact: true })).toHaveCount(1);
});

test('opens search and preserves readable article geometry', async ({ page }, testInfo) => {
  await page.getByRole('button', { name: 'Search articles' }).click();
  await expect(page.locator('.search-modal-overlay')).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.keyboard.press('Escape');

  await page.getByRole('button', { name: `閱讀文章：${articleTitle}` }).click();
  await expect(page.locator('.article-reader-title')).toBeVisible();
  await expectNoHorizontalOverflow(page);

  const reader = await page.locator('.article-reader-content').boundingBox();
  expect(reader).not.toBeNull();
  expect(reader.x).toBeGreaterThanOrEqual(0);
  expect(reader.x + reader.width).toBeLessThanOrEqual(testInfo.project.use.viewport.width);

  if (testInfo.project.name === 'desktop-chromium') {
    const rightGap = testInfo.project.use.viewport.width - reader.x - reader.width;
    expect(Math.abs(reader.x - rightGap)).toBeLessThanOrEqual(2);
  }
});

test('navigates search results with keyboard controls', async ({ page }) => {
  await page.getByRole('button', { name: 'Search articles' }).click();
  const searchInput = page.locator('.search-modal-input');
  const titles = await page.locator('.search-modal-result-title').allTextContents();

  await searchInput.press('ArrowDown');
  await expect(page.locator('.search-modal-result-item.active .search-modal-result-title')).toHaveText(titles[1]);
  await searchInput.press('Enter');
  await expect(page.locator('.article-reader-title')).toHaveText(titles[1]);
});

test('opens article cards with keyboard controls', async ({ page }) => {
  const articleButton = page.getByRole('button', { name: `閱讀文章：${articleTitle}` });
  await articleButton.focus();
  await expect(articleButton).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('.article-reader-title')).toHaveText(articleTitle);
});

test('respects reduced motion preferences', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  const transitionDuration = await page.locator('.article-card').first().evaluate(
    (card) => Number.parseFloat(getComputedStyle(card).transitionDuration),
  );
  expect(transitionDuration).toBeLessThanOrEqual(0.00001);
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
});

test('traps focus inside search modal when active', async ({ page }) => {
  await page.getByRole('button', { name: 'Search articles' }).click();
  const searchInput = page.locator('.search-modal-input');
  await expect(searchInput).toBeFocused();
  await page.keyboard.press('Tab');
  const activeElementTag = await page.evaluate(() => document.activeElement.tagName.toLowerCase());
  expect(['input', 'button', 'a']).toContain(activeElementTag);
});

test('renders all user-facing copy without replacement characters', async ({ page }) => {
  await expect(page.locator('body')).not.toContainText('\uFFFD');
  await expect(page.locator('.hero-terminal-name')).toContainText('蔣侑宸');
  await expect(page.locator('.footer-copyright')).toContainText('蔣侑宸');
});
