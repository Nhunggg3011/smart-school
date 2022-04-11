/* eslint-disable no-underscore-dangle */
import { firestore } from 'common/firebase'
import { useCallback, useEffect, useState } from 'react'
import { createUser } from 'services/userService'

export const useUserOnce = (uid = '') => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const doc = await firestore.collection('users').doc(uid).get()
        if (doc.exists) {
          setUser(doc.data())
        } else {
          setUser(null)
        }
      } catch (e) {
        setError('Có lỗi xảy ra')
      } finally {
        setLoading(false)
      }
    }
    if (uid) fetchData()
    else { setUser(null) }
  }, [uid])

  const saveUser = useCallback(async (data) => {
    setLoading(true)
    setError(null)
    try {
      await firestore.collection('users').doc(uid).update(data)
      setUser({ ...user, ...data })
    } catch (e) {
      setError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError, user])

  return [user, loading, error, saveUser]
}

export const useUpdateNotficationToken = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const updateToken = useCallback(async (uid = '', token) => {
    setLoading(true)
    setError(null)
    try {
      await firestore.collection('users').doc(uid).update({
        messagingToken: token,
      })
    } catch (e) {
      setError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError])

  return [updateToken, loading, error]
}

export const useCreateNewUser = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const createUserX = useCallback(async (user) => {
    setLoading(true)
    setError(null)
    let userId = null
    try {
      const res = await createUser({
        email: user.email,
        type: user.type,
        info: user,
      })
      userId = res.userId
    } catch (e) {
      setError(e?.message || 'Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
    return userId
  }, [setLoading, setError])
  return [createUserX, loading, error]
}
