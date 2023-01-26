import React from 'react';

//REACT NATIVE AUTH0

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import Home from './screens/Home';
import Dashboard from './screens/Dashboard';
import Prodcut from './screens/Prodcut';
import ShoppingCart from './screens/ShoppingCart';
import Favorites from './screens/Favorites';
import TrackMyOrder from './screens/TrackMyOrder';
import Policies from './screens/Policies';

//  Context APIS
import {Category} from './context/CategoryContext';
import {CartHandler} from './context/CartContext'; 
import {FavoritesHandler} from './context/FavoritesContext';
import {ScrollToTop} from './context/ScrollToTop';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Category>
      <CartHandler>
        <FavoritesHandler>
          <ScrollToTop>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Dashboard"
                  component={Dashboard}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="ProductPage"
                  component={Prodcut}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="ShoppingCart"
                  component={ShoppingCart}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Favorites"
                  component={Favorites}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="TrackMyOrder"
                  component={TrackMyOrder}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Policies"
                  component={Policies}
                  options={{headerShown: false}}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ScrollToTop>
        </FavoritesHandler>
      </CartHandler>
    </Category>
  );
}
