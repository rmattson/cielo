import {config} from './config.js'

class Forecast {
  constructor() {
    this.date = ''
    this.min = []
    this.max = []
    this.icons = {}
  }

  addIcon(icon) {
    if (icon in this.icons) {
      this.icons[icon]++
    } else {
      this.icons[icon] = 1
    }
  }

  low() {
    return Math.min(... this.min)
  }

  high() {
    return Math.max(... this.max)
  }
}

const degree = '°'
const refreshMs = 600000

const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${config.zipcode},us&APPID=${config.api_key}&units=${config.units}`

const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=${config.zipcode}&APPID=${config.api_key}&units=${config.units}`

const noCursor = 'body:hover { cursor: none; }'

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

function updateTemps(element, minTemp, maxTemp) {
  const min = element.querySelector('.min')
  const max = element.querySelector('.max')

  min.textContent = `${minTemp}${degree}`
  max.textContent = `${maxTemp}${degree}`
} 

function updateIcon(element, icon) {
  const iconImage = `icons/${icon}.svg`
  element.querySelector('img').src = iconImage
}

function updateCurrent(data, rounding = 0) {
  const cur = weatherMain.querySelector('.current')
  const rounded = data.main.temp.toFixed(rounding)
  cur.textContent = `${rounded}${degree}`
  updateIcon(weatherMain, data.weather[0].icon)
  weatherMain.querySelector('.min').textContent = `${data.main.temp_min.toFixed(rounding)}${degree}`
  weatherMain.querySelector('.max').textContent = `${data.main.temp_max.toFixed(rounding)}${degree}`
}

async function getData(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }
  catch (err) {
    console.log('Fetch failed', err)
  }
}

function getDate(item) {
  return item.dt_txt.split(' ')[0]
}

function processForecast(data) {
  let forecastArray = []
  let usedDates = []
  while (forecastArray.length < 3) {
    let forecast = new Forecast()
    
    let listPos = 0
    let date = getDate(data.list[listPos])
    while (usedDates.includes(date)) {
      listPos++
      date = getDate(data.list[listPos])
    }
    usedDates.push(date)

    forecast.date = date
    while (date === getDate(data.list[listPos])) {
      forecast.min.push(data.list[listPos].main.temp_min)
      forecast.max.push(data.list[listPos].main.temp_max)
      data.list[listPos].weather.forEach(item => {
        forecast.addIcon(item.icon)
      })
      listPos++
    }

    forecastArray.push(forecast)
  }
  return forecastArray
}

const elementMap = {
  '0': weather1,
  '1': weather2,
  '2': weather3
}

function updateForecast(item, index) {
  updateTemps(elementMap[index], item.low().toFixed(0), item.high().toFixed(0))
  for (let icon in item.icons) {
    if (icon.includes('d')) {
      elementMap[index].querySelector('img').src = `icons/${icon}.svg`
    }
  }
}

function getCurrentWeather() {
  getData(currentWeatherUrl).then(data => {
    updateCurrent(data)
  })
}

function getForecastWeather() {
  getData(forecastUrl).then(data => {
    let forecasts = processForecast(data)
    forecasts.forEach(updateForecast)
  })
}

function hideCursor() {
  if (!config.hideCursor) return

  let newStyle = document.createElement('style')
  newStyle.appendChild(document.createTextNode(noCursor))
  document.querySelector('head').appendChild(newStyle)
}

hideCursor()

getCurrentWeather()
getForecastWeather()
updateDates()

setInterval(updateDates, refreshMs)
setInterval(getCurrentWeather, refreshMs)
setInterval(getForecastWeather, refreshMs)