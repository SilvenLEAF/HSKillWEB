import M from 'materialize-css'


import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import NamePlate from './NamePlate';
import TaskList from './TaskList';
 
 

import { AuthContext } from '../../contexts/subContexts/AuthContext';




function Dashboard() {
  useEffect(()=>{
    M.AutoInit();    
  }, [])

  
  const { userData } = useContext(AuthContext);
  const history = useHistory();

  if(!userData) history.push('/login');
  if(userData && !userData.isVerified) history.push('/verifyDoor');
  
  return (
    <>      
      <NamePlate/>
      <TaskList/>
    </>
  )
}

export default Dashboard
