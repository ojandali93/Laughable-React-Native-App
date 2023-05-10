import React, {useEffect, useContext} from 'react'
import {View, Text, FlatList, Modal, StyleSheet, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { auth } from '../../firebase'
import { GeneralContext } from '../GeneralContext';

const ProfileScreen = () => {3
  const navigation = useNavigation()

  const {logoutUser} = useContext(GeneralContext)
  const {currentFavorites} = useContext(GeneralContext)
  const {removeFromFavorites} = useContext(GeneralContext)

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
    <View style={styles.window}>
      <View>
        <Text style={styles.header}>Your Saved Jokes:</Text>
      </View>
      <FlatList
        data={currentFavorites}
        keyExtractor={item => item.jokeId}
        renderItem={(item) => {
          console.log(item)
          return(
            <View style={styles.joke}>
              <View>
                <Text style={styles.text}><Text style={styles.label}>Question:</Text> {item.item.joke.setup}</Text>
              </View>
              <View>
                <Text style={styles.text}><Text style={styles.label}>Answer:</Text> {item.item.joke.punchline}</Text>
              </View>
              <View style={styles.engagement}>
                <Text>
                  Likes: {item.item.joke.likesCount} 
                </Text>
              </View>
            </View>
          )
        }}
      />
      <TouchableOpacity style={{paddingTop: 16}} onPress={() => {logoutUser()}}>
        <Text style={[styles.text, {color: 'red'}]}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  window: {
    padding: 8
  },
  joke: {
    paddingVertical: 8,
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  },
  label: {
    fontWeight: 'bold'
  },
  text: {
    fontSize: 18
  },
  like: {
    marginLeft: 8,
  },
  engagement: {
    height: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  seachBar: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  search: {
    fontSize: 16,
    backgroundColor: 'lightgrey',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    width: '50%',
    marginLeft: 8
  },
  engagement: {
    height: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 28
  }
})

export default ProfileScreen