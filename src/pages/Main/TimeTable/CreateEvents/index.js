/* eslint-disable no-empty */
/* eslint-disable no-underscore-dangle */
import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { SUBJECT_LIST, SUBJECT_MAP } from 'constants/Subject'
import { useTeachers } from 'store/teachers'
import { Grid, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { WEEK_LIST } from 'constants/Week'
import { useFetchEvent } from 'store/events'
import { useLinks, useUpdateLinkUsed } from 'store/links'
import { createMeeting } from 'services/zoomService'
import { useAuth } from 'store/auth'
import Loading from 'components/common/Loading'
import useStyles from './index.style'

const ClassSchema = Yup.object().shape({
  subject: Yup.string().trim().required('(*) Bắt buộc.'),
  teacher: Yup.string().trim().required('(*) Bắt buộc.'),
  weekday: Yup.string().trim().required('(*) Bắt buộc.'),
  url: Yup.string().trim().url('Vui lòng nhập một đường dẫn hợp lệ.').required('(*) Bắt buộc.'),
  startTime: Yup.string().trim().required('(*) Bắt buộc.'),
  endTime: Yup.string().trim().required('(*) Bắt buộc.'),
})

const EventDialog = ({ handleClose, selectClass }) => {
  const classes = useStyles()
  const [user, uActions, uLoading] = useAuth()
  const [_, eloading, error, actions] = useFetchEvent()
  const [teachers] = useTeachers()
  const [links, lLoading] = useLinks(true)
  const [updateLinkUsed] = useUpdateLinkUsed()
  const [loading, setLoading] = useState(false)

  const teamLinks = useMemo(() => (links || []).filter((x) => x.type === 'team'), [links])
  const ggMeetLinks = useMemo(() => (links || []).filter((x) => x.type === 'ggmeet'), [links])

  const formik = useFormik({
    initialValues: {
      class: selectClass,
      subject: '',
      teacher: '',
      url: '',
      note: '',
      weekday: 'mon',
      startTime: '08:00',
      endTime: '08:30',
    },
    enableReinitialize: true,
    validationSchema: ClassSchema,
    onSubmit: (v) => {
      actions.createEvents(v)
      handleClose()
    },
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
    <Dialog open onClose={handleClose} maxWidth="sm">
      <Loading loading={eloading || loading || uLoading || lLoading} />
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle className={classes.title}>{`Thời khoá biểu lớp ${selectClass}`}</DialogTitle>
        <DialogContent style={{ paddingTop: 8 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormLabel style={{ color: 'black' }}>Thứ</FormLabel>
              <FormControl fullWidth>
                <Select
                  id="weekday"
                  value={formik.values.weekday}
                  name="weekday"
                  fullWidth
                  onChange={formik.handleChange}
                  variant="standard"
                  error={formik.touched.weekday && Boolean(formik.errors.weekday)}
                  helperText={formik.touched.weekday && formik.errors.weekday}>
                  {WEEK_LIST.map((s) => (<MenuItem key={`${s.value}`} value={s.value}>{s.label}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={6}>
              <FormLabel style={{ color: 'black' }}>Môn học</FormLabel>
              <FormControl fullWidth>
                <Select
                  id="subject"
                  value={formik.values.subject}
                  name="subject"
                  fullWidth
                  onChange={formik.handleChange}
                  variant="standard"
                  error={formik.touched.subject && Boolean(formik.errors.subject)}
                  helperText={formik.touched.subject && formik.errors.subject}>
                  {SUBJECT_LIST.map((s) => (<MenuItem key={`${s.value}`} value={s.value}>{s.label}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormLabel style={{ color: 'black' }}>Giáo viên</FormLabel>
              <FormControl fullWidth>
                <Select
                  id="teacher"
                  value={formik.values.teacher}
                  name="teacher"
                  fullWidth
                  onChange={formik.handleChange}
                  required
                  variant="standard"
                  error={formik.touched.teacher && Boolean(formik.errors.teacher)}
                  helperText={formik.touched.teacher && formik.errors.teacher}>
                  {(teachers || []).map((s) => (<MenuItem key={`${s.uid}`} value={s.uid}>{`${s.sex === 'male' ? 'Thầy' : 'Cô'} ${s.displayName} - ${SUBJECT_MAP[s.subject]?.label || ''}`}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
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
            <Grid item xs={4} />
            <Grid item xs={12}>
              <FormLabel style={{ color: 'black' }}>Ghi chú</FormLabel>
              <TextField
                name="note"
                fullWidth
                variant="standard"
                value={formik.values.note}
                onChange={formik.handleChange}
                error={formik.touched.note && Boolean(formik.errors.note)}
                helperText={formik.touched.note && formik.errors.note} />
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
                helperText={formik.touched.startTime && formik.errors.startTime} />
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
                helperText={formik.touched.endTime && formik.errors.endTime} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Bỏ qua</Button>
          <Button type="submit">Tạo</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

EventDialog.propTypes = {
  handleClose: PropTypes.func,
  selectClass: PropTypes.string,
}

export default EventDialog
