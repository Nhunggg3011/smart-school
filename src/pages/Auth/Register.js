import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Copyright from 'components/main/Copyright'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from 'store/auth'
import Paper from '@mui/material/Paper'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useClass } from 'store/class'
import { SUBJECT_LIST } from 'constants/Subject'
import useStyles from './Register.style'

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().trim().required('(*) Bắt buộc.'),
  lastName: Yup.string().trim().required('(*) Bắt buộc.'),
  email: Yup.string().trim().email('Email không đúng'),
  password: Yup.string()
    .min(8, 'Mật khẩu không đủ mạnh.')
    .required('(*) Bắt buộc.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Nhập lại mật khẩu không khớp.')
    .required('(*) Bắt buộc.'),
})

const SignUp = ({ history }) => {
  const classes = useStyles()
  const [_, actions] = useAuth()
  const [classesData] = useClass()

  const handleSubmit = (u) => {
    try {
      actions.signUp(u)
    } catch (e) {
      alert(e)
    }
  }

  const defaultClass = useMemo(() => {
    const classX = (classesData || []).length > 0 ? classesData[0] : null
    return classX ? `${classX.grade}${classX.class}` : null
  }, [classesData])

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
    validationSchema: SignUpSchema,
    onSubmit: handleSubmit,
  })

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    autoComplete="off"
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    id="firstName"
                    label="Họ và tên đệm"
                    autoFocus
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoComplete="off"
                    name="lastName"
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    label="Tên"
                    autoFocus
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Địa chỉ Email"
                name="email"
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid xs={12} item>
              <div style={{
                display: 'flex', alignItems: 'center',
              }}>
                <Typography style={{ marginRight: 8 }}>
                  Giới tính:
                </Typography>
                <RadioGroup
                  row aria-label="sex"
                  name="sex"
                  value={formik.values.sex}
                  onChange={(e) => formik.setFieldValue('sex', e.target.value)}>
                  <FormControlLabel value="male" control={<Radio />} label="Nam" />
                  <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                </RadioGroup>
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="off"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="confirmPassword"
                label="Nhập lại mật khẩu"
                type="password"
                id="password"
                autoComplete="off"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </Grid>
            <Grid xs={12} item>
              <RadioGroup
                row aria-label="type"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}>
                {/* <FormControlLabel value="admin" control={<Radio />} label="Admin" /> */}
                <FormControlLabel value="teacher" control={<Radio />} label="Giáo viên" />
                <FormControlLabel value="student" control={<Radio />} label="Học sinh" />
              </RadioGroup>
            </Grid>

            <Grid xs={12} item style={{ marginBottom: 16 }}>
              {formik.values.type === 'teacher' ? (
                <FormControl fullWidth>
                  <InputLabel id="subject">Môn học</InputLabel>
                  <Select
                    labelId="subject"
                    id="subject"
                    name="subject"
                    value={formik.values.subject}
                    label="Môn học"
                    onChange={formik.handleChange}
                    error={formik.touched.subject && Boolean(formik.errors.subject)}
                    helperText={formik.touched.subject && formik.errors.subject}>
                    {(SUBJECT_LIST || []).map((s) => (<MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>))}
                  </Select>
                </FormControl>
              ) : ''}
              {formik.values.type === 'student' ? (
                <FormControl fullWidth>
                  <InputLabel id="class">Lớp</InputLabel>
                  <Select
                    labelId="class"
                    id="class"
                    name="class"
                    value={formik.values.class}
                    label="Lớp"
                    onChange={formik.handleChange}
                    error={formik.touched.class && Boolean(formik.errors.class)}
                    helperText={formik.touched.class && formik.errors.class}>
                    {(classesData || []).map((cls) => (<MenuItem key={`${cls.grade}${cls.class}`} value={`${cls.grade}${cls.class}`}>{`Lớp ${cls.grade}${cls.class}`}</MenuItem>))}
                  </Select>
                </FormControl>
              ) : ''}
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Đăng ký
          </Button>
          <Grid container justifyContent="flex-end" style={{ marginTop: 16 }}>
            <Grid item>
              <Link href="/dang-nhap" variant="body2">
                Trở về đăng nhập
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

SignUp.propTypes = {
  history: PropTypes.shape(),
}

export default SignUp
