import React from 'react'

import Teacher from '../assets/images/teacher.svg'

const NoStudents = () => (
  <div style={{ marginBottom: '50px' }}>
    <h4>You currently have no active students</h4>
    <img
      style={{
        maxWidth: 500
      }}
      src={Teacher}
      alt=""
    />
  </div>
)

export default NoStudents
