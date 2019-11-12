const listHelper = require('../utils/list_helper')
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
],
emptyList=[],
listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ];
listWithEqualLikes=[
    {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 12,
    __v: 0
  },{
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  }  
];

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

//total likes

describe('total likes', () => {
   
    test('with empty list should equal to zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
    })
    

   test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
     
});

//favorite Blog

describe('favorite Blog ', () => {
   
test('blog post with most likes with empty list',()=>{
    const result=listHelper.favoriteBlog(emptyList);
    expect(result).toMatch('no blog posts available');
    
});
    
test('blog post with most likes with two or more equally favorite posts',()=>{
    const result=listHelper.favoriteBlog(listWithEqualLikes);
       
   let blogLists=[];
    for(let obj of listWithEqualLikes){
        blogLists.push({
              title: obj.title,
              author: obj.author,
              likes:obj.likes
        })
    }

    let maxLikes=Math.max(...listWithEqualLikes.map(blog=>blog.likes)),
        favPost=blogLists.filter(blog=>blog.likes===maxLikes)[0];  
    expect(result).toEqual(favPost);
   
   
    
});
    
test('blog post with most likes with non equal likes',()=>{
    const result=listHelper.favoriteBlog(blogs);
    
    let blogLists=[];
    for(let obj of blogs){
        blogLists.push({
              title: obj.title,
              author: obj.author,
              likes:obj.likes
        })
    }
    let maxLikes=Math.max(...blogs.map(blog=>blog.likes)),
        favPost=blogLists.filter(blog=>blog.likes===maxLikes)[0];
   
    expect(result).toEqual(favPost);
    
});
 
})

//mostBlogs 
describe('most Blogs  ', () => {
    
test('author with most blogs with empty list',()=>{
    const result=listHelper.mostBlogs(emptyList);  
    expect(result).toMatch('no blog posts available');   
    
});
     
test('author with most blogs with non empty list ',()=>{
    const result=listHelper.mostBlogs(blogs);
     let blogLists=[],
        authors=[...new Set(blogs.map(blog=>blog.author))];
    for(let name of authors){
        let totalBlogs=blogs.map(blog=>blog.author===name).length;
        blogLists.push({author:name,blogs:totalBlogs})
    }
 let maxBlog=Math.max(...blogLists.map(item=>item.blogs)),
     mostBlogs=blogLists.filter(item=> item.blogs===maxBlog)[0];
    
    expect(result).toEqual(mostBlogs);
    
});
 
})

//most Likes  
describe('most Likes   ', () => {
    
test('author who has most liked blog posts with empty list',()=>{
    const result=listHelper.mostLikes(emptyList);   
    expect(result).toMatch('no blog posts available');
       
});
     
test('author who has most liked blog posts with non empty list ',()=>{
    const result=listHelper.mostLikes(blogs);
     let blogLists=[],
        authors=[...new Set(blogs.map(blog=>blog.author))];
       
    for(let name of authors){
        let totalLikes=blogs.map(blog=>blog.author===name ? blog.likes : 0 ).reduce((prev,next)=>prev+next, 0);
        blogLists.push({author:name,likes:totalLikes})
    }
    let maxLikes=Math.max(...blogLists.map(item=>item.likes)),
      mostLikedAuthor=blogLists.filter(item=> item.likes===maxLikes)[0];
    
    expect(result).toEqual(mostLikedAuthor);
    
});
 

})