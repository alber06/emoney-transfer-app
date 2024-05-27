import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/functions'

import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID } from '@env'

const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
}

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
    firebase.firestore().settings({ experimentalAutoDetectLongPolling: true })
    firebase.functions()
  }
}
