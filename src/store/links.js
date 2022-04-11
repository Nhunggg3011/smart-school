/* eslint-disable no-underscore-dangle */
import { firestore } from 'common/firebase'
import { useState, useCallback, useEffect } from 'react'

export const useLinks = (autoFetch = false) => {
  const [links, setLinks] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchLinks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const results = await firestore.collection('links').orderBy('used').get()
      if (!results.empty) {
        setLinks(results.docs.map((d) => ({ ...d.data(), _id: d.id })))
      } else {
        setLinks([])
      }
    } catch (e) {
      setError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (autoFetch) fetchLinks()
  }, [autoFetch])

  return [links, loading, error, { fetchLinks }]
}

export const useUpdateLinkUsed = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateLink = useCallback(async (linkId, used = 1) => {
    setLoading(true)
    setError(null)
    try {
      await firestore.collection('links').doc(linkId).update({
        used,
      })
    } catch (e) {
      setError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }, [])

  return [updateLink, loading, error]
}
