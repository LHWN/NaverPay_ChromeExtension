nmp.createModule("nmp.front.order.timeline.home.list.date",{
	_htInstance : {
		"rangeQuickSelectorValue" : []
	},
	_htElementSelector : {
		"root" : "._listRoot",
		"rangeQuickSelectorA":"#_rangeQuickSelectorA",
		"rangeQuickSelectorLiList":"._rangeQuickSelectorLi",
		"rangeQuickSelectorLi":"#_rangeQuickSelectorLi",
		"rangeFromDateA":"#_rangeFromDateA",
		"rangeToDateA":"#_rangeToDateA",
		"rangeFromDateInput":"#_rangeFromDateInput",
		"rangeToDateInput":"#_rangeToDateInput",
		"rangeFromDateSpan":"#_rangeFromDateSpan",
		"rangeToDateSpan":"#_rangeToDateSpan",
		"calendar1":"#chku_calendar1"
	},
	initialize : function(htOption){
		// Event Delegator
		nmp.front.order.ui.initializeEventDeligator(this._getElement("root", true), this);
		this.initializeRangeQuickSelector(htOption);
		this.initializeDatePicker(htOption);
	},
	initializeDatePicker : function(htOption) {
		var hFrom = this._convertStringDateToHashDate(htOption.fromDate);
		var hTo = this._convertStringDateToHashDate(htOption.toDate);
		var hToday = jindo.Calendar.getToday();
		hToday["nDate"] = jindo.Calendar.getLastDate(hToday["nYear"], hToday["nMonth"]);
		var hLimit = jindo.Calendar.getToday();
		hLimit["nYear"] = (hToday["nYear"] - 2);
		
		//선택불가능 날짜에 대한 처리가 딤드처리에서 alert처리로 바뀌면 아래 비활성화
		this._htInstance["hLimit"] = hLimit;
		this._htInstance["hToday"] = hToday;
		
		var hOption = {
			bUseLayerPosition : false, //LayerPosition을 사용해서 포지셔닝을 할지의 여부
		    Calendar : {
		    	// 마크업에서 준 소스---
		    	htCustomEventHandler : {
					afterDraw : function(oCustomEvent) {
						var elTitleOfYear = jindo.$$.getSingle(".calendar-title-year", this.getBaseElement());
						var elTitleOfMonth = jindo.$$.getSingle(".calendar-title-month", this.getBaseElement());
						var oTemplate = jindo.$Template('<span class="y{=year1}"><span class="hidden">{=year1}</span></span><span class="y{=year2}"><span class="hidden">{=year2}</span></span><span class="y{=year3}"><span class="hidden">{=year3}</span></span><span class="y{=year4}"><span class="hidden">{=year4}</span></span>');
						var sYear = oCustomEvent.nYear.toString();
						var sMonth = oCustomEvent.nMonth.toString();
						if (sMonth < 10) {
							sMonth = "0" + sMonth;
						}
						elTitleOfYear.innerHTML = oTemplate.process({
							"year1" : sYear.charAt(0), 
							"year2" : sYear.charAt(1),
							"year3" : sYear.charAt(2),
							"year4" : sYear.charAt(3)
						}); 
						elTitleOfMonth.className = "calendar-title-month m" + sMonth;
						elTitleOfMonth.innerHTML = "";
					}
				}
				//--- 마크업에서 준 소스
		    }
		};
		var oDatePicker1 = new jindo.DatePicker("chku_calendar1", hOption);
		oDatePicker1.addDatePickerSet({
		    elInput : this._getElement("rangeFromDateInput", true), //날짜가 입력될 input 엘리먼트
		    elButton : this._getElement("rangeFromDateA", true), //input외에도 달력을 보이게 할 엘리먼트
		    htOption : {
		        nYear : hFrom.nYear,
		        nMonth : hFrom.nMonth,
		        nDate : hFrom.nDate,
		        bDefaultSet : true, //true이면 기본 Input 값을 설정한다. false이면 설정하지 않는다.
		        bReadOnly : true, //true이면 input에 직접 값을 입력하지 못한다.
		        sDateFormat : "yyyy.mm.dd" //input에 입력될 날짜의 형식
		        
		        //선택불가능 날짜에 대한 처리가 딤드처리에서 alert처리로 바뀌면 아래활성화
		        //htSelectableDateFrom : hLimit,
		        //htSelectableDateTo : hToday
		    }
		});
		
		oDatePicker1.addDatePickerSet({
		    elInput : this._getElement("rangeToDateInput", true), //날짜가 입력될 input 엘리먼트
		    elButton : this._getElement("rangeToDateA", true), //input외에도 달력을 보이게 할 엘리먼트
		    htOption : {
		    	nYear : hTo.nYear,
		        nMonth : hTo.nMonth,
		        nDate : hTo.nDate,
		        bDefaultSet : true, //true이면 기본 Input 값을 설정한다. false이면 설정하지 않는다.
		        bReadOnly : true, //true이면 input에 직접 값을 입력하지 못한다.
		        sDateFormat : "yyyy.mm.dd" //input에 입력될 날짜의 형식
		        
		        //선택불가능 날짜에 대한 처리가 딤드처리에서 alert처리로 바뀌면 아래활성화
		        //htSelectableDateFrom : hLimit,
		        //htSelectableDateTo : hToday
		    }
		});
		
		oDatePicker1.attach("select", jindo.$Fn(function(we){
			this._setRangeSpanByInput();
			this._refreshHighlightQuickRangeSelector();
		}, this).bind()).attach("beforeSelect", jindo.$Fn(function(we){
			//날짜선택시에는 we에 hDate구조도 포함됨
			if (!this._isSelectable(we)) {
				alert("최근 2년 내 내역까지만 조회 가능합니다.");
				we.stop();
			}
		}, this).bind());
		this._htInstance["oDatePicker1"] = oDatePicker1;
		this._setRangeSpanByInput();
		this._refreshHighlightQuickRangeSelector();
	},
	initializeRangeQuickSelector : function(htOption) {
		this._initializeRangeQuickSelectorValue();
	},
	_initializeRangeQuickSelectorValue : function() {
		var nToday = jindo.Calendar.getToday();
		var nYear = nToday["nYear"];
		var nMonth = nToday["nMonth"];
		var nCalYear, nCalMonth;
		
		for (var i = 0; i < 6; i++) {
			nCalMonth = nMonth - i;
			nCalYear = nYear;
			if (nCalMonth < 1) {
				nCalMonth = nCalMonth + 12;
				nCalYear = nCalYear - 1;
			}
			this._setRangeQuickSelectorValue((5 - i), nCalYear, nCalMonth);
		}
	},
	// jindo.DatePicker에 있는 것 퍼옴
	//선택불가능 날짜에 대한 처리가 딤드처리에서 alert처리로 바뀌면 아래 비활성화
    _isSelectable : function(htDate) {
        return jindo.Calendar.isBetween(htDate, this._htInstance["hLimit"], this._htInstance["hToday"]);
    },
	_setRangeQuickSelectorValue : function(nIndex, nYear, nMonth) {
		if (!this._htInstance["rangeQuickSelectorValue"]) {
			this._htInstance["rangeQuickSelectorValue"] = [];
		}
		var from = {};
		from["nYear"] = nYear;
		from["nMonth"] = nMonth;
		from["nDate"] = 1;
		var to = {};
		to["nYear"] = nYear;
		to["nMonth"] = nMonth;
		to["nDate"] = jindo.Calendar.getLastDate(nYear, nMonth);
		this._htInstance["rangeQuickSelectorValue"][nIndex] = {"from":from,"to":to};
		this._getElement("root").query(this._htElementSelector["rangeQuickSelectorA"] + nIndex).text("" + nMonth + "월");
	},
	_setRangeDatePicker : function(hFromDate, hToDate) {
		var o = this._htInstance["oDatePicker1"];
		o.setDate(o.getDatePickerSet(this._getElement("rangeFromDateInput", true)), hFromDate);
		o.setDate(o.getDatePickerSet(this._getElement("rangeToDateInput", true)), hToDate);
	},
	_setRangeSpanByInput : function() {
		try{
			var nFromDate = Number((this._getElement("rangeFromDateInput", true).value).replace(/\./gi, ""));
			var nToDate = Number((this._getElement("rangeToDateInput", true).value).replace(/\./gi, ""));
			if (nFromDate > nToDate) {
				this._getElement("rangeToDateInput", true).value = this._getElement("rangeFromDateInput", true).value;
			}
		}catch(e){}
		
		this._getElement("rangeFromDateSpan", true).innerHTML = this._getElement("rangeFromDateInput", true).value;
		this._getElement("rangeToDateSpan", true).innerHTML = this._getElement("rangeToDateInput", true).value;
	},
	_refreshHighlightQuickRangeSelector : function() {
		var o = this._htInstance["oDatePicker1"];
		var hFromDate = o.getDate(o.getDatePickerSet(this._getElement("rangeFromDateInput", true)));
		var hToDate = o.getDate(o.getDatePickerSet(this._getElement("rangeToDateInput", true)));
		
		if (hFromDate["nDate"] != 1) {
			this._highlightQuickRangeSelector();
			return;
		}
		if (hToDate["nDate"] != jindo.Calendar.getLastDate(hToDate["nYear"], hToDate["nMonth"])) {
			this._highlightQuickRangeSelector();
			return;
		}
		for (var i = 0; i<6 ; i++) {
			var h = this._htInstance["rangeQuickSelectorValue"][i];
			if (jindo.Calendar.isSameDate(h["from"], hFromDate)) {
				if (jindo.Calendar.isSameDate(h["to"], hToDate)) {
					this._highlightQuickRangeSelector(i);
					return;
				}
			}
		}
	},
	_highlightQuickRangeSelector : function(nIndex) {
		this._getElementList("rangeQuickSelectorLiList").removeClass("on");
		if (nIndex || nIndex === 0) {
			this._getElement("root").query(this._htElementSelector["rangeQuickSelectorLi"] + nIndex).addClass("on");
		}
	},
	clickRangeQuickSelector : function(htEvent, sRangeQuickSelectorId) {
		this._setRangeDatePicker(this._htInstance["rangeQuickSelectorValue"][sRangeQuickSelectorId]["from"], this._htInstance["rangeQuickSelectorValue"][sRangeQuickSelectorId]["to"]);
		this._setRangeSpanByInput();
		this._highlightQuickRangeSelector(sRangeQuickSelectorId);
	},
	/**
	 * 2014.01.01형식의 문자열을 -> date해쉬로
	 * @param sDate
	 * @returns {___anonymous7337_7338}
	 */
	_convertStringDateToHashDate : function(sDate) {
		//IE에서는 Date.parse가 엄격하여 파싱이 되지 않음 
		//var d = jindo.$Date(jindo.$Date.parse(sDate));
		var aDate = sDate.split('.');
		var h = {};
		h["nYear"] = new Number(aDate[0]).valueOf();
		h["nMonth"] = new Number(aDate[1]).valueOf();
		h["nDate"] = new Number(aDate[2]).valueOf();
		return h;
	},
	/**
	 * list.js에서 호출
	 */
	getSearchParameter : function() {
		var htParameter = {};
		htParameter = {
			"range.fromDate" : this._getElement("rangeFromDateInput", true).value,
			"range.toDate" : this._getElement("rangeToDateInput", true).value
		}
		return htParameter;
	},
	"":""
});
