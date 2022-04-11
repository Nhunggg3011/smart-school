/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-globals */
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: 'AIzaSyD8JCJ64aTrOj97sv4a7zeYxq20vwhl0DU',
  authDomain: 'smartschool-prod.web.app',
  databaseURL: 'https://smartschool-prod.firebaseio.com',
  projectId: 'smartschool-prod',
  storageBucket: 'smartschool-prod.appspot.com',
  messagingSenderId: '788192932230',
  appId: '1:788192932230:web:7576fd9945d39803037c07',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  // Customize notification here
  const notificationTitle = payload.data.title
  const notificationOptions = {
    body: payload.data.body,
    icon: '/static/images/logo.jpeg',
    data: {
      url: `${self.location.origin}/phong-hoc?eventId=${payload.data.eventId}&date=${payload.data.date}`,
    },
  }

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle,
    notificationOptions)
})

self.addEventListener('notificationclick', function (event) {
  if (Notification.prototype.hasOwnProperty('data')) {
    const { url } = event.notification.data
    event.waitUntil(clients.openWindow(url))
  }
})
