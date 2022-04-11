/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty */
import React, { useEffect, useMemo, useState } from 'react'
import LayoutHeader from 'components/common/Layout/LayoutHeader'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useLocation, useHistory } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import GridItem from 'components/common/GridItem'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from 'store/auth'
import Button from 'components/common/Button'
import Select from 'components/common/Select'
import TextInput from 'components/common/TextInput'
import { SUBJECT_LIST, SUBJECT_MAP } from 'constants/Subject'
import { CircularProgress } from '@mui/material'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import { WEEK_LIST } from 'constants/Week'
import { useTeachers } from 'store/teachers'
import { useEventOnce } from 'store/events'
import { useLinks, useUpdateLinkUsed } from 'store/links'
import { createMeeting } from 'services/zoomService'
import useStyles from './class.style'

const ClassSchema = Yup.object().shape({
  subject: Yup.string().trim().required('(*) Bắt buộc.'),
  teacher: Yup.string().trim().required('(*) Bắt buộc.'),
  weekday: Yup.string().trim().required('(*) Bắt buộc.'),
  url: Yup.string().trim().url('Vui lòng nhập một đường dẫn hợp lệ.'),
  startTime: Yup.string().trim().required('(*) Bắt buộc.'),
  endTime: Yup.string().trim().required('(*) Bắt buộc.'),
})

const Profile = () => {
  const classes = useStyles()
  const history = useHistory()
  const [user, _, uloading] = useAuth()
  const [eventId, setSelectEvent] = useState()
  const [event, loading, error, actions] = useEventOnce()
  const location = useLocation()
  const selectEventId = useMemo(() => new URLSearchParams(location.search).get('id'), [location.search])
  const [teachers] = useTeachers()
  const [links, lLoading] = useLinks(true)
  const [updateLinkUsed] = useUpdateLinkUsed()
  const teamLinks = useMemo(() => (links || []).filter((x) => x.type === 'team'), [links])
  const ggMeetLinks = useMemo(() => (links || []).filter((x) => x.type === 'ggmeet'), [links])
  const [golbalLoading, setLoading] = useState(false)

  useEffect(() => {
    if (!selectEventId) {
      history.replace('/404')
    }
    setSelectEvent(selectEventId)
  }, [selectEventId, user])

  useEffect(() => {
    if (eventId) {
      actions.fetchEvent(eventId)
    }
  }, [eventId])

  const testerOptions = useMemo(() => (teachers || []).map((s) => ({
    value: s.uid,
    label: `${s.sex === 'male' ? 'Thầy' : 'Cô'} ${s.displayName} - ${SUBJECT_MAP[s.subject]?.label || ''}`,
  })), [teachers])

  const handleDelete = async () => {
    await actions.deleteEvent(eventId)
    history.goBack()
  }

  const formik = useFormik({
    initialValues: event || {},
    enableReinitialize: true,
    validationSchema: ClassSchema,
    onSubmit: (values) => actions.saveEvent(eventId, values),
  })

  const addLink = async () => {
    setLoading(true)
    try {
      const res = await createMeeting({
        userId: user?.zoomInfo?.id,
        params: {
          topic: 'lop-hoc',
          type: 1,
        },
      })
      formik.setFieldValue('url', res.join_url)
    } catch (e) {} finally {
      setLoading(false)
    }
  }

  const addLinkTeam = () => {
    if (teamLinks && teamLinks.length > 0) {
      formik.setFieldValue('url', teamLinks[0].url)
      updateLinkUsed(teamLinks[0]._id, teamLinks[0].used + 1)
    }
  }

  const addLinkGGMeeting = () => {
    if (ggMeetLinks && ggMeetLinks.length > 0) {
      formik.setFieldValue('url', ggMeetLinks[0].url)
      updateLinkUsed(ggMeetLinks[0]._id, ggMeetLinks[0].used + 1)
    }
  }

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      {(uloading || loading || lLoading || golbalLoading) ? (
        <div className="loading-global">
          <CircularProgress size={30} />
        </div>
      ) : ''}
      <LayoutHeader sticky contentClassName={classes.headerContent}>
        <Container maxWidth="lg">
          <div className={classes.headerTitleContainer}>
            <Typography variant="h2">
              Thông tin tiết học
            </Typography>
            <div className={classes.actions}>
              <Button type="submit" disabled={!user?.admin}>Lưu</Button>
              <Button color="Secondary" variant="outlined" disabled={!user?.admin} onClick={handleDelete}>Xoá</Button>
            </div>
          </div>
        </Container>
      </LayoutHeader>
      <Container maxWidth="lg" className={classes.content}>
        <Grid container spacing={2} className={classes.paper}>
          <GridItem title="Thông tin cơ bản" xs={9}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormLabel style={{ color: 'black' }}>Thứ</FormLabel>
                <Select
                  id="weekday"
                  value={formik.values.weekday}
                  name="weekday"
                  fullWidth
                  onChange={(v) => formik.setFieldValue('weekday', v)}
                  required
                  variant="standard"
                  error={formik.touched.weekday && Boolean(formik.errors.weekday)}
                  helperText={formik.touched.weekday && formik.errors.weekday}
                  disabled
                  options={WEEK_LIST}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel style={{ color: 'black' }}>Lớp</FormLabel>
                <TextInput
                  fullWidth
                  value={formik.values.class}
                  disabled />
              </Grid>
              <Grid item xs={6}>
                <FormLabel style={{ color: 'black' }}>Môn học</FormLabel>
                <Select
                  id="subject"
                  value={formik.values.subject}
                  name="subject"
                  fullWidth
                  onChange={(v) => formik.setFieldValue('subject', v)}
                  required
                  variant="standard"
                  error={formik.touched.subject && Boolean(formik.errors.subject)}
                  helperText={formik.touched.subject && formik.errors.subject}
                  disabled={!user?.admin}
                  options={SUBJECT_LIST} />
              </Grid>
              <Grid item xs={6} />
              <Grid item xs={12}>
                <FormLabel style={{ color: 'black' }}>Link học trực tuyến</FormLabel>
                <TextField
                  name="url"
                  fullWidth
                  variant="standard"
                  value={formik.values.url}
                  onChange={formik.handleChange}
                  error={formik.touched.url && Boolean(formik.errors.url)}
                  helperText={formik.touched.url && formik.errors.url} />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.actionURL}>
                  <Button onClick={addLink} variant="contained">Tạo link Zoom</Button>
                  <Button onClick={addLinkTeam} variant="contained">Tạo link Team</Button>
                  <Button onClick={addLinkGGMeeting} variant="contained">Tạo link Google Meeting</Button>
                </div>
              </Grid>
              <Grid item xs={6}>
                <FormLabel style={{ color: 'black' }}>Thời gian bắt đầu</FormLabel>
                <TextField
                  name="startTime"
                  fullWidth
                  placeholder="10:00"
                  type="time"
                  variant="standard"
                  value={formik.values.startTime}
                  onChange={formik.handleChange}
                  error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                  helperText={formik.touched.startTime && formik.errors.startTime}
                  disabled={!user?.admin} />
              </Grid>
              <Grid item xs={6}>
                <FormLabel style={{ color: 'black' }}>Thời gian kết thúc</FormLabel>
                <TextField
                  name="endTime"
                  fullWidth
                  placeholder="10:30"
                  type="time"
                  variant="standard"
                  value={formik.values.endTime}
                  onChange={formik.handleChange}
                  error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                  helperText={formik.touched.endTime && formik.errors.endTime}
                  disabled={!user?.admin} />
              </Grid>
            </Grid>
          </GridItem>
          <GridItem title="Giáo viên" xs={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormLabel style={{ color: 'black' }}>Giáo viên</FormLabel>
                <Select
                  id="teacher"
                  value={formik.values.teacher}
                  name="teacher"
                  fullWidth
                  onChange={(v) => formik.setFieldValue('teacher', v)}
                  required
                  variant="standard"
                  disabled={!user?.admin}
                  error={formik.touched.teacher && Boolean(formik.errors.teacher)}
                  helperText={formik.touched.teacher && formik.errors.teacher}
                  options={testerOptions} />
              </Grid>
              <Grid item xs={12}>
                <FormLabel style={{ color: 'black' }}>Ghi chú</FormLabel>
                <TextField
                  name="note"
                  fullWidth
                  variant="standard"
                  rows={4}
                  value={formik.values.note}
                  disabled={!user?.admin}
                  onChange={formik.handleChange}
                  error={formik.touched.note && Boolean(formik.errors.note)}
                  helperText={formik.touched.note && formik.errors.note} />
              </Grid>
            </Grid>
          </GridItem>
        </Grid>
      </Container>
    </form>
  )
}

export default Profile
