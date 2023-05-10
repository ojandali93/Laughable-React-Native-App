import React, { createContext, useState } from 'react';
import { createUserWithEmailAndPassword, signOut,
          signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

import { auth } from '../firebase';

export const GeneralContext = createContext(null)

export const GeneralContextProvider = ({children}) => {
  const navigation = useNavigation()

  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [signupUsername, setSignupUsername] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupVerify, setSignupVerify] = useState('')

  const createUserAccount = () => {
    signupPassword === signupVerify 
      ? createUser() 
      : console.log('issue')
  }

  const createUser = () => {
    console.log('creating user')
    createUserWithEmailAndPassword(auth, signupUsername, signupPassword)
    .then((userCredential) => {
      setSignupPassword('')
      setSignupVerify('')
      setSignupUsername('')
      goToProfile()
    })
    .catch((error) => {
      alert(error.message)
    });
  }

  const loginUser = () => {
    signInWithEmailAndPassword(auth, loginUsername, loginPassword)
      .then((credentials) => {
        setLoginUsername('')
        setLoginPassword('')
        goToProfile()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('LoginScreen') 
      }).catch((error) => {
        console.log(error)
      });
  }

  const goToProfile = () => {
    navigation.navigate('ProfileScreen')
  }

  return(
    <GeneralContext.Provider value={{loginUsername,
                                    loginPassword,
                                    signupUsername,
                                    signupPassword,
                                    signupVerify,
                                    setLoginUsername,
                                    setLoginPassword,
                                    setSignupUsername,
                                    setSignupPassword,
                                    setSignupVerify,
                                    createUserAccount,
                                    loginUser,
                                    logoutUser}}>
      {children}
    </GeneralContext.Provider>
  )

}
