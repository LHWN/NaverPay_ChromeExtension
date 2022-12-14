document.addEventListener("DOMContentLoaded", function() {
    var accordionButton = document.getElementById('searchButtonScript');
    accordionButton.addEventListener("click", function() {
        chrome.tabs.query({ active: true, currentWindow: true }, 
            function(tabs) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: () => {
                        var innerHTML = document.querySelector('html').innerHTML;
                        var innerScript = document.querySelectorAll('script');

                        var resultArr = [];
                        var i = 0;

                        const regexp = /naver.NaverPayButton.apply/ig;
                        const regexp_json = /pay.naver.com\/button\/info/ig;
                        const regexp_json_lower = /checkout.naver.com\/button\/info/ig;

                        for (let index = 0; index < innerScript.length; index++) {
                            if(regexp.test(innerScript[index].innerHTML) 
                                || regexp_json.test(innerScript[index].outerHTML)
                                || regexp_json_lower.test(innerScript[index].outerHTML)) {
                                console.log(innerScript[index].outerHTML);  

                                resultArr[i] = innerScript[index].outerHTML;
                                i++;

                                // break;
                            }
                        }   
                        chrome.runtime.sendMessage({
                            result: resultArr,
                            message: "SUCCESS_BUTTON"
                        }, (response) => {
                            console.log(response.message);
                        })
                    },
                });
            }
        );
    }); 
})
