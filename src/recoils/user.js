import { useEffect } from 'react'
import { firestore } from 'common/firebase'

import {
  atom, useSetRecoilState,
} from 'recoil'

export const teachersAtom = atom({
  key: 'teachersAtom',
  default: [],
})

export const studentsAtom = atom({
  key: 'studentsAtom',
  default: [],
})

export const classesAtom = atom({
  key: 'classesAtom',
  default: [],
})

export const useInitStore = () => {
  const setStudents = useSetRecoilState(studentsAtom)
  const setTeachers = useSetRecoilState(teachersAtom)
  const setClasses = useSetRecoilState(classesAtom)

  useEffect(() => {
    firestore.collection('users').where('type', '==', 'teacher').orderBy('lastName', 'asc')
      .onSnapshot((querySnapshot) => {
        const users = []
        querySnapshot.forEach((doc) => {
          users.push(doc.data())
        })
        setTeachers(users)
      })
    firestore.collection('users').where('type', '==', 'student').orderBy('lastName', 'asc')
      .onSnapshot((querySnapshot) => {
        const users = []
        querySnapshot.forEach((doc) => {
          users.push(doc.data())
        })
        setStudents(users)
      })
    firestore.collection('classes').orderBy('grade')
      .onSnapshot((querySnapshot) => {
        const users = []
        querySnapshot.forEach((doc) => {
          users.push(doc.data())
        })
        setClasses(users)
      })
  }, [])
}
