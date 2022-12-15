// 각 호스팅사별로 ajax 돌리고, 
// 다 돌아갔을 때 각 결과를 배열에 저장


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

var result = [false, false, false, false, false, false, false, false, false, false];

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


  var ajax_cafe24 = $.ajax({
    type: 'GET',
    url: curURL + PROD_INFO_XML_URL[0],
    async: true, // 비동기 
    complete: function(data) {
      console.log("[" + HOSTINGS[0] + "]" + "실행 시각 : " + new Date());
      if(data.status == '200') {
          result[0] = true;
          document.getElementById('hostings').innerText = "호스팅사는 '" + HOSTINGS[0] + "' 입니다.";
      }
    }
  })

  var ajax_godo = $.ajax({
    type: 'GET',
    url: curURL + PROD_INFO_XML_URL[1],
    async: true, // 비동기 
    complete: function(data) {
      console.log("[" + HOSTINGS[1] + "]" + "실행 시각 : " + new Date());
      if(data.status == '200') {
          result[1] = true;
          document.getElementById('hostings').innerText = "호스팅사는 '" + HOSTINGS[1] + "' 입니다.";
      }
    }
  })

  var ajax_makeshop = $.ajax({
    type: 'GET',
    url: curURL + PROD_INFO_XML_URL[2],
    async: true, // 비동기 
    complete: function(data) {
      console.log("[" + HOSTINGS[2] + "]" + "실행 시각 : " + new Date());
      if(data.status == '200') {
          result[2] = true;
          document.getElementById('hostings').innerText = "호스팅사는 '" + HOSTINGS[2] + "' 입니다.";
      }
    }
  })

  var ajax_gabia = $.ajax({
    type: 'GET',
    url: curURL + PROD_INFO_XML_URL[3],
    async: true, // 비동기 
    complete: function(data) {
      console.log("[" + HOSTINGS[3] + "]" + "실행 시각 : " + new Date());
      if(data.status == '200') {
          result[3] = true;
          document.getElementById('hostings').innerText = "호스팅사는 '" + HOSTINGS[3] + "' 입니다.";
      }
    }
  })

  var ajax_whois = $.ajax({
    type: 'GET',
    url: curURL + PROD_INFO_XML_URL[4],
    async: true, // 비동기 
    complete: function(data) {
      console.log("[" + HOSTINGS[4] + "]" + "실행 시각 : " + new Date());
      if(data.status == '200') {
          result[4] = true;
          document.getElementById('hostings').innerText = "호스팅사는 '" + HOSTINGS[4] + "' 입니다.";
      }
    }
  })

  // 코드엠
  var ajax_codem = $.ajax({
    type: 'GET',
    url: curURL + PROD_INFO_XML_URL[6],
    async: true, // 비동기 
    complete: function(data) {
      console.log("[" + HOSTINGS[6] + "]" + "실행 시각 : " + new Date());
      if(data.status == '200') {
          result[6] = true;
          document.getElementById('hostings').innerText = "호스팅사는 '" + HOSTINGS[6] + "' 입니다.";
      }
    }
  })

  // 아임웹
  var ajax_imweb = $.ajax({
    type: 'GET',
    url: curURL + PROD_INFO_XML_URL[7],
    async: true, // 비동기 
    complete: function(data) {
      console.log("[" + HOSTINGS[7] + "]" + "실행 시각 : " + new Date());
      if(data.status == '200') {
          result[7] = true;
          document.getElementById('hostings').innerText = "호스팅사는 '" + HOSTINGS[7] + "' 입니다.";
      }
    }
  })

  // 위사
  var ajax_wisa = $.ajax({
    type: 'GET',
    url: curURL + PROD_INFO_XML_URL[8],
    async: true, // 비동기 
    complete: function(data) {
      console.log("[" + HOSTINGS[8] + "]" + "실행 시각 : " + new Date());
      if(data.status == '200') {
          result[8] = true;
          document.getElementById('hostings').innerText = "호스팅사는 '" + HOSTINGS[8] + "' 입니다.";
      }
    }
  })

  // 식스샵
  var ajax_sixshop = $.ajax({
    type: 'GET',
    url: curURL + PROD_INFO_XML_URL[9],
    async: true, // 비동기 
    complete: function(data) {
      console.log("[" + HOSTINGS[9] + "]" + "실행 시각 : " + new Date());
      if(data.status == '200') {
          result[9] = true;
          document.getElementById('hostings').innerText = "호스팅사는 '" + HOSTINGS[9] + "' 입니다.";
      }
    }
  })

  // 독립몰 (영카트)
  var ajax_youngcarts = $.ajax({
      type: 'GET',
      url: curURL + PROD_INFO_XML_URL[10],
      async: true, // 비동기 
      complete: function(data) {
        console.log("[" + HOSTINGS[10] + "]" + "실행 시각 : " + new Date());
        if(data.status == '200') {
            result[10] = true;
            document.getElementById('hostings').innerText = "호스팅사는 '" + HOSTINGS[10] + "' 입니다.";
        }
      }
  })

  // 제대로 동작하는지 모르겠음 
  // 원래 의도 : 호스팅사 다 돌고 없으면 '호스팅사 매칭 결과 없음' 출력
  $.when(ajax_cafe24, ajax_gabia, ajax_godo).then(function(data, textStatus, jqXHR) {
  }, function() {
    console.log("호스팅사 매칭 결과 없음" + new Date());
    document.getElementById('hostings').innerText = "호스팅사 매칭 결과 없음";
    for (var i = 1; i < result.length; i++) {
      // console.log("# search Hostings Result : " + "[" + HOSTINGS[i] + "]" + result[i]);
    }
  })
  
  
})
