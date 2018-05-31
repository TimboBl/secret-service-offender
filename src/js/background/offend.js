chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
    details.requestHeaders.push({name: "bnd", value: "Fuck off you filthy scum"});
    return {requestHeaders: details.requestHeaders};
}, {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);