import logo from '../../assets/ebuy-icon.png'
import React,{useState} from "react";
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../firebase/config'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const handleLogin = (e)=>{
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            console.log(userCredential.user)
            navigate('/')
        }).catch((error)=>{
            setError(error.message)
        })
    }
    return <>
        <div className="login-header">
            <a href="/"><img src={logo} alt="logo" /></a>
        </div>
        <div className="login-container">
            <div className="login-form">
                <h1>Sign in to your account</h1>
                <h4>Are you new here ?</h4>
                <button className='create-btn' onClick={()=>navigate('/signup')}>Create account</button>
                <form onSubmit={handleLogin}>
                    <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    {successMsg && <p className="success-msg">{successMsg}</p>}
                    {error && <p className="error-msg">{error}</p>}
                    <button className='submit-btn' type='submit'>Continue</button>
                </form>
            </div>
        </div>
        <div className="login-footer">
            <p>Copyright © 1995-2026 eBuy Inc. All Rights Reserved. </p>
        </div>
    </>
}
export default Login