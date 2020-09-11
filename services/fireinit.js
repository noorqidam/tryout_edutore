'use strict'
import firebase from 'firebase/app'
import 'firebase/auth' // This line is important
const config = {
  apiKey: 'AIzaSyDxjrwMKZ-aAYljYPU1FvsdM-QNs7TXa-k',
  authDomain: 'edutore01.firebaseapp.com',
  databaseURL: 'https://edutore01.firebaseio.com',
  projectId: 'edutore01',
  storageBucket: '',
  messagingSenderId: '926865736810'
}

firebase.initializeApp(config)
export const auth = firebase.auth()
export default firebase
