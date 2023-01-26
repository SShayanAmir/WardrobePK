import React, { createContext, useState } from 'react'

const CategoryContext = createContext();   

export function Category({children}) {
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
 
  return (
      <CategoryContext.Provider value={{brand, setBrand, category, setCategory}}>
        {children}
      </CategoryContext.Provider>
    )
}

export default CategoryContext;