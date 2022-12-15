document.addEventListener("DOMContentLoaded", function() {
    var accordionButton = document.getElementById('searchSubdomain');
    accordionButton.addEventListener("click", function() {
        chrome.tabs.query({ active: true, currentWindow: true },
            (tabs) => {
                chrome.scripting.executeScript({
                    target: {tabId: tabs[0].id },
                    function: () => {
                        var atags = document.querySelectorAll('a');
                        var curURL = location.host;
                        var resultArr = [];
                        var i = 0;

                        for (let index = 0; index < atags.length; index++) {
                            if(curURL != atags[index].hostname
                                && atags[index].href != "") {
                                    resultArr[i] = atags[index].href;
                                    i++;
                                    console.log(index + "sub : " + atags[index].href);
                            }
                        }

                        chrome.runtime.sendMessage({
                            result: resultArr,
                            message: "SUCCESS_SUBDOMAIN"
                        }, (response) => {
                            console.log(response.message);
                        })
                    }
                })
            
            })
    })
})