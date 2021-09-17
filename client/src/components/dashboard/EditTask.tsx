import M from 'materialize-css'



import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
 

import { AllTaskContext } from '../../contexts/subContexts/AllTaskContext'
import { Toast } from '../../helpers/MyAlerts';






interface useParamsInterface {
  id: string
}







function EditTask() {
  useEffect(()=>{
    M.AutoInit();
  }, []);

  
  const { allTasks, setAllTasks } = useContext(AllTaskContext)
  const { id } = useParams<useParamsInterface>();  
  const history = useHistory();

  const item = allTasks!.find( item => item._id == id);
  


  const [title, setTitle] = useState('');
  const [rank, setRank] = useState(item!.rank);

  
  const [error, setError] = useState('');


  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>)=>{
    e.preventDefault();

    const houseWorkObj: any = { houseWorkId: item!._id };
    if(title) houseWorkObj.title = title;
    if(rank) houseWorkObj.rank = rank;
    


    const response = await fetch('/houseWork', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(houseWorkObj)
    });

    const data = await response.json();

    console.log(data);

    if(data.error){
      
      setError(data.msg);

    } else {
      setTitle('');

      Toast.fire({
        icon: 'success',
        title: 'Your task is updated!'
      })

      setTimeout(()=>{
        history.push('/dashboard');
      }, 3000)

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
    <div className="container" >
      <form onSubmit= { handleSubmit } className="myDefaultForm" >
        <h4 className="myDefaultFormName" >Edit Housework</h4>






        <div className="myInputHolder">            
          <label htmlFor="title">Title <span className="grey-text">(Optional)</span></label>
          <div>
            <i className="myPrefix far fa-address-card"></i>
            <input type="text" name="contactTitle" value={ title } onChange={ e=> setTitle(e.target.value) } placeholder={ item!.title } />
          </div>
        </div>







        <div className="myInputHolder">
        <label htmlFor="content">Rank of the task <span className="grey-text">(Optional)</span></label>
          <div>
            <i className="myPrefix fa fa-edit">Rank</i>
            

                       
            <select value={ rank } onChange={ e=> setRank(e.target.value) } >
              <option value="silver" >Silver</option>
              <option value="gold" >Gold</option>
              <option value="platinum" >Platinum</option>
            </select>
            <label>Materialize Select</label>

          </div>
        </div>






        <div className="input-field myBtnsHolder right-align">
          <button type="submit" className= "btn myBtn waves-effect waves-light">
            Edit <i className="fa fa-edit"></i>
          </button>
          
          <Link to="/dashboard" className= "btn mySecondaryBtn waves-effect waves-light">
            Back <i className="fa fa-arrow-left"></i>
          </Link>
        </div>



        
      </form>
    </div>
  )
}

export default EditTask
