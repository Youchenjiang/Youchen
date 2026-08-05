/**
 * @typedef {Object} Post
 * @property {string} id - Unique identifier
 * @property {string} title - Article headline
 * @property {string} subtitle - Optional subtitle
 * @property {string} date - Publication date ISO string
 * @property {string} readTime - Estimated reading duration
 * @property {string} category - Primary classification tag
 * @property {string[]} tags - Associated technology tags
 * @property {boolean} [featured] - Whether highlighted as featured
 * @property {string} author - Author name
 * @property {string} summary - Short excerpt
 * @property {string} content - Markdown formatted body
 */

/** @type {ReadonlyArray<Post>} */
export const POSTS = Object.freeze([
  {
    id: "picoctf-web-exploitation-notes",
    title: "PicoCTF & Web Security 實戰解題思路與攻擊防禦筆記",
    subtitle: "紀錄從 PicoCTF 入門到 Web 漏洞利用（SQLi, XSS, SSRF, JWT Security）的重點剖析與實戰經驗",
    date: "2026-07-20",
    readTime: "6 分鐘閱讀",
    category: "Cybersecurity",
    tags: ["PicoCTF", "Web Security", "Penetration Testing", "CTF"],
    featured: true,
    author: "Youchen Jiang",
    summary: "整理 PicoCTF 與常規 Web 漏洞利用技術的邏輯思維與防禦防範。涵蓋 Burp Suite 抓包分析、JWT Token 偽造、SQL 注入繞過與伺服器端請求偽造 (SSRF)。",
    content: `# PicoCTF & Web Security 實戰解題筆記

> 在資安學習歷程中，CTF (Capture The Flag) 競賽是鍛鍊實務能力與原理理解的絕佳途徑。本文整理常見 Web 漏洞分析思路與工具技巧。

---

## 1. JWT (JSON Web Token) 安全性漏洞與驗證繞過

JWT 常用於分散式系統驗證身份。常見攻擊面包括：

1. **None Algorithm 漏洞**：修改 Header 中的 \`"alg": "none"\` 並移除 Signature。
2. **弱密鑰爆破 (Weak Secret Key)**：使用 Hashcat / John the Ripper 對 HS256 簽名進行字典攻擊。

\`\`\`bash
# Hashcat 爆破 JWT Secret 範例
hashcat -m 16500 jwt_hash.txt -a 0 rockyou.txt --force
\`\`\`

---

## 2. SQL 注入 (SQL Injection) 繞過防禦技巧

當遇到簡易過濾或 WAF 規則時，可使用以下方法繞過：

* **大小寫混合與註解分割**：\`UNIon SElect\` / \`UN/**/ION SELECT\`
* **盲注 (Blind SQLi)**：透過時間延遲函數 \`SLEEP(5)\` 或 \`BENCHMARK()\` 推算資料庫位元。

---

## 3. 防禦措施結語

* 使用準備好的語句 (Prepared Statements) 防範 SQLi。
* 強制校驗 JWT 簽名算法，不允許 \`none\` 模式。
* 隨時保持資安意識與敏銳度！
`
  },
  {
    id: "line-ai-assistant-langchain",
    title: "實作高效能 Line AI Assistant：結合 LangChain 與 LLM API 打造智慧個人秘書",
    subtitle: "透過 Python FastApi + LangChain + Line Messaging API，構建可自我記憶與整合外部 Search 工具的 AI 機器人",
    date: "2026-07-05",
    readTime: "5 分鐘閱讀",
    category: "AI Application",
    tags: ["AI", "LLM", "Line Bot", "LangChain", "Python"],
    featured: true,
    author: "Youchen Jiang",
    summary: "介紹如何從零搭建一個部署於雲端的 Line AI Assistant，透過對話記憶 (Conversation Memory) 與動態 Tool Calling 提升回應品質。",
    content: `# 實作高效能 Line AI Assistant：結合 LangChain 與 LLM API

> 將 LLM 結合至常用的通訊軟體 (Line)，能大幅提升日常資訊整理與作業效率。

---

## 架構特點

1. **非同步處理 (Async Request Handling)**：避免 Line Webhook 在 3 秒內超時。
2. **快取記憶體 (Redis Session Store)**：有效管理使用者對話上下文。
3. **動態工具調用 (Tool Calling)**：能自動決定何時呼叫 Google Search 或資料庫查詢。

\`\`\`python
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system", "你是 Youchen 的智慧專屬助理。請用專業、簡潔且條理分明的語氣回答問題。"),
    ("placeholder", "{chat_history}"),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])
\`\`\`

---

## 心得與總結

整合 AI 助手時，設計良好的 Prompt 與防範提示注入 (Prompt Injection) 攻擊同等重要！
`
  }
]);
