console.log("cs loaded");

const messageBox = document.querySelector("#prompt-textarea");
const sendButton = document.querySelector('[data-testid="send-button"]');

let allowDispatch = true;

const checkAndSend = () => {
    chrome.runtime.sendMessage({text: messageBox.value}, function(response) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }
        if (!response.allow){
            alert("Sensitive information detected. Message not sent");
        }
        else {
            if (allowDispatch) {
                // Create a new keyboard event
                const event = new KeyboardEvent("keydown", {
                    bubbles: true,
                    cancelable: true,
                    key: "Enter",
                    code: "Enter",
                    keyCode: 13,
                    which: 13,
                    shiftKey: false,
                    ctrlKey: false,
                    altKey: false,
                    metaKey: false
                });

                // Set the flag to false to prevent infinite loop
                allowDispatch = false;

                // Dispatch the event to simulate pressing the Enter key
                messageBox.dispatchEvent(event);

                allowDispatch = true;

            }
        }
    });
};

if (messageBox && sendButton) {

    /* working on this still
    messageBox.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();

            if (allowDispatch) {
                checkAndSend();
                console.log("correct value");
            }
        }
    });
    */
    sendButton.addEventListener("click", function(event){
        event.preventDefault();
        checkAndSend();
    });

} else {
    console.log("Element #prompt-textarea not found");
}
