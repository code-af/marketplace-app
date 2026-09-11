import { useState, useEffect } from 'react'
import { doc, getDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore'
import { db, auth } from '../../firebase/config'
import { useAuth } from '../../context/Authcontext'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import './Profile.css'
function Profile(){
    const [activeTab, setActiveTab] = useState('listings')
    const [userListings, setUserListings] = useState([])
    const [userData, setUserData] = useState(null)
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    
    return <h1>Profile</h1>
}
export default Profile