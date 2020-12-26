import React from 'react'
import { Caption, Text } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: { flex: 3 },
  captionContainer: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 30, height: 70 },
})

const ETFooter = ({ linkText, linkName, text }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.captionContainer}>
      <Caption style={styles.caption}>or</Caption>
      <Caption style={styles.caption}>
        {text}
        <Text onPress={() => navigation.navigate(linkName)}>{linkText}</Text>
      </Caption>
    </View>
  )
}

ETFooter.propTypes = {
  linkName: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  text: PropTypes.string,
}

ETFooter.defaultProps = {
  text: '',
}

export default ETFooter
