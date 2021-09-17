import pinyin from "pinyin";
import { HSKWordInterface } from "../interfaces/HSKWordInterface";
import hsk2Words from './jsons/hsk2.json';

const sortedHsk2Words = hsk2Words.sort((a, b) => {
  const pinyinA = pinyin(a.hanzi, { style: 0 }).join(' ').toUpperCase();
  const pinyinB = pinyin(b.hanzi, { style: 0 }).join(' ').toUpperCase();
  return (pinyinA < pinyinB) ? -1 : (pinyinA > pinyinB) ? 1 : 0;
});
const hsk2: HSKWordInterface[] = [
  ...sortedHsk2Words,
]

export default hsk2;