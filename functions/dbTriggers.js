import pMap from 'p-map'
import functions from 'firebase-functions'
import admin from 'firebase-admin'
admin.initializeApp()

const querySnapshotToArrayOfDocs = (querySnapshot) => {
  const docs = []
  querySnapshot.forEach(docs.push)
  return docs
}

export const associateCreatedShareByEmail = functions.firestore
  .document('share/{shareId}')
  .onCreate(async (snap, context) => {
    const userRecord = await admin.auth().getUserByEmail(snap.data().email)
    if (!userRecord) return null
    return snap.ref.update({ sharedWithUID: userRecord.uid })
  })

export const associateShareWithCreatedUserByEmail = functions.auth
  .user()
  .onCreate(async (userRecord) => {
    const snapshot = await admin
      .getFirestore()
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
