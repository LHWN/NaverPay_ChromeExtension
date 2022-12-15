chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var result = request.result;
        var message = request.message;

        if(message === 'SUCCESS_BUTTON') {
            if(result.length > 0) {
                // var result = request.result;
                result.forEach(element => {
                    // 추가할 li element 생성
                    const li = document.createElement('li');
        
                    // li 에 textnode 추가
                    const textnode = document.createTextNode(element);
                    li.appendChild(textnode);
        
                    document.getElementById('buttonScript').appendChild(li);
                });
            } else {
                document.getElementById('buttonScriptComponent').innerText = "Not imported";
            }
        } else if(message === 'SUCCESS_WCS') {
            if(result.length > 0) {
                // var result = request.result;
                result.forEach(element => {
                    const li = document.createElement('li');

                    const textnode = document.createTextNode(element);
                    li.appendChild(textnode);

                    document.getElementById('wcsScript').appendChild(li);
                })
            } else {
                document.getElementById('wcsScriptComponent').innerText = "Not imported";
            }
        } else if(message === 'SUCCESS_SUBDOMAIN') {
            if(result.length > 0) {
                result.forEach(element => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');

                    const textnode = document.createTextNode(element);
                    a.setAttribute('href', element);
                    a.appendChild(textnode);
                    li.appendChild(a);
                    document.getElementById('subdomain').appendChild(li);
                })
            }
        }
        sendResponse({ 
            message: "OK"
        });
});