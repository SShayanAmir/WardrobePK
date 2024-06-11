import {useContext, useEffect, useRef} from 'react';
import {View, ScrollView, Button, Pressable, Text} from 'react-native';
import Brands from '../components/Brands';
import Carousel from '../components/Carousel';

// Component Imports
import Navbar from '../components/Navbar';
import Categories from '../components/Categories';

import CartContext from '../context/CartContext';
import FavoritesContext from '../context/FavoritesContext';
import CategoryContext from '../context/CategoryContext';
import PopularProducts from '../components/PopularProducts';
import TopBrands from '../components/TopBrands';
import ScrollToTopContext from '../context/ScrollToTop';

import AsyncStorage from "@react-native-async-storage/async-storage"

const Home = ({navigation}) => {
  const { setBrand, setCategory } = useContext(CategoryContext);
  const { getCartList, setCart, setFirstTimeCheckerForCart} = useContext(CartContext)
  const { getFavoriteList, setFavorite, setFirstTimeCheckerForFavorites } = useContext(FavoritesContext)
  const { scrollToTop, setScrollToTop } = useContext(ScrollToTopContext)

  const scroll = useRef(null)

  useEffect(() => {
    async function tempFunction(){
      
      const data = await AsyncStorage.getItem("@firstTimeCheckerForCart")
      const output = await JSON.parse(data)
      setFirstTimeCheckerForCart(output)

      if(output === null || output){
        setCart([])
      } else {
        await getCartList()
      }

      const data2 = await AsyncStorage.getItem("@firstTimeCheckerForFavorites")
      const output2 = await JSON.parse(data2)
      setFirstTimeCheckerForCart(output2)

      if(output2 === null || output2){
        setFavorite([])
        console.log("first one worked (Favorites)")
      } else{
        await getFavoriteList()
        console.log("second one worked (Favorites)")
      }
    }
    tempFunction();
    return () => {};
  }, [])


  return (
    <View>
      <Navbar />
      <ScrollView ref={scroll} showsVerticalScrollIndicator={false} bounces={false}>
        <Carousel />
        <TopBrands />
        <Brands
          navigateToProductScreen={brand => {
            setBrand(brand);
            setCategory("");
            navigation.navigate('ProductPage');
          }}
        />
        <Categories />
        <PopularProducts />
          {scrollToTop && <Pressable className='bg-gray-800 rounded-t-3xl items-center mb-28' onPress={() => scroll.current.scrollTo({x:0, y:0, animated: true})}>
            <Text className='text-white text-lg font-bold p-5'>Move to top</Text>
          </Pressable>}
      </ScrollView>
    </View>
  );
};

export default Home;
