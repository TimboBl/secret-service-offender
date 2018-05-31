const headers = [];

const getHeaders = () => {
    chrome.storage.sync.get(["customHeader"], (result) => {
        if (result) {
            for (let i = 0; i < result.customHeader.length; ++i) {
                headers.push(result.customHeader[i]);
            }
        }
    });
};

getHeaders();

chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
    headers.forEach((element) => {
        details.requestHeaders.push(element);
    });
    return {requestHeaders: details.requestHeaders};
}, {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    getHeaders();
    sendResponse({status: "Success"});
});
