const saveHeaders = () => {
    const keyInput = document.getElementById("key").value;
    const valueInput = document.getElementById("value").value;
    chrome.storage.sync.set({customHeader: [{key: keyInput, value: valueInput}]}, () => {
        console.log("Success");
    });
};

window.onload = () => {
    const keyInput = document.getElementById("key");
    const valueInput = document.getElementById("value");
    document.getElementById("save").addEventListener("click", saveHeaders);

    chrome.storage.sync.get(["customHeader"], (result) => {
       keyInput.value = result.customHeader[0].key;
       valueInput.value = result.customHeader[0].value;
    });

};