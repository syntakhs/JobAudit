function extractJobDescription() {
  return document.body.innerText;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getJobText") {
    const hostname = window.location.hostname;
    let text = "";

    // LinkedIn
    if (hostname.includes("linkedin.com")) {
      text =
        document.querySelector(".description__text, .jobs-description__content")
          ?.innerText || "";
    }

    // Indeed
    else if (hostname.includes("indeed.com")) {
      text = document.querySelector("#jobDescriptionText")?.innerText || "";
    }

    // Glassdoor
    else if (hostname.includes("glassdoor.com")) {
      text =
        document.querySelector(".jobDescriptionContent, .desc")?.innerText ||
        "";
    }

    // Monster
    else if (hostname.includes("monster.com")) {
      text =
        document.querySelector(".job-description, #JobDescription")
          ?.innerText || "";
    }

    // Naukri
    else if (hostname.includes("naukri.com")) {
      text =
        document.querySelector(".jd-container, .job-desc, .description")
          ?.innerText || "";
    }

    // ZipRecruiter
    else if (hostname.includes("ziprecruiter.com")) {
      text = document.querySelector(".job_description")?.innerText || "";
    }

    // Workday (myworkdayjobs)
    else if (hostname.includes("myworkdayjobs.com")) {
      text =
        document.querySelector("[data-ux-module='job-details-description']")
          ?.innerText || "";
    }

    // Lever
    else if (hostname.includes("jobs.lever.co")) {
      text = document.querySelector("div.content, .section")?.innerText || "";
    }

    // Greenhouse
    else if (hostname.includes("boards.greenhouse.io")) {
      text = document.querySelector(".main, .job-description")?.innerText || "";
    }

    // AngelList / Wellfound
    else if (
      hostname.includes("angel.co") ||
      hostname.includes("wellfound.com")
    ) {
      text =
        document.querySelector(".listing-container, .description")?.innerText ||
        "";
    }

    // Hired
    else if (hostname.includes("hired.com")) {
      text =
        document.querySelector(".job-description, .content")?.innerText || "";
    }

    // RemoteOK
    else if (hostname.includes("remoteok.com")) {
      text =
        document.querySelector(".description, .jobDescription")?.innerText ||
        "";
    }

    // JobStreet
    else if (hostname.includes("jobstreet.com")) {
      text =
        document.querySelector(".job-description, .job-detail-content")
          ?.innerText || "";
    }

    // X.com (formerly Twitter)
    else if (hostname.includes("x.com")) {
      // Try to get the text of a tweet (if viewing a tweet page)
      text = document.querySelector("article div[lang]")?.innerText || "";
    }

    // Fallback: try body text
    if (!text || text.length < 100) {
      text = document.body.innerText;
    }

    sendResponse({ jobText: text });
  }
});
