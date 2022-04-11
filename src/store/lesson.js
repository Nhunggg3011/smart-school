/* eslint-disable no-underscore-dangle */
import { firestore } from 'common/firebase'
import { useState, useCallback } from 'react'
import firebase from 'firebase/compat/app'

export const useLessonOnce = () => {
  const [lesson, setLesson] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchLesson = useCallback(async (event, date) => {
    setLoading(true)
    setError(null)
    try {
      const doc = await firestore.collection('lessons').doc(`${event._id}${date}`).get()
      if (doc.exists) {
        setLesson({ ...doc.data(), _id: doc.id })
      } else {
        const { _id, ...eventData } = event
        const lessonData = {
          ...eventData,
          eventId: _id,
          date,
          tracked: [],
          teacherTracked: false,
        }
        await firestore.collection('lessons').doc(`${event._id}${date}`).set(lessonData)
        setLesson({ ...lessonData, _id: `${event._id}${date}` })
      }
    } catch (e) {
      setError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }, [])

  const checkIn = useCallback(async (lessonId, useId) => {
    try {
      await firestore.collection('lessons').doc(lessonId).update({
        tracked: firebase.firestore.FieldValue.arrayUnion(useId),
      })
    } catch (e) {
      // setError('Có lỗi xảy ra')
    }
  }, [])

  const checkInTeacher = useCallback(async (lessonId) => {
    try {
      await firestore.collection('lessons').doc(lessonId).update({
        teacherTracked: true,
      })
    } catch (e) {
      // setError('Có lỗi xảy ra')
    }
  }, [])

  return [lesson, loading, error, { fetchLesson, checkIn, checkInTeacher }]
}

export const useFetchLessons = () => {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchLesson = useCallback(async (cls = 'all', teacher = 'all', startDate, endDate) => {
    console.log(cls)
    setLessons([])
    setLoading(true)
    setError(null)
    try {
      let query = firestore.collection('lessons')
      if (cls && cls !== 'all') {
        query = query.where('class', '==', cls)
      }
      if (teacher && teacher !== 'all') {
        query = query.where('teacher', '==', teacher)
      }
      const results = await query.orderBy('date', 'desc').get()
      if (!results.empty) {
        let flatdata = results.docs.map((d) => ({ ...d.data(), _id: d.id }))

        if (startDate) {
          flatdata = flatdata.filter((x) => x.date >= startDate)
        }
        if (endDate) {
          flatdata = flatdata.filter((x) => x.date <= endDate)
        }
        setLessons(flatdata)
      } else {
        setLessons([])
      }
    } catch (e) {
      setError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError])

  const fetchLessonBySubject = useCallback(async (subject = '', startDate, endDate) => {
    setLoading(true)
    setError(null)
    try {
      const results = await firestore.collection('lessons')
        .where('subject', '==', subject)
        .get()
      if (!results.empty) {
        setLessons(results.docs.map((d) => ({ ...d.data(), _id: d.id })))
      } else {
        setLessons([])
      }
    } catch (e) {
      setError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError])

  return [lessons, loading, error, { fetchLesson, fetchLessonBySubject }]
}
