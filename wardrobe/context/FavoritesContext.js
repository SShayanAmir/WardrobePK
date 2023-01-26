import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesHandler({children}) {
    const [favorite, setFavorite] = useState([]);

    const addToFavorites = async (id, title, image1, image2, image3, price, category, brand, description, quantity) => {
            setFavorite(favorites => {
              if(favorites.some(item => item.id === id)) {
                  return favorite
              }
              else {
                setFavorite([...favorite, { id, title, image1, image2, image3, price, category, brand ,description, quantity}]);    
              }
            })
            const output = JSON.stringify(favorite)

            await AsyncStorage.setItem("@FavoriteList", output)
    }

    const getFavoriteList = async () => {
      try {
        const data = await AsyncStorage.getItem("@FavoriteList")
        const output = await JSON.parse(data)
        setFavorite(output)
      } catch (err) {
        console.log(err)
      }
    }
    
    const removeFromFavorites = async (FavoriteId) => {
      try {
        const data = await AsyncStorage.getItem("@FavoriteList")
        const output = await JSON.parse(data)

        alteredFavorites = output.filter((e) => e.id !== FavoriteId)

        await AsyncStorage.setItem("@FavoriteList", JSON.stringify(alteredFavorites))
        setFavorite(alteredFavorites)
      } catch (err) {
        console.error(err)
      }
    }
    
    return(
        <FavoritesContext.Provider value={{favorite, addToFavorites, removeFromFavorites, setFavorite, getFavoriteList}}>
            {children}
        </FavoritesContext.Provider>
    )
}

export default FavoritesContext;