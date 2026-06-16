import React, { useEffect, useState } from 'react'

import axios from 'axios';
import Notification from '../common/Notification';
import AdminUsers from './AdminUsers';
import AdminDoctors from './AdminDoctors';
import AdminAppointments from './AdminAppointments';

const AdminHome = () => {
   const [userdata, setUserData] = useState({})
   const [activeMenuItem, setActiveMenuItem] = useState('');

   const getUserData = async () => {
      try {
         await axios.post('http://localhost:4000/api/user/getuserdata', {}, {
            headers: {
               Authorization: "Bearer " + localStorage.getItem('token')
            },
         });
      } catch (error) {
         console.log(error);
      }
   };
   const getUser = () => {
      const user = JSON.parse(localStorage.getItem('userData'))
      if (user) {
         
         setUserData(user)
      }

   }
   useEffect(() => {
      getUserData();
      getUser()
   }, []);

   const logout = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("userData")
      window.dispatchEvent(new Event('auth-changed'));
      window.location.href = "/"

   }

   const handleMenuItemClick = (menuItem) => {
      setActiveMenuItem(menuItem);
   };
   return (
      <>

         <div className='main'>
            <div className="layout">
               <div className="sidebar">
                  <div className="logo">
                     <h2>MediCareBook</h2>
                  </div>
                  <div className="menu">
                     <div className={`menu-items ${activeMenuItem === 'adminusers' ? 'active' : ''}`} onClick={() => handleMenuItemClick('adminusers')}>
                        <span className='menu-label'>Users</span>
                     </div>
                     <div className={`menu-items ${activeMenuItem === 'admindoctors' ? 'active' : ''}`} onClick={() => handleMenuItemClick('admindoctors')}>
                        <span className='menu-label'>Doctor</span>
                     </div>
                     <div className="menu-items">
                        <span className='menu-label' onClick={logout}>Logout</span>
                     </div>
                  </div>
               </div>
               <div className="content">
                  <div className="header">
                     <div className="header-content" style={{ cursor: 'pointer' }}>
                        <button type="button" className={`notify ${activeMenuItem === 'notification' ? 'active' : ''}`} onClick={() => handleMenuItemClick('notification')}>
                           Notifications{userdata?.notification ? ` (${userdata.notification.length})` : ''}
                        </button>

                        <h3>Hi..{userdata.fullName}</h3>
                     </div>
                  </div>
                  <div className="body">
                     {activeMenuItem === 'notification' && <Notification />}
                     {activeMenuItem === 'adminusers' && <AdminUsers />}
                     {activeMenuItem === 'admindoctors' && <AdminDoctors />}
                     {activeMenuItem !== 'notification' && activeMenuItem !== 'adminusers' && activeMenuItem !== 'admindoctors' && <AdminAppointments />}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default AdminHome;
