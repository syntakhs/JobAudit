document.getElementById("analyzeBtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getJobText" }, (response) => {
        if (response && response.jobText) {
          analyzeJobText(response.jobText);
        }
      });
    });
  });
  
  function analyzeJobText(text) {
    const resultDiv = document.getElementById("flags-list");
    const barFill = document.getElementById("bar-fill");
    const trustLabel = document.getElementById("trust-label");
  
    document.getElementById("flags-list").innerHTML = "<li>Analyzing...</li>";
    trustLabel.innerText = "Analyzing...";
    barFill.style.width = "0%";
    barFill.style.backgroundColor = "#ccc";
  
    fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR-API-KEY"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You're an assistant that flags job description red flags and assigns a trust level: Low, Medium, or High. Keep red flag descriptions short and bullet-pointed."
          },
          {
            role: "user",
            content: `Analyze this job posting:\n\n${text}`
          }
        ]
      })
    })
      .then(res => res.json())
      .then(data => {
        const content = data.choices[0].message.content;
  
        // Extracting trust level from response
        let trust = "Unknown";
        if (/Trust Level:?\s*High/i.test(content)) {
          trust = "High";
          barFill.style.width = "90%";
          barFill.style.backgroundColor = "#4caf50";
        } else if (/Trust Level:?\s*Medium/i.test(content)) {
          trust = "Medium";
          barFill.style.width = "60%";
          barFill.style.backgroundColor = "#ffc107";
        } else if (/Trust Level:?\s*Low/i.test(content)) {
          trust = "Low";
          barFill.style.width = "30%";
          barFill.style.backgroundColor = "#f44336";
        }
  
        trustLabel.innerText = trust;

        const bullets = content.match(/[-*•] (.+)/g) || [];
        const redFlags = bullets
          .map(b => b.replace(/^[-*•] /, '').trim())
          .filter(flag => {
            const lower = flag.toLowerCase();
            return (
              lower &&
              !lower.includes("no major red flags") &&
              !lower.includes("well-structured") &&
              !lower.includes("no significant") &&
              !lower.includes("reputable") &&
              !lower.includes("clear job") &&
              !lower.includes("professional tone")
            );
          });
        
        if (redFlags.length === 0) {
          resultDiv.innerHTML = "<li>No significant issues detected.</li>";
        } else {
            resultDiv.innerHTML = redFlags.map(flag => `<li>${formatMarkdown(flag)}</li>`).join("");
        }
        
      })
      .catch(err => {
        console.error(err);
        trustLabel.innerText = "Error";
        resultDiv.innerHTML = "<li>Error analyzing job.</li>";
      });
  }
  
  
  function formatMarkdown(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }
  