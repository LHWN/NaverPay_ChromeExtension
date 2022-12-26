const merchantName = document.getElementById('merchantName').ariaValueMax;
const url = 'https://search.shopping.naver.com/search/all?query=' + merchantName;

var search = function() {
    var resultHTML = '';
    var shoppingResult = $.ajax({
        type: 'GET', 
        url: url,
        async: true,
        complete: function(data) {
            resultHTML = data.responseText;
        }
    })

    console.log(resultHTML);
}


export { search }


