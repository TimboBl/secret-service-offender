let key, value;

chrome.storage.sync.get(["customHeader"], (result) => {
   key = result.customHeader[0].key;
   value = result.customHeader[0].value;
});

chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
    details.requestHeaders.push({name: key, value: value});
    return {requestHeaders: details.requestHeaders};
}, {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);