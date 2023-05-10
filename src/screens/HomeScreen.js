import React, { useEffect, useState } from 'react'
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native'

import axios from 'axios'
import { options } from '../../rapidApi'

const HomeScreen = () => {

  const [jokes, setJokes] = useState([])

  useEffect(() => {
    axios.request(options)
      .then((response) => {
        console.log(response.data.body.slice(0, 50).length)
        let selectedJokes = response.data.body.splice(0, 50)
        setJokes(selectedJokes)
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
  }
})

export default HomeScreen