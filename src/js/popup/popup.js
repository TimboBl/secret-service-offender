let headers;

const saveHeaders = () => {
    const inputs = $("input.show:text");
    const toSave = {customHeader: []};
    for (let i = 0; i < inputs.length; i += 2) {
        if (!(inputs[i] === "" || inputs[i + 1] === "")) {
            toSave.customHeader.push({name: inputs[i].value.replace(/\s/g,'-'), value: inputs[i + 1].value.replace(/\s/g,'-')});
        }
    }
    chrome.storage.sync.set(toSave, () => {
        console.log("Success, changes saved");
        $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#success-alert").slideUp(500);
        });
        chrome.runtime.sendMessage({topic: "headerAdded"}, (response) => {
            console.log(response);
        });
    });
};

const addNewHeader = () => {
    const contentDiv = document.getElementById("content");
    const keyLabel = document.createElement("LABEL");
    const keyText = document.createTextNode("Header Key: ");
    const keyInput = document.createElement("INPUT");
    keyLabel.classList.add("descriptor");
    keyInput.classList.add("show");

    const valueLabel = document.createElement("LABEL");
    const valueText = document.createTextNode("Header Value: ");
    const valueInput = document.createElement("INPUT");
    valueLabel.classList.add("descriptor");
    valueInput.classList.add("show");

    const minusButton = document.createElement("BUTTON");
    const minus = document.createElement("SPAN");

    minusButton.classList.add("icon-button", "btn-right", "minus-button");
    minusButton.addEventListener("click", removeHeaders);
    minus.classList.add("fas", "fa-minus");
    minus.id = $("span.fa-minus").length + "";

    minusButton.appendChild(minus);
    keyLabel.appendChild(keyText);
    contentDiv.appendChild(keyLabel);
    contentDiv.appendChild(keyInput);
    valueLabel.appendChild(valueText);
    contentDiv.appendChild(valueLabel);
    contentDiv.appendChild(valueInput);
    contentDiv.appendChild(minusButton);
};

const removeHeaders = (e) => {
    const position = Number.parseInt(e.target.id) * 2;
    const inputs = $("input.show:text");
    const labels = $("label.descriptor");
    console.log(position);
    inputs[position + 1].remove();
    inputs[position].remove();
    labels[position + 1].remove();
    labels[position].remove();
    $("#" + e.target.id).remove();
    $("#" + e.target.id + "btn").remove();
    chrome.runtime.sendMessage({topic: "headerRemoved"}, (response) => {
        console.log(response);
    });

};

window.onload = () => {
    document.getElementById("save").addEventListener("click", saveHeaders);
    document.getElementById("plus").addEventListener("click", addNewHeader);
    $("#success-alert").hide();

    chrome.storage.sync.get(["customHeader"], (result) => {
        if (result) {
            const contentDiv = document.getElementById("content");
            for (let i = 0; i < result.customHeader.length; ++i) {
                const keyLabel = document.createElement("LABEL");
                const keyText = document.createTextNode("Header Key: ");
                const keyInput = document.createElement("INPUT");
                keyLabel.classList.add("descriptor");
                keyInput.value = result.customHeader[i].name;
                keyInput.classList.add("show");

                const valueLabel = document.createElement("LABEL");
                const valueText = document.createTextNode("Header Value: ");
                const valueInput = document.createElement("INPUT");
                valueLabel.classList.add("descriptor");
                valueInput.value = result.customHeader[i].value;
                valueInput.classList.add("show");

                const minusButton = document.createElement("BUTTON");
                const minus = document.createElement("SPAN");

                minusButton.classList.add("icon-button", "btn-right", "minus-button");
                minusButton.addEventListener("click", removeHeaders);
                minusButton.id = i + "btn";
                minus.classList.add("fas", "fa-minus");
                minus.id = i + "";

                minusButton.appendChild(minus);
                keyLabel.appendChild(keyText);
                contentDiv.appendChild(keyLabel);
                contentDiv.appendChild(keyInput);
                valueLabel.appendChild(valueText);
                contentDiv.appendChild(valueLabel);
                contentDiv.appendChild(valueInput);
                contentDiv.appendChild(minusButton);
            }
            headers = result.customHeader.length;
        }
    });

};
