function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000)

  let interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago'
  }
  return 'Just now'
}

function getStartOfDay(input) {
  const dateToBeCompared = new Date(input.getTime())
  dateToBeCompared.setHours(0)
  dateToBeCompared.setMinutes(0)
  dateToBeCompared.setSeconds(0)
  dateToBeCompared.setMilliseconds(0)
  return dateToBeCompared
}

export function getDisplayDate(compDate) {
  const months = new Array(
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  )
  const days = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat')
  const today = getStartOfDay(new Date())
  const dateToBeCompared = getStartOfDay(compDate)

  const diff = today.getTime() - dateToBeCompared.getTime() // get the difference between today(at 00:00:00) and the date
  if (dateToBeCompared.getTime() == today.getTime()) {
    return 'Today'
  } else if (diff <= 24 * 60 * 60 * 1000) {
    return 'Yesterday'
  } else {
    return (
      days[dateToBeCompared.getDay()] +
      ' ' +
      dateToBeCompared.getDate() +
      ' ' +
      months[dateToBeCompared.getMonth()] +
      ' ' +
      dateToBeCompared.getFullYear()
    )
  }
}

function formattedTime(time) {
  return time.toLocaleTimeString([], {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formattedDateTime(compDate) {
  return formattedTime(compDate) + '    |    ' + getDisplayDate(compDate)
}
