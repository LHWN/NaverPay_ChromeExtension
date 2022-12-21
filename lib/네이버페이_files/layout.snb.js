if(typeof layout == 'undefined'){
	layout = {};
}

layout.snb = {
		initialize : function() {
		}
};

layout.snb.initialize();

var oRolling1 = new jindo.Rolling(jindo.$("rolling1"), {
	nDuration : 400
});

var beforeIndex = 0;
var afterIndex = 1;

oRolling1.attach('afterMove', function(oCustomEvt) {
	beforeIndex = afterIndex;
});

jindo.$Fn(function(e) {
	e.stop($Event.CANCEL_DEFAULT);
	if(!oRolling1.isMoving() && oRolling1.moveBy(-1)){
		afterIndex = beforeIndex - 1;
	}
}).attach(jindo.$$('._prev_btn'), 'click');

jindo.$Fn(function(e) {
	e.stop($Event.CANCEL_DEFAULT);
	if(!oRolling1.isMoving() && oRolling1.moveBy(1)){
		afterIndex = beforeIndex + 1;
	}
}).attach(jindo.$$('._next_btn'), 'click');

jindo.$Fn(function(e) {
	e.stop($Event.CANCEL_DEFAULT);
	jindo.$$.getSingle('._snb_bank_charge_tooltop').style.display='none';
}).attach(jindo.$$('._snb_bank_charge_tooltop_btn'), 'click');

function releaseDormancy(releaseUrl){
	location.href = releaseUrl + "?rurl=" + encodeURIComponent(location.href);
}

function checkBrowser(rurl, ieUrl) {
	if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (navigator.userAgent.indexOf('msie') != -1)) {
		window.open(ieUrl);
	} else {
		window.open(rurl);
	}
}