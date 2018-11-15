import { MESSAGE_TYPES } from './popup/constants/messageTypes'

function calculateMinutesLeft (info) {
  const [hours, minutes] = info.time.split(':').map(Number)
  const departureTime = new Date().setHours(hours, minutes + 1, 0, 0)

  return Math.floor((departureTime - Date.now()) / 60000)
}

let timerHandler = null
let isReminded = false

function timeTillNextMinute() {
  return new Date().setSeconds(60, 0) - Date.now()
}

function showReminder() {
  chrome.notifications.create({
    type: 'basic',
    title: 'Bus reminder',
    message: '10 minutes till departure',
    iconUrl: 'bus.png'
  })

  isReminded = true
}

function updateBadge (info) {
  const minutesLeft = calculateMinutesLeft(info)

  let badgeText = minutesLeft.toString()
  let badgeTitle = `Bus to ${info.station} departs in ${minutesLeft} minutes`

  if (minutesLeft <= 0) {
    badgeTitle = `Bus to ${info.station} has gone`
    badgeText = 'X'
  }

  if (minutesLeft > 60) {
    badgeTitle = `Bus to ${info.station} departs in more than 1 hour`
    badgeText = '60+'
  }

  if (minutesLeft === 10 && !isReminded) {
    showReminder()
  }

  setBadge(badgeText, badgeTitle)
}

function setBadge (text, title) {
  chrome.browserAction.setBadgeText({ text })
  chrome.browserAction.setTitle({ title })
}

chrome.runtime.onMessage.addListener((message) => {
  const { type, payload } = message

  if (type === MESSAGE_TYPES.REMIND) {
    isReminded = false
    clearInterval(timerHandler)
    updateBadge(payload)

    timerHandler = setTimeout(() => {
      updateBadge(payload)
      timerHandler = setInterval(() => updateBadge(payload), 60*1000)
    }, timeTillNextMinute())
  }
})

