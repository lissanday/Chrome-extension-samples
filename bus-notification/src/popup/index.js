import React from 'react'
import ReactDOM from 'react-dom'
import Option from 'muicss/lib/react/option'
import Select from 'muicss/lib/react/select'
import Button from 'muicss/lib/react/button'
import { DESTINATION } from './constants/destination'
import { MESSAGE_TYPES } from './constants/messageTypes'

class Popup extends React.Component {

  state = {
    station: null,
    time: null,
    isLoading: true,
  }

  onChangeStation = (ev) => {
    const station = ev.target.value
    this.setState({
      station,
      time: DESTINATION[station][0],
    })
  }

  onChangeTime = (ev) => {
    this.setState({
      time: ev.target.value,
    })
  }

  onRemindClick = () => {
    const {
      station,
      time,
    } = this.state

    chrome.runtime.sendMessage({
      type: MESSAGE_TYPES.REMIND,
      payload: {
        time,
        station,
      }
    })

    chrome.storage.local.set({
      departure: {
        station,
        time,
      }
    })

    window.close()
  }

  componentWillMount () {
    chrome.storage.local.get('departure', (items) => {
      let station
      let time
      if (items.departure) {
        station = items.departure.station
        time = items.departure.time
      } else {
        const firstStation = Object.keys(DESTINATION)[0]
        station = firstStation
        time = DESTINATION[firstStation][0]
      }

      this.setState({
        station,
        time,
        isLoading: false,
      })
    })
  }

  render () {
    const {
      station,
      time,
      isLoading,
    } = this.state

    if (isLoading) {
      return null
    }

    return (
      <div>
        <Select
          useDefault
          label="Select Station"
          value={station}
          onChange={this.onChangeStation}
        >
          {
            Object.keys(DESTINATION).map((station, i) => (
              <Option key={i} value={station} label={station} />
            ))
          }
        </Select>
        <Select
          useDefault
          label="Select time"
          value={time}
          onChange={this.onChangeTime}
        >
          {
            DESTINATION[station].map((time, i) => {
              return (
                <Option key={i} value={time} label={time} />
              )
            })
          }
        </Select>
        <Button
          color="primary"
          onClick={this.onRemindClick}
        >
          Remind
        </Button>
      </div>
    )
  }
}

ReactDOM.render(<Popup/>, document.getElementById('root'))