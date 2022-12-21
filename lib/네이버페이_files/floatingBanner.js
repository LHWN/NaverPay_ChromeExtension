nmp.createModule("nmp.front.order.timeline.home.floatingBanner",{
    _htInstance : {},
    _htElementSelector : {
        "root" : "._root",
        "floatingBannerLayer" : "#_floatingBannerLayer",
        "":""
    },
    initialize : function(htOption){
        // Event Delegator
        nmp.front.order.ui.initializeEventDeligator(this._getElement("root", true), this);
        this._initializeCookie();
    },
    _initializeCookie : function() {
        var cookie = jindo.$Cookie();
        var hide = cookie.get(this._getCookieKey());
        if (hide && hide == "true") {
            hide = true;
        } else {
            hide = false;
        }
        if (!hide) {
            this._showLayer();
        }
    },
    _getCookieKey : function() {
        var banner = this._getOption('banner');
        var tabMenu = this._getOption('tabMenu');
        if (banner) {
            var words = banner.imageUrl.split('/');
            var keyIndex = words.length - (words.length > 3 ? 2 : 1);
            return "floationgBanner_" + tabMenu + "_" + encodeURIComponent(words[keyIndex]).replace(/[\%|\.|\_]/ig, '');
        } else {
            return null;
        }
    },
    _showLayer : function() {
        new jindo.FloatingLayer( this._getElement("floatingBannerLayer", true), {
            nDelay : 0, // (Number) 스크롤시 nDelay(ms) 이후에 이동
            nDuration : 500, // (Number) Transition이 수행될 시간
            sEffect : jindo.Effect.easeOut, // (Function) 레이어 이동에 적용될 jindo.Effect 함수
            bActivateOnload : true //(Boolean) 로드와 동시에 activate 할지 여부
        }).attach({
            beforeMove : function(oCustomEvent) {
                oCustomEvent.nY = oCustomEvent.nY+312+140;
                oCustomEvent.nX = 150;
                //레이어가 이동하기 전에 발생
                //oCustomEvent.nX : 레이어가 이동될 x좌표 (number)
                //oCustomEvent.nY : 레이어가 이동될 y좌표 (number)
                //oCustomEvent.stop() 수행시 이동하지 않음
            },
            move : function(a) {
                //레이어 이동후 발생
            }
        });
        this._getElement("floatingBannerLayer").show();
    },
    hideLayer : function() {
        this._getElement("floatingBannerLayer").hide();
        this._checkLayer();
    },
    _checkLayer : function() {
        var cookie = jindo.$Cookie();
        var tomorrow00 = new Date();
        tomorrow00.setHours(23,59,59,999);
        var remainDay = (tomorrow00.getTime() - (new Date()).getTime()) / (1000*60*60*24);
        cookie.set(this._getCookieKey(), "true", remainDay, "pay.naver.com");
    },
    goPage : function() {
        var banner = this._getOption('banner');
        var isPopup = new RegExp('[?&]_target=popup', 'ig').test(decodeURIComponent(banner.linkUrl));
        if (isPopup) {
            nmp.openPopup(banner.linkUrl, ["width=450","height=705"], "bannerPopup");
        } else {
            nmp.moveUrl(banner.linkUrl);
        }
    },
    "":""
});
