import { Button, Dialog, DialogContent } from '@material-ui/core'
import { Link } from '@reach/router'
import React, { useState } from 'react'
import { MdAddCircle, MdArrowForward, MdPeople } from 'react-icons/md/'
import { createCohort } from '../api/apiCohort'
import CohortForm from './CohortForm'
import '../assets/styles/components/cohortList.scss'

const CohortItem = ({ cohort }) => {
  return (
    <div className="cohort-card">
      <div>
        <p>{cohort.language_name}</p>
        <p className="special">
          {cohort.cur_students}/{cohort.max_students}{' '}
          <MdPeople className="cohort-card-icon-people" size="22px" />
        </p>
      </div>
      <h2 className="cohort-card-headline">{cohort.name}</h2>
      <div>
        <p className="font-light">invite code: {cohort.inv_code}</p>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/${process.env.REACT_APP_ROOT_NAME}/classroom/${cohort.id}`}
        >
          View class
          <MdArrowForward className="cohort-card-btn-arrow" size="18px" />
        </Button>{' '}
      </div>
    </div>
  )
}

const CohortList = ({ cohorts, refetch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isError, setIsError] = useState(false)

  const addCohort = form => {
    setIsError(false)
    createCohort(form)
      .then(result => {
        setIsOpen(false)
        refetch(prev => prev + 1) // reloads the classes to update the UI
      })
      .catch(err => setIsError(true))
  }

  return (
    <div className="cohorts-list">
      {cohorts.map(cohort => (
        <CohortItem key={cohort.id} cohort={cohort} />
      ))}
      <Button
        style={{ minHeight: 200 }}
        color="primary"
        variant="contained"
        onClick={() => setIsOpen(true)}
      >
        <MdAddCircle size="48px" />
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogContent>
          <CohortForm
            primaryButtonText="Create Class"
            onSubmit={addCohort}
            isError={isError}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default CohortList
