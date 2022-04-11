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
import { useClass } from 'store/class'
import { CircularProgress } from '@mui/material'
import { useCreateNewUser } from 'store/user'
import { useAlert } from 'react-alert'
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
  const location = useLocation()
  const alert = useAlert()
  const [classesData] = useClass()

  const [createUser, loading, error] = useCreateNewUser()

  const defaultClass = useMemo(() => {
    const classX = (classesData || []).length > 0 ? classesData[0] : null
    return classX ? `${classX.grade}${classX.class}` : null
  }, [classesData])

  const classOption = useMemo(() => (classesData || []).map((c) => ({
    value: `${c.grade}${c.class}`,
    label: `Lớp ${c.grade}${c.class}`,
  })), [classesData])

  useEffect(() => {
    if (error) { alert.show(error) }
  }, [error])

  const handleSubmit = async (values) => {
    const newId = await createUser({ ...values, displayName: `${values.firstName} ${values.lastName}` })
    if (newId) {
      history.push(`/ca-nhan?id=${newId}`)
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      sex: 'male',
      confirmPassword: '',
      type: 'student',
      class: defaultClass,
      subject: SUBJECT_LIST[0].value,
    },
    enableReinitialize: true,
    validationSchema: UserSchema,
    onSubmit: handleSubmit,
  })

  useEffect(() => {
    if (!user?.admin) history.replace('/')
  }, [])

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
            <Button type="submit">Lưu</Button>
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
                    onChange={(e) => formik.setFieldValue('sex', e.target.value)}>
                    <FormControlLabel value="male" control={<Radio checked={formik.values.sex === 'male'} />} label="Nam" />
                    <FormControlLabel value="female" control={<Radio checked={formik.values.sex === 'female'} />} label="Nữ" />
                  </RadioGroup>
                </div>
              </Grid>
              <Grid item xs={6}>
                <Input
                  name="email"
                  fullWidth
                  legend="Email"
                  autoFocus
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  />
              </Grid>
              <Grid item xs={6} />
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
                  />
              </Grid>
            </Grid>
          </GridItem>
          <GridItem title="Tài khoản" xs={3}>
            <div style={{
              display: 'flex', alignItems: 'center',
            }}>
              <RadioGroup
                row
                name="type"
                value={formik.values.type}
                onChange={(e) => formik.setFieldValue('type', e.target.value)}>
                <FormControlLabel value="teacher" control={<Radio checked={formik.values.type === 'teacher'} />} label="Giáo viên" />
                <FormControlLabel value="student" control={<Radio checked={formik.values.type === 'student'} />} label="Học sinh" />
              </RadioGroup>
            </div>
            {(formik.values.type === 'teacher') ? (
              <>
                <Select
                  name="subject"
                  legend="Bộ môn"
                  value={formik.values.subject}
                  onChange={(val) => formik.setFieldValue('subject', val)}
                  options={SUBJECT_LIST}
                  placeholder="Bộ môn" />
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
                placeholder="Phân quyền / Quản trị" />
            ) : ''}
            {formik.values.type === 'student' ? (
              <Select
                name="class"
                legend="Lớp"
                value={formik.values.class}
                onChange={(val) => formik.setFieldValue('class', val)}
                options={classOption}
                placeholder="Bộ môn" />
            ) : ''}
          </GridItem>
        </Grid>
      </Container>
    </form>
  )
}

export default Profile
