function daysLeftToSalary () {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()
  const currentDay = currentDate.getDate()
  const lastDateInMonth = new Date(currentYear, currentMonth, 0)
  const daysInCurrentMonth = lastDateInMonth.getDate()
  const lastDayInCurrentMonth = lastDateInMonth.getDay()
  let daysTillSalary = daysInCurrentMonth - currentDay

  if (lastDayInCurrentMonth === 6) {
    daysTillSalary -= 1
  }

  if (lastDayInCurrentMonth === 0) {
    daysTillSalary -= 2
  }

  return daysTillSalary
}

function timeTillMidnight() {
  return new Date().setHours(24, 0, 0, 0) - Date.now()
}
