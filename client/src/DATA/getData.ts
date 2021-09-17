import pinyin from 'pinyin';
import hsk4 from './hsk4';

export const getWords = ({ isRandom }: { isRandom: boolean }) => {
  const words = hsk4;
  return !isRandom ? words.sort((a, b) => {
    const pinyinA = pinyin(a.hanzi, { style: 0 }).join(' ').toUpperCase();
    const pinyinB = pinyin(b.hanzi, { style: 0 }).join(' ').toUpperCase();
    return (pinyinA < pinyinB) ? -1 : (pinyinA > pinyinB) ? 1 : 0;
  }) : words.sort(() => (Math.random() > .5) ? 1 : -1)
}
