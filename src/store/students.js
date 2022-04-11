/* eslint-disable no-empty */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
import { firestore, auth } from 'common/firebase'
import { useState, useCallback, useMemo } from 'react'
import { importUser } from 'services/userService'
import { useRecoilValue } from 'recoil'
import { studentsAtom } from 'recoils/user'

export const useStudents = (cls) => {
  const students = useRecoilValue(studentsAtom)
  const v = useMemo(() => {
    if (cls) return (students || []).filter((s) => s.class === cls)
    return students
  }, [students, cls])
  return [v]
}

export const useClassEvents = () => {
  const [events, setEvents] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchEvents = useCallback(async (cls, weekday) => {
    setLoading(true)
    setError(null)
    try {
      const results = await firestore.collection('events').where('class', '==', cls || '#').where('weekday', '==', weekday || '#').get()
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
  }, [setLoading, setError, setEvents])

  return [events, loading, error, { fetchEvents }]
}

export const useCStudents = () => {
  const [students, setStudents] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchStudents = useCallback(async (cls) => {
    setLoading(true)
    setError(null)
    try {
      const results = await firestore.collection('users').where('class', '==', cls || '#').get()
      if (!results.empty) {
        setStudents(results.docs.map((d) => ({ ...d.data(), _id: d.id })))
      } else {
        setStudents([])
      }
    } catch (e) {
      setError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError, setStudents])

  return [students, loading, error, { fetchStudents }]
}

export const useImportCSVFile = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const importCSV = useCallback(async (csvData) => {
    setLoading(true)
    setError(null)
    try {
      if (csvData && csvData.length > 0) {
        await importUser(csvData, 'student')
      }
    } catch (e) {
      setError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError])
  return [importCSV, loading, error]
}
