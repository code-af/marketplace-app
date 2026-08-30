import logo from '../../assets/ebuy-icon.png'
import  './Signup.css'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSignup = async (e) => {
    e.preventDefault()
    try {
        // 1. create auth account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // 2. save additional details to Firestore
        await setDoc(doc(db, 'users', user.uid), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            uid: user.uid,
            createdAt: new Date().toDateString()
        })

        navigate('/')
    } catch (error) {
        console.log(error.message)
        }
    }

    return ( <>
        <div className='signup-header'>
            <a href="/home"><img src={logo} alt="logo" /></a>
            <p>Already have an account? <a className="action-link" href="/login">Sign in</a></p>
        </div>
        <div className="signup-container">
            {/* Left side - image */}
            <div className="signup-image">
                <img src="https://ir.ebaystatic.com/cr/v/c01/buyer_dweb_individual.jpg" alt="signup" />
            </div>

            {/* Right side - form */}
            <div className="signup-form">
                <h1>Create account</h1>
                <form onSubmit={handleSignup}>
                    <input type="text" value={firstName} placeholder="First name" onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" value={lastName} placeholder="Last name" onChange={(e) => setLastName(e.target.value)} />
                    <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Create account</button>
                </form>
            </div>
        </div>
        <div className="signup-footer">
            <p>Copyright © 1995-2026 eBuy Inc. All Rights Reserved. </p>
            </div></>
    )
}

export default Signup