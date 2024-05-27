import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
  },
})

const ETNumericInput = ({ onChangeText, label, value = '', error = false, max = '0', disabled = false }) => {
  const onChange = (newValue) => {
    const parsedQty = Number.parseInt(newValue, 10)
    if (max && parsedQty > max) {
      onChangeText(`${max}`)
    } else {
      onChangeText(newValue)
    }
  }

  return (
    <TextInput
      label={label}
      style={styles.input}
      value={value}
      onChangeText={onChange}
      right={<TextInput.Affix text="SPH" />}
      keyboardType="numeric"
      returnKeyType="done"
      error={error}
      disabled={disabled}
    />
  )
}

ETNumericInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.bool,
  max: PropTypes.string,
  disabled: PropTypes.bool,
}

export default ETNumericInput
