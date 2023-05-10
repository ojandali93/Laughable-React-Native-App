import { useNavigation } from '@react-navigation/native'
import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import { GeneralContext } from '../GeneralContext'

const LoginScreen = () => {
  const navigation = useNavigation()

  const {loginUsername, setLoginUsername} = useContext(GeneralContext)
  const {loginPassword, setLoginPassword} = useContext(GeneralContext)
  const {loginUser} = useContext(GeneralContext)

  const goToSignup = () => {
    navigation.navigate('SignupScreen')
  }

  return (
    <View>
        <View>
          <View>
            <Text>Login Below</Text>
          </View>
          <View>
            <Text>Email</Text>
            <TextInput 
              placeholder='Username'
              value={loginUsername}
              onChangeText={(value) => {setLoginUsername(value)}}
            />
          </View>
          <View>
            <Text>Password</Text>
            <TextInput 
              secureTextEntry={true}
              placeholder='Password'
              value={loginPassword}
              onChangeText={(value) => {setLoginPassword(value)}}
            />
          </View>
          <TouchableOpacity onPress={() => {loginUser()}}>
            <Text>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {goToSignup()}}>
            <Text>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default LoginScreen