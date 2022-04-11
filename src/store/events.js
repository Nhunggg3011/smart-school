/* eslint-disable no-underscore-dangle */
import { firestore } from 'common/firebase'
import { useCallback, useEffect, useState } from 'react'
import { importTimeTable } from 'services/userService'

export const useFetchEvent = (cls = '') => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const results = await firestore.collection('events').where('class', '==', cls).get()
      if (!results.empty) {
        setEvents(results.docs.map((d) => ({ ...d.data(), _id: d.id })))
      } else {
        setEvents([])
      }
    } catch (e) {
      setError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError, cls])

  useEffect(() => {
    if (cls) fetchData()
    else { setEvents([]) }
  }, [cls])

  const createEvents = useCallback(async (v) => {
    setLoading(true)
    setError(null)
    try {
      await firestore.collection('events').add(v)
    } catch (e) {
      setError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError, events])

  return [events, loading, error, { createEvents, fetchData }]
}

export const useEventOnce = () => {
  const [event, setEvent] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchEvent = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      const doc = await firestore.collection('events').doc(id).get()
      if (doc.exists) {
        setEvent({ ...doc.data(), _id: doc.id })
      } else {
        setEvent(null)
      }
    } catch (e) {
      setError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }, [])

  const saveEvent = useCallback(async (eid, data) => {
    setLoading(true)
    setError(null)
    try {
      await firestore.collection('events').doc(eid).update(data)
      setEvent(data)
    } catch (e) {
      setError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError, setEvent])

  const deleteEvent = useCallback(async (eid) => {
    setLoading(true)
    setError(null)
    try {
      await firestore.collection('events').doc(eid).delete()
      setEvent(null)
    } catch (e) {
      setError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError, setEvent])

  return [event, loading, error, { saveEvent, fetchEvent, deleteEvent }]
}

export const useImportCSVFile = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const importCSV = useCallback(async (csvData) => {
    setLoading(true)
    setError(null)
    try {
      if (csvData && csvData.length > 0) {
        await importTimeTable(csvData)
      }
    } catch (e) {
      setError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError])
  return [importCSV, loading, error]
}
