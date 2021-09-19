import React, { createContext, useState } from 'react'
import hsk4 from '../../DATA/hsk4';
import { HSKWordInterface } from '../../interfaces/HSKWordInterface';



interface CollectionContextInterface {
  collections: {
    [key: string]: HSKWordInterface[]
  },
  setCollections: Function,
}



export const CollectionContext = createContext({} as CollectionContextInterface);


interface propsInterface {
  children: React.ReactNode
}




function CollectionContextProvider(props: propsInterface) {
  const [defaultWordList, setDefaultWordList] = useState<HSKWordInterface[]>([])

  const defaultCollections = {
    default: [],
    Easy: [],
    Hard: [],
    Medium: [],
    '100 Easy': [],
  }
  const [collections, setCollections] = useState(defaultCollections)

  return (
    <CollectionContext.Provider value={{ collections, setCollections }} >
      { props.children }
    </CollectionContext.Provider>
  )
}

export default CollectionContextProvider
