import React from 'react'
import { Link } from 'react-router-dom'






function SignedInFooterLinks() {
  return (
    <>
     



      
     <div>
        <div className="myFooterIcons">
          <Link to="/dashboard" >
          <i className="fas fa-dice-d20"></i> Tasks
          </Link>
        </div>          
      </div>
      
    


      <div>
        <div className="myFooterIcons">
          <Link to="/actionPage" >
          <i className="fa fa-cogs"></i> Gamify
          </Link>
        </div>          
      </div>



      <div>
        <div className="myFooterIcons">
          <Link to="/profile" >
          <i className="fa fa-user"></i> Profile
          </Link>
        </div>          
      </div>




      

    
  





 
    </>
  )
}

export default SignedInFooterLinks
