import React, { useState, useContext, useEffect } from 'react'
import { Button, TextField } from '@material-ui/core'
import Dropzone from 'react-dropzone'

import { uploadArticles, deleteArticleFromCohort } from '../api/apiArticles'

import { MdClose, MdCloudUpload } from 'react-icons/md/'
import Chip from '@material-ui/core/Chip'

import { languageMap } from '../utilities/helpers'

import { getArticles } from '../api/apiArticles'

import '../assets/styles/components/cohortArticles.scss'
import ClassroomContext from '../context/ClassroomContext'
import UserContext from '../context/UserContext'

const readArticleContent = article => {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = function(event) {
      const content = event.target.result

      resolve(content)
    }
    reader.onerror = function(e) {
      reject(e)
    }
    reader.readAsText(article)
  })
}

const createArticleObject = (name, content, languageCode, user) => {
  const title = name.substr(0, name.lastIndexOf('.')) || name

  const words = content.split(/\s+/)
  const summary = words.slice(0, 30).join(' ')
  const authors = user.name

  const articleObject = {
    title,
    content,
    authors,
    summary,
    language_code: languageCode
  }

  return articleObject
}

const CohortArticles = () => {
  const cohortData = useContext(ClassroomContext)
  const user = useContext(UserContext)
  const [refetchArticles, setRefetchArticles] = useState(0)
  const [articlesToUpload, setArticlesToUpload] = useState([])
  const [articles, setArticles] = useState([])

  useEffect(() => {
    getArticles(cohortData.id).then(result => {
      setArticles(result.data)
    })
  }, [refetchArticles])

  const languageCode = languageMap[cohortData.language_name]

  const prepareArticles = articles => {
    const articlesData = articles.map(async article => {
      const content = await readArticleContent(article)
      const object = createArticleObject(
        article.name,
        content,
        languageCode,
        user
      )
      return object
    })
    Promise.all(articlesData).then(data => {
      setArticlesToUpload(data)
    })
  }

  const onUploadArticles = e => {
    e.preventDefault()
    uploadArticles(cohortData.id, articlesToUpload).then(result => {
      setRefetchArticles(prev => prev + 1)
      setArticlesToUpload([])
    })
  }

  const deleteArticle = article => {
    deleteArticleFromCohort(cohortData.id, article.id).then(result => {
      setRefetchArticles(prev => prev + 1)
    })
  }

  return (
    <div className="article-manager">
      <h2>Manage articles</h2>
      <ArticleList articles={articles} deleteArticle={deleteArticle} />
      <div style={{ marginBottom: '20px' }}>
        <Dropzone
          accept={['.txt']}
          onDrop={acceptedArticles => prepareArticles(acceptedArticles)}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="drop-articles">
                  {articlesToUpload.length ? (
                    <ul>
                      {articlesToUpload.map(article => (
                        <li key={article.title}>{article.title}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>
                      Drag and drop some files here, or click to select files
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}
        </Dropzone>
        {articlesToUpload.length ? (
          <Button
            onClick={onUploadArticles}
            variant="contained"
            color="default"
            style={{ marginTop: 10 }}
          >
            Upload files as articles
            <MdCloudUpload style={{ marginLeft: '10px' }} />
          </Button>
        ) : null}
      </div>

      <UserInput
        refetchArticles={() => setRefetchArticles(prev => prev + 1)}
        user={user}
      />
    </div>
  )
}

const ArticleList = ({ articles, deleteArticle }) => {
  return (
    <div className="article-list-container">
      <h4>Article list</h4>
      <ul className="article-list">
        {articles.map(article => {
          return (
            <li key={article.id}>
              <Chip
                label={article.title}
                onDelete={() => deleteArticle(article)}
                className="article"
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const UserInput = ({ user, refetchArticles }) => {
  const cohortData = useContext(ClassroomContext)
  const languageCode = languageMap[cohortData.language_name]

  const [state, setState] = useState({
    article_title: '',
    article_content: ''
  })

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const submitArticle = e => {
    e.preventDefault()
    let articleObj = createArticleObject(
      state.article_title,
      state.article_content,
      languageCode,
      user
    )
    uploadArticles(cohortData.id, [articleObj]).then(result => {
      refetchArticles()
    })
    setState({
      article_title: '',
      article_content: ''
    })
  }

  return (
    <form onSubmit={submitArticle}>
      <TextField
        type="text"
        placeholder="This will be the title of the article"
        value={state.article_title}
        onChange={handleChange}
        name="article_title"
        id="article_title"
        label="Article title"
        fullWidth
      />
      <TextField
        type="text"
        placeholder="Type any text here to create an article"
        multiline={true}
        value={state.article_content}
        onChange={handleChange}
        name="article_content"
        id="article_content"
        label="Article content"
        rows={6}
        fullWidth
      />
      <div>
        <Button
          style={{ marginTop: 10 }}
          type="submit"
          variant="contained"
          color="primary"
          disabled={!(state.article_title && state.article_content)}
        >
          Submit Article{' '}
        </Button>
      </div>
    </form>
  )
}

export default CohortArticles
