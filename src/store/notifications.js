/* eslint-disable no-empty */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
import { firestore } from 'common/firebase'
import { useEffect } from 'react'
import { useRecoilState, atom } from 'recoil'

export const notificationAtom = atom({
  key: 'notificationAtom',
  default: [],
})

export const useNotification = (userId) => {
  const [notifications, setNotifications] = useRecoilState(notificationAtom)
  useEffect(() => {
    if (userId) {
      firestore.collection('notifications')
        .where('userId', '==', userId || '')
        .onSnapshot((querySnapshot) => {
          const n = []
          querySnapshot.forEach((doc) => {
            n.push(doc.data())
          })
          setNotifications(n)
        })
    } else {
      setNotifications([])
    }
  }, [userId])
  return [notifications]
}

export const useMarkedNotification = () => (nId) => new Promise((resolve, reject) => {
  firestore.collection('notifications').doc(nId).update({
    marked: true,
  }).then(() => resolve())
    .catch((e) => reject(e))
})
