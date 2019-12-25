import React from 'react'

const BlogForm = ({
  onSubmit,
  handleTitle,
  handleAuthor,
  handleUrl,
  title,
  author,
  url }) => {
  return (
    <div>
      <h2>Create a new Blog</h2>
      <form onSubmit={onSubmit}>
        <div>
        title :
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitle}
          />
        </div>
        <div>
        author :
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthor}
          />
        </div>
        <div>
        url :
          <input
            type="text"
            value={url}
            name="Url"
            onChange={handleUrl}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm