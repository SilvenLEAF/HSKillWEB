import M from 'materialize-css'
import '../../styles/HSkill.scss';


import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/subContexts/AuthContext';




function Home() {
  useEffect(() => {
    M.AutoInit();
  }, [])




  const { userData } = useContext(AuthContext);

  return (
    <div className="container" >

      <div id="myLandingIcon"></div>
      <div className="myLandingContentHolder center">
        <h1 id="myLandingTitle" className="pageTitle">
          HSKiLL
        </h1>

        <div className="myLandingDescription">
          KiLL the HSK with your HSKill!!
        </div>

        <div className="myLandingBtnHolder">
          {
            userData ? (
              <Link to="/actionPage" className="btn myBtn waves-effect waves-light myLandingBtn" >
                Gamify
              </Link>
            ) : (
              <Link to="/signup" className="btn myBtn waves-effect waves-light myLandingBtn" >
                <i className="fas fa-biohazard"></i> Signup to Kill <i className="fas fa-biohazard"></i>
              </Link>
            )
          }
        </div>
      </div>




    </div>
  )
}

export default Home
