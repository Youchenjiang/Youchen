# AGENTS.md - Repository Guidelines for AI Assistants

This document defines mandatory operational, commit, local CI verification, PR Agent, Alibaba Open Code Review, and Branching guidelines for all AI coding assistants working in the `Youchen` repository.

---

## 1. Commit Message & Feature-Level Atomic Commit Rules (Strict Enforcement)

### ⚠️ CRITICAL RULE: Feature-Level Granularity (Hunk Staging)
- **Different features inside the SAME file MUST be split into DIFFERENT commits!**
- Even if multiple features or modifications are made inside a single file (e.g., `App.jsx` or `index.css`), you MUST stage them by patch/hunk (`git add -p` or selective staging) and commit each logical feature in a **separate commit**.
- Never commit multiple independent features together just because they reside in the same file or directory.

### Commit Message Format (Mandatory Scope & Numbered List Body)
All Git commits MUST strictly adhere to the Conventional Commits format with mandatory scope enforcement:

```text
<type>(<scope>): <description>

1. First change detail in English.
2. Second change detail in English.
```

#### Constraints:
- **Language**: English ONLY.
- **Header Structure**: `<type>(<scope>): <description>` (e.g., `feat(navbar): add responsive navigation bar`).
  - **Mandatory Scope**: Every commit header MUST include a scope enclosed in parentheses `(<scope>)`. Commits missing a scope (e.g., `feat: ...`) are strictly prohibited.
  - **Subject Line**: Lowercase after colon, concise (under 50 characters), no period at the end.
- **Allowed Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `chore`, `security`, `ci`.
- **Allowed Scopes**: `navbar`, `terminal`, `articles`, `portfolio`, `search`, `styles`, `config`, `workflow`, `hooks`, `branch`.
- **Body**: MUST start directly with a numbered list (`1. `, `2. `) in English. DO NOT use custom headers like `Why:` or `What changed:`.

---

## 2. Automated Pre-Commit CI Enforcement (Git Pre-Commit Hook)

- **Automated Git Interception**: The repository contains an active Git pre-commit hook (`scripts/pre-commit.sh` installed into `.git/hooks/pre-commit`).
- **Enforcement Flow**: Executing `git commit` automatically triggers `npm run build`. If local compilation fails, Git will **automatically abort the commit**.
- **No Cloud Failures**: Never push unverified code. The local hook ensures code compiles cleanly before any commit is accepted into Git history.

---

## 3. Alibaba Open Code Review & PR Agent Guidelines

- **Alibaba Open Code Review Integration**:
  - Integrated via `.github/workflows/open-code-review.yml`.
  - Automatically reviews incoming Pull Requests using `open-code-review` Python runner, providing inline code recommendations in Traditional Chinese (`zh-TW`).
- **Codium/Qodo PR Agent (`.pr_agent.toml`)**:
  - Used for PR description generation, changelog updates, and automated PR labeling.
- **PR Description Format**: All Pull Requests must use `.github/pull_request_template.md` (including `Summary`, `Key Changes`, `Open Code Review & Security Audit`, and `Verification` checklist).

---

## 4. Branch Naming & Flow Rules

- **`main` (Production Branch)**:
  - Protected by GitHub Branch Protection rules. Direct pushing to `main` is strictly prohibited.
  - All changes must be submitted via Pull Requests (PRs).
- **Mandatory User Confirmation Before Push**:
  - NEVER execute `git push` to any remote branch without explicitly requesting and receiving User approval first.
- **Feature & Task Branch Naming Conventions**:
  - `feat/<feature-name>`: New UI or functional development (e.g., `feat/portfolio-grid`).
  - `fix/<bug-name>`: Bug fixes (e.g., `fix/mobile-layout`).
  - `docs/<doc-name>`: Documentation updates (e.g., `docs/deployment-guide`).
  - `chore/<task-name>`: Configurations, CI/CD, and dependency updates.

---

## 5. CI/CD & Deployment Rules

- **Base Path Maintenance**: Maintain `base: '/Youchen/'` in `vite.config.js` for GitHub Pages hosting (`https://youchenjiang.github.io/Youchen/`).
- **Automated Workflow**: Merging PRs into `main` branch triggers `.github/workflows/deploy.yml` for GitHub Pages deployment.
