import React, { useEffect, useState, useContext } from 'react'
import { Button, Dialog, DialogContent } from '@material-ui/core'
import {
  getGeneralCohortInfo,
  getStudents,
  updateCohort
} from '../api/apiCohort'
import CohortForm from '../components/CohortForm'
import CohortArticles from '../components/CohortArticles'
import StudentListTable from '../components/StudentListTable'
import NoStudents from '../components/NoStudents'
import ClassroomContext from '../context/ClassroomContext'
import TimePeriodContext from '../context/TimePeriodContext'

import '../assets/styles/pages/classroom.scss'
import ElephantLoader from '../components/ElephantLoader'

const Classroom = ({ cohortId }) => {
  const { timePeriod } = useContext(TimePeriodContext)
  const [cohortInfo, setCohortInfo] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [students, setStudents] = useState([])
  const [cohortArticlesIsOpen, setCohortArticlesIsOpen] = useState(false)
  const [formIsOpen, setFormIsOpen] = useState(false)
  const [formStateIsError, setFormStateIsError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getGeneralCohortInfo(cohortId).then(({ data }) => {
      setCohortInfo(data)
    })
    getStudents(cohortId, timePeriod).then(students => {
      setStudents(students)
      setIsLoading(false)
    })
  }, [timePeriod])

  const onUpdateCohort = form => {
    setFormStateIsError(false)
    updateCohort(form, cohortId)
      .then(result => {
        setFormIsOpen(false)
        getGeneralCohortInfo(cohortId).then(({ data }) => {
          setCohortInfo(data)
        })
      })
      .catch(err => setFormStateIsError(true))
  }

  return (
    <ClassroomContext.Provider value={cohortInfo}>
      <div className="page-classroom">
        <div className="page-classroom__header">
          <div className="page-classroom__title">
            <h2 className="page-classroom__title--name">
              {cohortInfo.name}{' '}
              <span className="page-classroom__title--language">
                {cohortInfo.language_name}
              </span>
            </h2>
            <p>Invite code: {cohortInfo.inv_code}</p>
          </div>
          <div>
            {/* Cohort Articles */}
            <Button
              style={{ marginRight: 10 }}
              color="secondary"
              variant="contained"
              onClick={() => setCohortArticlesIsOpen(true)}
            >
              Manage Files
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => setFormIsOpen(true)}
            >
              Edit class
            </Button>
            {/* Classform dialog */}
            <Dialog
              open={formIsOpen}
              onClose={() => setFormIsOpen(false)}
              fullWidth
              maxWidth={'sm'}
            >
              <DialogContent>
                <CohortForm
                  primaryButtonText="Update Class"
                  cohort={cohortInfo}
                  onSubmit={onUpdateCohort}
                  isError={formStateIsError}
                />
              </DialogContent>
            </Dialog>
            {/* File management dialog */}
            <Dialog
              open={cohortArticlesIsOpen}
              onClose={() => setCohortArticlesIsOpen(false)}
              fullWidth
              maxWidth={'sm'}
            >
              <DialogContent>
                <CohortArticles />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {isLoading ? (
          <ElephantLoader />
        ) : students.length === 0 ? (
          <>
            <NoStudents />
            <p style={{ fontSize: '32px' }}>
              Students can join this class by using the invite code:{' '}
              <span style={{ fontWeight: 'bold' }}>{cohortInfo.inv_code}</span>
            </p>
          </>
        ) : (
          <StudentListTable students={students} />
        )}
      </div>
    </ClassroomContext.Provider>
  )
}

export default Classroom
