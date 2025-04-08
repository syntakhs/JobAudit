# 🔍 Job Audit AI – Red Flag Detector for Job Postings

A modern Chrome extension that uses AI to analyze job listings on sites like **Indeed** or **LinkedIn**. It detects potential red flags (like vague descriptions, scammy requirements, or unrealistic expectations) and shows a trust level with a clean, modern UI.

---

## ⚙️ Setup Instructions

### 1. Clone the Extension

```bash
git clone https://github.com/yourname/job-audit-ai.git
Or just download and unzip the files into a folder.

2. 🔑 Add Your API Key
Open popup.js and find this line:

js
Copy
Edit
"Authorization": "Bearer YOUR_API_KEY_HERE"
Replace YOUR_API_KEY_HERE with your actual API key from DeepSeek, OpenRouter, or your proxy server.

🚨 Important: This key is visible in the extension’s JavaScript. For production or public use, it’s strongly recommended to route requests through a secure backend to protect your API key.

3. 🚀 Load the Extension in Chrome
Open chrome://extensions/

Enable Developer mode (top-right)

Click "Load unpacked"

Select your extension folder

4. ✅ Use It
Visit a job posting on LinkedIn or Indeed

Click the Job Audit AI extension icon

Hit the "Analyze Job" button

View the red flags and trust level instantly

🧠 Features
Instant AI analysis of job listings

Trust meter: Low, Medium, or High

Highlights short, clear red flags

Modern UI (Crypto wallet-style optional)

Markdown formatting support (e.g. bold)

📦 Optional Enhancements
Set up a backend proxy to securely store your API key

Host it on your custom domain (e.g. api.syntakhs.com)

Deploy using Fly.io, Render, or Oracle Cloud Free Tier

📄 License
MIT – Feel free to build on it or fork it.

yaml
Copy
Edit

---

Let me know if you want:
- A dark mode version of the extension
- Proxy-ready `README.md` instead
- GitHub push automation or live preview badge setup






```
