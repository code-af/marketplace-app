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
    const handleLogout = () => {
        signOut(auth).then(() => navigate('/login'))
    }
    if(!currentUser) {
        navigate('/login')
        return null
    }
    if(!userData) return <p>Loading...</p>

    return (
    <div className="profile-page"> {/* Parent div container for profile page */}
        <div className="user-card"> {/* user card section for showing user details */}
            <div className="avatar">
                {userData.firstName?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
                <h2>{userData.firstName} {userData.lastName}</h2>
                <p>Member since {userData.createdAt}</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
            <div className="control-bar"> {/* Tab section to switch between user listing or user about */}
                <span className={activeTab === 'listings' ? 'active-tab' : ''}
                    onClick={() => setActiveTab('listings')}>
                    My Listings</span>
                <span className={activeTab === 'about' ? 'active-tab' : ''}
                    onClick={() => setActiveTab('about')}>
                    About</span>
            </div>
            <div className="parent-content">{/* Parent content section */}
                {activeTab === 'listings' ? (
                    <div className="user-listings">
                        <h2>My Listings</h2>
                        {userListings.length === 0
                            ? <p>No listings yet</p>
                            : userListings.map(listing => (
                                <div key={listing.id} className="listing-card">
                                    <img src={listing.imageUrl} alt={listing.title} />
                                    <div>
                                        <h3>{listing.title}</h3>
                                        <p>${listing.price}</p>
                                        <p>{listing.category}</p>
                                    </div>
                                    <button onClick={() => {
                                        deleteDoc(doc(db, 'listings', listing.id))
                                            .then(() => {
                                                setUserListings(userListings.filter(l => l.id !== listing.id))
                                            })
                                    }}>Delete</button>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className="about-section">
                        <h2>About</h2>
                        <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Member since:</strong> {userData.createdAt}</p>
                    </div>
                )}
            </div>
    </div>
    )
}
export default Profile