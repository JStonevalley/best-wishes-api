const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const auth = admin.getAuth()

exports.assignShareByEmail = functions.firestore
  .document('share/{shareId}')
  .onCreate(async (snap, context) => {
    const userRecord = await auth.getUserByEmail(snap.data().email)
    if (!userRecord) return null
    return snap.ref.set(
      {
        sharedWithUID: userRecord.uid
      },
      { merge: true }
    )
  })
