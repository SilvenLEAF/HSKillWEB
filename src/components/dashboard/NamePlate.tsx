import '../../styles/profile/Profile.scss'


import React, { useContext } from 'react'
 




import { AuthContext } from '../../contexts/subContexts/AuthContext';
import UserDataInterface from '../../interfaces/UserDataInterface';



function NamePlate() {
    
  
  const { userData } = useContext(AuthContext);
    

  return (
    <div className="container myProfilePage" >
      <div className="mainProfileIcon" style={{background: `url(${ userData!.profileImage || "/Logo.png" }) center/cover`}} ></div>
      
      <div className="myProfileMainHeader">
        <div className="myProfileUserName">{ userData!.username }</div>
        <div className="myProfileTitle red-text" >LEVEL { Math.max(1, Math.floor(userData!.score!/1000)) }</div>
        <div className="myProfileTitle green-text" >XP { userData!.score }</div>
        <div className="myProfileLocation">Task Completed { userData!.taskCompleted } </div>
      </div>



    </div>
  )
}

export default NamePlate
