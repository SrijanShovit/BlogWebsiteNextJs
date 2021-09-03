import React,{useState} from 'react'
import {db} from '../firebase'
import {useRouter} from 'next/router'

export default function blogpage({blog,user,allComments}) {
    // console.log(allComments)
    const [myComment,setMyComment] = useState('')
    const [allDisplayComments,setAllDisplayComments] = useState(allComments)

    const router = useRouter()
    const {blogid} = router.query

    const makeComment = async() => {
        await db.collection('blogs').doc(blogid).collection('comments').add({
            text: myComment,
            name: user.displayName
        })

        //display comments without refreshing
        const commentQuery = await db.collection('blogs').doc(blogid).collection('comments').get()
        setAllDisplayComments(commentQuery.docs.map(docSnap=>docSnap.data()))

    }

    return (
        <div className="container center">
            <h2>{blog.title}</h2>
            <h5>Created on : {new Date(blog.createdAt).toDateString()}</h5>
           
            <img src={blog.imageUrl} alt={blog.title}/>
            <div className="center">
            <p>{blog.body}</p>
            </div>

            {user ? 
            <>

<div className="input-field">
            <input type="text" placeholder="add a comment" 
            value = {myComment}
            onChange={(e) =>setMyComment(e.target.value)}/>
            </div>
            
            <button  className="btn #03a9f4 light-blue" 
      onClick={() => makeComment()}
      >Make comment</button>

      <hr/>
            </>
            : <h3>Please login to comment</h3>
        
        
            }

           
      <div className="left-align">
          {allDisplayComments.map(item => {
              return <h6 key={item.name}>
                  <span>
                      {item.name}:
                  </span>
                  {item.text}
              </h6>
          })}
      </div>
            

            <style jsx global>
                {
                    `
                    span{
                        font-weight: bold;
                    }
                    body{
                        color: blue;
                    }
                    .image{
                        width:10%;
                        max-width:10rem;
                    }
                    p{
                        align-items: center;
                    
                    }
                    `
                }

            </style>
        </div>
    )
}

//destructuring params from context
export async function getServerSideProps({params:{blogid}}) {
    const result = await db.collection('blogs').doc(blogid).get()

    //fetching earlier comments
    const allCommentsSnap = await db.collection('blogs').doc(blogid).collection('comments').get()

    const allComments = allCommentsSnap.docs.map(comDocSnap =>comDocSnap.data())

    //result has only snapshot
    // console.log(result.data())
    
//   console.log(params)
    return {
      props: {
          blog:{
              ...result.data(),
              createdAt:result.data().createdAt.toMillis(),
          },
           allComments
      },      
    }
  }