import React from 'react'
import AllUserContextProvider from './subContexts/AllUserContext'
import AllTaskContextProvider from './subContexts/AllTaskContext'
import HSKContextProvider from './subContexts/HSKContext'
import CollectionContextProvider from './subContexts/CollectionContext'



interface propsInterface {
  children: React.ReactNode
}



function RootContext(props: propsInterface) {
  return (
    <>
      <CollectionContextProvider>
        <HSKContextProvider>
          <AllUserContextProvider>
            <AllTaskContextProvider>

              {props.children}

            </AllTaskContextProvider>
          </AllUserContextProvider>
        </HSKContextProvider>
      </CollectionContextProvider>

    </>
  )
}

export default RootContext
