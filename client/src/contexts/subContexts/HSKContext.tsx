import React, { createContext, useState } from 'react'
import hsk4 from '../../DATA/hsk4';
import { HSKWordInterface } from '../../interfaces/HSKWordInterface';



interface HSKContextInterface {
  words: {
    hsk4: HSKWordInterface[]
  },
  updators?: {
    updateHsk4: Function,
  }
}



export const HSKContext = createContext({} as HSKContextInterface);


interface propsInterface {
  children: React.ReactNode
}




function HSKContextProvider(props: propsInterface) {
  const [hsk4WordList, setHsk4WordList] = useState<HSKWordInterface[]>(hsk4);

  const words = {
    hsk4: hsk4WordList,
  }
  return (
    <HSKContext.Provider value={{ words }} >
      { props.children }
    </HSKContext.Provider>
  )
}

export default HSKContextProvider
