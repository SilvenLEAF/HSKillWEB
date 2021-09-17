import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import pinyin from 'pinyin';

import { AuthContext } from '../../contexts/subContexts/AuthContext';
import { HSKContext } from '../../contexts/subContexts/HSKContext';

import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { getWords } from '../../DATA/getData';

const WordListSlider = ({ storeRangeVal, lower, upper }: { storeRangeVal: any, lower: any, upper: any }) => (
  <Nouislider
    behaviour="tap"
    range={{ min: 0, max: 600 }}
    start={[lower, upper]} connect
    onChange={storeRangeVal}

  />
);



interface propsInterface {
  wordList?: any,
  setWordList?: any,

  isMainHidden?: any,
  setIsMainHidden?: any,

  isRandom?: any,
  randomWordList?: any,

  isReversed?: any,
  reverseWordList?: any,

  rangeLower?: any,
  rangeUpper?: any,

  setRangeLower?: any,
  setRangeUpper?: any,

  wordIndex?: any,
  words?: any,
  word?: any,
  goPrev?: any,
  goNext?: any,
}

function Controller({
  isMainHidden, setIsMainHidden,
  isRandom, randomWordList,
  isReversed, reverseWordList,

  wordList, setWordList,

  rangeLower, setRangeLower,
  rangeUpper, setRangeUpper,
  wordIndex, words, goPrev, goNext, word,
}: propsInterface) {


  const [localLower, setLocalLower] = useState(rangeLower);
  const [localUpper, setLocalUpper] = useState(rangeUpper);
  const storeRangeVal = (render: any, handle: any, value: any, un: any, percent: any) => {
    setLocalLower(
      Math.floor(value[0])
    )
    setLocalUpper(
      Math.floor(value[1])
    )
  }
  const sliceWords = () => {
    if (localLower !== rangeLower) setRangeLower(localLower);
    if (localUpper !== rangeUpper) setRangeUpper(localUpper);

    if ((localLower !== rangeLower || localUpper !== rangeUpper) && localLower !== localUpper) {
      setWordList(
        getWords({ isRandom: false }).slice(localLower, localUpper)
      )

      
    }

    console.log({ localLower, localUpper });
    console.log({ rangeLower, rangeUpper });
  }


  return (
    <div className="container center" >


      <div className="hskCard card center">
        <div className="card-content">
          <div className="hskCardBtnHolder">
            <button className="btn-floating red" onClick={randomWordList}>
              <i className={isRandom ? 'fa fa-random' : 'fab fa-buffer'}></i>
            </button>
            <button className="btn-floating red" onClick={() => { setIsMainHidden(!isMainHidden) }}>
              <i className={`fa fa-${isMainHidden ? 'eye-slash' : 'eye'} blue`}></i>
            </button>
            <button className="btn-floating red" onClick={reverseWordList}>
              <i className={`fa fa-${isReversed ? 'backward' : 'forward'}`}></i>
            </button>
          </div>

          <div className="wordListSliderHolder">
            <WordListSlider storeRangeVal={storeRangeVal} lower={localLower} upper={localUpper} />
          </div>

          <div className="wordListSliderVal">{localLower}/{localUpper}</div>
          <div className="">
            <button className="btn-floating myThemeColorBG"><i className="fas fa-paw" onClick={sliceWords}></i></button>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Controller
