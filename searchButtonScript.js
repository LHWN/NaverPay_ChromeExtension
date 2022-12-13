// chrome.runtime.sendMessage({
//     message: "searchButtonScript"
//   }, response => {
//     if(response.message === "SUCCESS") {
//       var innerHTML = document.querySelector('html');
//       console.log(innerHTML);
//     }
// })

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

                        console.log("test" + regexp_json.test("pay.naver.com/button/info/callbakc?~~"));
                        for (let index = 0; index < innerScript.length; index++) {
                            console.log(innerScript[index]);
                            if(regexp.test(innerScript[index].innerHTML) 
                                || regexp_json.test(innerScript[index].outerHTML)) {
                                console.log(innerScript[index].outerHTML);

                                resultArr[i] = innerScript[index].outerHTML;
                                i++;

                                // break;
                            }
                        }   
                        chrome.runtime.sendMessage({
                            result: "SUCCESS",
                            message: resultArr
                        }, (response) => {
                            console.log(response.message);
                        })
                    },
                });
            }
        );
    }); 
})
