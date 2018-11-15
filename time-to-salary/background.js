function updateBadge() {
  const count = daysLeftToSalary()
  chrome.browserAction.setBadgeText({ text: count + 'd' })

  chrome.browserAction.setBadgeBackgroundColor({
    color: count <= 5 ? 'green' : 'blue'
  })
}

updateBadge()

setTimeout(() => {
  updateBadge()

  setInterval(updateBadge, 24*60*60*1000)
}, 3000)
