/*
 * 사용법: _click(nmp.front.order.layer.show(layerName))
 * 
 * - layerName -  
 * naverMileage : 마일리지 적립정보 layer
 * nStamp : N Stamp 적립정보 layer 
 * 
 * 레이어를 추가하는 방법은 아래의 _initializeLayerInfo 참고
 *  
 */
nmp.createModule("nmp.front.order.layer", {
	_htInstance : {},
	_htElementSelector : {
		"root" : "body",
		"layers" : "._layersCommonSelector"
	},
	initialize : function(options){
		nmp.front.order.ui.initializeEventDeligator(this._getElement("root", true), this);
		this._initializeLayerInfo();
		this._initializeLayerManager(this._htInstance["layerInfo"]);
	},
	_initializeLayerManager : function(layerInfoList) {
		if (!layerInfoList) {
			return;
		}
		for (key in layerInfoList) {
			var el = this._getElement("root").query(layerInfoList[key].cssSelector);
			if(el) {
				this._htInstance[layerInfoList[key].instanceName] = new jindo.LayerManager(el);
				this._htInstance[layerInfoList[key].instanceName].hide();
			}
		}
	},
	reloadLayerManager : function() {
		this._initializeLayerManager(this._htInstance["layerInfo"]);
	},
	_initializeLayerInfo : function() {
		/*
		 * 레이어를 추가할 때는 아래에 정보를 추가하면 됨.
		 * 
		 * layerName을 정함
		 * 
		 * - cssSelector : 레이어의 root div
		 * - instanceName : 레이어끼리 겹치지 않는 이름을 적당히 주면됨.
		 * - layerOption : jindo.LayerPosition에서 사용함
		 *   (http://jindo.nhncorp.com/docs/jindo-component/archive/latest/doc/jindo.LayerPosition/index.html)
		 * 
		 */
		this._htInstance["layerInfo"] = {
			"coolBagDepositHelp" : {
				cssSelector : "._layerCoolBagDepositHelp",
				instanceName : "oLayerManagerCoolBagDepositHelp",
				layerOption : {
					sPosition : "outside-bottom",
					sAlign : "left",
					nTop : -1,
					nLeft : 0,
					bAuto:true
				}
			},
			"singleCupDepositHelp" : {
				cssSelector : "._layerSingleCupDepositHelp",
				instanceName : "oLayerManagerSingleCupDepositHelp",
				layerOption : {
					sPosition : "outside-bottom",
					sAlign : "left",
					nTop : -1,
					nLeft : 0,
					bAuto:true
				}
			},
			"reusableCupDepositHelp" : {
				cssSelector : "._layerReusableCupDepositHelp",
				instanceName : "oLayerManagerReusableCupDepositHelp",
				layerOption : {
					sPosition : "outside-bottom",
					sAlign : "left",
					nTop : -1,
					nLeft : 0,
					bAuto:true
				}
			},
			"naverMileage" : {
				cssSelector : "._layerNaverMileage",
				instanceName : "oLayerManagerNaverMileage",
				layerOption : {
					sPosition : "outside-bottom",
					sAlign : "left",
				    nTop : -1,
				    nLeft : 0,
				    bAuto:true
				}
			},
			"easyPayMileage" : {
				cssSelector : "._layerEasyPayMileage",
				instanceName : "oLayerManagerEasyPayMileage",
				layerOption : {
					sPosition : "outside-bottom",
					sAlign : "left",
				    nTop : -1,
				    nLeft : 0,
				    bAuto:true
				}
			},
            "cardMileage" : {
                cssSelector : "._layerCardMileage",
                instanceName : "oLayerManagerCardMileage",
                layerOption : {
                    sPosition : "outside-bottom",
                    sAlign : "left",
                    nTop : -1,
                    nLeft : 0,
                    bAuto:true
                }
            },
			"reviewMileage" : {
				cssSelector : "._layerReviewMileage",
				instanceName : "oLayerManagerReviewMileage",
				layerOption : {
					sPosition : "outside-bottom",
					sAlign : "left",
				    nTop : -1,
				    nLeft : 0,
				    bAuto:true
				}
			},
			"nStamp" : {
				cssSelector : "._layerNStamp",
				instanceName : "oLayerManagerNStamp",
				layerOption : {
					sPosition : "outside-bottom",
					sAlign : "left",
				    nTop : -1,
				    nLeft : 0,
				    bAuto:true
				}
			},
			"hyundaiCarPoint" : {
				cssSelector : "._layerHyundaiCarPoint",
				instanceName : "oLayerManagerHyundaiCarPoint",
				layerOption : {
					sPosition : "outside-bottom",
					sAlign : "left",
				    nTop : -1,
				    nLeft : 0,
				    bAuto:true
				}
			},
			"hyundaiCarPointExchanged" : {
				cssSelector : "._layerHyundaiCarPointExchanged",
				instanceName : "oLayerManagerHyundaiCarPointExchanged",
				layerOption : {
					sPosition : "outside-bottom",
					sAlign : "left",
				    nTop : -1,
				    nLeft : 0,
				    bAuto:true
				}
			},
			"orderDiscountCancel" : {
				cssSelector : "._layerOrderDiscountCancel",
				instanceName : "oLayerManagerOrderDiscountCancel",
				layerOption : {
					sPosition : "outside-bottom",
					sAlign : "left",
				    nTop : -1,
				    nLeft : 0,
				    bAuto:true
				}
			},
			"deliveryFeeAdd" : {
				cssSelector : "._layerDeliveryFeeAdd",
				instanceName : "oLayerManagerDeliveryFeeAdd",
				layerOption : {
					sPosition : "outside-bottom",
					sAlign : "left",
				    nTop : -1,
				    nLeft : 0,
				    bAuto:true
				}
			},
			"discountChange" : {
				cssSelector : "._layerDiscountChange",
				instanceName : "oLayerManagerDiscountChange",
				layerOption : {
					sPosition : "outside-bottom",
					sAlign : "left",
				    nTop : -1,
				    nLeft : 0,
				    bAuto:true
				}
			},
			"reliefPhoneNumberGuide" : {
				cssSelector : "._layerReliefPhoneNumberGuide",
				instanceName : "oLayerReliefPhoneNumberGuide",
				layerOption : {
					sPosition : "outside-bottom",
					sAlign : "left",
				    nTop : -1,
				    nLeft : 0,
				    bAuto:true
				}
			},
            "payFeesGuide" : {
                cssSelector : "._payFeesGuide",
                instanceName : "oPayFeesGuide",
                layerOption : {
                    sPosition : "outside-bottom",
                    sAlign : "left",
                    nTop : -1,
                    nLeft : 0,
                    bAuto:true
                }
            },
			"reportedPhoneNumberGuide" : {
				cssSelector : "._layerReportedPhoneNumberGuide",
				instanceName : "oLayerReportedPhoneNumberGuide",
				layerOption : {
					sPosition : "outside-bottom",
					sAlign : "left",
					nTop : 8,
					nLeft : -93,
					bAuto:true
				}
			},
			"reportedPhoneNumberGuideForClaim" : {
				cssSelector : "._layerReportedPhoneNumberGuideForClaim",
				instanceName : "oLayerReportedPhoneNumberGuideForClaim",
				layerOption : {
					sPosition : "outside-bottom",
					sAlign : "left",
					nTop : 8,
					nLeft : -15,
					bAuto:true
				}
			},
            "deliveryPredictionStatusLayer" : {
                cssSelector : "._predict_status_layer",
                instanceName : "oPredictStatusLayer",
                layerOption : {
                    sPosition : "outside-bottom",
                    sAlign : "left",
                    nTop : -1,
                    nLeft : 0,
                    bAuto:true
                }
            },
			"payFailReason" : {
				cssSelector : "._payFailReasonLayer",
				instanceName : "oLayerPayFailReason",
				layerOption : {
					sPosition : "inside-bottom",
					sAlign : "center",
					nTop : 3,
					nLeft : 0,
					bAuto:true
				}
			}
		};
	},
	/**
	 * @param elBaseElement (옵션값, 기준이되는 element. 없으면 htEvent.element를 기준으로 한다.)
	 */
	show : function(htEvent, sLayerName, elBaseElement){
		if(!sLayerName || !this._htInstance["layerInfo"][sLayerName]) {
			alert("등록되지 않은 layer입니다.");
			return;
		}
		var instanceName = this._htInstance["layerInfo"][sLayerName].instanceName;
		var layerOption = this._htInstance["layerInfo"][sLayerName].layerOption;
		this._htInstance[instanceName].setLinks([this._htInstance[instanceName].getLayer(), htEvent.element]).show();
		if (!elBaseElement) {
			elBaseElement = htEvent.element;
		}
		var oLayerPosition = new jindo.LayerPosition(elBaseElement, this._htInstance[instanceName].getLayer(), layerOption);
	},
	hide : function(htEvent, sLayerName){
		if(!sLayerName || !this._htInstance["layerInfo"][sLayerName]) {
			alert("등록되지 않은 layer입니다.");
			return;
		}
		this._htInstance[this._htInstance["layerInfo"][sLayerName].instanceName].hide();
	},
	/* deprecated 예정 */
	showIdPlus : function(htEvent){
		
		if (nmp.front.order.layer.idPlus) {
			nmp.front.order.layer.idPlus.show(htEvent.element.parentElement);
		}
	},
	/* deprecated 예정 */
	hideAll : function(){
		this._getElementList("layers").hide();
	},
	/* deprecated 예정 */
	_showOnOffset : function(htEvent, wel){
		var offset = $Element(htEvent.element).offset();
		wel.show(); // show를 먼저하고 offset을 지정해야 브라우저 상관없이 잘 동작함... (by 남중)
		wel.offset(offset["top"], offset["left"]);
	},
	"":""
});
