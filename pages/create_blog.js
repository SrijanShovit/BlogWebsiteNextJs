import React, { useState, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid';
import {storage,db,serverTimestamp} from './firebase'

export default function Create_blog({user}) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')

    //useEffect will be called whenever url is changed
    useEffect(() => {
        //but we don't want this useEffect to call when mounting 
        if (url){
            try {
                db.collection('blogs').add({
                    title,
                    body,
                    imageUrl: url,
                    postedBy: user.uid,
                    createdAt: serverTimestamp()
                })
                M.toast({html:`Blog created` ,classes:"green"})
            } catch (error) {
                M.toast({html:`Error creating blog` ,classes:"red"})   
            }
            
        }
    },[url])

     const submitDetails = () => {
        if (!title || !body || !image ){
            M.toast({html:`Please add all fields` ,classes:"red"})
            return
        }
        var uploadTask = storage.ref().child(`image/${uuidv4()}`).put(image)
        uploadTask.on('state_changed',
        (snapshot) => {

            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (progress == 100) M.toast({html:`Image Uploaded` ,classes:"green"})
        },
        (err) => {
            M.toast({html:err.message ,classes:"red"})
        },
        ()=>{
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log(downloadURL)
                setUrl(downloadURL)
            });
        }
         );
    }

    return (
        <div className="input-field rootdiv">
            <h3>Create a Blog !!</h3>
            <input type="text" placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <textarea
                type="text" placeholder="Body"
                onChange={(e) => setBody(e.target.value)}
                value={body}></textarea>

            <div className="file-field input-field">
                <div className="btn #03a9f4 light-blue">
                    <span>File</span>
                    <input type="file" 
                    onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn blue" onClick={() => submitDetails()} >Post</button>

            <style jsx>
                {
                    `
                    .rootdiv{
                        margin:30px auto;
                        max-width:600px;
                        padding:20px;
                        text-align:center;

                    }
                    `
                }
            </style>
        </div>


      
    )
}
