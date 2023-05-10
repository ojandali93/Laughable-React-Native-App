import React, { useState } from 'react'
import {View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet} from 'react-native'

import axios from 'axios'

import { searchOption } from '../../rapidApi'

const SearchScreen = () => {

  const [search, setSearch] = useState('')
  const [jokes, setJokes] = useState('')

  const submitSearch = () => {
    searchOption.params.term = search
    axios.request(searchOption)
    .then((response) => {
        let selectedJokes = response.data.body.splice(0, 50)
        let displayJokes = []
        selectedJokes.forEach((currentJoke) => {
          currentJoke.likesCount = 0
          displayJokes.push(currentJoke)
        })
        setJokes(displayJokes)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  return (
    <View>
      <View style={styles.seachBar}>
        <TouchableOpacity onPress={submitSearch()}>
          <Text style={styles.text}>Start Searching:</Text>
        </TouchableOpacity>
        <TextInput style={styles.search} value={search} onChangeText={(value) => {setSearch(value)}}/>
      </View>
      <View>
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
                <View>
                  <Text>Likes: {item.item.likesCount}</Text>
                </View>
              </View>
            )
          }}
        />
      </View>
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
  }
})

export default SearchScreen