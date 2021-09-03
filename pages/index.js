import { db } from './firebase'
import Link from 'next/link'
import {useState} from 'react'

export default function Home({ Allblogs }) {
  const [blogs,setBlogs] = useState(Allblogs)
  const [end,setEnd] = useState(false)
  const loadMore = async () =>{
    const last = blogs[blogs.length - 1]
    const res = await db.collection('blogs').orderBy('createdAt', "desc")
    //pagination--> we have to pass last docSnapshot to startAfter
    .startAfter(new Date(last.createdAt))
    .limit(3)
    .get()
    const newblogs = res.docs.map(docSnap=>{
      return {
        ...docSnap.data(),  
        createdAt: docSnap.data().createdAt.toMillis(),
        id: docSnap.id
      }
    })
    setBlogs(blogs.concat(newblogs))

    if (newblogs.length < 3){
      setEnd(true)
    }
  }
  // console.log(Allblogs)  //will be visible on Client side
  return (
    <div className="center">
      {blogs.map(blog => {
        return (
          <div className="card" key={blog.createdAt}>
            <div className="card-image">
              <img src={blog.imageUrl}/>
              <span className="card-title">{blog.title}</span>
            </div>
            <div className="card-content">
              <p>{blog.body}</p>
            </div>
            <div className="card-action">
              <Link href={`/blogs/${blog.id}`}><a>Read More</a></Link>
            </div>
          </div>
        )
      })}

      {end == false?
      <button  className="btn #03a9f4 light-blue" 
      onClick={() => loadMore()}
      >Load More</button>

      : <h3>You have reached the end</h3>
    }
       
<style jsx global>
  {
    `
    .card-title {
      color:blue!important;
    }
    .card{
      max-width:500px;
      margin: 22px auto;
    }
    p{
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
    }
    `
  }
</style>

    </div>
  )
}

//this function runs only on server side
export async function getServerSideProps(context) {
  const querySnap = await db.collection('blogs').orderBy('createdAt', "desc")
  .limit(3)
    .get()
  //we r getting querySnapshot as array of docSnap which we map ...we get data from those dosSnap
  //map returns a new array
  const Allblogs = querySnap.docs.map(docSnap => {
    return {
      ...docSnap.data(),  //copy of data
      //overriding createdAt fields 
      createdAt: docSnap.data().createdAt.toMillis(),
      id: docSnap.id
    }
  })

  return {
    props: { Allblogs },      //will be passed to page component as props
  }
}