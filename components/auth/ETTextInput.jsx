import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
  },
})

const ETTextInput = ({ onChangeText, label, icon, value, secureTextEntry, error }) => {
  const onChange = (newValue) => {
    onChangeText(newValue)
  }

  return (
    <TextInput
      label={label}
      style={styles.input}
      value={value}
      onChangeText={onChange}
      secureTextEntry={secureTextEntry}
      right={icon ? <TextInput.Icon name={() => <Icon name={icon} size={20} color="#fff" />} /> : null}
      error={error}
    />
  )
}

ETTextInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  value: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  error: PropTypes.bool,
}

ETTextInput.defaultProps = {
  icon: '',
  value: '',
  secureTextEntry: false,
  error: false,
}

export default ETTextInput
