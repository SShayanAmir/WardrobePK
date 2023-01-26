import { createContext, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage"

const CartContext = createContext();

export function CartHandler({children}) {
    const [cart, setCart] = useState([]);
    const [grandTotalCartPrice, setGrandTotalCartPrice] = useState(null)

    const addToCart = async (id, title, image1, price, quantity, brand, size) => {
            setCart((carts) => {
              if(carts.some(item => item.id === id)) {
                return carts;
              }
              else {
                setCart([...cart, { id, title, image1, price, quantity, brand, size }]);    
              }
            })
          const output = JSON.stringify(cart)

          await AsyncStorage.setItem("@Cart_List", output)
        }

    const getCartList = async () => {
      try {
        const data = await AsyncStorage.getItem("@Cart_List")
        const output = await JSON.parse(data)
        setCart(output)
      } catch (err) {
        console.log(err)
      }
    }
    
    const removeFromCart = async (cartId) => {
      try {
        const data = await AsyncStorage.getItem("@Cart_List")
        const output = await JSON.parse(data)

        alteredCart = output.filter((e) => e.id !== cartId)

        await AsyncStorage.setItem("@Cart_List", JSON.stringify(alteredCart))
        setCart(alteredCart)
      } catch (err) {
        console.error(err)
      }

      // setCart((current) => current.filter((carts) => carts.id !== cartId))
    }

    const clearCart = async () => {
      try {
        await AsyncStorage.removeItem("@Cart_List")
        const data = []
        const output = JSON.stringify(data)
        await AsyncStorage.setItem("@Cart_List", output)
        setCart([])
      } catch (err) {
        console.error(err)
      }
    }
    
    return(
        <CartContext.Provider value={{cart, addToCart, removeFromCart, setCart, clearCart, grandTotalCartPrice, setGrandTotalCartPrice, getCartList}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;