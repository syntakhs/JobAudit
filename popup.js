document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("analyzeBtn").addEventListener("click", () => {
    chrome.windows.getAll({ populate: true }, (windows) => {
      for (const win of windows) {
        const activeTab = win.tabs.find(
          (t) => t.active && !t.url.startsWith("chrome-extension://")
        );
        if (activeTab) {
          chrome.tabs.sendMessage(
            activeTab.id,
            { action: "getJobText" },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                alert(
                  "Unable to communicate with the page. Try refreshing the tab."
                );
                return;
              }

              if (response && response.jobText) {
                analyzeJobText(response.jobText);
              } else {
                alert("No job text found or content script not injected.");
              }
            }
          );
          return;
        }
      }
      alert("No suitable active tab found.");
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

  fetch("https://api.syntakhs.com/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content: `You are an assistant that audits job descriptions. 
        For every job, return:
        - A trust level: High, Medium, or Low. It must be clearly stated as 'Trust Level: <Level>'.
        - A list of red flags in bullet points. 

        Avoid positive fluff. 

        Each red flag should start with a bold heading in all caps using Markdown format (**TEXT**), followed by a short precise explanation marking important terms (**text**).`,
        },
        {
          role: "user",
          content: `Analyze this job posting:\n\n${text}`,
        },
      ],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const content = data.choices[0].message.content;

      // Extract trust level from response
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
        .map((b) => b.replace(/^[-*•] /, "").trim())
        .filter((flag) => {
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
        resultDiv.innerHTML = redFlags
          .map((flag) => `<li>${formatMarkdown(flag)}</li>`)
          .join("");
      }
    })
    .catch((err) => {
      console.error(err);
      trustLabel.innerText = "Error";
      resultDiv.innerHTML = "<li>Error analyzing job.</li>";
    });
}

function formatMarkdown(text) {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}
