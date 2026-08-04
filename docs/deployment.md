# Deployment & Branching Specification — GitHub Pages CI/CD

This document details the build, base path, automated GitHub Actions deployment workflow, local pre-commit CI hooks, and branch protection rules for `https://youchenjiang.github.io/Youchen/`.

---

## 1. Base Path Configuration

In `vite.config.js`, the base path must remain set to `/Youchen/`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/Youchen/',
})
```

This guarantees that all compiled static assets (`/Youchen/assets/index-xxx.js`, CSS, images) resolve properly under the GitHub Pages subpath URL.

---

## 2. GitHub Actions Deployment Workflow

Location: `.github/workflows/deploy.yml`

- **Trigger**: Push/Merge events to `main` branch.
- **Node Version**: Node 20.
- **Build Steps**:
  1. `git checkout`
  2. `npm ci`
  3. `npm run build` (Outputs to `./dist`)
  4. Upload artifact `./dist` to GitHub Pages
  5. Deploy to GitHub Pages environment

---

## 3. Automated Local Pre-Commit CI Hook System

Location: `scripts/pre-commit.sh` -> `.git/hooks/pre-commit`

### How It Works:
- Every time `git commit` is executed (by an engineer or AI assistant), Git automatically triggers `.git/hooks/pre-commit`.
- The hook runs `npm run build` locally in the background.
- **Pass Case**: If `npm run build` succeeds (Exit Code 0), the commit proceeds.
- **Fail Case**: If `npm run build` fails (Exit Code 1), Git **automatically aborts** the commit and displays failure diagnostic output.

---

## 4. Alibaba Open Code Review GitHub Action

Location: `.github/workflows/open-code-review.yml`

- Automatically reviews Pull Requests using `open-code-review` Python runner.
- Comments code recommendations inline in Traditional Chinese (`zh-TW`).

---

## 5. GitHub Branch Protection & Naming Policy

- **`main` Branch Protection**:
  - Direct pushing to `main` is disabled in GitHub Settings.
  - Require Pull Request before merging.
  - Require status checks (CI build & Open Code Review) to pass before merging.
- **Branch Naming**:
  - `feat/<name>` for new features.
  - `fix/<name>` for bug fixes.
  - `docs/<name>` for documentation updates.
  - `chore/<name>` for configuration & CI/CD workflow updates.
