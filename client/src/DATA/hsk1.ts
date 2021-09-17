import pinyin from "pinyin";
import { HSKWordInterface } from "../interfaces/HSKWordInterface";
import hsk1Words from './jsons/hsk1.json';

const sortedHsk1Words = hsk1Words.sort((a, b) => {
  const pinyinA = pinyin(a.hanzi, { style: 0 }).join(' ').toUpperCase();
  const pinyinB = pinyin(b.hanzi, { style: 0 }).join(' ').toUpperCase();
  return (pinyinA < pinyinB) ? -1 : (pinyinA > pinyinB) ? 1 : 0;
});
const hsk1: HSKWordInterface[] = [
  ...sortedHsk1Words,
]

export default hsk1;