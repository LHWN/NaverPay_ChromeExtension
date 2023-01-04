var search = function(merchantName, merchantUrl, url) {
    const xhr = new XMLHttpRequest;
    var result = 'None!';
    xhr.open('GET', url);
    xhr.responseType = 'document';
    xhr.onload = () => {
        if(xhr.readyState === xhr.DONE && xhr.status === 200) {
            const temp = xhr.responseXML.getElementById('__NEXT_DATA__').innerHTML;
            var products = JSON.parse(temp).props.pageProps.initialState.products.list;

            for (let index = 0; index < products.length; index++) {
                const element = products[index].item;
                
                console.log(element);
                if(element.item.hasOwnProperty('mallPcUrl')) {
                    var mallPcUrl = element.mallPcUrl;
                    if(mallPcUrl.search(merchantUrl) != -1) {
                        result = element.item.id;
                        console.log(element);
                        break;
                    }
                }
            }

            alert(result);
        }
    };
    xhr.send();
//093316ez.toolpark.kr
    return result;
}


export { search }


