import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, StyleSheet } from 'react-native'
import { Headline } from 'react-native-paper'

const styles = StyleSheet.create({
  headline: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const ETHeadline = () => (
  <View style={styles.headline}>
    <Icon name="dollar" size={40} color="#eaea3d" />
    <Headline>Emoney Transfer</Headline>
  </View>
)

export default ETHeadline
