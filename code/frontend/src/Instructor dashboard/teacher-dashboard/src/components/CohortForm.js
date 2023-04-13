import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
import { navigate } from '@reach/router'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { SpringSpinner } from 'react-epic-spinners'
import { deleteCohort as deleteCohortAPI } from '../api/apiCohort'
import { languageMap } from '../utilities/helpers'

const CohortForm = ({ primaryButtonText, cohort, isError, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false)
  const inputLabelRef = React.useRef(null)

  const [state, setState] = useState({
    id: cohort ? cohort.id : '',
    cohort_name: cohort ? cohort.name : '',
    invite_code: cohort ? cohort.inv_code : '',
    language_id: cohort ? languageMap[cohort.language_name] : 'es',
    max_students: cohort ? cohort.max_students : 20,
    labelWidth: 0
  })

  useEffect(() => {
    setState({
      ...state,
      labelWidth: ReactDOM.findDOMNode(inputLabelRef.current).offsetWidth
    })
  }, [])

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  function setupForm() {
    const form = new FormData()
    form.append('name', state.cohort_name)
    form.append('inv_code', state.invite_code)
    form.append('max_students', state.max_students)
    form.append('language_id', state.language_id)
    return form
  }

  function submitForm(event) {
    setIsLoading(true)
    const form = setupForm()
    onSubmit(form)
    event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={submitForm} style={{ display: 'flex', flexWrap: 'wrap' }}>
        <TextField
          value={state.cohort_name}
          onChange={handleChange}
          name="cohort_name"
          id="cohort_name"
          label="Name of class"
          fullWidth
          type="text"
          required
        />
        <TextField
          value={state.invite_code}
          onChange={handleChange}
          name="invite_code"
          id="invite_code"
          label="Invite Code"
          fullWidth
          type="text"
          required
        />
        <TextField
          value={state.max_students}
          onChange={handleChange}
          name="max_students"
          id="max_students"
          label="Maximum number of students"
          fullWidth
          type="number"
          required
          disabled={!!cohort}
        />
        <FormControl
          fullWidth
          disabled={!!cohort}
          required
          style={{ minWidth: 120 }}
        >
          <InputLabel ref={inputLabelRef} htmlFor="language_id">
            Language
          </InputLabel>
          <Select
            inputProps={{
              name: 'language_id',
              id: 'language_id'
            }}
            value={state.language_id}
            onChange={handleChange}
          >
            <MenuItem value={'de'}>German</MenuItem>
            <MenuItem value={'es'}>Spanish</MenuItem>
            <MenuItem value={'fr'}>French</MenuItem>
            <MenuItem value={'nl'}>Dutch</MenuItem>
            <MenuItem value={'en'}>English</MenuItem>
            <MenuItem value={'it'}>Italian</MenuItem>
            <MenuItem value={'zh-CN'}>Chinese</MenuItem>
          </Select>
        </FormControl>
        {isError && (
          <Error
            message={
              'Something went wrong. Maybe the invite code is already in use.'
            }
            setLoading={setIsLoading}
          />
        )}
        <Button
          style={{ marginTop: 10 }}
          type="submit"
          variant="contained"
          color="primary"
        >
          {isLoading ? <SpringSpinner size={24} /> : primaryButtonText}
        </Button>
      </form>
      {cohort && <DangerZone cohortId={cohort.id} />}
    </div>
  )
}

const Error = ({ setLoading, message }) => {
  setLoading(false)
  return <p style={{ color: 'red', width: '100%' }}>{message}</p>
}

const DangerZone = ({ cohortId }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  function deleteCohort(cohortId) {
    setIsLoading(true)
    setIsError(false)
    deleteCohortAPI(cohortId)
      .then(() => navigate(`/${process.env.REACT_APP_ROOT_NAME}`), 2000)
      .catch(err => {
        setIsError(true)
      })
  }

  return (
    <div style={{ marginTop: 60 }}>
      <h3>Danger zone</h3>
      <p>Press the button to delete the class. The class must be empty. </p>
      <Button
        style={{ marginTop: 10 }}
        onClick={() => deleteCohort(cohortId)}
        variant="contained"
        color="secondary"
      >
        {isLoading ? <SpringSpinner size={24} /> : 'Delete Class'}
      </Button>
      {isError && (
        <Error
          message={`You can't delete a class that has students or files.`}
          setLoading={setIsLoading}
        />
      )}
    </div>
  )
}

export default CohortForm
