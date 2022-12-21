chrome.tabs.query({ active: true, currentWindow: true }, 
    function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => {
                var cookieData = document.cookie;
                console.log(cookieData);

                var cookieName = 'NA_CO=';

                var cookieNameArr = ['NA_CO', 'todayGoodsNo', 'NVADID'];
                var cookieValue = '';

                var resultObj = {};
                var result = [];
                var startNACO = cookieData.indexOf(cookieName);
                var index = 0;

                console.log(cookieData);
                cookieNameArr.forEach(element => {
                    var start = cookieData.indexOf(element);

                    if(start != -1) {
                        start += element.length+1;
                        var end = cookieData.indexOf(";", start);

                        if(end == -1) end = cookieData.length;
                        cookieValue = cookieData.substring(start, end);

                        result[index] = {};
                        result[index].name = element;
                        result[index].value = cookieValue;
                        index++;
                    }
                })

                console.log(result);

                chrome.runtime.sendMessage({
                    result: result,
                    message: "SUCCESS_COOKIE"
                }, (response) => {
                    console.log(response.message);
                })
            }
        })
})