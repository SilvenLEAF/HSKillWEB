import pinyin from "pinyin";
import { HSKWordInterface } from "../interfaces/HSKWordInterface";
import hsk4Words from './jsons/hsk4.json';

const sortedHsk4Words = hsk4Words.sort((a, b) => {
  const pinyinA = pinyin(a.hanzi, { style: 0 }).join(' ').toUpperCase();
  const pinyinB = pinyin(b.hanzi, { style: 0 }).join(' ').toUpperCase();
  return (pinyinA < pinyinB) ? -1 : (pinyinA > pinyinB) ? 1 : 0;
});
const hsk4: HSKWordInterface[] = [
  ...sortedHsk4Words,
]

export default hsk4;