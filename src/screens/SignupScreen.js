import { useNavigation } from '@react-navigation/native'
import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import { GeneralContext } from '../GeneralContext'

const SignupScreen = () => {
  const navigation = useNavigation()

  const {signupUsername, setSignupUsername} = useContext(GeneralContext)
  const {signupPassword, setSignupPassword} = useContext(GeneralContext)
  const {signupVerify, setSignupVerify} = useContext(GeneralContext)
  const {createUserAccount} = useContext(GeneralContext)

  const goToLogin = () => {
    navigation.navigate('LoginScreen')
  }

  return (
    <View>
      <View>
        <Text>Create Account</Text>
      </View>
      <View>
        <Text>Email</Text>
        <TextInput 
          placeholder='email'
          value={signupUsername}
          onChangeText={(value) => {setSignupUsername(value)}}
        />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput 
          secureTextEntry={true}
          placeholder='password'
          value={signupPassword}
          onChangeText={(value) => {setSignupPassword(value)}}
        />
      </View>
      <View>
        <Text>Verify Password</Text>
        <TextInput 
          secureTextEntry={true}
          placeholder='password'
          value={signupVerify}
          onChangeText={(value) => {setSignupVerify(value)}}
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => {createUserAccount()}}>
          <Text>Create Account</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => {goToLogin()}}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignupScreen