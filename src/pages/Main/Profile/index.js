import React, { useEffect, useMemo, useState } from 'react'
import LayoutHeader from 'components/common/Layout/LayoutHeader'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Link, useLocation, useHistory } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Input from 'components/common/TextInput'
import Grid from '@mui/material/Grid'
import GridItem from 'components/common/GridItem'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from 'store/auth'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from 'components/common/Button'
import Select from 'components/common/Select'
import { SUBJECT_LIST } from 'constants/Subject'
import { useUserOnce } from 'store/user'
import { CircularProgress } from '@mui/material'
import useStyles from './class.style'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const UserSchema = Yup.object().shape({
  firstName: Yup.string().trim().required('(*) Bắt buộc.'),
  lastName: Yup.string().trim().required('(*) Bắt buộc.'),
  phone: Yup.string().trim().matches(phoneRegExp, 'Số điện thoại của bạn không đúng.'),
})

const Profile = () => {
  const classes = useStyles()
  const history = useHistory()
  const [user] = useAuth()
  const [userId, setUserId] = useState()
  const location = useLocation()
  const selectUserId = useMemo(() => new URLSearchParams(location.search).get('id'), [location.search])

  useEffect(() => {
    setUserId(selectUserId || user?.uid)
  }, [selectUserId, user])

  const [userInfo, loading, error, saveUser] = useUserOnce(userId)
  const formik = useFormik({
    initialValues: userInfo || {},
    enableReinitialize: true,
    validationSchema: UserSchema,
    onSubmit: (values) => saveUser({ ...values, displayName: `${values.firstName} ${values.lastName}` }),
  })

  const enabled = useMemo(() => user?.uid === userId || user?.admin, [user, userId])
  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      {loading && (
        <div className="loading-global">
          <CircularProgress size={30} />
        </div>
      )}
      <LayoutHeader sticky contentClassName={classes.headerContent}>
        <Container maxWidth="lg">
          <div className={classes.headerTitleContainer}>
            <Typography variant="h2">
              Thông tin tài khoản
            </Typography>
            <Button type="submit" disabled={!enabled}>Lưu</Button>
          </div>
        </Container>
      </LayoutHeader>
      <Container maxWidth="lg" className={classes.content}>
        <Grid container spacing={2} className={classes.paper}>
          <GridItem title="Thông tin cơ bản" xs={9}>
            <Grid container spacing={2} fullWidth>
              <Grid item xs={3}>
                <Input
                  name="firstName"
                  fullWidth
                  legend="Họ và tên đệm"
                  autoFocus
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  disabled={!enabled}
                  />
              </Grid>
              <Grid item xs={3}>
                <Input
                  name="lastName"
                  fullWidth
                  legend="Tên"
                  autoFocus
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  disabled={!enabled}
                  />
              </Grid>
              <Grid item xs={6} />
              <Grid xs={12} item>
                <div style={{
                  display: 'flex', alignItems: 'center',
                }}>
                  <Typography style={{ marginRight: 8 }}>
                    Giới tính:
                  </Typography>
                  <RadioGroup
                    row
                    name="sex"
                    value={formik.values.sex}
                    onChange={(e) => formik.setFieldValue('sex', e.target.value)}
                    disabled={!enabled}>
                    <FormControlLabel value="male" control={<Radio checked={formik.values.sex === 'male'} />} label="Nam" />
                    <FormControlLabel value="female" control={<Radio checked={formik.values.sex === 'female'} />} label="Nữ" />
                  </RadioGroup>
                </div>
              </Grid>
              <Grid item xs={6}>
                <Input
                  name="birthday"
                  fullWidth
                  legend="Ngày sinh"
                  type="date"
                  autoFocus
                  value={formik.values.birthday}
                  onChange={formik.handleChange}
                  error={formik.touched.birthday && Boolean(formik.errors.birthday)}
                  helperText={formik.touched.birthday && formik.errors.birthday}
                  disabled={!enabled}
                  />
              </Grid>
              <Grid item xs={6}>
                <Input
                  name="phone"
                  fullWidth
                  legend="Số điện thoại"
                  autoFocus
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  disabled={!enabled}
                  />
              </Grid>
            </Grid>
          </GridItem>
          <GridItem title={formik.values.type === 'student' ? 'Học sinh' : `${formik.values.admin ? 'Quản trị/' : ''}Giáo viên`} xs={3}>
            {(formik.values.type === 'teacher') ? (
              <>
                <Select
                  name="subject"
                  legend="Bộ môn"
                  value={formik.values.subject}
                  onChange={(val) => formik.setFieldValue('subject', val)}
                  options={SUBJECT_LIST}
                  placeholder="Bộ môn"
                  disabled={!enabled} />
                <div style={{ marginTop: 10 }} />
              </>
            ) : ''}
            {(user?.admin && formik.values.type === 'teacher') ? (
              <Select
                name="admin"
                legend="Quyền hạn"
                value={formik.values.admin ? 'admin' : 'teacher'}
                onChange={(val) => formik.setFieldValue('admin', val === 'admin')}
                options={[{
                  value: 'admin',
                  label: 'Quyền admin',
                }, {
                  value: 'teacher',
                  label: 'Bình thường',
                }]}
                placeholder="Phân quyền / Quản trị"
                disabled={!enabled} />
            ) : ''}
            {formik.values.type === 'student' ? `Lớp: ${formik.values.class}` : ''}
          </GridItem>
        </Grid>
      </Container>
    </form>
  )
}

export default Profile
