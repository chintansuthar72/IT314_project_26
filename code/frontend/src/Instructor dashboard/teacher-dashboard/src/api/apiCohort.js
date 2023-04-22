import { transformStudents } from '../utilities/helpers'
import { apiGet, apiPost } from './apiEndpoints'

export function createCohort(data) {
  return apiPost('/create_own_cohort', data, true)
}

export function deleteCohort(id) {
  return apiPost(`/remove_cohort/${id}`, id)
}
export function updateCohort(data, id) {
  return apiPost(`/update_cohort/${id}`, data, true)
}

export function getStudents(cohortId, duration) {
  const result = apiGet(`/users_from_cohort/${cohortId}/${duration}`).then(
    ({ data }) => transformStudents(data)
  )
  return result
}

export async function getUsersByTeacher(duration) {
  const result = apiGet(`/users_by_teacher/${duration}`).then(({ data }) =>
    transformStudents(data)
  )
  return result
}

export function getGeneralCohortInfo(cohortId) {
  return apiGet(`/cohort_info/${cohortId}`)
}

export function getCohortsInfo() {
  return apiGet('/cohorts_info')
}
