nmp.createModule("nmp.front.order.timeline.home.list",{
	_htInstance : {},
	_htElementSelector : {
		"root" : "._listRoot",
		"listContentArea" : "#_listContentArea",
		"moreButton" : "#_moreButton",
		"":""
	},
	/**
	 * 초기화(자동으로 호출됨)
	 * @param htOption
	 */
	initialize : function(htOption){
		// Event Delegator
		nmp.front.order.ui.initializeEventDeligator(this._getElement("root", true), this);
		this.initializeParameter(htOption);
		this.initializeSelectbox(htOption);
		
		var wel2 = jindo.$Element(this._getElement("root").query("#_interlockNosForDeliveryTracking0"));
		if (wel2) {
			if (this._htInstance["isPointMenu"]) {
				this._requestPointStatus(wel2.attr("value"));
			}
		}
	},
	/**
	 * 넘겨받은 파라메터가 있다면 저장해둠
	 * @param htOption
	 */
	initializeParameter : function(htOption) {
		this._htInstance["isSearch"] = false;
		this._htInstance["lastId"] = null;
		this._htInstance["htParameter"] = {};
		if (htOption) {
			if (htOption.isSearch) {
				this._htInstance["isSearch"] = true;
			}
			if (htOption.isPointMenu) {
				this._htInstance["isPointMenu"] = true;
			}
			if (htOption.lastId) {
				this._htInstance["lastId"] = htOption.lastId;
			}
			if (htOption.htParameter) {
				this._htInstance["htParameter"] = htOption.htParameter;
				if (htOption.overrideHtParameter) {
					if (htOption.overrideHtParameter.tabMenu) {
						this._htInstance["htParameter"]["tabMenu"] = htOption.overrideHtParameter.tabMenu; 
					}
					if (htOption.overrideHtParameter.serviceGroup) {
						this._htInstance["htParameter"]["serviceGroup"] = htOption.overrideHtParameter.serviceGroup; 
					}
					if (htOption.overrideHtParameter.statusGroup) {
						this._htInstance["htParameter"]["statusGroup"] = htOption.overrideHtParameter.statusGroup; 
					}
				}
			}
			if (htOption.bookingCommandHeadUrl) {
				this._htInstance["bookingCommandHeadUrl"] = htOption.bookingCommandHeadUrl;
			}
			if (htOption.npointOnlineReceiptPopupUrl) {
				this._htInstance["npointOnlineReceiptPopupUrl"] = htOption.npointOnlineReceiptPopupUrl;
			}
			if (htOption.cancelChargeDetailPayUrl) {
				this._htInstance["cancelChargeDetailPayUrl"] = htOption.cancelChargeDetailPayUrl;
			}
			if (htOption.rejectCancelChargePayUrl) {
				this._htInstance["rejectCancelChargePayUrl"] = htOption.rejectCancelChargePayUrl;
			}
			if (htOption.receiptChargePayUrl) {
				this._htInstance["receiptChargePayUrl"] = htOption.receiptChargePayUrl;
			}
            if (htOption.etaxDetailPopupUrl) {
                this._htInstance["etaxDetailPopupUrl"] = htOption.etaxDetailPopupUrl;
            }
            if (htOption.wetaxDetailPopupUrl) {
                this._htInstance["wetaxDetailPopupUrl"] = htOption.wetaxDetailPopupUrl;
            }
			if (htOption.payLaterSignUpUrl) {
				this._htInstance["payLaterSignUpUrl"] = htOption.payLaterSignUpUrl;
			}
		}
	},
	/**
	 * 셀렉트박스 초기화
	 * @param htOption
	 */
	initializeSelectbox : function(htOption) {
		this._htInstance["selectbox1"] = new jindo.SelectBox(jindo.$("s1"));
		this._htInstance["selectbox2"] = new jindo.SelectBox(jindo.$("s2"));
		var isSearch = this._htInstance["isSearch"];
		var serviceGroup = this._htInstance["htParameter"]["serviceGroup"];
		var statusGroup = this._htInstance["htParameter"]["statusGroup"];
		var selectbox1 = this._htInstance["selectbox1"];
		var selectbox2 = this._htInstance["selectbox2"];
		selectbox2.disable();

		if (serviceGroup && serviceGroup != "EASYBOOKING") {
			selectbox1.setValue(serviceGroup);
			selectbox2.setOptionGroup(serviceGroup);
			selectbox2.enable();
			if (statusGroup) {
				selectbox2.setValue(statusGroup);
			} else {
				selectbox2.setDefault();
			}
		}
	},
	/**
	 * 조회영역의 첫번째 셀렉트 박스를 선택시
	 * @param htEvent
	 */
	changeSelectServiceGroup : function(htEvent) {
		var selectedValue = this._htInstance["selectbox1"].getValue();
		if (selectedValue && selectedValue != "ALL") {
			if (this._htInstance["selectbox2"].getDisabled()) {
				this._htInstance["selectbox2"].enable();
			}
			this._htInstance["selectbox2"].setOptionGroup(selectedValue);
			
		} else {
			this._htInstance["selectbox2"].setDefault();
			this._htInstance["selectbox2"].disable();
		}
	},
	/**
	 * 조회영역의 조회버튼 클릭시
	 * @param htEvent
	 */
	search : function(htEvent) {
		var hParameter = jindo.$H(this._getSearchParameter());
		var dateParameter = nmp.front.order.timeline.home.list.date.getSearchParameter();
		for (var i in dateParameter) {
			hParameter.add(i, dateParameter[i]);
		}
		if (this._htInstance["htParameter"]["tabMenu"]) {
			hParameter.add("tabMenu", this._htInstance["htParameter"]["tabMenu"]);
		}
		nmp.moveUrl("/home/search?"+hParameter.toQueryString());
	},
	/**
	 * 더보기 버튼 클릭시
	 */
	more : function() {
		var lastId = this._htInstance["lastId"];
		var htParameter= this._htInstance["htParameter"];
		htParameter["lastId"] = lastId;
		var sURL = "/home/more?"+jindo.$H(htParameter).toQueryString();
		var elContainer = this._getElement("listContentArea", true);
		var fCallback = jindo.$Fn(function(sLastId, welContainer) {
			var wel = jindo.$Element(this._getElement("root").query("#_lastId"+sLastId));
			this._htInstance["lastId"] = wel.attr("value");

			var wel2 = jindo.$Element(this._getElement("root").query("#_interlockNosForDeliveryTracking"+sLastId));
			if (wel2) {
				if (this._htInstance["isPointMenu"]) {
					this._requestPointStatus(wel2.attr("value"));
				}
			}

			var wel3Value = jindo.$Element(this._getElement("root").query("#_hasMore"+sLastId)).attr("value");
			if (wel3Value && (wel3Value === false || wel3Value === "false")) {
				this._getElement("moreButton").hide();
			}
		}, this).bind(lastId);
		var sType = "append";
		if(this._htInstance["isPointMenu"]) {
            nmp.loadHTML(sURL, elContainer, fCallback, sType);
        } else {
            nmp.front.order.timeline.loadNativeHTML(sURL, elContainer, fCallback)
        }
	},

	_requestPointStatus : function(sInterlockNosComma) {
		if (!sInterlockNosComma || sInterlockNosComma.length < 1) {
			return;
		}
		var htParameter={"interlockNos": sInterlockNosComma};
		var sURL = "/home/pointStatus";
		var fCallback = jindo.$Fn(function(htResult, htResponse, a, b, c) {
			if (htResult && htResult.bSuccess && htResult.htReturnValue) {
				var aExistInterlockNo = htResult.htReturnValue.existInterlockNos;
				for (var i in aExistInterlockNo) {
					jindo.$A(this._getElement("root").queryAll("._interlockNo"+aExistInterlockNo[i])).forEach(function(value, index, array) {
						var wel = jindo.$Element(value);
						var wel2 = jindo.$Element(wel.query("._titleName"));
						var text = wel2.text().replace("예정","");
						wel2.text(text);
						wel.removeClass("due");
						wel.addClass("add");
					});
				}
			}
		}, this).bind();
		nmp.requestAjax(sURL, htParameter, {"onload":fCallback});
	},
	_getSearchParameter : function() {
		var htParameter = {};
		
		var selectbox1Value = this._htInstance["selectbox1"].getValue();
		var selectbox2Value = this._htInstance["selectbox2"].getValue();
		
		if (selectbox1Value && selectbox1Value != "ALL") {
			htParameter["serviceGroup"] = selectbox1Value;	
		}
		if (selectbox2Value && selectbox2Value != "ALL") {
			htParameter["statusGroup"] = selectbox2Value;	
		}
		return htParameter;
	},
	/**
	 * 쇼핑 서비스건 중 배송확인 건들의 상태명 클릭시 배송조회팝업을 띄움
	 * @param htEvent
	 * @param sUrl
	 */
	openDeliveryPopup : function(htEvent, sUrl) {
		htEvent.stop();
		nmp.openPopup(sUrl, ["width=520", "height=478", "scrollbars=yes"]);
	},
	/**
	 * 쇼핑 서비스의 상세보기 클릭시
	 * @param htEvent
	 * @param sProductOrderId
	 */
	toggleOrderDetailView : function(htEvent, sProductOrderId) {
		var btn = $Element(htEvent.element);
		if (btn.hasClass("close")) {
			this._getElement("root").query("#_detailView"+sProductOrderId).hide();
			btn.removeClass("close");
			btn.addClass("open");
		} else {
			var sURL = "/home/orderDetail/"+sProductOrderId;
			var elContainer = this._getElement("root").query("#_detailView"+sProductOrderId);
			var fCallback = jindo.$Fn(function(welContainer) {
				welContainer.show();
			}, this).bind();
			var sType = "html";
			nmp.loadHTML(sURL, elContainer, fCallback, sType);
			btn.removeClass("open");
			btn.addClass("close");
		}
	},
	/**
	 * 쇼핑 이외 서비스들의 상세보기 클릭시
	 * @param htEvent
	 * @param sProductOrderId
	 */
	toggleDetailView : function(htEvent, sProductOrderId) {
		var btn = $Element(htEvent.element);
		if (btn.hasClass("close")) {
			this._getElement("root").query("#_detailView"+sProductOrderId).hide();
			btn.removeClass("close");
			btn.addClass("open");
		} else {
			this._getElement("root").query("#_detailView"+sProductOrderId).show();
			btn.removeClass("open");
			btn.addClass("close");
		}
	},
	userActionValidatePopup : function(htEvent, sUserAction, sProductOrderId, sUrl) {
		var htParameter={};
		var sURL = "/userAction/validate/"+sUserAction+"/"+sProductOrderId;
		var fCallback = jindo.$Fn(function(sUrl, htResult, htResponse) {
			if (htResult && htResult.bSuccess && htResult.htReturnValue) {
				nmp.openPopup(sUrl, ["width=520", "height=478", "scrollbars=yes"]);
			} else {
				alert("요청하신 처리가 불가능합니다. 주문상태를 확인하여 주시기 바랍니다.");
			}
		}, this).bind(sUrl);
		nmp.requestAjax(sURL, htParameter, {"onload":fCallback});
	},
	userActionValidateMove : function(htEvent, sUserAction, sProductOrderId, sUrl) {
		var htParameter={};
		var sURL = "/userAction/validate/"+sUserAction+"/"+sProductOrderId;
		var fCallback = jindo.$Fn(function(sUrl, htResult, htResponse) {
			if (htResult && htResult.bSuccess && htResult.htReturnValue) {
				nmp.moveUrl(sUrl);
			} else {
				alert("요청하신 처리가 불가능합니다. 주문상태를 확인하여 주시기 바랍니다.");
			}
		}, this).bind(sUrl);
		nmp.requestAjax(sURL, htParameter, {"onload":fCallback});
	},
	userActionPopup : function(htEvent, sUserAction, sUrl) {
		var option = ["width=520", "height=478", "scrollbars=yes"];
		if (sUserAction == "PAY_NEXT") {
			option = ["width=500", "height=800", "scrollbars=yes"];
		}

		nmp.openPopup(sUrl, option);
	},
	userActionAjax : function(htEvent, sUserAction, sProductOrderId, sUrl) {
		if (sUserAction == "REMOVE_PURCHASE_CONTENTS_REQUEST") {
			this._removeShopping(htEvent, sUserAction, sProductOrderId, sUrl);
		}
	},
	_removeShopping : function(htEvent, sUserAction, sProductOrderId, sUrl) {
		if (!confirm("삭제 된 내역은 복구할 수 없습니다. 정말로 삭제하시겠습니까?")) {
			return;
		}
		var htParameter={};
		var fCallback = jindo.$Fn(function(htResult, htResponse) {
			if (htResult && htResult.bSuccess && htResult.htReturnValue) {
				if (htResult.htReturnValue.message) {
					alert(htResult.htReturnValue.message);
				}
				location.reload();
				return;
			}
			alert("요청하신 처리가 불가능합니다. 주문상태를 확인하여 주시기 바랍니다.");
			return;
			
		}, this).bind();
		nmp.requestAjax(sUrl, htParameter, {"method":"post", "onload":fCallback});
	},
	removeEtc : function (htEvent, sTimeLineId) {
		htEvent.stop();
		if (!confirm("삭제 된 내역은 복구할 수 없습니다. 정말로 삭제하시겠습니까?")) {
			return;
		}
		var htParameter={};
		var sURL = "/home/removeEtc/"+sTimeLineId;
		var fCallback = jindo.$Fn(function(htResult, htResponse) {
			if (htResult && htResult.bSuccess && htResult.htReturnValue) {
				if (htResult.htReturnValue.message) {
					alert(htResult.htReturnValue.message);
				}
				location.reload();
				return;
			}
			alert("요청하신 처리가 불가능합니다. 주문상태를 확인하여 주시기 바랍니다.");
			return;
		}, this).bind();
		nmp.requestAjax(sURL, htParameter, {"method":"post", "onload":fCallback});
	},
	openCashReceiptEtc : function(htEvent, sGroupKey) {
		var sURL = "/home/cashReceiptEtc/" + sGroupKey;
		var fCallback = jindo.$Fn(function(htResult, htResponse, a, b, c) {
			if (htResult && htResult.bSuccess && htResult.htReturnValue) {
				if (htResult.htReturnValue.urls) {
					for (var i in htResult.htReturnValue.urls) {
						nmp.openPopup(htResult.htReturnValue.urls[i], ["width=520", "height=550","scrollbars=yes"], "cashReceipt" + sGroupKey);
					}
					return;
				} else if (htResult.htReturnValue.url && htResult.htReturnValue.paramList) {
					for (var i in htResult.htReturnValue.paramList) {
						nmp.openPopup(htResult.htReturnValue.url, ["width=520", "height=550","scrollbars=yes"], "cashReceipt" + sGroupKey, htResult.htReturnValue.paramList[i]);
					}
					return;
				} else if (htResult.htReturnValue.message) {
					alert(htResult.htReturnValue.message);
					return;
				}
			}
		}, this).bind();
		nmp.requestAjax(sURL, {}, {"onload":fCallback});
	},
	openOnlineReceiptEtc : function(htEvent, sGroupKey) {
		var sURL = this._htInstance["npointOnlineReceiptPopupUrl"] + sGroupKey;
		nmp.openPopup(sURL, ["width=544", "height=440","scrollbars=yes"], "onlineReceipt" + sGroupKey);
		return;
	},
    openEtaxDetail : function(htEvent, sServiceKey) {
        var sURL = this._htInstance["etaxDetailPopupUrl"] + sServiceKey;
        nmp.openPopup(sURL, ["width=465", "height=579","scrollbars=yes"], "etaxDetail" + sServiceKey);
        return;
    },
    openWetaxDetail : function(htEvent, sServiceKey) {
        var sURL = this._htInstance["wetaxDetailPopupUrl"] + sServiceKey;
        nmp.openPopup(sURL, ["width=465", "height=579","scrollbars=yes"], "wetaxDetail" + sServiceKey);
        return;
    },
	openPayLaterSingUp : function(htEvent) {
		nmp.openPopup(this._htInstance["payLaterSignUpUrl"], ["width=500", "height=660","scrollbars=yes"], "payLaterSignUp");
		return;
	},
	shoppingInquiry : function(htEvent, sUrl) {
		nmp.requestAjax(sUrl, {}, {
			type : "jsonp",
			method : "get",
			onload : jindo.$Fn(function(htResult) {
				if (htResult && htResult.bSuccess && htResult.htReturnValue) {
					var url = htResult.htReturnValue.url;
					var orderId = htResult.htReturnValue.orderId;
					var merchantNo = htResult.htReturnValue.merchantNo;
					var popupUrl = jindo.$Template(url).process({ "orderId" : orderId, "merchantNo" : merchantNo});
					nmp.openPopup(popupUrl, ["width=520", "height=550", "scrollbars=yes"], "shoppingInquiry" + orderId);
				} 
			}, this).bind()
		});
	},
	cancelEasyBooking : function(htEvent, sProductOrderNo) {
		if (confirm("예약 취소는 네이버 예약에서 하실 수 있습니다. 네이버 예약 페이지로 이동 하시겠습니까?")) {
			location.href = this._htInstance["bookingCommandHeadUrl"] + sProductOrderNo + "/detail";
		}
	},
	openOnlineReceipt : function(htEvent, sTimeLineId) {
		var arr = sTimeLineId.split("CHG");
		var sURL = this._htInstance["receiptChargePayUrl"] + arr[1];
		nmp.openPopup(sURL, ["width=544", "height=440","scrollbars=yes"], "receiptCharge" + sTimeLineId);
		return;
	},
	openRejectCancelCharge : function(htEvent) {
		if (confirm('취소 하시겠습니까?')) {
			var ajax = $Ajax(this._htInstance["rejectCancelChargePayUrl"], {
				type : 'jsonp',
				onload : function(res) {
					if (res.json().rtn == "TRUE") {
						var dttm = res.json().regdttm;
						var year = dttm.substr(0,4);
						var month = dttm.substr(4,2);
						var day = dttm.substr(6,2);
						var msg = year + '.' + month + '.' + day + ' 신청하신 ' + res.json().withdrawamt +'원에 대한 충전취소/인출 요청이 취소되었습니다.'
						alert(msg);
						location.reload();
					} else if(res.json().rtn == "FALSE" && res.json().status == "notExistWithdraw"){
						alert("취소 가능한 인출내역이 없습니다.");
					} else {
						alert("인출내역 취소가 실패되었습니다.\n잠시 후 다시 시도해 주세요");
					}
				},
				onerror : function() {
					alert("네트워크 상태가 원활하지 않습니다.\n잠시 후 다시 시도해 주세요.");
				},
				ontimeout : function(){
					alert("네트워크 상태가 원활하지 않습니다.\n잠시 후 다시 시도해 주세요.");
				}
			});
			ajax.request();
		}
	},
	openCancelChargeDetail : function(htEvent, sTimeLineId) {
		var arr = sTimeLineId.split("CHG");
		var sURL = this._htInstance["cancelChargeDetailPayUrl"] + arr[1];
		nmp.openPopup(sURL, ["width=544", "height=440","scrollbars=yes"], "cancelChargeDetail" + sTimeLineId);
		return;
	},
	removePointCharge : function(htEvent) {

	},
	callbackPayNext : function() {
		location.reload();	
	},
	rebuyLayerShow : function(htEvent, productOrderId) {
        var absoluteUrl = "";
		//absoluteUrl = "https://dev-order.pay.naver.com";
        try {
            $A(this._getElement("root").queryAll("._rebuyLayers")).forEach(function (el) {
                el.hide();
            });
        } catch (e) {

        }

        var url = absoluteUrl+"/repurchaseAjax/validateProductOrderNo/" + productOrderId;
        nmp.requestAjax(url, {}, {
            type: "jsonp",
            method : "get",
            onload : jindo.$Fn(function(absoluteUrl, htResult) {
                if (htResult && htResult.bSuccess && htResult.htReturnValue) {
                    this.createRepurchaseLayer(htEvent, productOrderId, htResult.htReturnValue, absoluteUrl, '');
                }
            }, this).bind(absoluteUrl)
        });
	},
    rebuyLayerHide : function(htEvent, productOrderId) {
        var elLayer = this._getElement("root").query("#_rebuyLayer"+productOrderId);
        if (elLayer) {
            elLayer.hide();
        }
    },
    rebuyLayerGoCart : function(htEvent, productOrderId, select) {
        this.purchaseFromLayer(htEvent, productOrderId, select);
        this.rebuyLayerHide(htEvent, productOrderId);
    },
    rebuyLayerGoBuy : function(htEvent, productOrderId, select) {
        this.purchaseFromLayer(htEvent, productOrderId, select);
        this.rebuyLayerHide(htEvent, productOrderId);
    },
    createRepurchaseLayer: function(htEvent, productOrderId, obj, absoluteUrl, mypageSel) {
        // 재구매 클릭시 생성되는 Layer 스크립트
        // 재구매 클릭시 a태그에 un 클래스 추가 및 ly_buy div에 style="display:block" 추가
        var message = obj.message;
        var type = obj.type;
        var isBranch = obj.isBranch;

        var elLayer = this._getElement("root").query("#_rebuyLayer"+productOrderId);
        var elTitle = this._getElement("root").query("#_rebuyLayerTitle"+productOrderId);
        var elDesc = this._getElement("root").query("#_rebuyLayerDesc"+productOrderId);
        var elButtonArea = this._getElement("root").query("#_rebuyButton"+productOrderId);
        var elCartButton = this._getElement("root").query("#_rebuyLayerCartButton"+productOrderId);
        var elBuyButton = this._getElement("root").query("#_rebuyLayerBuyButton"+productOrderId);
        var elProductButton = this._getElement("root").query("#_rebuyLayerProductButton"+productOrderId);
        var elProductC1Button = this._getElement("root").query("#_rebuyLayerProductC1Button"+productOrderId);


        if (type =="purchasable") {
            // 구매가능
            if (message == "VPP_CULTURE_BENEFIT") {
                elTitle.html('기존상품 구매 가능');
                elDesc.html('해당 상품은 상품페이지에서<br>구매하실 수 있습니다.');
                elDesc.show();
                elButtonArea.show('inline-block');
                elBuyButton.addClass('type_large');
                elBuyButton.show('inline-block');
            } else if (message == "VPP_HOPE_DELIVERY_DATE") {
                elTitle.html('옵션/가격/배송희망일 확인 후<br>구매가능');
                elButtonArea.show('inline-block');
                elCartButton.show('inline-block');
                elProductButton.show('inline-block');
            } else {
                if (message == "VPP_PURCHASABLE") {
                    // 기존상품 구매 가능
                	elTitle.html('기존상품 구매 가능');
                    elDesc.html('상품수량을 변경하시려면<br>장바구니 버튼을 눌러주세요.');
                    elDesc.show();
					elButtonArea.show('inline-block');
					if (isBranch) {
						elCartButton.addClass('type_large');
						elCartButton.show('inline-block');
					} else {
						elCartButton.show('inline-block');
						elBuyButton.show('inline-block');
					}
                } else if (message == "VPP_OPTION") {
                    // 옵션/가격 확인 후 구매가능
                    elTitle.html('옵션/가격 확인 후 구매가능');
					elButtonArea.show('inline-block');
					if (isBranch) {
						elProductButton.addClass('type_large');
						elProductButton.show('inline-block');
					} else {
						elCartButton.show('inline-block');
						elBuyButton.show('inline-block');
					}
                }

            }
        } else if (type == "unavailable") {
            // 구매불가
            if (message == "VPU_C1") {
				elTitle.html('구매 불가');
                elDesc.html('해당 가맹점 상품은<br>구매하실 수 없습니다.');
                elDesc.show();
            } else if (message == "VPU_UNAVAILABLE") {
				elTitle.html('구매 불가');
                elDesc.html('현재 해당 상품은 재구매가 불가능합니다');
                elDesc.show();
            } else if (message == "PROD_BRANCH_CHANGED") {
				elTitle.html('배송지점 확인 후 구매가능');
				elDesc.html('주문 시 배송받은 지점과<br>현재 설정된 지점이 달라<br>상품상세에서 재확인해주세요.');
				elButtonArea.show('inline-block');
				elProductButton.addClass('type_large');
				elProductButton.show('inline-block');
				elDesc.show();
			} else if (message == "PROD_NOT_ON_SALE") {
				elTitle.html('구매불가');
				elDesc.html('현재 해당 상품은 재구매가 불가능합니다.');
				elDesc.show();
			} else if (message == "PARTIAL_OUT_OF_STOCK") {
				elTitle.html('구매불가');
				elDesc.html('옵션 상품이 판매중지/품절되어<br>재구매가 불가능합니다.');
				elButtonArea.show('inline-block');
				elProductButton.addClass('type_large');
				elProductButton.show('inline-block');
				elDesc.show();
			} else if (message == "MAINTENANCE") {
				elTitle.html('구매불가');
				elDesc.html('네이버페이 시스템 점검으로 서비스 이용이 불가합니다. 점검 시간 이후 다시 이용해 주세요.');
				elDesc.show();
			}
        } else {
            // c1
            elTitle.html('기존상품 구매 가능');
            elDesc.html('네이버 페이 가맹점 상품은<br>상품페이지로 바로 이동합니다.');
            elDesc.show();
            elButtonArea.show('inline-block');
            elProductC1Button.addClass('type_large');
            elProductC1Button.show('inline-block');
        }
      	elLayer.show();

        nmp.showLayer(elLayer.$value(), htEvent.element, {
            "bShowOnly" : true,
            "fHideCallback" : jindo.$Fn(function(productOrderId) {
                this.rebuyLayerHide(null, productOrderId);
            }, this).bind(productOrderId)
        });
    },
    purchaseFromLayer : function(htEvent, productOrderId, selectLayer) {
        var absoluteUrl = "";
        //absoluteUrl = "https://dev-order.pay.naver.com";
        var url = "";
        // 재구매 컨트롤러 호출
        if (selectLayer == "PURCHASE") {
            url = absoluteUrl+  "/repurchaseAjax/purchaseProductOrderNo/" + productOrderId;
        } else {
            url = absoluteUrl+  "/repurchaseAjax/addCartProductOrderNo/" + productOrderId;
        }
        nmp.requestAjax(url, {}, {
            type: "jsonp",
            method : "get",
            onload : jindo.$Fn(function(absoluteUrl, htResult) {
                if (htResult && htResult.bSuccess && htResult.htReturnValue) {
                    if (selectLayer == "PURCHASE") {
                        // 주문하기 팝업 호출
                        this.purchaseMethodSelection(htResult, absoluteUrl);
                    } else {
                        // 장바구니 팝업 호출
                        this.addCartMethodSelection(htResult, absoluteUrl);
                    }
                }
            }, this).bind(absoluteUrl)
        });
    },
    purchaseMethodSelection : function(info, absoluteUrl) {
        var htUrls = this._getOption("urls");
        var url = htUrls["user.front.host"];

        var orderPopupUrl ="";
        if (absoluteUrl == null || absoluteUrl == undefined || absoluteUrl == "") {
            orderPopupUrl = "http://" + window.location.host;
        } else {
            orderPopupUrl = absoluteUrl;
        }
        var infoData = info.htReturnValue;
        if (infoData.orderSnapshotKey == null || infoData.orderSnapshotKey == undefined) {
            if (infoData.type == "popup") {
                var popupUrl = orderPopupUrl + "/products/"+ infoData.merchantNo+"/"+ infoData.productNo+"/purchase?tr=rete";
                nmp.openPopup(popupUrl, ["width=500","height=400"], "");
                return;
            } else {
                return;
            }
        }
        var orderSheetUrl = "";
        if (absoluteUrl == null || absoluteUrl == undefined) {
            orderSheetUrl = "https://" + window.location.host;
        } else {
            orderSheetUrl = absoluteUrl;
        }

        this._generateAlert(infoData.alertInfoMap);

        orderSheetUrl += "/orderSheet/" +  infoData.orderSnapshotKey + "/integrationCart?backUrl=" + encodeURIComponent(location.href);;
        location.href = orderSheetUrl;
    },
    addCartMethodSelection: function(info, absoluteUrl) {
        if (absoluteUrl == null || absoluteUrl == undefined|| absoluteUrl == "") {
            absoluteUrl = "http://" + window.location.host;;
        }
        var infoData = info.htReturnValue;
        var orderSheetUrl = absoluteUrl;
        if (infoData.type == "popup") {
            var popupUrl = orderSheetUrl + "/products/"+ infoData.merchantNo+"/"+ infoData.productNo+"/addCart?tr=rete";
            nmp.openPopup(popupUrl, ["width=500","height=400"], "");
            return;
        }
        if (infoData.numberOfOriginalOrderedProduct != infoData.numberOfRepurchasableProduct) {
            alert("기존상품 구매조건과 다른 상품정보가 있어 " +infoData.numberOfOriginalOrderedProduct +"건 중에 " +  infoData.numberOfRepurchasableProduct+ "건이 장바구니에 담깁니다.");
        }

        var htUrls = this._getOption("urls");
		if (infoData.branchCartType != undefined) {
			location.href = htUrls["shopping.cart.url"] + "/mart?cartType=" + infoData.branchCartType;
			return;
		}
        location.href = htUrls["shopping.cart.url"];
    },
    _generateAlert : function(alertInfoMap) {
        if (alertInfoMap == null || alertInfoMap.length < 1) {
            return;
        }

        var alertReasonType = alertInfoMap.alertReasonType ? alertInfoMap.alertReasonType : "NONE";
        if (alertReasonType === "NONE") {
            return;
        }

        var alertMessage = alertInfoMap.alertMessage ? alertInfoMap.alertMessage : null;
        if (alertMessage != null) {
            alert(alertMessage);
        }
    },
    "":""
});
