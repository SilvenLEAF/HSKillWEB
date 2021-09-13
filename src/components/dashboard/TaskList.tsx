import M from 'materialize-css'
import '../../styles/profile/UserList.scss'
import '../../styles/dashboard/TaskList.scss'

import React, { useEffect, useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query'
 
 





import { AuthContext } from '../../contexts/subContexts/AuthContext'
import { AllTaskContext } from '../../contexts/subContexts/AllTaskContext'



import TaskListItem from './TaskListItem'
import MyLoader from '../../helpers/MyLoader';
import MyWelcome from '../../helpers/MyWelcome';






const getAllTasks = async ()=>{
  

  const allTaskRes = await fetch('/houseWork/all');
  const allTaskData = await allTaskRes.json();

  console.log(allTaskData);
  return allTaskData
}





function TaskList() {
  useEffect(()=>{
    M.AutoInit();
  }, [])





  const { userData, setUserData } = useContext(AuthContext)
  const { allTasks, setAllTasks } = useContext(AllTaskContext)
  const history = useHistory()
  


  const { isLoading, isError, data, error, status } = useQuery("allTasks", getAllTasks)
  if(data) setAllTasks(data);





  
  return (!allTasks || isLoading) ?  (
    <MyLoader/>
  ) : (
    <div className="container myUserListPage" >      
      <h6 className="blue-text">Clear tasks and Level up</h6>


      <ul>
        {
          !allTasks[0] && (               
            <MyWelcome title="No Task" />
          )          
          
        }



        {
          allTasks[0] ? allTasks.filter( item => item.rank.toLowerCase() === 'silver' ).map((item, index)=>{
            return <TaskListItem item={ item } score={ 100 } iconImage="/images/rank/silver.jpeg" key={ index } />
          }) : null
        }


        {
          allTasks[0] ? allTasks.filter( item => item.rank.toLowerCase() === 'gold' ).map((item, index)=>{
            return <TaskListItem item={ item } score={ 250 } iconImage="/images/rank/gold.jpeg" key={ index } />
          }) : null
        }

       

        {
          allTasks[0] ? allTasks.filter( item => item.rank.toLowerCase() === 'platinum' ).map((item, index)=>{
            return <TaskListItem item={ item } score={ 500 } iconImage="/images/rank/platinum.jpeg" key={ index } />
          }) : null
        }
      </ul>



    </div>
  )
}

export default TaskList
