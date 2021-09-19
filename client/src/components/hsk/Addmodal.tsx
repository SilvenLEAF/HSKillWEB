import M from 'materialize-css'
import './../../styles/Form.scss'


import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import pinyin from 'pinyin';


import useSound from 'use-sound'
import navAudio from '../../sounds/sound-1.wav';
import reverseAudio from '../../sounds/sound-6.wav';

import { getWordList, getWordListByIndex, wordListArray } from '../../DATA/getWordList';
import { HSKStageIndex, HSKWordInterface } from '../../interfaces/HSKWordInterface';
import { CollectionContext } from '../../contexts/subContexts/CollectionContext';


function Addmodal({ isMute, setIsMute, currentWord }: { isMute: boolean, setIsMute: Function, currentWord: HSKWordInterface }) {
  useEffect(() => {
    M.AutoInit();
  }, [])

  const [playNavSound] = useSound(navAudio);
  const [playShuffleSound] = useSound(reverseAudio);
  const [playReverseSound] = useSound(reverseAudio);

  const { collections, setCollections } = useContext(CollectionContext);

  const handleAdd = () => {
    !isMute && playNavSound();
    setIsMainHidden(!isMainHidden)
    setIsModelHidden(!isMainHidden)
  }

  const [isMainHidden, setIsMainHidden] = useState(false);
  const [isModelHidden, setIsModelHidden] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const createNewCollection = (e: React.MouseEvent<HTMLFormElement>,) => {
    e.preventDefault();

    !isMute && playNavSound();
    const el = e.currentTarget;

    const copyObj = { ...collections }
    copyObj[newCollectionName] = [currentWord];    

    setCollections(copyObj)
    setNewCollectionName('')
    console.log({ buttonContent: el.innerText });
  }
  const addCard = (e: React.MouseEvent<HTMLButtonElement>, collectionName: string, isHere: HSKWordInterface | undefined) => {
    !isMute && playNavSound();
    // console.log(e.targ)
    const el = e.currentTarget;

    const copyObj = { ...collections }
    const currentCollection = copyObj[collectionName];


    const indexInThisCollection = collections[collectionName].indexOf(currentWord);
    if (indexInThisCollection > -1) {
      currentCollection.splice(indexInThisCollection, 1);
    } else {
      currentCollection.push(currentWord);
    }

    setCollections(copyObj)
    console.log({ buttonContent: el.innerText });
  }
  return (
    <>
      <div id="addModal" className="modal">
        <div className="modal-content">
          <h4>Add {currentWord.hanzi}</h4>
          <div className="collectionBtnHolder">
            {
              Object.keys(collections).map((collection, index) => {
                const isHere = collections[collection].find((item: any) => item.hanzi === currentWord.hanzi);
                console.log({ isHere, collectionName: collection, value: collections[collection] })
                return (
                  <button key={index} className={`btn myCornerless ${isHere ? 'myComplementThemeColorBG' : 'mySecondaryBtn'}`} onClick={(e) => addCard(e, collection, isHere)}>{collection}</button>
                )
              })
            }
          </div>
        </div>
        <form onSubmit={createNewCollection} className="myDefaultForm" >
          <h6 className="myDefaultFormName" >Create NEW Collection</h6>

          <div className="myInputHolder">
            {/* <label htmlFor="email">Type your Email <span className="red-text">(Required)</span></label> */}
            <div>
              {/* <i className="myPrefix fa fa-envelope"></i> */}
              <input type="text" name="newCollectionName" value={newCollectionName} onChange={e => setNewCollectionName(e.target.value)} required placeholder="Type your collection name..." />
            </div>
          </div>

          <div className="input-field right-align">
            <span className="modal-close btn mySecondaryBtn waves-effect waves-light">
              Close
            </span>
            <button type="submit" className="btn myBtn waves-effect waves-light">
              <i className="fa fa-plus"></i> NEW
            </button>

          </div>


          {/* <div className="myDefaultFormFooter">
          <p>Wanna know more about me?</p>
        </div> */}





        </form>
        {/* <div className="modal-footer">
          <button className="btn myComplementThemeColorBG myCornerless modal-close">Cancel</button>
        </div> */}
      </div>
    </>
  )
}

export default Addmodal
