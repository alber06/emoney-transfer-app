import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import firebase from 'firebase/compat/app'
import PropTypes from 'prop-types'
import { Button, Dialog, Portal, ActivityIndicator, Menu, TextInput, Colors } from 'react-native-paper'
import ETNumericInput from './transfer'
import useUser from '../utils/auth/useUser'
import ETSnackbar from './ETSnackbar'

const styles = StyleSheet.create({
  dropdownContainer: {
    marginBottom: 10,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
  },
  button: { flex: 1 },
})

const ETDialog = ({ visible = false, hideDialog }) => {
  const { user } = useUser()
  const [ selectedEmail, setSelectedEmail ] = useState()
  const [ selectedUid, setSelectedUid ] = useState()
  const [ amount, setAmount ] = useState('0')
  const [ getUsersLoading, setGetUsersLoading ] = useState(false)
  const [ transferLoading, setTransferLoading ] = useState(false)
  const [ users, setUsers ] = useState([])
  const [ menuVisible, setMenuVisible ] = useState(false)
  const [ successMessage, setSuccessMessage ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')

  useEffect(() => {
    async function getUsers() {
      setGetUsersLoading(true)

      try {
        const usersSnapshot = await firebase.firestore().collection('users').get()
        const usersDocs = []
        usersSnapshot.docs.forEach((doc) => {
          const docData = doc.data()

          if (doc.data().uid !== user.uid) usersDocs.push(docData)
        })

        setUsers(usersDocs)
      } catch (err) {
        setErrorMessage(`Error getting users: ${err.message}`)
      } finally {
        setGetUsersLoading(false)
      }
    }

    getUsers()
  }, [ user ])

  const onDismiss = (result) => {
    setSelectedEmail()
    setAmount('0')
    setGetUsersLoading(false)
    setSelectedUid()

    hideDialog(result)
  }

  const onSubmit = async () => {
    try {
      setTransferLoading(true)
      const transferTokens = firebase.functions().httpsCallable('transferTokens')

      await transferTokens({ userTo: selectedUid, amount: parseInt(amount, 10) })
      setSuccessMessage('Your transfer has finished successfuly!')
      onDismiss()
    } catch (err) {
      setErrorMessage(err.message)
    } finally {
      setTransferLoading(false)
    }
  }

  const getAnchor = () => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => {
        if (!transferLoading) setMenuVisible((prevValue) => !prevValue)
      }}
    >
      <TextInput
        label="Select user to transfer to"
        value={selectedEmail}
        disabled
        onTouchStart={() => {
          if (!transferLoading) setMenuVisible((prevValue) => !prevValue)
        }}
        right={<TextInput.Icon name={() => <ActivityIndicator animating={getUsersLoading} />} />}
      />
    </TouchableHighlight>
  )

  const getMenuItems = () =>
    users.map((userAccount) => (
      <Menu.Item
        onPress={() => {
          setSelectedEmail(userAccount.email)
          setSelectedUid(userAccount.uid)
          setMenuVisible(false)
        }}
        key={userAccount.uid}
        title={userAccount.email}
      />
    ))

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={onDismiss} dismissable={false}>
          <Dialog.Title>Transfer</Dialog.Title>
          <Dialog.Content>
            <View style={styles.dropdownContainer}>
              <Menu visible={menuVisible} onDismiss={() => setMenuVisible(false)} anchor={getAnchor()}>
                {getMenuItems()}
              </Menu>
            </View>
            <View>
              <ETNumericInput
                label="Amount"
                value={amount}
                onChangeText={(newAmount) => setAmount(newAmount)}
                max={`${user.amount}`}
                disabled={transferLoading}
              />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <View style={styles.buttonsContainer}>
              <Button mode="contained" onPress={onSubmit} loading={transferLoading} disabled={transferLoading} style={styles.button}>
                Transfer
              </Button>
              <Button onPress={onDismiss} disabled={transferLoading} color={Colors.redA700} style={styles.button}>
                Cancel
              </Button>
            </View>
          </Dialog.Actions>
        </Dialog>
        <ETSnackbar
          onDismiss={() => {
            setSuccessMessage('')
          }}
          text={successMessage}
        />
        <ETSnackbar
          onDismiss={() => {
            setErrorMessage('')
          }}
          text={errorMessage}
          color={Colors.redA700}
        />
      </Portal>
    </View>
  )
}

ETDialog.propTypes = {
  visible: PropTypes.bool,
  hideDialog: PropTypes.func.isRequired,
}

export default ETDialog
