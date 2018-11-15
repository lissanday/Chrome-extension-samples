chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="#FFFACD"'
    // file: 'content-script.js'
  })
})
