import React from 'react'
import { Snackbar } from 'react-native-paper'
import PropTypes from 'prop-types'

const ETSnackbar = ({ onDismiss, text = '', color = '#5CB85C' }) => (
  <Snackbar
    visible={Boolean(text)}
    duration={3000}
    onDismiss={onDismiss}
    style={{
      backgroundColor: color,
    }}
  >
    {text}
  </Snackbar>
)

ETSnackbar.propTypes = {
  onDismiss: PropTypes.func.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
}

export default ETSnackbar
