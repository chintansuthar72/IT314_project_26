import React, { useContext } from 'react'
import { FormControl, MenuItem, Select } from '@material-ui/core'

import '../assets/styles/components/timeperiod.scss'

import TimePeriodContext from '../context/TimePeriodContext'

const TimePeriod = () => {
  const { timePeriod, setTimePeriod } = useContext(TimePeriodContext)

  return (
    <div className="timeperiod__component">
      <p className="timeperiod__text">Summary for the last </p>
      <FormControl required>
        <Select
          value={timePeriod}
          onChange={e => setTimePeriod(e.target.value)}
        >
          <MenuItem value={'7'}>1 week</MenuItem>
          <MenuItem value={'14'}>2 weeks</MenuItem>
          <MenuItem value={'30'}>1 month</MenuItem>
          <MenuItem value={'182'}>6 months</MenuItem>
          <MenuItem value={'365'}>1 year</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default TimePeriod
