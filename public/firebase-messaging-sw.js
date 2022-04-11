/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-globals */
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: 'AIzaSyBpDobZiBH7c9YHmU_DWlRbj6oigyIyfVA',
  authDomain: 'smartschool-c7391.firebaseapp.com',
  databaseURL: 'https://smartschool-c7391.firebaseio.com',
  projectId: 'smartschool-c7391',
  storageBucket: 'smartschool-c7391.appspot.com',
  messagingSenderId: '865160373600',
  appId: '1:865160373600:web:976621ed2674b1e3176a05',
  measurementId: 'G-measurement-id',
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
