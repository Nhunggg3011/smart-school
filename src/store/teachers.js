/* eslint-disable no-empty */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
import { firestore } from 'common/firebase'
import { useState, useCallback } from 'react'
import { importUser } from 'services/userService'
import { useRecoilValue } from 'recoil'
import { teachersAtom } from 'recoils/user'

export const useTeachers = () => {
  const teachers = useRecoilValue(teachersAtom)
  return [teachers]
}

export const useTeacherEvents = () => {
  const [events, setEvents] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchEvents = useCallback(async (teacher, weekday) => {
    setLoading(true)
    setError(null)
    try {
      const results = await firestore.collection('events').where('teacher', '==', teacher || '#').where('weekday', '==', weekday || '#').get()
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

export const useImportCSVFile = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const importCSV = useCallback(async (csvData) => {
    setLoading(true)
    setError(null)
    try {
      if (csvData && csvData.length > 0) {
        await importUser(csvData, 'teacher')
      }
    } catch (e) {
      setError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError])
  return [importCSV, loading, error]
}
