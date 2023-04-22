import React from 'react'
import { Link } from '@reach/router'

import Logo from '../assets/images/elephlogo.png'
import TimePeriod from './TimePeriod'

import '../assets/styles/components/nav.scss'

const Nav = () => (
  <nav>
    <div className="navigation__links">
      <Link to={`${process.env.REACT_APP_ROOT_NAME}`}>
        <img src={Logo} alt="" className="logo" />
        <p className="link-text"> Zeeguu Teacher Dashboard</p>
      </Link>
    </div>
    <TimePeriod />
  </nav>
)

export default Nav
