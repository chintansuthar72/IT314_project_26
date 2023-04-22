import React from 'react'
import ElephLogo from '../assets/images/elephlogo.png'
import '../assets/styles/components/elephantLoader.scss'

const ElephantLoader = props => {
  return (
    <div className="eleph-loader-wrapper">
      <img src={ElephLogo} alt="Loading..." className="eleph-loader" />
    </div>
  )
}

export default ElephantLoader
