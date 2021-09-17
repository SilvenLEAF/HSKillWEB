import pinyin from "pinyin";
import { HSKWordInterface } from "../interfaces/HSKWordInterface";
import hsk3Words from './jsons/hsk3.json';

const sortedHsk3Words = hsk3Words.sort((a, b) => {
  const pinyinA = pinyin(a.hanzi, { style: 0 }).join(' ').toUpperCase();
  const pinyinB = pinyin(b.hanzi, { style: 0 }).join(' ').toUpperCase();
  return (pinyinA < pinyinB) ? -1 : (pinyinA > pinyinB) ? 1 : 0;
});
const hsk3: HSKWordInterface[] = [
  ...sortedHsk3Words,
]

export default hsk3;