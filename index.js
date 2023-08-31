dayjs.extend(window.dayjs_plugin_utc)
dayjs.extend(window.dayjs_plugin_timezone)
MicroModal.init()

let currentTimezone = dayjs.tz.guess()
function makeDark() {
  let body = document.getElementsByTagName('body')[0]
  body.style.backgroundColor = "black"
  let main = document.getElementsByTagName('main')[0]
  main.style.borderColor = "#EBEBEB"
  main.style.color = "#EBEBEB"
  const root_theme = document. querySelector(':root')
  root_theme.style.setProperty('--clock-primary-color', '#EBEBEB');
  let timezone_modal = document.getElementsByClassName('is-open')[0]
  if (timezone_modal) {
    timezone_modal.style.backgroundColor ='black'
    timezone_modal.style.borderColor ='white'
    timezone_modal.style.color ='white'
    let buttons = timezone_modal.querySelectorAll( '.button' )
    buttons.forEach(button => {
      button.style.color = "white"
    })
  }

}

function makeLight() {
  let body = document.getElementsByTagName('body')[0]
  body.style.backgroundColor = "white"
  let main = document.getElementsByTagName('main')[0]
  main.style.borderColor = "black"
  main.style.color = "black"
  const root_theme = document. querySelector(':root')
  root_theme.style.setProperty('--clock-primary-color', 'black');
  let timezone_modal = document.getElementsByClassName('is-open')[0]
  if (timezone_modal) {
    timezone_modal.style.backgroundColor ='white'
    timezone_modal.style.borderColor ='black'
    timezone_modal.style.color ='black'
    let buttons = timezone_modal.querySelectorAll( '.button' )
    buttons.forEach(button => {
      button.style.color = "black"
    })
  }
}

let hours = dayjs().hour()
if (hours >= 19 || hours <= 6) makeDark()

document.querySelectorAll('.outer-clock' ).forEach( ( clock )=>{
  let numbers = clock.querySelectorAll( '.number' )
  let angle = 360-120, dangle = 360 / numbers.length
  for( let i = 0; i < numbers.length; ++i ){
    let number = numbers[i]
    angle += dangle
    number.style.transform = `rotate(${angle}deg) translate(${78}px) rotate(-${angle}deg)`
  }
})

let select = document.getElementsByTagName("select")[0]
let option = document.createElement("option")
option.setAttribute("value", currentTimezone)
option.innerHTML = currentTimezone
select.append(option)
Intl.supportedValuesOf('timeZone').forEach(timezone => {
  if (timezone !== currentTimezone) {
    let option = document.createElement("option")
    option.setAttribute("value", timezone)
    option.innerHTML = timezone
    select.append(option)
  }
})

function selectTimezone() {
  let select = document.getElementsByTagName("select")[0]
  currentTimezone = select.value;
}
let second_hand = document.getElementById("second-hand")
let minute_hand = document.getElementById("minute-hand")
let hour_hand = document.getElementById("hour-hand")

let seconds, minutes

function clock() {

  let tempDayJS = dayjs()
  let dayJs = tempDayJS.tz(currentTimezone)

  let time = dayJs.format("HH:mm:ss")

  let date = dayJs.format("dddd, D MMMM YYYY")
  document.getElementById("timezone").innerHTML = currentTimezone
  document.getElementById("time").innerHTML = time
  document.getElementById("date").innerHTML = date
 
  seconds = dayJs.second()
  minutes = dayJs.minute()
  hours  = dayJs.hour()

  if (hours >= 19 || hours <= 6) {makeDark()} else {makeLight()}
  second_hand.style.transform = `rotate(${(seconds/60)*360+180}deg)`
  minute_hand.style.transform = `rotate(${(minutes/60)*360+180}deg)`
  hour_hand.style.transform = `rotate(${((hours%12)*60+minutes)/720*360+180}deg)`
}


setInterval(clock,1)