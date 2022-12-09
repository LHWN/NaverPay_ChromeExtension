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

                        // alert(document.getElementById('buttonScript').innerText);
                        for (let index = 0; index < innerScript.length; index++) {
                            const regexp = /naver.NaverPayButton.apply/ig;
                            if(regexp.test(innerScript[index].innerHTML)) {
                                console.log(innerScript[index]);
                                chrome.runtime.sendMessage({
                                    result: "SUCCESS",
                                    message: innerScript[index].innerHTML
                                }, response => {
                                    console.log("SUCCESS, sendMessage SUCCESS Response")
                                })
                                // document.getElementById('buttonScript').innerHTML = "innerScript[index].innerTex";
                                break;
                            }
                        }   

                    },
                });
            }
        );
    });
})