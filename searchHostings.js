const HOSTINGS = ["카페24", "고도몰", "메이크샵", "가비아퍼스트몰", "후이즈", "뉴런", "코드엠", "아임웹", "위사", "식스샵", "독립몰 (영카트)"];
const PROD_INFO_XML_URL = [
  "/api/shop/NaverpayProductXml", // 0. 카페24
  "/partner/naverpay_goods_link.php", // 1. 고도몰
  "/shop/navercheckout_product.html", // 2. 메이크샵
  "/partner/navercheckout_item", // 3. 가비아
  "/partner/naver/checkout/goods_info.php", // 4. 후이즈
  "/naver_checkout/goods_info", // 5. 뉴런
  "/npay_product_info", // 6. 코드엠
  "/npay_prod.cm", // 7. 아임웹
  "/_data/compare/naver/checkoutprd.php", // 8. 위사
  "/productInfo", // 9. 식스샵
  "/shop/naverpay/naverpay_item.php" // 10. 독립몰 (영카트)
];

let curURL;
const reDirectFlag = false;

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.

  let [tab] = await chrome.tabs.query(queryOptions);

  return tab;
}

var httpRequest = new XMLHttpRequest();

getCurrentTab().then((data) => {
  let dataURL = new URL(data.url);
  curURL = dataURL.protocol+"//"+dataURL.hostname;


  // 무조건 200 status Code 에 대해서만 체크하도록 구현
  // 302 응답 후 200 으로 reDirect 되는 경우 체크해야 함

  $.ajax({
    type: 'GET',
    url: curURL + PROD_INFO_XML_URL[0],
    async: true, // 비동기 
    complete: function(data) {
      console.log(data);
      if(data.status == '200') {
        console.log('URL : ' + curURL + PROD_INFO_XML_URL[0]);
        console.log('[' + data.status + '] 카페24 호스팅사 일치');
        document.getElementById('hostings').innerText = HOSTINGS[0];
      } else {
        console.log('[' + data.status + '] 카페24 호스팅사 미일치');
        $.ajax({
          type: 'GET',
          url: curURL + PROD_INFO_XML_URL[1],
          async: true, 
          complete: function(data) {
            if(data.status == '200') {
              console.log('[' + data.status + '] 고도몰 호스팅사 일치');
              document.getElementById('hostings').innerText = HOSTINGS[1];
            } else {
              console.log('[' + data.status + '] 고도몰 호스팅사 미일치');
              $.ajax({
                type: 'GET',
                url: curURL + PROD_INFO_XML_URL[2],
                async: true, 
                complete: function(data) {
                  if(data.status == '200') {
                    console.log('[' + data.status + '] 메이크샵 호스팅사 일치');
                    document.getElementById('hostings').innerText = HOSTINGS[2];
                  } else {
                    console.log('[' + data.status + '] 메이크샵 호스팅사 미일치');
                    $.ajax({
                      type: 'GET',
                      url: curURL + PROD_INFO_XML_URL[3],
                      async: true,
                      complete: function(data) {
                        if(data.status == '200') {
                          console.log('[' + data.status + '] 가비아 호스팅사 일치');
                          document.getElementById('hostings').innerText = HOSTINGS[3];
                        } else {
                          console.log('[' + data.status + '] 가비아 호스팅사 미일치');
                          $.ajax({
                            type: 'GET',
                            url: curURL + PROD_INFO_XML_URL[4],
                            async: true,
                            complete: function(data) {
                              if(data.status == '200') {
                                console.log('[' + data.status + '] 후이즈 호스팅사 일치');
                                document.getElementById('hostings').innerText = HOSTINGS[4];
                              } else {
                                console.log('[' + data.status + '] 후이즈 호스팅사 미일치');
                                $.ajax({
                                  type: 'GET',
                                  url: curURL + PROD_INFO_XML_URL[5],
                                  async: true,
                                  complete: function(data) {
                                    var result = data.responseText;
                                    if(result.includes("ITEM_ID 는 필수입니다")) {
                                      console.log('[' + data.status + '] 뉴런 호스팅사 일치');
                                      document.getElementById('hostings').innerText = HOSTINGS[5];
                                    } else {
                                      console.log('[' + data.status + '] 뉴런 호스팅사 미일치');
                                      $.ajax({
                                        type: 'GET',
                                        url: curURL + PROD_INFO_XML_URL[6],
                                        async: true,
                                        complete: function(data) {
                                          if(data.status == '200') {
                                            console.log('[' + data.status + '] 코드엠 호스팅사 일치');
                                            document.getElementById('hostings').innerText = HOSTINGS[6];
                                          } else {
                                            console.log('[' + data.status + '] 코드엠 호스팅사 미일치');
                                          }
                                        }
                                      })
                                    }
                                  }
                                })
                              }
                            }
                          })
                        }
                      }
                    })
                  }
                }
              })
            } 
          }
        })
      }
    }
  })  
})
