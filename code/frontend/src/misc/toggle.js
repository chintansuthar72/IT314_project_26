import React, { useState } from 'react'

const UseStateBasics = () => {
  const [text, setText] = useState('DAIICT-Course')
  const handleClick = () => {
    if (text === 'DAIICT-Course') {
      setText('GR-26')
    } else {
      setText('DAIICT-Course')
    }
  }

  return (
    <React.Fragment>
      <button type='button' className='btn' onClick={handleClick}>
        {text}
      </button>
    </React.Fragment>
  )
}

export default UseStateBasics
