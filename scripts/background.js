chrome.runtime.onMessage.addListener((request, sender, sendRespone) => {
  alert(request);
  // console.log(request);
  // console.log(sender);
  // console.log(sendRespone);
  if(request.result === 'SUCCESS') {
    document.getElementById('buttonScript').innerText = request.message;
    sendRespone({
      message: 'SUCCESS'
    })
  }
})