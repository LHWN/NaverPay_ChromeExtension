// document.getElementById('accordionBody').innerText = 'Searching...';

var totalHTML = "";
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        
        var target = document.getElementById('buttonScript');

        target.innerHTML = "<ul>";

        request.message.forEach(element => {
            target.innerHTML += "<li>";
            target.innerText += element;
            target.innerHTML += "</li>";
        });

        target.innerHTML += "</ul>";


        console.log(target);
        // document.getElementById('buttonScript').innerText = totalHTML;
    //   document.getElementById("buttonScript").innerText = request.message;
      sendResponse({ 
        message: "OK"
    });
});