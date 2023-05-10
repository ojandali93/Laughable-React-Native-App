import React, { useContext, useEffect, useState } from 'react'
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native'

import axios from 'axios'
import { options } from '../../rapidApi'
import { GeneralContext } from '../GeneralContext'
import { auth } from '../../firebase'

const HomeScreen = () => {

  const [jokes, setJokes] = useState([])

  const {addToFavorites, grabFavorites} = useContext(GeneralContext)
  const {currentFavoritesIds} = useContext(GeneralContext)
  const {removeFromFavorites} = useContext(GeneralContext)

  useEffect(() => {
    axios.request(options)
      .then((response) => {
        let selectedJokes = response.data.body.splice(0, 50)
        let displayJokes = []
        selectedJokes.forEach((currentJoke) => {
          currentJoke.likesCount = Math.round(Math.random(400) * 100)
          displayJokes.push(currentJoke)
        })
        setJokes(displayJokes)
        auth.currentUser === null
          ? null 
          : grabFavorites()
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <View style={styles.window}>
      <FlatList
        data={jokes}
        keyExtractor={item => item._id}
        renderItem={(item) => {
          return(
            <View style={styles.joke}>
              <View>
                <Text style={styles.text}><Text style={styles.label}>Question:</Text> {item.item.setup}</Text>
              </View>
              <View>
                <Text style={styles.text}><Text style={styles.label}>Answer:</Text> {item.item.punchline}</Text>
              </View>
              <View style={styles.engagement}>
                <Text>
                  Likes: {item.item.likesCount} 
                </Text>
                {
                  currentFavoritesIds.includes(item.item._id)
                      ?<TouchableOpacity onPress={() => {removeFromFavorites(item)}}>
                        <Text>Remove From Favorites</Text>
                      </TouchableOpacity>
                    : <TouchableOpacity  onPress={() => {addToFavorites(item)}}>
                        <Text>Add To Favorites</Text>
                      </TouchableOpacity>
                }
              </View>
            </View>
          )
        }}
      />
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
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default HomeScreen