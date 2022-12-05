async function getCurrentHTML() {
    await chrome.tabs.query({ active: true, lastFocusedWindow: true})
    .then(([tabs]) => {
        chrome.scripting.executeScript({
            target: {tabId: tabs.id},
            function: () => {
                console.log(tabs);
            }
        })
    })
}
