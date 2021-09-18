import M from 'materialize-css'
import '../../styles/CardGrid.scss';


import React, { MouseEventHandler, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import pinyin from 'pinyin';
import { Textfit } from 'react-textfit';

import { AuthContext } from '../../contexts/subContexts/AuthContext';
import { HSKContext } from '../../contexts/subContexts/HSKContext';
import Controller from './Controller';

import useSound from 'use-sound'
import navAudio from '../../sounds/sound-1.wav';
import reverseAudio from '../../sounds/sound-6.wav';
import MyLoader from '../../helpers/MyLoader';
import { getWordListByIndex } from '../../DATA/getWordList';


function CardGrid(props: any) {
  useEffect(() => {
    M.AutoInit();
  }, [])

  const wordListIndex = props.match.params.index;

  const [playNavSound] = useSound(navAudio);
  const [playShuffleSound] = useSound(reverseAudio);
  const [playReverseSound] = useSound(reverseAudio);


  const { userData } = useContext(AuthContext);
  const { words } = useContext(HSKContext);

  const [isMute, setIsMute] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  // const [wordListType, setWordListType] = useState<("hsk3" | "hsk4" | "hsk5")>(wordListArray[0].type);
  const [wordList, setWordList] = useState(getWordListByIndex(wordListIndex));

  const [rangeLower, setRangeLower] = useState(0);
  const [rangeUpper, setRangeUpper] = useState(wordList.length);

  const [wordIndex, setWordIndex] = useState(!isReversed ? 0 : wordList.length - 1);
  const word = wordList[wordIndex];

  const reverseWordList = () => {
    !isMute && playReverseSound();
    setIsReversed(!isReversed);
    setWordIndex(isReversed ? 0 : wordList.length - 1);
  }
  const randomWordList = () => {
    !isMute && playShuffleSound();
    setIsRandom(!isRandom);
    setWordList(
      !isRandom ? wordList.sort((a, b) => {
        const pinyinA = pinyin(a.hanzi, { style: 0 }).join(' ').toUpperCase();
        const pinyinB = pinyin(b.hanzi, { style: 0 }).join(' ').toUpperCase();
        return (pinyinA < pinyinB) ? -1 : (pinyinA > pinyinB) ? 1 : 0;
      }) : wordList.sort(() => (Math.random() > .5) ? 1 : -1)
    );
  }

  const [isMainHidden, setIsMainHidden] = useState(false);

  const cardTouched = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    !isMute && playNavSound();

    el.classList.toggle('hanziTouched')

  }
  
  const cardSelectedAsHard = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    !isMute && playNavSound();

    el.classList.toggle('cardIsHard')

  }

  const switchPage = () => {
    !isMute && playNavSound()
  }

  const switchMute = () => {
    isMute && playShuffleSound();
    !isMute && window.navigator.vibrate(300);
    setIsMute(!isMute);
  }

  return (
    <>
      <div className="gridCardsBtnHolder">
        <button className="btn-floating myComplementThemeColorBG"><i className={`fa fa-microphone${isMute ? '-slash' : ''}`} onClick={switchMute}></i></button>
        <Link to="/" className={`btn-floating myThemeColorBG`} onClick={switchPage}><i className="fas fa-paw"></i></Link>
        <button className="btn-floating myComplementThemeColorBG disabled"><i className="fas fa-radiation"></i></button>
      </div>
      <div className="gridCardsBtnHolder" style={{ marginTop: '20px' }}>
        <button className="btn-floating myComplementThemeColorBG disabled"><i className="fas fa-skull"></i></button>
        <Link to="/" className={`btn-floating myThemeColorBG disabled`} onClick={switchPage}><i className="fas fa-eye"></i></Link>
        <button className="btn-floating myThemeColorBG" onClick={randomWordList}>
          <i className={isRandom ? 'fa fa-random' : 'fab fa-buffer'}></i>
        </button>
      </div>
      <p className="collectionStage center">{`HSK${Number(wordListIndex) + 1}: Total ${wordList.length}`}</p>
      <div className="cardsHolder">
        {
          !wordList[0] ? (
            <div className="myLoaderPageHolder">
              <MyLoader />
            </div>
          ) :
            wordList.map((item, index) => (

              <div className="gridCard card" key={index} onClick={(e) => cardTouched(e)} onDoubleClick={cardSelectedAsHard}>
                <Textfit className="gridCardHanzi">{item.hanzi}</Textfit>
                <p className="gridCardpinyin">{pinyin(item.hanzi).join(' ')}</p>
              </div>
            ))

        }


      </div>
    </>
  )
}

export default CardGrid
