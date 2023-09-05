console.log("cs loaded");

const messageBox = document.querySelector("#prompt-textarea");
const sendButton = document.querySelector('[data-testid="send-button"]');

const checkAndSend = () => {
    chrome.runtime.sendMessage({text: messageBox.value}, function(response) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }
        if (!response.allow){
            alert("Sensitive information detected. Message not sent");
        }
        else{
            sendButton.click();
        }
    });
};

if (messageBox && sendButton) {

    messageBox.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            checkAndSend();
        }
    });

    sendButton.addEventListener("click", function(event){
        event.preventDefault();
        event.stopPropagation();
        checkAndSend();
    })
} else {
    console.log("Element #prompt-textarea not found");
}
