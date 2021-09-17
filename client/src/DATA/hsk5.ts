import pinyin from "pinyin";
import { HSKWordInterface } from "../interfaces/HSKWordInterface";
import hsk5Words from './jsons/hsk5.json';

const sortedHsk5Words = hsk5Words.sort((a, b) => {
  const pinyinA = pinyin(a.hanzi, { style: 0 }).join(' ').toUpperCase();
  const pinyinB = pinyin(b.hanzi, { style: 0 }).join(' ').toUpperCase();
  return (pinyinA < pinyinB) ? -1 : (pinyinA > pinyinB) ? 1 : 0;
});
const hsk5: HSKWordInterface[] = [
  ...sortedHsk5Words,
]

export default hsk5;