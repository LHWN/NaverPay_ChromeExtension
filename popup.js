chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var result = request.result;

        console.log(request.result);
        console.log(request.message);

        if(result.length > 0) {
            result.forEach(element => {
                // 추가할 li element 생성
                const li = document.createElement('li');
    
                // li 에 textnode 추가
                const textnode = document.createTextNode(element);
                li.appendChild(textnode);
    
                document.getElementById('buttonScript').appendChild(li);
            });
        } else {
            document.getElementById('buttonScriptComponent').innerText = "Not imported"
        }
        sendResponse({ 
            message: "OK"
        });
});