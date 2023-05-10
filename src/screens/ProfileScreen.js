import React, {useEffect, useContext} from 'react'
import {View, Text, ViewBase, Modal, TextInput, TouchableOpacity} from 'react-native'
import { signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

import { auth, db } from '../../firebase'
import { GeneralContext } from '../GeneralContext';

const ProfileScreen = () => {3
  const navigation = useNavigation()

  const {logoutUser} = useContext(GeneralContext)

  useEffect(() => {
    auth.currentUser === null 
      ? navigation.navigate('LoginScreen')
      : null
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      auth.currentUser === null 
        ? navigation.navigate('LoginScreen')
        : null
    })
    return unsubscribe
  }, [navigation])


  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => {logoutUser()}}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen