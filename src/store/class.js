/* eslint-disable no-underscore-dangle */
import { firestore } from 'common/firebase'
import { useState, useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { classesAtom } from 'recoils/user'

export const useClass = () => {
  const value = useRecoilValue(classesAtom)
  return [value, false, false]
}

export const useClassAction = () => {
  const makeClass = async (cl) => {
    await firestore.collection('classes').doc(`${cl.grade}${cl.class}`).set({
      ...cl,
    })
  }
  return {
    makeClass,
  }
}

export const useClassOnce = () => {
  const [cls, setClass] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchClass = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      const doc = await firestore.collection('classes').doc(id).get()
      if (doc.exists) {
        setClass(doc.data())
      } else {
        setClass(null)
      }
    } catch (e) {
      setError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }, [])

  return [cls, loading, error, { fetchClass }]
}
