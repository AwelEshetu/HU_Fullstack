const dummy = (blogs) => {
  return 1
}
const totalLikes=(blogs)=>{
    return blogs.map(blog=>blog.likes).reduce((a,b)=>a+b,0);
}
const favoriteBlog=(blogs)=>{
    
    let maxLikes;
    let blogLists=[];
    for(let obj of blogs){
        blogLists.push({
              title: obj.title,
              author: obj.author,
              likes:obj.likes
        })
    }
    if(blogs.length > 0){
        maxLikes=Math.max(...blogs.map(blog=>blog.likes));
    }

  return  blogs.length===0 ?
      'no blog posts available':
      blogLists.filter(blog=>blog.likes===maxLikes)[0] ;
      
}
const mostBlogs = (blogs)=>{
    let blogLists=[],
        authors=[...new Set(blogs.map(blog=>blog.author))];
    for(let name of authors){
        let totalBlogs=blogs.map(blog=>blog.author===name).length;
        blogLists.push({author:name,blogs:totalBlogs})
    }
 let maxBlog=Math.max(...blogLists.map(item=>item.blogs));
return blogs.length===0 ? 'no blog posts available': blogLists.filter(item=> item.blogs===maxBlog)[0];
    
}

const mostLikes =(blogs)=>{
    let blogLists=[],
        authors=[...new Set(blogs.map(blog=>blog.author))];
       
    for(let name of authors){
        let totalLikes=blogs.map(blog=>blog.author===name ? blog.likes : 0 ).reduce((prev,next)=>prev+next, 0);
        blogLists.push({author:name,likes:totalLikes})
    }
    let maxLikes=Math.max(...blogLists.map(item=>item.likes));
   return blogs.length===0 ? 'no blog posts available': blogLists.filter(item=> item.likes===maxLikes)[0];
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}