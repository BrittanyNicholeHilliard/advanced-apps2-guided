import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import ArticleForm from './ArticleForm'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import axiosWithAuth from '../axios/index'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const login = ({username, password}) => {
    axios.post(loginUrl, { username, password })
    .then(res => {
      const {token} = res.data //'token'
      localStorage.setItem('token', token)
      navigate('/articles')
    })
    .catch(err => {debugger})
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const getArticles = () => {
    // axios({
    //   method: 'get', 
    //   url: articlesUrl, 
    //   headers: {
    //     Authorization: localStorage.getItem('token')
    //   }
    // })
    axiosWithAuth().get(articlesUrl)
    .then(res => {
      setArticles(res.data.articles)
    }).catch(err => {
      console.log(err)
    })
  }

  const postArticle = (article, success) => {
    // axios({
    //   url: articlesUrl, 
    //   method: 'post', 
    //   headers: {
    //     Authorization: localStorage.getItem('token')
    //   }, 
    //   data: article
    //})
    axiosWithAuth().post(articlesUrl, article)
    .then(res => {
      const {article} = res.data
      setArticles(articles.concat(article))
      setError('')
      success() //second parameter of postArticle CB in component
    }).catch(err => {
      console.log({err})
      setError('Something went wrong, check your dev tools for response.')
    })
  }

  return (
    <>
      <button id="logout" onClick={logout}>Logout</button>
      <h1>Advanced Applications</h1>
      <div>{error}</div>
      <nav>
        <NavLink id="loginScreen" to="/">Login</NavLink>
        <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<LoginForm login={login} />} />
        <Route path="articles" element={
          <>
            <ArticleForm postArticle={postArticle} />
            <Articles 
            articles={articles} 
            setError={setError} 
            getArticles={getArticles}/>
          </>
        } />
      </Routes>
    </>
  )
}
