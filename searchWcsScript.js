document.addEventListener("DOMContentLoaded", function() {
    var accordionButton = document.getElementById('searchWcsScript');
    accordionButton.addEventListener("click", function() {
        chrome.tabs.query({ active: true, currentWindow: true },
            (tabs) => {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: () => {
                        var innerHTML = document.querySelector('html').innerHTML;
                        var innerScript = document.querySelectorAll('script');

                        var resultArr = [];
                        var i = 0;

                        const regexp = /wcs/ig;

                        console.log(regexp.test(innerScript[0]));
                        for (let index = 0; index < innerScript.length; index++) {
                            if(regexp.test(innerScript[index].innerHTML)) {
                                console.log(innerScript[index].innerHTML);

                                resultArr[i] = innerScript[index].outerHTML;
                                i++;
                            }
                        }

                        chrome.runtime.sendMessage({
                            result: resultArr,
                            message: "SUCCESS_WCS"
                        }, (response) => {
                            console.log(response.message);
                        })
                    }
                })
            })
    })
})