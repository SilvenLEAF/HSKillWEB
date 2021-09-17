import M from 'materialize-css'
import '../../styles/HSKill.scss';


import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import pinyin from 'pinyin';

import { AuthContext } from '../../contexts/subContexts/AuthContext';
import { HSKContext } from '../../contexts/subContexts/HSKContext';
import Controller from './Controller';




function WordCard() {
  useEffect(() => {
    M.AutoInit();
  }, [])




  const { userData } = useContext(AuthContext);
  const { words } = useContext(HSKContext);

  const [isReversed, setIsReversed] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [rangeLower, setRangeLower] = useState(10);
  const [rangeUpper, setRangeUpper] = useState(600);

  const [wordList, setWordList] = useState(words.hsk4);


  const [wordIndex, setWordIndex] = useState(!isReversed ? 0 : wordList.length - 1);
  const word = wordList[wordIndex];

  const reverseWordList = () => {
    setIsReversed(!isReversed);
    setWordIndex(isReversed ? 0 : wordList.length - 1);
  }
  const randomWordList = () => {
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
    setIsMainHidden(false)
    if (wordIndex < words.hsk4.length - 1) setWordIndex(wordIndex + 1)
    else setWordIndex(words.hsk4.length - 1)
  }
  const goPrev = () => {
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
            <p className="wordProgress">{`${wordIndex + 1}/${wordList.length}`}</p>
            <div className="wordDescription">{ }</div>

            <div className="hskCardBtnHolder">
              <button className={`btn-floating red ${wordIndex === 0 ? 'disabled' : ''}`} onClick={goPrev}>
                <i className="fa fa-arrow-left"></i>
              </button>
              <button className="btn-floating red">
                <i className="fa fa-plus blue"></i>
              </button>
              <button className={`btn-floating red ${wordIndex === wordList.length - 1 ? 'disabled' : ''}`} onClick={goNext}>
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
      />
    </>
  )
}

export default WordCard
