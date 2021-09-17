import M from 'materialize-css'
import '../../styles/HSKill.scss';


import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import pinyin from 'pinyin';

import { AuthContext } from '../../contexts/subContexts/AuthContext';
import { HSKContext } from '../../contexts/subContexts/HSKContext';
import Controller from './Controller';

import useSound from 'use-sound'
import navAudio from '../../sounds/sound-1.wav';
import reverseAudio from '../../sounds/sound-6.wav';
import MyLoader from '../../helpers/MyLoader';
import { getWordList, getWordListByIndex, wordListArray } from '../../DATA/getWordList';
import { HSKStageIndex } from '../../interfaces/HSKWordInterface';


function WordCard() {
  useEffect(() => {
    M.AutoInit();
  }, [])

  const [playNavSound] = useSound(navAudio);
  const [playShuffleSound] = useSound(reverseAudio);
  const [playReverseSound] = useSound(reverseAudio);


  const { userData } = useContext(AuthContext);
  const { words } = useContext(HSKContext);

  const [isMute, setIsMute] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [wordListIndex, setWordListIndex] = useState<HSKStageIndex>(0);
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

  const goNext = () => {
    !isMute && playNavSound()
    setIsMainHidden(false)
    if (wordIndex < words.hsk4.length - 1) setWordIndex(wordIndex + 1)
    else setWordIndex(words.hsk4.length - 1)
  }
  const goPrev = () => {
    !isMute && playNavSound();
    setIsMainHidden(false)
    if (wordIndex > 0) setWordIndex(wordIndex - 1)
    else setWordIndex(0)
  }

  const [isMainHidden, setIsMainHidden] = useState(false);

  return (
    <>
      <div className="container center" >
        <div className="hskCard card center">
          <div className="card-image" onDoubleClick={() => setIsMainHidden(!isMainHidden)}>
            <div className="cardHanzi" style={{ display: isMainHidden ? 'none' : 'block' }}>{word.hanzi}</div>
            <div className="cardPinyin" style={{ display: !isMainHidden ? 'none' : 'block' }}>{pinyin(word.hanzi).join(' ') || word.pinyin}</div>
            <div className="cardMeaning" style={{ display: !isMainHidden ? 'none' : 'block' }}>{word.meaning}</div>
            {/* <a href="#" className="btn-floating halfway-fab"><i className="fa fa-plus"></i></a> */}
          </div>
          <div className="card-content">
            <p className="wordProgress">{`${ `HSK${wordListIndex + 1}`.toUpperCase() }: ${wordIndex + 1}/${wordList.length}`}</p>
            <div className="wordDescription">{ }</div>

            <div className="hskCardBtnHolder">
              <button className={`btn-floating myThemeColorBG ${wordIndex === 0 ? 'disabled' : ''}`} onClick={goPrev}>
                <i className="fa fa-arrow-left"></i>
              </button>
              <button className="btn-floating myComplementThemeColorBG disabled">
                <i className="fa fa-plus"></i>
              </button>
              <button className={`btn-floating myThemeColorBG ${wordIndex === wordList.length - 1 ? 'disabled' : ''}`} onClick={goNext}>
                <i className="fa fa-arrow-right"></i>
              </button>

            </div>
          </div>
        </div>


      </div>
      <Controller
        isMainHidden={isMainHidden} setIsMainHidden={setIsMainHidden}
        isRandom={isRandom} randomWordList={randomWordList}
        isReversed={isReversed} reverseWordList={reverseWordList}
        rangeLower={rangeLower} setRangeLower={setRangeLower}
        rangeUpper={rangeUpper} setRangeUpper={setRangeUpper}
        wordList={wordList} setWordList={setWordList}
        isMute={isMute} setIsMute={setIsMute}
        wordListIndex={wordListIndex} setWordListIndex={setWordListIndex}
        wordIndex={wordIndex} setWordIndex={setWordIndex}
      />
    </>
  )
}

export default WordCard
