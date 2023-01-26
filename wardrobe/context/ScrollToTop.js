import React, { createContext, useState } from 'react'

const ScrollToTopContext = createContext();   

export function ScrollToTop({children}) {
  const [scrollToTop, setScrollToTop] = useState(false)
 
  return (
      <ScrollToTopContext.Provider value={{scrollToTop, setScrollToTop}}>
        {children}
      </ScrollToTopContext.Provider>
    )
}

export default ScrollToTopContext;