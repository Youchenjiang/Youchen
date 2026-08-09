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
  await expect(page.getByRole('button', { name: '搜尋文章' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'GitHub 個人頁面' })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.getByRole('button', { name: 'Projects 作品集' }).click();
  await expect(page.locator('.projects-card')).toHaveCount(4);
  await expectNoHorizontalOverflow(page);

  await page.getByRole('button', { name: 'Blog 文章' }).click();
  await expect(page.locator('.article-card')).toHaveCount(2);
});

test('opens search and preserves readable article geometry', async ({ page }, testInfo) => {
  await page.getByRole('button', { name: '搜尋文章' }).click();
  await expect(page.locator('.search-modal-overlay')).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.keyboard.press('Escape');

  await page.getByRole('heading', { name: articleTitle }).click();
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

test('renders all user-facing copy without replacement characters', async ({ page }) => {
  await expect(page.locator('body')).not.toContainText('�');
  await expect(page.locator('.hero-terminal-name')).toContainText('蔣侑宸');
  await expect(page.locator('.footer-copyright')).toContainText('蔣侑宸');
});
