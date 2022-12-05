var casper = require('casper').create();

casper.start();
casper.viewport(1400, 800);
casper.userAgent('User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36');

var text = encodeURIComponent("수영");
casper.open('https://spo.isdc.co.kr/courseRegist.do');

casper.then(function(response) {

    this.evaluate(function() {
        document.getElementById("center").value = "05"; // 평생스포츠센터
        document.getElementById("event").value = "01"; // 수영
        document.getElementById("target").value = "01"; // 성인
        document.getElementById("class").value = "010001"; // 조기수영


        document.getElementById("submit").click();
    })



    /*
    this.capture('swim-capture.png', {
        top:0, left:0, width: 1400, height: 800
    });
    */
});

casper.then(function() {
    this.wait(3000, function() {
        this.capture('swim-search.png');
    })
});

casper.run();
