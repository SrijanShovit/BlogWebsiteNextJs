import {useState} from 'react'
import Link from 'next/link'
import {auth} from './firebase'

export default function Signup() {
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = async  (e) => {
        e.preventDefault()
        try{
            const result = await auth.createUserWithEmailAndPassword(email, password)
         await result.user.updateProfile({
             displayName:name,

         })
         M.toast({html:`Welcome ${result.user.displayName}` ,classes:"green"})
        // console.log(email, password)
        }catch(err){
            M.toast({html: err.message ,classes:"red"})
        }
         
    }

    return (
        <div className="container center">
            <h3>Please Signup!!</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-field">
                    <input type="text" placeholder="Your name" value={name}
                    autoComplete="off" onChange={(e) => setName(e.target.value)}
                    />           

                
                    <input type="email" placeholder="Email" value={email}
                    autoComplete="off" onChange={(e) => setEmail(e.target.value)}
                    />
                
                    <input type="password" placeholder="Password" value={password}
                    autoComplete="off" onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn #03a9f4 light-blue">Sign Up</button>
                <Link href="/login"><a><h5>Already have an account?</h5></a></Link>
            </form>
        </div>
    )
}
