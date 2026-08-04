export const PROJECTS = [
  {
    id: "line-ai-assistant",
    title: "Line AI Assistant 智慧個人秘書",
    subtitle: "基於 FastAPI + LangChain + Line Messaging API 的企業級 AI 助手",
    category: "AI Application",
    tags: ["Python", "FastAPI", "LangChain", "Line Bot", "Redis"],
    featured: true,
    github: "https://github.com/Youchenjiang/Line-AI-Assistant",
    summary: "非同步處理 Line Webhook 請求，導入 Redis 集中式對話記憶庫與 Tool Calling 機制，支援即時網路搜尋、文件摘要與排程提醒。",
    highlights: [
      "非同步架構解決 Line 3 秒連線超時限制",
      "整合 LangChain Agent 動態決定搜尋與數據分析工具",
      "提示注入 (Prompt Injection) 防禦防範機制"
    ]
  },
  {
    id: "clickra-automation",
    title: "Clickra 自動化輔助工具",
    subtitle: "全棧自動化流程控制與視覺化腳本管理系統",
    category: "Full-Stack & Tools",
    tags: ["JavaScript", "Full-Stack", "Automation", "GUI"],
    featured: true,
    github: "https://github.com/Youchenjiang/Clickra",
    summary: "專為複雜操作流程設計的自動化控制系統，提供圖形化腳本配置、事件監聽與高效率排程自動化執行引擎。",
    highlights: [
      "模組化腳本事件處理與執行引擎",
      "提供直覺的視覺化 UI 配置介面",
      "高可靠度異常捕獲與日誌紀錄系統"
    ]
  },
  {
    id: "code-security-research",
    title: "Code Security Research 工具庫",
    subtitle: "靜態漏洞分析與資安研究自動化腳本集",
    category: "Cybersecurity",
    tags: ["Python", "Security", "Static Analysis", "Research"],
    featured: false,
    github: "https://github.com/Youchenjiang/code-security-research",
    summary: "收錄個人於網路安全實驗室開發之靜態分析工具、PDF 知識提煉管道與數據庫檢索輔助腳本。",
    highlights: [
      "靜態代碼特徵比對與漏洞定位",
      "論文與安規文檔自動化提取管道",
      "資安知識數據庫與圖譜鏈構建"
    ]
  },
  {
    id: "script-method-list-utilities",
    title: "Script & Method List 自動化工具集",
    subtitle: "個人開發之自動化腳本與方法清單管理工具",
    category: "Full-Stack & Tools",
    tags: ["Python", "JavaScript", "Automation", "DevTools"],
    featured: false,
    github: "https://github.com/Youchenjiang",
    summary: "彙整日常開發與研究中使用的自動化 Script 庫與 Method 清單管理模組，提升開發與實驗效率。",
    highlights: [
      "自動化數據清洗與分析腳本",
      "高效能工具方法函式庫",
      "跨專案模組複用支援"
    ]
  }
];
