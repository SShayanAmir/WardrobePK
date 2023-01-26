import { View, Text } from 'react-native'
import React from 'react'

// Component Imports
import Navbar from '../components/Navbar'
import DashboardComponent from '../components/DashboardComponent'

import {useAuth0} from 'react-native-auth0';

const Dashboard = ({navigation}) => {

  const {user, authorize} = useAuth0()

  return (
  <>
    <Navbar />
    <DashboardComponent />
  </>
  )
}

export default Dashboard