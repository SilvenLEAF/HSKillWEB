import React from 'react'
import AllUserContextProvider from './subContexts/AllUserContext'
import AllTaskContextProvider from './subContexts/AllTaskContext'
import HSKContextProvider from './subContexts/HSKContext'



interface propsInterface {
  children: React.ReactNode
}



function RootContext(props: propsInterface) {
  return (
    <>
      <HSKContextProvider>
        <AllUserContextProvider>
          <AllTaskContextProvider>

            {props.children}

          </AllTaskContextProvider>
        </AllUserContextProvider>
      </HSKContextProvider>

    </>
  )
}

export default RootContext
