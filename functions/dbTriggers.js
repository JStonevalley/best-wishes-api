const pMap = require('p-map')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const auth = admin.getAuth()
const db = admin.getFirestore()

const querySnapshotToArrayOfDocs = (querySnapshot) => {
  const docs = []
  querySnapshot.forEach(docs.push)
  return docs
}

exports.associateCreatedShareByEmail = functions.firestore
  .document('share/{shareId}')
  .onCreate(async (snap, context) => {
    const userRecord = await auth.getUserByEmail(snap.data().email)
    if (!userRecord) return null
    return snap.ref.update({ sharedWithUID: userRecord.uid })
  })

exports.associateShareWithCreatedUserByEmail = functions.auth
  .user()
  .onCreate(async (userRecord) => {
    const snapshot = await db
      .collection('share')
      .where('invitedEmail', '==', userRecord.email)
      .get()
    if (snapshot.empty) return
    const docs = querySnapshotToArrayOfDocs(snapshot)
    await pMap(
      docs,
      (shareDoc) => shareDoc.ref.update({ sharedWithUID: userRecord.uid }),
      { concurrency: 10 }
    )
  })
