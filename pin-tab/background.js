window.chrome.commands.onCommand.addListener(function(command) {
    window.chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const currentTab = tabs[0]
      if (command === "pin-tab") {
        window.chrome.tabs.update(currentTab.id, {'pinned': !currentTab.pinned})
      } else if (command === "duplicate-tab") {
        window.chrome.tabs.duplicate(currentTab.id)
      }
    })
})
