let div, alarm, deltaTime, u

const $c = (tag, props) => {
  const elem = document.createElement(tag)
  if (props) Object.assign(elem, props)
  return elem
}

const twoDigits = number => number < 10 ? '0' + number : number

const get2hoursFromNow = () => new Date((new Date).getTime() + 120 * 1000 * 60)

const msToHMS = ms => {
  let seconds = Math.round(ms / 1000)
  const hours = parseInt(seconds / 3600)
  seconds = seconds % 3600
  const minutes = parseInt(seconds / 60)
  seconds = seconds % 60
  return `${ms < 0 ? '-' : ''}${Math.abs(hours)}:${twoDigits(Math.abs(minutes))}:${twoDigits(Math.abs(seconds))}`
}

const init = () => {
  if (!localStorage.getItem('alarm'))
    localStorage.setItem('alarm', get2hoursFromNow())
  alarm = new Date(localStorage.getItem('alarm'))
  deltaTime = alarm - new Date()
  div = $c('div')
  document.body.appendChild(div)
  const resetBtn = $c('button', {
    innerText: 'Reset',
    onclick: () => {
      u && clearTimeout(u)
      alarm = get2hoursFromNow()
      localStorage.setItem('alarm', alarm)
      deltaTime = alarm - new Date()
      decrement()
    }
  })
  document.body.appendChild(resetBtn)
  decrement()
}

const decrement = () => {
  deltaTime = alarm - new Date()
  div.className = deltaTime <= 0 ? 'negative' : 'positive'
  div.innerHTML = msToHMS(deltaTime)
  u = setTimeout(decrement, 1000)
}

init()
