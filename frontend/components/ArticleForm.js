import React, { useState } from 'react'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {

  const [values, setValues] = useState(initialFormValues)

  const { postArticle } = props

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const resetForm =() => {
    setValues(initialFormValues)
  }

  const onSubmit = evt => {
    evt.preventDefault()
    postArticle(values, resetForm)
    
  }


  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create Article</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select id="topic" onChange={onChange} value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <button id="submitArticle">Submit</button>
    </form>
  )
}
