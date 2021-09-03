import {useState} from 'react'
import Link from 'next/link'
import {auth} from './firebase'

export default function login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

  
        const handleSubmit = async  (e) => {
            e.preventDefault()
            try{
                const result = await auth.signInWithEmailAndPassword(email, password)
            
             M.toast({html:`Welcome ${result.user.displayName}` ,classes:"green"})
            // console.log(email, password)
            }catch(err){
                M.toast({html: err.message ,classes:"red"})
                        
            }
         }

    return (
        <div className="container center">
            <h3>Please Login!!</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-field">
                    <input type="email" placeholder="Email" value={email}
                    autoComplete="off" onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input type="password" placeholder="Password" value={password}
                    autoComplete="off" onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn #03a9f4 light-blue">Login</button>
                <Link href="/signup"><a><h5>Don't have an account?</h5></a></Link>
            </form>
        </div>
    )
}
