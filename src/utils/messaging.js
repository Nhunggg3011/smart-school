import { messaging, PUBLIC_VAPID_KEY } from 'common/firebase'

export const requestFirebaseNotificationPermission = () => new Promise((resolve, reject) => {
  try {
    Notification.requestPermission()
      .then((permission) => permission === 'granted'
        ? messaging.getToken({ vapidKey: PUBLIC_VAPID_KEY }).then((firebaseToken) => resolve(firebaseToken))
        : resolve(''))
      .catch((err) => {
        reject(err)
      })
  } catch (error) {
    if (error instanceof TypeError) {
      Notification.requestPermission((permission) => permission === 'granted'
        ? messaging.getToken({ vapidKey: PUBLIC_VAPID_KEY }).then((firebaseToken) => resolve(firebaseToken))
        : resolve(''))
    } else {
      throw error
    }
  }
})

export const onMessageListener = () => new Promise((resolve) => {
  messaging.onMessage((payload) => {
    resolve(payload)
  })
})

export const isMessagingSupported = () => {
  if (!('serviceWorker' in navigator)) {
    console.log('No Service Worker support!')
    return false
  }
  if (!('PushManager' in window)) {
    console.log('No Push API Support!')
    return false
  }
  return true
}
