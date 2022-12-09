/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable class-methods-use-this */
import React, { Component, ReactInstance } from 'react'
import { styled } from './theme'
const calculateStateFromProps = (
  props: DateCountdownProps = defaultDateCountdownProps
): DateCountdownStates => {
  let { dateTo, dateFrom, numberOfFigures, mostSignificantFigure } = props
  const currentDate: Date = dateFrom ? new Date(dateFrom) : new Date()
  const targetDate: Date = new Date(dateTo)

  const diff = targetDate.getTime() - currentDate.getTime()
  let significance = ['year', 'month', 'day', 'hour', 'min', 'sec']

  let year = Math.floor(diff / 31104000000) // time diff in years
  let month = Math.floor((diff / 2592000000) % 12) // time diff in months (modulated to 12)
  let day = Math.floor((diff / 86400000) % 30) // time diff in days (modulated to 30)
  let hour = Math.floor((diff / 3600000) % 24) // time diff's hours (modulated to 24)
  let min = Math.floor((diff / 60000) % 60) // time diff's minutes (modulated to 60)
  let sec = Math.floor((diff / 1000) % 60) // time diff's seconds (modulated to 60)

  if (mostSignificantFigure === 'none') {
    if (year === 0) {
      significance = significance.slice(1)
      if (month === 0) {
        significance = significance.slice(1)
        if (day === 0) {
          significance = significance.slice(1)
          if (hour === 0) {
            significance = significance.slice(1)
            if (min === 0) {
              significance = significance.slice(1)
            }
          }
        }
      }
    }
  } else {
    significance = significance.slice(
      significance.indexOf(mostSignificantFigure)
    )
  }
  significance = significance.slice(0, numberOfFigures)

  if (significance.indexOf('year') === -1) {
    month += year * 12
    year = 0
  }
  if (significance.indexOf('month') === -1) {
    day += month * 30
    month = 0
  }
  if (significance.indexOf('day') === -1) {
    hour += day * 24
    day = 0
  }
  if (significance.indexOf('hour') === -1) {
    min += hour * 60
    hour = 0
  }
  if (significance.indexOf('min') === -1) {
    sec += min * 60
    min = 0
  }
  return {
    speed: 250,
    diff,
    significance,
    year,
    month,
    day,
    hour,
    min,
    sec,
  }
}

const figuresMax = {
  year: Number.MAX_SAFE_INTEGER,
  month: 12,
  day: 30,
  hour: 24,
  min: 60,
  sec: 60,
}

const defaultDateCountdownProps = {
  locales: ['year', 'month', 'day', 'hour', 'minute', 'second'],
  locales_plural: ['years', 'months', 'days', 'hours', 'minutes', 'seconds'],
  dateTo: new Date().toString(),
  dateFrom: '',
  interval: 0,
  loop: false,
  callback: () => null,
  mostSignificantFigure: 'none',
  numberOfFigures: 6,
  noAnimate: false,
}

class DateCountdown extends Component<DateCountdownProps, DateCountdownStates> {
  public static defaultProps = defaultDateCountdownProps
  constructor(props) {
    super(props)

    const state = calculateStateFromProps(props)
    this.state = state
    if (state.diff <= 0) {
      props.callback()
    }
    this.animateAndChangeIfNeeded = this.animateAndChangeIfNeeded.bind(this)
    this.tick = this.tick.bind(this)
    this.dissect = this.dissect.bind(this)
  }

  componentDidMount() {
    const state = calculateStateFromProps(this.props)
    const { diff } = state
    this.setState(state, () => {
      if (diff > 0) {
        let tickId = setInterval(this.tick, 1000)
        this.setState({ tickId })
      }
    })
  }

  componentWillUnmount() {
    const { tickId } = this.state
    clearInterval(tickId)
  }

  animateAndChangeIfNeeded(unit, prevUnit) {
    const { state, refs, props } = this
    const { noAnimate } = props
    let { speed, significance } = state

    if (significance.indexOf(unit) !== -1) {
      let unitSpan = refs[unit]
      // @ts-ignore: Unreachable code error
      let digits = unitSpan.children
      for (let i = 0; i < digits.length; i += 1) {
        if (i === digits.length - 1) {
          setTimeout(() => {
            if (!noAnimate) digits[i]?.classList.toggle('odometerEnd')
            setTimeout(() => {
              if (!noAnimate) digits[i]?.classList.toggle('odometerEnd')
              if (!noAnimate) digits[i]?.classList.toggle('odometerStart')
              if (prevUnit !== 'none') {
                let newState = {}
                newState[prevUnit] = figuresMax[prevUnit] - 1
                newState[unit] = state[unit] - 1
                this.setState(newState)
              }
              if (!noAnimate)
                setTimeout(
                  () => digits[i]?.classList.toggle('odometerStart'),
                  speed
                )
            }, speed)
          }, 1000 - speed)
        } else {
          let allZeros = true
          for (let j = i + 1; j < digits.length; j += 1) {
            if (digits[j].innerHTML !== '0') {
              allZeros = false
              break
            }
          }
          if (allZeros) {
            setTimeout(() => {
              if (!noAnimate) digits[i]?.classList.toggle('odometerEnd')
              setTimeout(() => {
                if (!noAnimate) digits[i]?.classList.toggle('odometerEnd')
                if (!noAnimate) digits[i]?.classList.toggle('odometerStart')
                if (prevUnit !== 'none') {
                  let newState = {}
                  newState[prevUnit] = figuresMax[prevUnit] - 1
                  newState[unit] = state[unit] - 1
                  this.setState(newState)
                }
                if (!noAnimate)
                  setTimeout(
                    () => digits[i]?.classList.toggle('odometerStart'),
                    speed
                  )
              }, speed)
            }, 1000 - speed)
          }
        }
      }
    }
  }

  tick() {
    const { sec, min, hour, day, month, year, tickId } = this.state
    const { callback, loop, interval } = this.props
    const newSec = (sec + 59) % 60
    this.setState({ sec: newSec })
    this.animateAndChangeIfNeeded('sec', 'none')

    if (newSec === 0) {
      this.animateAndChangeIfNeeded('min', 'sec')

      if (min === 0) {
        this.animateAndChangeIfNeeded('hour', 'min')

        if (hour === 0) {
          this.animateAndChangeIfNeeded('day', 'hour')

          if (day === 0) {
            this.animateAndChangeIfNeeded('month', 'day')

            if (month === 0) {
              this.animateAndChangeIfNeeded('year', 'month')
            }
          }
        }
      }
    }

    if (
      sec === 0 &&
      min === 0 &&
      hour === 0 &&
      day === 0 &&
      month === 0 &&
      year === 0
    ) {
      clearInterval(tickId)
      if (loop && interval) {
        setTimeout(() => {
          const state = calculateStateFromProps({
            ...this.props,
            dateTo: new Date().getTime() + interval * 1000,
          })
          this.setState(state, () => {
            let tickId = setInterval(this.tick, 1000)
            this.setState({ tickId })
          })
        }, 0)
      } else {
        this.setState({ diff: -1 })
        callback()
      }
    }
  }

  dissect(value) {
    let valStr = Number(value).toString()
    if (valStr.length === 1) {
      valStr = `0${valStr}`
    }
    return valStr.split('').map((digit, key) => (
      <span key={`value-${key}`} className={key.toString()}>
        {digit}
      </span>
    ))
  }

  render() {
    const { state } = this
    let { significance, diff } = state
    // eslint-disable-next-line camelcase
    let { locales, locales_plural } = this.props
    let units = ['year', 'month', 'day', 'hour', 'min', 'sec']

    if (diff < 0) {
      // past date
      return (
        <span className="odometer-block">
          {units.map((unit, key) => {
            if (significance.indexOf(unit) !== -1) {
              return (
                <span style={{ display: 'flex' }} key={`unit-${key}`}>
                  <span className="dcd-info">
                    <span ref={unit} className={`${unit} dcd-val`}>
                      00
                    </span>
                    <span className="dcd-comment">{locales[key]}</span>
                  </span>
                  <span>{unit != 'sec' && ':'}</span>
                </span>
              )
            }
            return null
          })}
        </span>
      )
    }

    return (
      <span className="odometer-block">
        {units.map((unit, key) => {
          if (significance.indexOf(unit) !== -1) {
            return (
              <span style={{ display: 'flex' }} key={`unit-${key}`}>
                <span className="dcd-info">
                  <span ref={unit} className={`${unit} dcd-val`}>
                    {this.dissect(state[unit])}
                  </span>
                  <span className="dcd-comment">
                    {state[unit] <= 1 && locales[key]}
                    {state[unit] > 1 && locales_plural[key]}
                  </span>
                </span>
                <span>
                  {significance.indexOf(unit) !== significance.length - 1 &&
                    ':'}
                </span>
              </span>
            )
          }
          return null
        })}
      </span>
    )
  }
}

type DateCountdownProps = {
  locales?: Array<string>
  locales_plural?: Array<string>
  dateTo?: string | number
  dateFrom?: string
  callback?: () => void
  mostSignificantFigure?: string
  numberOfFigures?: number
  noAnimate?: boolean
  loop?: boolean
  interval?: number
}

type DateCountdownStates = {
  speed: number
  diff: number
  significance: string[]
  year: number
  month: number
  day: number
  hour: number
  min: number
  sec: number
  tickId?: NodeJS.Timer | null
}

DateCountdown.defaultProps = defaultDateCountdownProps
export default DateCountdown