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
                    a.setAttribute('url', element);
                    a.setAttribute('class', 'ctrlLink');
                    a.setAttribute('target', '_blank');
                    a.setAttribute('style', 'cursor: pointer;');
                    a.appendChild(textnode);
                    li.appendChild(a);

                    document.getElementById('subdomain').appendChild(li);
                })
            }

                $('.ctrlLink').on('click', function(event) {
                    var ctrlpressed = (event.ctrlKey || event.metaKey);
                    var url = $(this).attr('url');
                    var tabplacement = 0;

                    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tab) {
                        tabplacement += 1;
                        var index = tab[0].index + tabplacement;
                        chrome.tabs.create({ 'url': url, active: false, 'index': index });
                    })
                })
            
        } else if(message === 'SUCCESS_COOKIE') {
            if(result != null) {
                var tableHTML = '';

                result.forEach(element => {
                    tableHTML += '<tr><td>' + element.name + '</td><td>' + element.value + '</td></tr>'
                })

                document.getElementById('cookieTable').innerHTML = tableHTML;
            }
        }
        sendResponse({ 
            message: "OK"
        });
});

// Production
document.getElementById('prdZzimList').addEventListener('click', function() {
    window.open('https://shopping.naver.com/my/keep-products');
})

document.getElementById('prdPayList').addEventListener('click', function() {
    window.open('https://order.pay.naver.com/home');
})

// Sandbox
document.getElementById('sandZzimList').addEventListener('click', function() {
    window.open('http://test.shopping.naver.com/my/keep-products');
})

document.getElementById('sdbPayList').addEventListener('click', function() {
    window.open('https://dev-order.pay.naver.com/home');
})
