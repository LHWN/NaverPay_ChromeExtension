nmp.createModule("nmp.front.order.timeline.home",{
	_htInstance : {},
	_htElementSelector : {
		"root" : "._root",
		"duplicationTelNoLayer":"#_duplicationTelNoLayer",
        "autoChargeGuideLayer":"#_autoChargeGuideLayer",
        "noRegisteredGuideLayer": "#_noRegisteredGuideLayer",
        "autoChargeLabel" : "#_autoChargeLabel",
        "autoChargeLabelOn" : "#_autoChargeLabelOn",
        "autoChargeLabelOff" : "#_autoChargeLabelOff",
		"dimmedLayer" : "._dimmedLayer",
		"":""
	},
	initialize : function(htOption){
		// Event Delegator
		nmp.front.order.ui.initializeEventDeligator(this._getElement("root", true), this);
		if (htOption) {
            if (htOption.isPointMenu) {
                this._htInstance["isPointMenu"] = true;
            }
            if (htOption.isPointTotalMenu) {
                this._htInstance["isPointTotalMenu"] = true;
            }
            if (htOption.configAutoChargeUrl) {
                this._htInstance["configAutoChargeUrl"] = htOption.configAutoChargeUrl;
            }
            if (htOption.pcEasyBankRegisterUrl) {
                this._htInstance["pcEasyBankRegisterUrl"] = htOption.pcEasyBankRegisterUrl;
            }
        }
        if (!this._htInstance["isPointMenu"]) {
            this._initializeDuplicationTelNoLayer();
        } else {
            this._initializeAutoChargeLabel();
            //if (this._htInstance["isPointTotalMenu"]) {
                //this._initializeAutoChargeGuideLayer();
            //}
            this._initializeTooltip("_summaryPointCargeTooltip1");
            this._initializeTooltip("_summaryPointTotalTooltip1");
        }
	},
    _initializeDuplicationTelNoLayer : function() {
		var cookie = jindo.$Cookie();
		var hide = cookie.get("duplication_telno");
		if (hide && hide == "true") {
			hide = true;
		} else {
			hide = false;
		}
		if (!hide) {
            var sUrl = "/home/duplicationTelno";
            var htParameter={};
            var fCallback = jindo.$Fn(function(htResult, htResponse) {
                if (htResult && htResult.bSuccess && htResult.htReturnValue && htResult.htReturnValue.duplicationTelno) {
                    this._notifyDuplicationTelNo();
                }
                return;
            }, this).bind();
            nmp.requestAjax(sUrl, htParameter, {"onload":fCallback});
		}
	},
    _initializeTooltip : function(sId) {
        var arrEl = $$("#"+sId);
        if (arrEl == null || arrEl[0] == null) {
            return;
        }

        var cookie = jindo.$Cookie();
        if (cookie.get(sId) == null || cookie.get(sId) != "true") {
            $Element(arrEl[0]).show("inline-block");
        }
    },
    _initializeAutoChargeLabel : function() {
	    if (!this._getElement("autoChargeLabel")) {
	        return;
        }
        var sUrl = "/home/autoChargeLabel";
        var htParameter={};
        var fCallback = jindo.$Fn(function(htResult, htResponse) {
            if (htResult && htResult.htReturnValue) {
                this._getElement("autoChargeLabelOn").hide();
                this._getElement("autoChargeLabelOff").hide();

                if (htResult.htReturnValue.registed) {
                    this._getElement("autoChargeLabel").text("자동충전 : ");
                    if (htResult.htReturnValue.active) {
                        this._getElement("autoChargeLabelOn").show();
                    } else {
                        this._getElement("autoChargeLabelOff").show();
                    }
                } else {
                    this._getElement("autoChargeLabel").text("자동충전설정");
                }
            }
            return;
        }, this).bind();
        nmp.requestAjax(sUrl, htParameter, {"onload":fCallback});
    },
    _initializeAutoChargeGuideLayer : function() {
        var cookie = jindo.$Cookie();
        var hide = cookie.get("auto_charge_guide2");
        if (hide && hide == "true") {
            hide = true;
        } else {
            hide = false;
        }
        if (!hide) {
            var sUrl = "/home/autoChargeGuide";
            var htParameter={};
            var fCallback = jindo.$Fn(function(htResult, htResponse) {
                if (htResult && htResult.bSuccess && htResult.htReturnValue && htResult.htReturnValue.autoChargeGuide) {
                    this._notifyAutoChargeGuide();
                }
                return;
            }, this).bind();
            nmp.requestAjax(sUrl, htParameter, {"onload":fCallback});
        }
    },
	openCouponRegistPopup : function() {
        var sURL = "https://benefit.pay.naver.com/pointcoupon";
        nmp.openPopup(sURL, ["width=420", "height=330"], "couponRegist");
        return;
    },
	_notifyDuplicationTelNo : function() {
        this._getElement("dimmedLayer").show();
        this._getElement("duplicationTelNoLayer").show();
    },
    closeDuplicationTelNoLayer : function() {
		this._getElement("dimmedLayer").hide();
		this._getElement("duplicationTelNoLayer").hide();
	},
	checkDuplicationTelNoLayer : function() {
		var cookie = jindo.$Cookie();
		cookie.set("duplication_telno", "true", 7, "pay.naver.com");
		this._getElement("dimmedLayer").hide();
		this._getElement("duplicationTelNoLayer").hide();
	},
    _notifyAutoChargeGuide : function() {
        this._getElement("dimmedLayer").show();
        this._getElement("autoChargeGuideLayer").show();
    },
    closeAutoChargeGuideLayer : function() {
        this._getElement("dimmedLayer").hide();
        this._getElement("autoChargeGuideLayer").hide();
    },
    checkAutoChargeGuideLayer : function() {
        var cookie = jindo.$Cookie();
        cookie.set("auto_charge_guide2", "true", 9999, "pay.naver.com");
        this._getElement("dimmedLayer").hide();
        this._getElement("autoChargeGuideLayer").hide();
    },
    check1dayAutoChargeGuideLayer : function() {
        var cookie = jindo.$Cookie();
        var tomorrow00 = new Date();
        tomorrow00.setHours(23,59,59,999);
        var remainDay = (tomorrow00.getTime() - (new Date()).getTime()) / (1000*60*60*24);
        cookie.set("auto_charge_guide2", "true", remainDay, "pay.naver.com");
        this._getElement("dimmedLayer").hide();
        this._getElement("autoChargeGuideLayer").hide();
    },
    openConfigAutoChargePopup : function() {
        var sURL = this._htInstance["configAutoChargeUrl"];
        nmp.openPopup(sURL, ["width=420", "height=330", "scrollbars=yes"], "configAutoCharge");
        return;
    },
    showNoRegisteredGuideLayer : function() {
        var cookie = jindo.$Cookie();
        var hide = cookie.get("no_registered_layer");
        if ((hide && hide == "true")) {
            return;
        } else {
            this._getElement("dimmedLayer").show();
            this._getElement("noRegisteredGuideLayer").show();
        }
    },
    registerEasyBank : function () {
        var sURL = this._htInstance["pcEasyBankRegisterUrl"];
        nmp.openPopup(sURL, ["width=500", "height=660"], "openEasyPayBankPopup", null, true);

        this._getElement("dimmedLayer").hide();
        this._getElement("noRegisteredGuideLayer").hide();
    },
    checkNoRegisteredGuideLayer : function(e) {
        var cookie = jindo.$Cookie();
        cookie.set("no_registered_layer", "true", 7, "pay.naver.com");
        this._getElement("dimmedLayer").hide();
        this._getElement("noRegisteredGuideLayer").hide();
    },
    closeNoRegisteredGuideLayer : function(e) {
        this._getElement("dimmedLayer").hide();
        this._getElement("noRegisteredGuideLayer").hide();
    },
    showSimpleLayer: function (htEvent, sId) {
        var arrEl = $$("#" + sId);
        if (arrEl == null || arrEl[0] == null) {
            return;
        }
        $Element(arrEl[0]).show();
    },hideSimpleLayer: function (htEvent, sId) {
        var arrEl = $$("#" + sId);
        if (arrEl == null || arrEl[0] == null) {
            return;
        }
        $Element(arrEl[0]).hide();
    },
    hideTooltip: function (htEvent, sId) {
        var arrEl = $$("#" + sId);
        if (arrEl == null || arrEl[0] == null) {
            return;
        }
        $Element(arrEl[0]).hide();
        var cookie = jindo.$Cookie();
        cookie.set(sId, "true", 1, "pay.naver.com");
    },
	"":""
});
try {
    window = window || {};
    window.openerUpdate = function () {
        nmp.front.order.timeline.home._initializeAutoChargeLabel();
    }
} catch(e) {

}