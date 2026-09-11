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
    useEffect(() => {  // Fetching user data from firestore db
        if(currentUser) {
            getDoc(doc(db, 'users', currentUser.uid))
                .then(docSnap => {
                    if(docSnap.exists()) {
                        setUserData(docSnap.data())
                    }
                })
        }
    }, [currentUser])
    useEffect(() => {  // Fetching user listings from firestore db
        if(currentUser) {
            const q = query(
                collection(db, 'listings'),
                where('uid', '==', currentUser.uid)
            )
            getDocs(q).then(snapshot => {
                const listings = []
                snapshot.forEach(doc => {
                    listings.push({ id: doc.id, ...doc.data() })
                })
                setUserListings(listings)
            })
        }
    }, [currentUser])

    return <h1>Profile</h1>
}
export default Profile