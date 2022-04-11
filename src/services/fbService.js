import { auth } from 'common/firebase'

const signIn = (email, password) => auth.signInWithEmailAndPassword(email, password)
const signOut = () => auth.signOut()
const getCurrentUser = () => new Promise((resolve) => auth.onAuthStateChanged((user) => resolve(user)))
const getToken = () => getCurrentUser().then((user) => {
  if (!user) return null

  return user.getIdToken()
})
const fbCreateUser = (email, password) => auth.createUserWithEmailAndPassword(email, password)
const register = (email, password, name) => new Promise((resolve, reject) => {
  fbCreateUser(email, password)
    .then((response) => {
      // response.user.updateProfile({
      //   displayName: name,
      // })
      // response.user.sendEmailVerification()
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const fbService = {
  signIn,
  signOut,
  getCurrentUser,
  getToken,
  register,
}

export default fbService
