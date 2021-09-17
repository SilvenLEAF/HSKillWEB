import M from 'materialize-css'
import '../../styles/HSKill.scss';


import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/subContexts/AuthContext';
import { HSKContext } from '../../contexts/subContexts/HSKContext';
import WordCard from './WordCard';




function HSKill() {
  useEffect(() => {
    M.AutoInit();
  }, [])




  const { userData } = useContext(AuthContext);
  const { words } = useContext(HSKContext);
  const wordlist = words.hsk4[0];

  return (
    <div className="container" >

      <WordCard />

    </div>
  )
}

export default HSKill
