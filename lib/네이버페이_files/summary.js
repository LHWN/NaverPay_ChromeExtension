nmp.createModule("nmp.front.order.timeline.home.summary",{
	_htInstance : {
		summary : {
			"BEFORE_DELIVERY" : {
				layerSelector : "._beforeDeliveryLayer",
				layerUlSelector : "._beforeDeliveryLayer ul",
				buttonSelector : "._beforeDeliveryBtn",
				layerManager : null,
				dataLoaded : false,
				dataLoading : false
				
			},
			"AFTER_DELIVERY" : {
				layerSelector : "._afterDeliveryLayer",
				layerUlSelector : "._afterDeliveryLayer ul",
				buttonSelector : "._afterDeliveryBtn",
				layerManager : null,
				dataLoaded : false,
				dataLoading : false
			},
			"IN_CLAIM" : {
				layerSelector : "._inClaimLayer",
				layerUlSelector : "._inClaimLayer ul",
				buttonSelector : "._inClaimBtn",
				layerManager : null,
				dataLoaded : false,
				dataLoading : false
			}
		}
	},
	_htElementSelector : {
		"root" : "._summaryRoot",
		"beforeDelivery" : "._beforeDelivery",
		"afterDelivery" : "._afterDelivery",
		"inClaim" : "._inClaim",
		/*"zzimCount" : "#_zzimCount",*/
		"":""
	},
	initialize : function(htOption){
		// Event Delegator
		nmp.front.order.ui.initializeEventDeligator(this._getElement("root", true), this);
		
		if (htOption && htOption.isShowSummary) {
			var sUrl = "/home/summaryCount";
			var htParameter={};
			var fCallback = jindo.$Fn(function(htResult, htResponse) {
				if (htResult && htResult.bSuccess && htResult.htReturnValue) {
					this._setSummary(htResult.htReturnValue);
				}
				return;
			}, this).bind();
			nmp.requestAjax(sUrl, htParameter, {"onload":fCallback});
		}
		/*
		if (htOption && htOption.isShowZzim) {
			var sUrl = "/home/zzimCount";
			var htParameter={};
			var fCallback = jindo.$Fn(function(htResult, htResponse) {
				if (htResult && htResult.bSuccess && htResult.htReturnValue && htResult.htReturnValue.zzimCount) {
					this._setNumberElement(this._getElement("zzimCount", true), htResult.htReturnValue.zzimCount, true);
				}
				return;
			}, this).bind();
			//nmp.requestAjax(sUrl, htParameter, {"onload":fCallback});
		}
		*/
	},
	_setSummary : function(hSummary) {
		var beforeDelivery = hSummary.beforeDelivery;
		var afterDelivery = hSummary.afterDelivery;
		var inClaim = hSummary.inClaim;
		
		this._setNumberElement(this._getElement("beforeDelivery", true), beforeDelivery, true);
		this._setNumberElement(this._getElement("afterDelivery", true), afterDelivery, true);
		this._setNumberElement(this._getElement("inClaim", true), inClaim, true);
		
		this.initializeSummaryLayer("BEFORE_DELIVERY", beforeDelivery);
		this.initializeSummaryLayer("AFTER_DELIVERY", afterDelivery);
		this.initializeSummaryLayer("IN_CLAIM", inClaim);
	},
	initializeSummaryLayer : function(sTimelineSummaryType, sNumber) {
		if (!sTimelineSummaryType) {
			return;
		}
		if (sNumber && sNumber === "0") {
			$Element(this._getElement("root").query(this._htInstance["summary"][sTimelineSummaryType].buttonSelector)).hide();
			return;
		}
		// 요약건수에 마우스 오버시 목록불러오는 function
		var fLoadList = jindo.$Fn(function(sTimelineSummaryType, oCustomEvent){
			var summaryOne = this._htInstance["summary"][sTimelineSummaryType];
			if (summaryOne.dataLoading) {
				return;
			}
			if (!summaryOne.dataLoaded) {
				summaryOne.dataLoading = true;
				var htParameter = {
					"timelineSummaryType" : sTimelineSummaryType
				};
				var sURL = "/home/summaryList?"+jindo.$H(htParameter).toQueryString();
				var elContainer = this._getElement("root").query(summaryOne.layerUlSelector);
				var fCallback = jindo.$Fn(function(sTimelineSummaryType, welContainer) {
					var summaryOne = this._htInstance["summary"][sTimelineSummaryType];
					summaryOne.dataLoaded = true;
				}, this).bind(sTimelineSummaryType);
				var sType = "append";
				nmp.loadHTML(sURL, elContainer, fCallback, sType);
			}
		}, this).bind(sTimelineSummaryType);
		var summaryOne = this._htInstance["summary"][sTimelineSummaryType];
		summaryOne.layerManager = new jindo.LayerManager(this._getElement("root").query(summaryOne.layerSelector), {
			sCheckEvent:"mouseover"
		}).link(this._getElement("root").query(summaryOne.layerSelector, true));
		summaryOne.layerManager.attach("beforeShow", fLoadList);
	},
	_setNumberElement : function(elContainer, sNumber, bLimit3Length) {
		$Element(elContainer).html(this._convertNumberElement(sNumber, bLimit3Length));
	},
	_convertNumberElement : function(str, bLimit3Length) {
		if (!str || !str.length) {
			return null;
		}
		if (bLimit3Length) {
			if (str.length > 2) {
				str = "99+";
			}
		}
		var i = 0;
		var sb = "";
		var ch;
		for (i; i < str.length ; i++) {
			ch = str.substr(i,1);
			if (ch == ",") {
				sb += "<em class=\"comma\">,</em>";
			} else if (ch == "-") {
				sb += "<em class=\"minus\">-</em>";
			} else if (ch == "+") {
				sb += "<em class=\"plus\">이상</em>";
			} else {
				sb += "<em class=\"num"+ch+"\">"+ch+"</em>";
			}
		}
		return sb;
	},
	// 요약건수에 마우스 오버시 요약리스트 레이어를 보여줌
	showLayer : function(htEvent, sTimelineSummaryType) {
		this._htInstance["summary"][sTimelineSummaryType].layerManager.link(htEvent.element);
		this._htInstance["summary"][sTimelineSummaryType].layerManager.show();
	},
	// 요약리스트 레이어 닫음
	closeLayer : function(htEvent) {
		return;
		for(var i in this._htInstance["summary"]) {
			this._htInstance["summary"][i].layerManager.hide();
		}
	},
	// 요약건수 클릭시 요약내역을 바닥에서 조회함
	showSummaryList : function(htEvent, sTimelineSummaryType) {
		htEvent.stop();
		nmp.moveUrl("/home?timelineSummaryType="+sTimelineSummaryType);
	},
	"":""
});