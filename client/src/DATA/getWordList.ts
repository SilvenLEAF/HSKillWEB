import { HSKStageIndex, HSKStageName, HSKWordInterface } from "../interfaces/HSKWordInterface";
import hsk1 from "./hsk1";
import hsk2 from "./hsk2";
import hsk3 from "./hsk3";
import hsk4 from "./hsk4";
import hsk5 from "./hsk5";

export const hskWordList = {
  hsk1, hsk2, hsk3, hsk4, hsk5,
}

export const wordListArray: { type: HSKStageName, words: HSKWordInterface[] }[] = [
  { type: 'hsk1', words: hsk1 },
  { type: 'hsk2', words: hsk2 },
  { type: 'hsk3', words: hsk3 },
  { type: 'hsk4', words: hsk4 },
  { type: 'hsk5', words: hsk5 },
]


export const getWordList = (type: HSKStageName) => {
  return {
    type,
    words: hskWordList[type],
  }
} 

export const getWordListByIndex = (index: HSKStageIndex) => {
  return wordListArray[index].words;
} 