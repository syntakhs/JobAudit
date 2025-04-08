
function extractJobDescription() {
    return document.body.innerText;
  }
  
  //sending the extracted text to the popup or background
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "getJobText") {
      const text = extractJobDescription();
      sendResponse({ jobText: text });
    }
  });
  