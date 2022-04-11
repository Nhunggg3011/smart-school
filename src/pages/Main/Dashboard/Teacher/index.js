/* eslint-disable no-underscore-dangle */
import React, { useEffect, useMemo } from 'react'
import LayoutHeader from 'components/common/Layout/LayoutHeader'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Link, useHistory } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import GridItem from 'components/common/GridItem'
import { useAuth } from 'store/auth'
import { CircularProgress } from '@mui/material'
import { SUBJECT_MAP } from 'constants/Subject'
import { useTeacherEvents } from 'store/teachers'
import moment from 'moment'
import { getCurrentWeekDay, getCurrentWeekName } from 'utils/utils'
import Button from 'components/common/Button'
import CountDown from 'components/common/CountDown'
import useStyles from './class.style'

const Profile = () => {
  const classes = useStyles()
  const history = useHistory()
  const [user, _, uloading] = useAuth()
  const [events, loading, error, actions] = useTeacherEvents()

  const sortedEvents = useMemo(() => (events || []).sort((a, b) => (a.startTime || '').localeCompare((b.startTime || ''))), [events])

  useEffect(() => {
    if (user?.uid) {
      actions.fetchEvents(user.uid, getCurrentWeekDay())
    }
  }, [user?.uid])

  const renderStatus = (e) => {
    const now = moment().format('HH:mm')
    if (now.localeCompare(e.startTime) < 0) {
      return 'Sắp diễn ra'
    }

    if (now.localeCompare(e.startTime) >= 0 && now.localeCompare(e.endTime) < 0) {
      return 'Đang diễn ra'
    }

    return 'Đã xong'
  }

  const currentEvents = useMemo(() => {
    const now = moment().format('HH:mm')
    return (sortedEvents || []).find((e) => now.localeCompare(e.startTime) >= 0 && now.localeCompare(e.endTime) < 0)
  }, [sortedEvents])

  const nextEvent = useMemo(() => {
    const now = moment().format('HH:mm')
    return (sortedEvents || []).find((e) => now.localeCompare(e.startTime) < 0)
  }, [sortedEvents])

  const renderEvent = (event) => (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        Môn học:
      </Grid>
      <Grid item xs={9}>
        {SUBJECT_MAP[event.subject]?.label}
      </Grid>
      <Grid item xs={3}>
        Thời gian diễn ra:
      </Grid>
      <Grid item xs={6}>
        {`${event.startTime} đến ${event.endTime} `}
      </Grid>
      <Grid item xs={3}>
        <CountDown goal={event.startTime} label="Còn lại: " className={classes.countDown} />
      </Grid>
      <Grid item xs={3}>
        Lớp học:
      </Grid>
      <Grid item xs={9}>
        {event.class}
      </Grid>
      <Grid item xs={3}>
        Ghi chú:
      </Grid>
      <Grid item xs={9}>
        {event.note}
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9}>
        <Button variant="outlined" color="Secondary" onClick={() => history.push(`/phong-hoc?eventId=${event._id}&date=${moment().format('YYYY-MM-DD')}`)}>Vào phòng học</Button>
      </Grid>
    </Grid>
  )

  return (
    <>
      {(loading || uloading) ? (
        <div className="loading-global">
          <CircularProgress size={30} />
        </div>
      ) : ''}
      <LayoutHeader sticky contentClassName={classes.headerContent}>
        <Container maxWidth="lg">
          <div className={classes.headerTitleContainer}>
            <div>
              <Typography variant="h2">
                {`Lịch giảng dạy Online - ${getCurrentWeekName()}`}
              </Typography>
              <Typography variant="h8">{`Xin chào ${user?.sex === 'male' ? 'thầy' : 'cô'} ${user?.lastName}, bộ môn ${SUBJECT_MAP[user?.subject]?.label} - Trường THPT Chuyên Biên Hoà`}</Typography>
            </div>
          </div>
        </Container>
      </LayoutHeader>
      <Container maxWidth="lg" className={classes.content}>
        <Grid container spacing={4} className={classes.paper}>
          <Grid item md={8} xs={12}>
            <Grid container spacing={2}>
              {currentEvents ? (
                <GridItem title="Giờ dạy đang diễn ra" xs={12}>
                  {renderEvent(currentEvents)}
                </GridItem>
              ) : ''}
              {nextEvent ? (
                <GridItem title="Giờ dạy tiếp theo" xs={12}>
                  {renderEvent(nextEvent)}
                </GridItem>
              ) : ''}
              {!currentEvents && !nextEvent ? (
                <GridItem title="Giờ dạy tiếp theo" xs={12}>
                  Hiện bạn không có lịch dạy nào trong hôm nay
                </GridItem>
              ) : ''}
            </Grid>
          </Grid>
          <Grid item md={4} xs={12}>
            <Grid container spacing={2}>
              <GridItem title="Lịch dạy trong ngày" xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <table className={classes.listPlan}>
                      <tr>
                        <th align="left">Thời gian</th>
                        <th align="center">Lớp</th>
                        <th align="right">Trạng thái</th>
                      </tr>
                      {(events || []).map((e) => (
                        <tr key={e._id} onClick={() => history.push(`/phong-hoc?eventId=${e._id}&date=${moment().format('YYYY-MM-DD')}`)}>
                          <td align="left">{e.startTime}</td>
                          <td align="center">{e.class}</td>
                          <td align="right">{renderStatus(e)}</td>
                        </tr>
                      ))}
                    </table>
                  </Grid>
                </Grid>
              </GridItem>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Profile
