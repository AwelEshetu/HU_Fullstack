import React ,{ useState } from 'react'


const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const buttonStyle={
  borderRadius:1,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  backgroundColor:'blue'
}




const Blog = ({ blog, handleLike,handleRemove,user }) => {

  //change states
  const [detailVisible, setDetailVisible] = useState(false)
  const detailVisiblityControl = { display: detailVisible ? '' : 'none' }
  //likes
  const Likes= ( ) => (
      <>
        <button  onClick={handleLike}>Like</button>
      </>
  )

  //remove
  const Remove =( ) => (
    <>
      <button style={buttonStyle} onClick={handleRemove}>remove</button>
    </>
  )



  return  (
    <div style={blogStyle} className="blogs">
      <div onClick={() => setDetailVisible(!detailVisible)} className="makeVisible">
        <p>{blog.title} {blog.author}</p>
      </div>
      <div style={detailVisiblityControl}  className="showDetail" >
        <a target="_blank" rel="noopener noreferrer" href={blog.url} >{blog.url}</a>
        <p>{blog.likes} likes {Likes(blog.id)}</p>
        <p>added by {blog.user.name}</p>
        {blog.user.username===user.username ? Remove(blog.id):null}
      </div>
    </div>
  )
}
export default Blog