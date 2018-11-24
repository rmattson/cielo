const degree = '°'

const icons = {
  nightFog: "2682801 - cloudy fog foggy mist moon night weather.svg",
  dayFog: "2682802 - cloudy day fog foggy mist sun weather.svg",
  warning: "2682803 - attention erro exclamation mark warn warning weather.svg",
  pollen: "2682804 - blossom dust flower particles pollen pollution weather.svg",
  co2: "2682805 - acid carbon co2 dioxide mist pollution weather.svg",
  uv: "2682806 - light radiation rays sun ultraviolet uv weather.svg",
  waterDrop: "2682807 - drop high humidity percentage precipitation rain weather.svg",
  highTemp: "2682808 - high hot summer temperature termometer weather.svg",
  lowTemp: "2682809 - cold freezing low temperature termometer weather winter.svg",
  windy: "2682810 - catcher direction flag weather wind windy.svg",
  nightCloudyFog: "2682811 - cloud cloudy fog mist moon night weather.svg",
  dayCloudyFog: "2682812 - cloud coudy day fog mist sun weather.svg",
  cloudyFog: "2682813 - cloud clouds cloudy fog forecast mist weather.svg",
  nightSnow: "2682814 - cloud moon night precipitation snow snowing weather.svg",
  daySnow: "2682815 - cloud day forecast precipitation snow sun weather.svg",
  snow: "2682816 - cloud cloudy forecast precipitation snow snowing weather.svg",
  nightHail: "2682817 - hail moon night precipitation snow storm weather.svg",
  dayHail: "2682818 - day hail precipitation snow storm sun weather.svg",
  cloudyHail: "2682819 - cloud cloudy hail hail stones snow storm weather.svg",
  hail: "2682820 - forecast hail rain snow stones storm weather.svg",
  fog: "2682821 - fog foggy forecast mist weather.svg",
  rainbow: "2682822 - forecast rainbow spectr weather.svg",
  snowflake: "2682823 - forecast snow snowflake weather.svg",
  sunrise: "2682824 - horizont morning sun sunrise weather.svg",
  sunset: "2682825 - evening horizon sun sundown sunset weather.svg",
  nightLightning: "2682826 - bolt light moon night rain thunderstorm weather.svg",
  dayLightning: "2682827 - cloud day light bolt rain sun thunderstorm weather.svg",
  lightning: "2682828 - cloud light bolt lightning rain storm thunder weather.svg",
  degreesF: "2682829 - degrees farenheit forecast temprerature weather.svg",
  degreesC: "2682830 - celsius degrees forecast temperature weather.svg",
  nightWind: "2682831 - cloud forecast moon night weather wind windy.svg",
  dayWind: "2682832 - cloud day forecast sun weather wind windy.svg",
  nightHeavyRain: "2682833 - cloud forecast moon night precipitation rain weather.svg",
  dayHeavyRain: "2682834 - cloud day forecast rain rainy sun weather.svg",
  heavyRain: "2682835 - cloud cloudy forecast precipitation rain rainy weather.svg",
  nightLightRain: "2682836 - cloud drop forecast moon night rain weather.svg",
  dayLightRain: "2682837 - cloud day drop forecast rain sun weather.svg",
  lightRain: "2682838 - cloud cloudy drop forecast rain rainy weather.svg",
  rainDrop: "2682839 - drop forecast humidity precipitation rain weather.svg",
  lightningBolt: "2682840 - bolt elictricity light lightning storm thunder weather.svg",
  cloudyWindy: "2682841 - cloud cloudy forecast storm weather wind windy.svg",
  breezyWindy: "2682842 - breeze fast speed weather wind windy.svg",
  nightRain: "2682843 - cloud forecast moon night rain snow weather.svg",
  dayRain: "2682844 - cloud day precipitation rain snow sun weather.svg",
  rain: "2682845 - cloud cloudy forecast rain sun weather.svg",
  nightCloudy: "2682846 - cloud cloudy forecast moon night weather.svg",
  nightClear: "2682847 - eclipse forecast moon night space weather.svg",
  dayClear: "2682848 - day forecast sun sunny weather.svg",
  dayCloudy: "2682849 - cloud cloudy day forecast sun weather.svg",
  cloudy: "2682850 - cloud clouds cloudy forecast weather.svg",
}
  

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



