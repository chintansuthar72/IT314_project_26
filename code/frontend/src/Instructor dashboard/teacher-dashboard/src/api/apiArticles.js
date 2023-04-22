import { apiGet, apiPost } from './apiEndpoints'

export function deleteArticleFromCohort(cohortId, articleId) {
  const result = apiPost(`/remove_article_from_cohort/${cohortId}/${articleId}`)
  return result
}

export function uploadArticles(cohortId, data) {
  const result = apiPost(`/upload_articles/${cohortId}`, data, false)
  return result
}

export function getArticles(cohortId) {
  const result = apiGet(`/cohort_files/${cohortId}`)
  return result
}
