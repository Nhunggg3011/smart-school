/* eslint-disable no-underscore-dangle */
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from 'common/firebase'
import firebase from 'firebase/compat/app'
import { useEffect, useLayoutEffect, useMemo } from 'react'
import {
  atom, useRecoilState, useRecoilValue, useSetRecoilState,
} from 'recoil'
import {
  KEY_ZOOM_ACCESS_TOKEN, KEY_ZOOM_EXPIRES_IN, KEY_ZOOM_REFRESH_TOKEN, KEY_ZOOM_SCOPE, KEY_ZOOM_TOKEN_TYPE,
} from 'constants/Zoom'
import { getZoomUserInfo } from 'services/zoomService'
import MStorage from 'utils/memoryStorage'

const userInfoAtom = atom({
  key: 'userInfoAtom',
  default: null,
})

export function useUserInfo() {
  return useRecoilValue(userInfoAtom)
}

export function useAuth() {
  const [user, loading, error] = useAuthState(auth)
  const [info, setInfo] = useRecoilState(userInfoAtom)
  useLayoutEffect(() => {
    if (info?.zoom) {
      MStorage.set(KEY_ZOOM_ACCESS_TOKEN, info.zoom.access_token)
      MStorage.set(KEY_ZOOM_EXPIRES_IN, info.zoom.expires_in)
      MStorage.set(KEY_ZOOM_REFRESH_TOKEN, info.zoom.refresh_token)
      MStorage.set(KEY_ZOOM_SCOPE, info.zoom.scope)
      MStorage.set(KEY_ZOOM_TOKEN_TYPE, info.zoom.token_type)
    }
  }, [info])

  useEffect(() => {
    if (user?.uid) {
      firestore.collection('users').where('uid', '==', user?.uid).get().then((query) => {
        setInfo(query?.docs.length > 0 ? { ...query.docs[0].data(), _id: query.docs[0].id } : null)
      })
        .catch(() => {
          setInfo(null)
        })
    } else {
      setInfo(null)
    }
  }, [user?.uid])

  const signIn = async (u) => {
    const res = await auth.signInWithEmailAndPassword(u.email, u.password)
  }

  const signUp = async (u) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(u.email, u.password)
      const newUserInfo = {
        uid: res.user.uid,
        displayName: `${u.firstName} ${u.lastName}`,
        firstName: u.firstName,
        lastName: u.lastName,
        type: u.type || 'student',
        onboard: false,
        email: u.email,
        sex: u.sex || 'male',
        class: u.class || '',
        subject: u.subject || '',
      }
      await firestore.collection('users').doc(res.user.uid).set(newUserInfo)
      if (u.type === 'student') {
        await firestore.collection('classes').doc(u.class).update({
          students: firebase.firestore.FieldValue.arrayUnion(res.user.uid),
        })
      }
    } catch (e) {
      throw e
    }
  }

  const logout = () => {
    auth.signOut()
    setInfo(null)
  }

  const updateBoard = async (data) => {
    if (info) {
      MStorage.set(KEY_ZOOM_ACCESS_TOKEN, data?.access_token)
      MStorage.set(KEY_ZOOM_EXPIRES_IN, data?.expires_in)
      MStorage.set(KEY_ZOOM_REFRESH_TOKEN, data?.refresh_token)
      MStorage.set(KEY_ZOOM_SCOPE, data?.scope)
      MStorage.set(KEY_ZOOM_TOKEN_TYPE, data?.token_type)

      let zoomInfo = {}
      try {
        zoomInfo = await getZoomUserInfo()
      // eslint-disable-next-line no-empty
      } catch (e) {}
      await firestore.collection('users').doc(info._id).update({
        onboard: true,
        zoom: data,
        zoomInfo: zoomInfo || {},
      })
      setInfo({
        ...info,
        onboard: true,
        zoom: data,
        zoomInfo: zoomInfo || {},
      })
    }
  }

  const actions = {
    signIn, signUp, logout, updateBoard,
  }
  const u = useMemo(() => user ? { uid: user.uid, ...info } : info, [user, info])
  return [u, actions, loading, error]
}
