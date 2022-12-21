nmp.createModule("nmp.front.order.order_branch", {
    _htInstance : {},
    _htElementSelector : {
        "root" : "body"
    },
    initialize : function(){
        nmp.front.order.ui.initializeEventDeligator(this._getElement("root", true), this);
    },
    alertMessage: function (htEvent, actionType, merchantName, merchantTelNo) {
        var message = "";
        if (actionType == "CANCEL_REQUEST") {
            message += "장보기 주문은 '상품준비중'에 취소요청이 불가 합니다.\n" + merchantName + " 고객센터로 문의해주세요.\n";
            message += "( " + merchantTelNo + " )";
        } else if (actionType == 'RETURN_REQUEST') {
            message += "장보기 주문은 '배송준비중/배송중'에 반품요청이 불가 합니다.\n" + merchantName + " 고객센터로 문의해주세요.\n";
            message += "( " + merchantTelNo + " )";
        } else if (actionType == 'EXCHANGE_REQUEST') {
            message += "장보기 주문의 교환요청은\n" + merchantName + " 고객센터로 문의해주세요.\n";
            message += "( " + merchantTelNo + " )";
        } else if (actionType == 'RETURN_REJECT') {
            message += "장보기 주문의 반품철회는\n" + merchantName + " 고객센터로 문의해주세요.\n";
            message += "( " + merchantTelNo + " )";
        } else if (actionType == 'EXCHANGE_REJECT') {
            message += "장보기 주문의 교환철회는\n" + merchantName + " 고객센터로 문의해주세요.\n";
            message += "( " + merchantTelNo + " )";
        } else if (actionType == 'MODIFY_DELIVERY_PLACE') {
            message += "장보기 주문은 배송지변경이 불가 합니다.\n배송지변경이 필요하시다면 취소 후 재주문해주세요.";
        }
        alert(message);
    }
});
