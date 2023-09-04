console.log("cs loaded");

const messageBox = document.querySelector("#prompt-textarea");

if (messageBox) {
    messageBox.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            chrome.runtime.sendMessage({text: messageBox.value}, function(response) {
                if (!response.allow) {
                    alert('Sensitive information detected. Message not sent');
                }
            });
        }
    });
} else {
    console.log("Element #prompt-textarea not found");
}
