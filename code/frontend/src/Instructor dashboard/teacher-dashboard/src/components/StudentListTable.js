import React from 'react'

import ListTable from './ListTable'
import { Link } from '@reach/router'
import '../assets/styles/components/studentListTable.scss'

const ProgressBar = ({
  normalized_activity_proportion,
  learning_proportion
}) => {
  //in case the user hasn't read anything, make the learning proportion 50 %
  learning_proportion = learning_proportion === 0 ? 50 : learning_proportion
  return (
    <div
      className="activity-bar"
      style={{
        width: normalized_activity_proportion + '%'
      }}
    >
      <div
        className="activity-bar__reading"
        style={{
          width: learning_proportion + '%'
        }}
      />
      <div
        className="activity-bar__exercises"
        style={{
          width: 100 - learning_proportion + '%'
        }}
      />
    </div>
  )
}

const StudentListTable = ({ students }) => {
  const headItems = [
    {
      width: 25,
      isSortable: true,
      content: <p>NAME</p>
    },
    {
      width: 25,
      isSortable: true,
      content: <p>TIME SPENT</p>
    },
    {
      width: 50,
      isSortable: false,
      content: (
        <p>
          ACTIVITY{' '}
          <span className="activity-heading activity-heading__reading">
            Reading /
          </span>
          <span className="activity-heading activity-heading__exercises">
            Exercises
          </span>
        </p>
      )
    }
  ]

  const bodyItems = students.map(student => {
    return {
      data: [
        {
          sortingValue: student.name,
          sortingType: 'string',
          content: <p>{student.name}</p>
        },
        {
          sortingValue: student.total_time,
          sortingType: 'number',
          content: (
            <p>
              {Math.floor(student.total_time / 3600)}h{' '}
              {Math.ceil((student.total_time / 60) % 60)}m
            </p>
          )
        },
        {
          content: (
            <ProgressBar
              normalized_activity_proportion={
                student.normalized_activity_proportion
              }
              learning_proportion={student.learning_proportion}
            />
          )
        }
      ],
      renderComponent: props => (
        <Link
          to={`/${process.env.REACT_APP_ROOT_NAME}/student/${student.id}`}
          {...props}
        />
      )
    }
  })

  return (
    <div className="">
      <ListTable headItems={headItems} bodyItems={bodyItems} />
    </div>
  )
}

export default StudentListTable
