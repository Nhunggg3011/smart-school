/* eslint-disable no-underscore-dangle */
import React, {
  useMemo, useEffect, useState, useCallback,
} from 'react'
import LayoutHeader from 'components/common/Layout/LayoutHeader'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useLocation, useHistory } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import GridItem from 'components/common/GridItem'
import { useAuth } from 'store/auth'
import { useUserOnce } from 'store/user'
import { CircularProgress } from '@mui/material'
import { useEventOnce } from 'store/events'
import Button from 'components/common/Button'
import { SUBJECT_MAP } from 'constants/Subject'
import { useClassOnce } from 'store/class'
import { useTeachers } from 'store/teachers'
import { useCStudents, useStudents } from 'store/students'
import moment from 'moment'
import { useLessonOnce } from 'store/lesson'
import CountDown from 'components/common/CountDown'
import numeral from 'numeral'
import useStyles from './class.style'

const Profile = () => {
  const classes = useStyles()
  const history = useHistory()
  const [user, _, uloading] = useAuth()
  const location = useLocation()
  const selectEventId = useMemo(() => new URLSearchParams(location.search).get('eventId'), [location.search])
  const date = useMemo(() => new URLSearchParams(location.search).get('date'), [location.search])
  const [event, loading, error, eAction] = useEventOnce()
  const [cls, cLoading, cError, cAction] = useClassOnce()
  const [teachers] = useTeachers()
  const [students, sLoading, sError, sActions] = useCStudents()
  const [lesson, lLoading, lError, lActions] = useLessonOnce()
  const [now, setNow] = useState(moment())

  const genTime = (goal) => {
    const checkedInTime = moment(goal || '00:00', 'HH:mm')
    const duration = moment.duration(checkedInTime.diff(now))
    return moment().format('YYYY-MM-DD') === date && duration.asMinutes() < 15 && duration.asMinutes() > -15
  }

  useEffect(() => {
    setTimeout(() => {
      setNow(moment())
    }, 1000)
  }, [now])

  useEffect(() => {
    if (!selectEventId || !date) {
      history.replace('/404')
    }
    if (selectEventId) {
      eAction.fetchEvent(selectEventId)
    }
  }, [selectEventId, date])

  const handleVideo = () => {
    if ((user.type === 'student' && !(lesson.tracked || []).includes(user.uid))
    || (user.type === 'teacher' && !lesson.teacherTracked)) {
      if (moment().format('YYYY-MM-DD') === date) {
        const checkedInTime = moment(event.startTime, 'HH:mm').add(10, 'minutes')
        const duration = moment.duration(checkedInTime.diff(moment()))
        if (duration.asMinutes() >= 0 && duration.asMinutes() < 20) {
          if (user.type === 'student') {
            lActions.checkIn(lesson._id, user.uid)
          }
          if (user.type === 'teacher') {
            lActions.checkInTeacher(lesson._id)
          }
        }
      }
    }
    window.open(event.url)
  }

  const teacher = useMemo(() => {
    if (event?.teacher) {
      return (teachers || []).find((t) => t.uid === event.teacher)
    }
    return null
  }, [event, teachers])

  useEffect(() => {
    if (event) {
      sActions.fetchStudents(event.class)
      lActions.fetchLesson(event, date)
    }
  }, [event])

  const findStatus = useCallback((uid, isTeacher = false) => {
    if (!isTeacher && (lesson?.tracked || []).includes(uid)) {
      return '???? ??i???m danh'
    }
    if (isTeacher && lesson?.teacherTracked) {
      return '???? ??i???m danh'
    }
    return 'Ch??a ??i???m danh'
  }, [lesson])

  return (
    <>
      {(loading || uloading || cLoading || lLoading) ? (
        <div className="loading-global">
          <CircularProgress size={30} />
        </div>
      ) : ''}
      <LayoutHeader sticky contentClassName={classes.headerContent}>
        <Container maxWidth="lg">
          <div className={classes.headerTitleContainer}>
            <Typography variant="h2">
              Th??ng tin gi??? h???c
            </Typography>
          </div>
        </Container>
      </LayoutHeader>
      <Container maxWidth="lg" className={classes.content}>
        <Grid container spacing={2} className={classes.paper}>
          <Grid item xs={12} sm={9}>
            <Grid container spacing={1}>
              <GridItem title="Th??ng tin c?? b???n" xs={12}>
                {event ? (
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      M??n h???c:
                    </Grid>
                    <Grid item xs={9}>
                      {SUBJECT_MAP[event.subject]?.label}
                    </Grid>
                    <Grid item xs={3}>
                      Ng??y:
                    </Grid>
                    <Grid item xs={9}>
                      {moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
                    </Grid>
                    <Grid item xs={3}>
                      Th???i gian di???n ra:
                    </Grid>
                    <Grid item xs={6}>
                      {`${event.startTime} ?????n ${event.endTime}`}
                    </Grid>
                    <Grid item xs={3}>
                      {moment().format('YYYY-MM-DD') === date ? (<CountDown goal={event.startTime} label="C??n l???i: " className={classes.countDown} />) : ''}
                    </Grid>
                    <Grid item xs={3}>
                      L???p h???c:
                    </Grid>
                    <Grid item xs={9}>
                      {event.class}
                    </Grid>
                    <Grid item xs={3}>
                      Ghi ch??:
                    </Grid>
                    <Grid item xs={9}>
                      {event.note}
                    </Grid>
                    <Grid item xs={3} />
                    <Grid item xs={9}>
                      {genTime(event.startTime) ? (
                        <Button variant="outlined" color="Secondary" onClick={handleVideo}>
                          V??o ph??ng h???c Online
                        </Button>
                      ) : (
                        <Button variant="outlined" color="Secondary" onClick={() => {}}>
                          <span style={{ color: 'blue', fontSize: 13 }}>Link h???c tr???c tuy???n ch??? ???????c m??? tr?????c v?? sau khi b???t ?????u ti???t h???c 15 ph??t</span>
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                ) : []}
              </GridItem>
              {/* <GridItem title="Th???o lu???n/Ghi ch??" xs={12} /> */}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Grid container spacing={1}>
              <GridItem title="Gi??o vi??n" xs={12}>
                {teacher ? (
                  <>
                    <div className={classes.label}>{teacher.sex === 'male' ? 'Th???y gi??o' : 'C?? gi??o'}</div>
                    <div className={classes.value}>{`${teacher.displayName}`}</div>
                    <div className={classes.label}>Tr???ng th??i</div>
                    <div className={classes.value}>{findStatus(teacher.uid, true)}</div>
                  </>
                ) : ''}
              </GridItem>
              <GridItem title={`Danh s??ch l???p h???c (??i???m danh: ${lesson?.tracked?.length || 0}/${students?.length || 0})`} xs={12}>
                {event && students ? students.map((s, idx) => (
                  <>
                    <div className={classes.student}>{`${idx + 1}. ${s.displayName} - ${findStatus(s.uid)}`}</div>
                  </>
                )) : ''}
              </GridItem>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Profile
