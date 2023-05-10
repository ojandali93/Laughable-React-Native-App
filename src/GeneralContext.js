import React, { createContext, useState } from 'react';
import { createUserWithEmailAndPassword, signOut,
          signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

import { collection, addDoc, serverTimestamp, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const GeneralContext = createContext(null)

export const GeneralContextProvider = ({children}) => {
  const navigation = useNavigation()

  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [signupUsername, setSignupUsername] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupVerify, setSignupVerify] = useState('')

  const [currentFavorites, setCurrentFavorites] = useState([])
  const [currentFavoritesIds, setCurrentFavoritesIds] = useState([])

  const createUserAccount = () => {
    signupPassword === signupVerify 
      ? createUser() 
      : console.log('issue')
  }

  const createUser = () => {
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

  const addToFavorites = (item) => {
    auth.currentUser === null 
      ? null 
      : favoriteJoke(item)
  }

  const favoriteJoke = (item) => {
    const collectionRef = collection(db, 'Favorites')
    let newItem = {}
    newItem._id = item.item._id
    newItem.likesCount = item.item.likesCount
    newItem.setup = item.item.setup
    newItem.punchline = item.item.punchline
    newItem.type = item.item.type
    newItem.shareableLink = item.item.shareableLink
    addDoc(collectionRef, {
      'joke': newItem,
      'userId': auth.currentUser.uid,
      'jokeId': item.item._id,
      'createdAt': serverTimestamp()
    })
    .then((response) => {
      console.log('successfully added')
    })
    .catch((error) => {
      console.error(error)
    })
  }

  const grabFavorites = () => {
    auth.currentUser === null 
      ? null 
      : collectFavorites()
  }

  const collectFavorites = () => {
    const collectionRef = collection(db, 'Favorites')
    const q = query(collectionRef, where('userId', '==', auth.currentUser.uid))
    onSnapshot(q, (snapshot) => {
      let favoritesList = []
      snapshot.docs.forEach((doc) => {
        favoritesList.push({ ...doc.data(), id: doc.id })
      })
      setCurrentFavorites(favoritesList)
      grabZpidList(favoritesList)
    })
  }

  const grabZpidList = (favoritesList) => {
    let zpidList = []
    favoritesList.forEach((fav) => {
      zpidList.push(fav.jokeId)
    })
    setCurrentFavoritesIds(zpidList)
  }

  const removeFromFavorites = (item) => {
    let selectedFavorite
    currentFavorites.forEach((fav) => {
      fav.jokeId === item.item._id
        ? selectedFavorite = fav 
        : null 
    })
    const docRef = doc(db, 'Favorites', selectedFavorite.id)
    deleteDoc(docRef)
      .then((response) => {
        console.log('deleted favorite')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return(
    <GeneralContext.Provider value={{loginUsername,
                                    loginPassword,
                                    signupUsername,
                                    signupPassword,
                                    signupVerify,
                                    currentFavorites,
                                    currentFavoritesIds,
                                    setLoginUsername,
                                    setLoginPassword,
                                    setSignupUsername,
                                    setSignupPassword,
                                    setSignupVerify,
                                    createUserAccount,
                                    loginUser,
                                    logoutUser,
                                    addToFavorites,
                                    grabFavorites,
                                    removeFromFavorites}}>
      {children}
    </GeneralContext.Provider>
  )

}
