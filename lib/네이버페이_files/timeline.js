nmp.createModule("nmp.front.order.timeline",{
	initialize : function(){
	},
    loadNativeHTML:function (sURL, elContainer, fCallback) {
        nmp.requestAjax(sURL, {}, {
            onload:function (htResult) {
                if (htResult.bSuccess) {
                    var sOriginalText = htResult.htReturnValue.text || "";
                    var sText = nmp.utility.stripScript(sOriginalText);
                    var welContainer = jindo.$Element(elContainer);

                    welContainer.appendHTML(sText);

                    if (fCallback) {
                        fCallback(welContainer);
                    }
                }
            },
            bNotUseErrorAlert:false,
            sResultType:"text",
            method:"get"
        });
    },
	"":""
}, true);