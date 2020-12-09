import { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import './trafficLight.css'

const TrafficLight = props => {
  let { color } = props.match.params

  const show = (color === 'red') || (color === 'yellow') || (color === 'green')

  const [count, setCount] = useState(0)
  const [toggleColor, setToggleColor] = useState(null)
  
  const prevColor = useRef(null)

  const changeDirect = () => {
    let nextColor;
    let ms;

    if ((color === 'yellow') && (prevColor.current === 'red')) {
      nextColor = 'green'
      ms = 3
    } else if (color === 'yellow') {
      nextColor = 'red'
      ms = 3
    } else  if (color === 'green') {
      nextColor = 'yellow'
      ms = 15
    } else {
      nextColor = 'yellow'
      ms = 10
    }

    const restMs = +localStorage.getItem('count')

    if(color === localStorage.getItem('color')) {
      ms = restMs > 0 ? restMs : ms
      if (color === 'yellow' &&  localStorage.getItem('nextColor') !== 'yellow') {
        nextColor = localStorage.getItem('nextColor')
      }
    }

    localStorage.setItem('nextColor', nextColor)
    
    if (show) {
      localStorage.setItem('count', ms)
    }

    setCount(ms)
    setToggleColor(color)
    
    const interval = setInterval(() => {
      setToggleColor(color)
      
      setCount(prev => {
        if (prev - 1 < 4 && prev - 1 > 0) {
          setTimeout(() => setToggleColor(null), 500)
        }
        localStorage.setItem('count', prev - 1)
        localStorage.setItem('color', color)
        return prev - 1
      })
    }, 1000);

    const timer = setTimeout(() => {
      clearInterval(interval)
      props.history.push(nextColor)
      prevColor.current = color
      localStorage.setItem('color', nextColor)
    }, ms * 1000)

    if (!show) {
      clearInterval(interval);
      clearTimeout(timer)
    }
  }
  
  useEffect(changeDirect, [color, props.history, show])

  const getItem = (current, item) => color === current ? item : null

  if (!show) return null

  return (
    <div>
      <div 
        className='red light' 
        style={{backgroundColor: getItem('red', toggleColor)}}
      >
        {getItem('red', count)}
      </div>
      <div 
        className='yellow light' 
        style={{backgroundColor: getItem('yellow', toggleColor)}}
      >
        {getItem('yellow', count)}
      </div>
      <div 
        className='green light' 
        style={{backgroundColor: getItem('green', toggleColor)}}
      >
        {getItem('green', count)}
      </div>
    </div>
  )
}

export default withRouter(TrafficLight) 