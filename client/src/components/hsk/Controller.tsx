import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import useSound from 'use-sound';
import eyeAudio from '../../sounds/sound-5.wav';
import sliceAudio from '../../sounds/sound-4.wav';
import reverseAudio from '../../sounds/sound-6.wav';


import pinyin from 'pinyin';

import { AuthContext } from '../../contexts/subContexts/AuthContext';
import { HSKContext } from '../../contexts/subContexts/HSKContext';

import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { getWords } from '../../DATA/getData';
import { getWordList, getWordListByIndex, hskWordList } from '../../DATA/getWordList';

const WordListSlider = ({ storeRangeVal, lower, upper, min, max }: { storeRangeVal: any, lower: any, upper: any, min: number, max: number }) => (
  <Nouislider
    behaviour="tap"
    range={{ min, max }}
    start={[min, max]} connect
    onChange={storeRangeVal}

  />
);



interface propsInterface {
  wordList: any,
  setWordList: any,

  wordListIndex: any,
  setWordListIndex: any,

  wordIndex: any,
  setWordIndex: any,
  
  isMute: any,
  setIsMute: any,

  isMainHidden: any,
  setIsMainHidden: any,

  isRandom: any,
  randomWordList: any,

  isReversed: any,
  reverseWordList: any,

  rangeLower: any,
  rangeUpper: any,

  setRangeLower: any,
  setRangeUpper: any,
}

function Controller({
  isMainHidden, setIsMainHidden,
  isRandom, randomWordList,
  isReversed, reverseWordList,

  wordList, setWordList,
  isMute, setIsMute,
  wordListIndex, setWordListIndex,
  wordIndex, setWordIndex,

  rangeLower, setRangeLower,
  rangeUpper, setRangeUpper,
}: propsInterface) {

  const [playEyeSound] = useSound(eyeAudio);
  const [playSliceSound] = useSound(sliceAudio);
  const [playShuffleSound] = useSound(reverseAudio);
  const [playReverseSound] = useSound(reverseAudio);

  const [localLower, setLocalLower] = useState(rangeLower);
  const [localUpper, setLocalUpper] = useState(rangeUpper);

  const [isPawDisabled, setIsPawDisabled] = useState(true);
  const storeRangeVal = (render: any, handle: any, value: any, un: any, percent: any) => {
    setLocalLower(
      Math.floor(value[0])
    )
    setLocalUpper(
      Math.floor(value[1])
    )
    if (value[0] === value[1]) {
      setIsPawDisabled(true)
    } else {
      setIsPawDisabled(false)
    }
  }
  const sliceWords = () => {
    if (localLower !== rangeLower) setRangeLower(localLower);
    if (localUpper !== rangeUpper) setRangeUpper(localUpper);

    if ((localLower !== rangeLower || localUpper !== rangeUpper) && localLower !== localUpper) {
      !isMute && playSliceSound();
      setWordIndex(0);
      setWordList(
        wordList.slice(localLower, localUpper)
      );
      setIsPawDisabled(true);


    }

    console.log({ localLower, localUpper });
    console.log({ rangeLower, rangeUpper });
  }

  const switchMute = () => {
    !isMute && playShuffleSound();
    setIsMute(!isMute);
  }

  const chooseWordList = () => {
    !isMute && playShuffleSound();
    let updatedIndex;
    if (wordListIndex < Object.keys(hskWordList).length - 1 && wordListIndex >= 0) updatedIndex = wordListIndex + 1;
    else updatedIndex = 0;

    setWordListIndex(updatedIndex)
    setWordList(getWordListByIndex(updatedIndex))
  }


  return (
    <div className="container center" >


      <div className="hskCard card center">
        <div className="card-content">
          <div className="hskCardBtnHolder">
            <button className="btn-floating myThemeColorBG" onClick={randomWordList}>
              <i className={isRandom ? 'fa fa-random' : 'fab fa-buffer'}></i>
            </button>
            <button className="btn-floating myComplementThemeColorBG" onClick={() => { !isMute && playEyeSound(); setIsMainHidden(!isMainHidden) }}>
              <i className={`fa fa-${isMainHidden ? 'eye-slash' : 'eye'}`}></i>
            </button>
            <button className="btn-floating myThemeColorBG" onClick={reverseWordList}>
              <i className={`fa fa-${isReversed ? 'backward' : 'forward'}`}></i>
            </button>
          </div>

          <div className="wordListSliderHolder">
            <WordListSlider
              storeRangeVal={storeRangeVal}
              lower={localLower} upper={localUpper}
              min={0} max={wordList.length}
            />
          </div>

          <div className="wordListSliderVal">{ `HSK${wordListIndex + 1}`.toUpperCase() }: { localLower !== wordList.length ? localLower + 1 : localLower }/{localUpper}</div>
          <div className="hskCardBtnHolder">
            <button className="btn-floating myComplementThemeColorBG"><i className={`fa fa-microphone${ isMute ? '-slash' : ''}`} onClick={switchMute}></i></button>
            <button className={`btn-floating myThemeColorBG ${ isPawDisabled ? 'disabled' : '' }`}><i className="fas fa-paw" onClick={sliceWords}></i></button>
            <button className="btn-floating myComplementThemeColorBG"><i className="fas fa-list" onClick={chooseWordList}></i></button>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Controller
