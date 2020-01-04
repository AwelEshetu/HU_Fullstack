const blogs=[
        {
            likes: 26,
            title: "React patterns Rocks",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            user: {
            username: "root",
            name: "Superuser",
            id: "5de274f0add9cf3b5cec6251"
            },
            id: "5de386de4769be7ba4ee01d6"
        },
        {
            likes: 19,
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            user: {
            username: "aweleshetu",
            name: "Awel Eshetu",
            id: "5de274b7add9cf3b5cec6250"
            },
            id: "5dea6cf7cf55952440672125"
        },
        {
            likes: 13,
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            user: {
            username: "aweleshetu",
            name: "Awel Eshetu",
            id: "5de274b7add9cf3b5cec6250"
            },
            id: "5dea70e0cf55952440672128"
        },
        {
            likes: 6,
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            user: {
            username: "aweleshetu",
            name: "Awel Eshetu",
            id: "5de274b7add9cf3b5cec6250"
            },
            id: "5deb49c2eb96df44e86c96d8"
        },
        {
            likes: 1,
            title: "Who let the dogs out ",
            author: "Awel Eshetu ",
            url: "https://www.youtube.com/watch?v=Qkuu0Lwb5EM",
            user: {
            username: "aweleshetu",
            name: "Awel Eshetu",
            id: "5de274b7add9cf3b5cec6250"
            },
            id: "5decefe4a547245304982c3d"
        },
        {
            likes: 1,
            title: "How to sleep one eye open",
            author: " Dawg Runner ",
            url: "https://www.sleepadvisor.org/how-to-sleep-with-your-eyes-open/",
            user: {
            username: "aweleshetu",
            name: "Awel Eshetu",
            id: "5de274b7add9cf3b5cec6250"
            },
            id: "5decf61f8359be47b044ead2"
        },
        {
            likes: 1,
            title: "Mother for Mothers ",
            author: "Random Dude",
            url: "https://www.wellspringhlc.org.uk/organiser/mother-for-mothers/",
            user: {
            username: "aweleshetu",
            name: "Awel Eshetu",
            id: "5de274b7add9cf3b5cec6250"
            },
            id: "5decf9510e1de94b10a28acb"
        },
        {
            likes: 13,
            title: "Wait a second",
            author: "Awel Eshetu ",
            url: "https://www.youtube.com/watch?v=kjzxgE9NGg0",
            user: {
            username: "aweleshetu",
            name: "Awel Eshetu",
            id: "5de274b7add9cf3b5cec6250"
            },
            id: "5decf9f58cc8fb0ffc921d43"
        },
        {
            likes: 24,
            title: "Another day to die ",
            author: "Nobody ",
            url: "https://www.youtube.com/watch?v=hM5UJvnbbuY",
            user: {
            username: "aweleshetu",
            name: "Awel Eshetu",
            id: "5de274b7add9cf3b5cec6250"
            },
            id: "5decfb00c245a80d48cbe693"
        },
        {
            likes: 1,
            title: "Bullies for bullies ",
            author: "A Bully",
            url: "https://www.livescience.com/11163-bullies-bullying.html",
            user: {
            username: "aweleshetu",
            name: "Awel Eshetu",
            id: "5de274b7add9cf3b5cec6250"
            },
            id: "5decfb42c245a80d48cbe694"
        },
        {
            likes: 3,
            title: "What Is a Pit Bull?",
            author: "Jenna Stregowski",
            url: "https://www.thesprucepets.com/what-is-a-pit-bull-1118284",
            user: {
            username: "aweleshetu",
            name: "Awel Eshetu",
            id: "5de274b7add9cf3b5cec6250"
            },
            id: "5dee001e5664003fa8c4f9c3"
        },
        {
            likes: 2,
            title: "HOW TO SURVIVE FINNISH WINTER AND ENJOY IT?",
            author: "Marjo S Eskola",
            url: "https://blogs.helsinki.fi/welcometouh/2019/01/30/how-to-survive-finnish-winter-and-enjoy-it/",
            user: {
            username: "aweleshetu",
            name: "Awel Eshetu",
            id: "5de274b7add9cf3b5cec6250"
            },
            id: "5dee022bd2c7863cb0f97073"
        },
        {
            likes: 13,
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            user: {
            username: "aweleshetu",
            name: "Awel Eshetu",
            id: "5de274b7add9cf3b5cec6250"
            },
            id: "5dff5496c802233a1858581b"
        }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }