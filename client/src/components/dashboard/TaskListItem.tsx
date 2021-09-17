import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'


import { Toast } from '../../helpers/MyAlerts';
import { AuthContext } from '../../contexts/subContexts/AuthContext'
import { AllTaskContext } from '../../contexts/subContexts/AllTaskContext';
import HouseWorkInterface from '../../interfaces/HouseWorkDataInterface';



interface propsInterface {
  item: HouseWorkInterface,
  score: number,
  iconImage: string
}





function TaskListItem(props: propsInterface) {

  const { item, score, iconImage } = props;
  
  const { userData, setUserData } = useContext(AuthContext);
  const { allTasks, setAllTasks } = useContext(AllTaskContext);
  const [error, setError] = useState('');

  const handleCompleted = async()=>{

    Toast.fire({
      icon: 'info',
      title: 'Please wait...'
    })   
    
    const response = await fetch('/houseWork/completed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ houseWorkId: item._id, score: score })
    });

    const data = await response.json();
    console.log(data);

    if(data.error) {
      setError(data.msg);
    } else {
      const itemIndex = allTasks!.findIndex(element => element._id == item._id);
      const allTaskList = allTasks!;
      allTaskList!.splice(itemIndex, 1);
      setAllTasks(...allTaskList);

      setUserData(data);      
      Toast.fire({
        icon: 'success',
        title: 'Task completed!'
      })      
    }

  }



  useEffect(()=>{
    if(error){
      Toast.fire({
        icon: 'error',
        title: error
      })
    }
  }, [error])

  return (
    <li>
    <div className="myUserProfileIcon" style={{background: `url(${ iconImage || "/Logo.png" }) center/cover` }}></div>
    <div>
      <div className="myUserName">
        {item.title}
      </div>

     

      
      <div className="myBtnsHolder myTaskListItemBtnsHolder right-align">
        
        <Link to={ "/editTask/" + item._id } className="btn mySecondaryBtn waves-effect waves-light myCornerless" >
          Edit <i className="fa fa-edit"></i>
        </Link>
        
        <button className="btn myBtn waves-effect waves-light myCornerless" onClick={ handleCompleted } >
          Done <i className="fa fa-check"></i>
        </button>
      </div>
    </div>

    

  </li>
  )
}

export default TaskListItem
