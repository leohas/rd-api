import * as admin from 'firebase-admin'

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://rd-alagoana.firebaseio.com'
})

export const fbDb = admin.database().ref()
export const fbAuth = admin.auth()
