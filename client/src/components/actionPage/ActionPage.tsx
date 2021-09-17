import M from 'materialize-css'
import '../../styles/ActionPage.scss';


import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
 
 
import { Toast } from '../../helpers/MyAlerts';



function ActionPage() {
  useEffect(()=>{
    M.AutoInit();
  }, []);

  const history = useHistory();


  const [title, setTitle] = useState('');
  const [rank, setRank] = useState('silver');
  const [ description, setDescription] = useState('');
  
  const [error, setError] = useState('');


  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>)=>{
    e.preventDefault();

    const houseWorkObj: any = {};
    if(title) houseWorkObj.title = title;
    if(rank) houseWorkObj.rank = rank;


    const response = await fetch('/houseWork', {
      method: 'POST',
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
        title: 'Your task is gamified!'
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
        <h4 className="myDefaultFormName" >Gamify Housework</h4>






        <div className="myInputHolder">            
          <label htmlFor="title">Title <span className="red-text">(Required)</span></label>
          <div>
            <i className="myPrefix far fa-address-card"></i>
            <input type="text" name="contactTitle" value={ title } onChange={ e=> setTitle(e.target.value) } required placeholder="Write a boring task" />
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





        {/* <div className="myInputHolder">
        <label htmlFor="content">Description <span className="grey-text">(Optional)</span></label>
          <div>
            <i className="myPrefix fa fa-edit"></i>
            <textarea name="content" className= "materialize-textarea" value={ description } onChange={ e=> setDescription(e.target.value) } required ></textarea>
          </div>
        </div> */}






        <div className="input-field myBtnsHolder right-align">
          <button type="submit" className= "btn myBtn waves-effect waves-light" id= "myDownloadBtn">
            <i className="fa fa-cogs"></i> Gamify
          </button>
          
          <Link to="/dashboard" className= "btn mySecondaryBtn waves-effect waves-light" id= "myDownloadBtn">
            <i className="fa fa-list"></i> Tasks
          </Link>
        </div>


        {/* <div className="myDefaultFormFooter">
          <p>Wanna know more about me?</p>
          
          <p>
            <a target="_blank" rel="noopener noreferrer" href="https://silvenleaf.github.io" className="myThemeColorText">SilvenLEAF.github.io</a>
          </p>
        </div> */}




        
      </form>
    </div>
  )
}

export default ActionPage
