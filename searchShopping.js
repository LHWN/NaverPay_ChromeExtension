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
                console.log(element.hasOwnProperty('mallPcUrl'));
                if(element.hasOwnProperty('mallPcUrl')) {
                    var mallPcUrl = element.mallPcUrl;
                    if(mallPcUrl.search(merchantUrl) != -1) {
                        result = element.id;
                        console.log(result);
                        document.getElementById('resultSection').style.display = 'block';
                        document.getElementById('resultSection').innerText = result;
                        document.getElementById('resultSection').innerHTML = '<button class="btn btn-outline-secondary" type="button" id="buttonGoShoppingResult">보러가기</button>';

                        break;
                    }
                }
            }
        }
    };
    xhr.send();
}


export { search }


