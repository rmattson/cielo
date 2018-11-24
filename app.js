const degree = '°'

// HTML selectors
const container = document.querySelector('.container')
const weatherMain = document.querySelector('.weather.main')
const weather1 = document.querySelector('.weather.first')
const weather2 = document.querySelector('.weather.second')
const weather3 = document.querySelector('.weather.third')
const overlay = document.querySelector('.overlay')

const todayHeading = weatherMain.querySelector('.heading')
const day1Heading = weather1.querySelector('.heading')
const day2Heading = weather2.querySelector('.heading')
const day3Heading = weather3.querySelector('.heading')

// Event listeners
overlay.addEventListener('click', toggleOverlay)
weatherMain.addEventListener('click', toggleOverlay)

function toggleOverlay(e) {
  if (overlay.classList.contains('hidden')) {
    overlay.classList.remove('hidden')
    container.classList.add('blur')
  } else {
    overlay.classList.add('hidden')
    container.classList.remove('blur')
  }
}

function updateDates() {
  const today = new Date()
  const day1 = new Date()
  const day2 = new Date()
  const day3 = new Date()

  day1.setDate(today.getDate() + 1)
  day2.setDate(today.getDate() + 2)
  day3.setDate(today.getDate() + 3)

  todayHeading.textContent = `${today.getMonth()+1}/${today.getDate()}`
  day1Heading.textContent = `${day1.getMonth()+1}/${day1.getDate()}`
  day2Heading.textContent = `${day2.getMonth()+1}/${day2.getDate()}`
  day3Heading.textContent = `${day3.getMonth()+1}/${day3.getDate()}`
}

updateDates()
setTimeout(updateDates, 60000)