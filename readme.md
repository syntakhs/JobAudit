# 🔍 Job Audit AI – Chrome Extension

A modern Chrome extension that analyzes job postings on sites like **LinkedIn** and **Indeed**, using AI to detect red flags and rate trustworthiness.

---

## ⚙️ Setup Instructions

### 1. Clone or Download

```bash
git clone https://github.com/syntakhs/JobAudit.git
```

Or download the ZIP and extract it into a folder.

---

### 2. 🔑 Add Your API Key

Open the `popup.js` file and find the line:

```js
"Authorization": "Bearer YOUR-API-KEY"
```

Replace `"YOUR-API-KEY"` with your actual DeepSeek API Key.

> **Note:** This key is exposed in the extension files. For production or public distribution, it’s strongly recommended to use a backend proxy to securely handle the API key.

---

### 3. 🚀 Load the Extension into Chrome

1. Go to `chrome://extensions`
2. Enable **Developer mode** (top right)
3. Click **"Load unpacked"**
4. Select the project folder

---

### 4. ✅ Usage

1. Navigate to a job listing on **LinkedIn** or **Indeed**
2. Click the **Job Audit AI** extension icon
3. Click the **Analyze Job** button
4. See red flags and a trust rating instantly in the popup

---

## 🧠 Features

- 🔍 AI analysis of job descriptions
- 🚦 Trust level indicator: Low, Medium, High
- ⚠️ Short, clear red flags only — no fluff
- 💄 Modern popup UI
- ✅ Markdown formatting (e.g., bolding for emphasis)

---

## 📦 Optional Upgrades

- Set up a secure backend to protect your API key
- Point your domain (e.g. `api.syntakhs.com`) to a hosted API
- Deploy with services like **Fly.io**, **Render**, or **Oracle Cloud**

---

## 📄 License

MIT License — free to modify, use, and share.
