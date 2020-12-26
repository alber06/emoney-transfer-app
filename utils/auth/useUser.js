import 'firebase/auth'
import { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import * as localstorage from './localstorage'
import initFirebase from './initFirebase'
import mapUserData from './mapUserData'

initFirebase()

const useUser = () => {
  const [authUser, setAuthUser] = useState({})
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

  const logout = async () => {
    try {
      await firebase.auth().signOut()
      setAuthUser({})
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    setLoading(true)

    try {
      const authUserDoc = await firebase.auth().signInWithEmailAndPassword(email, password)
      const userData = await mapUserData(authUserDoc.user)

      return localstorage.setItem('auth', userData)
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email, password) => {
    setLoading(true)

    try {
      const userCreated = await firebase.auth().createUserWithEmailAndPassword(email, password)
      const userData = await mapUserData(userCreated.user)

      await localstorage.setItem('auth', userData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authUser && authUser.token) {
      setLoading(true)
      const userDoc = firebase.firestore().collection('users').doc(authUser.uid)
      const unsubscribe = userDoc.onSnapshot((querySnapshot) => {
        setUser((prevUser) => ({ ...prevUser, ...querySnapshot.data() }))
        setLoading(false)
      })

      return () => {
        setLoading(false)
        return unsubscribe()
      }
    }

    return () => {}
  }, [authUser])

  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged(async (authUserChanged) => {
      if (authUserChanged) {
        const userData = await mapUserData(authUserChanged)

        await localstorage.setItem('auth', userData)
        setAuthUser(userData)
      } else {
        setAuthUser({})
      }
    })

    const savedUser = localstorage.getItem('auth')
    setAuthUser(savedUser)

    return () => {
      cancelAuthListener()
    }
  }, [])

  return { authUser, user, loading, logout, login, signup }
}

export default useUser
