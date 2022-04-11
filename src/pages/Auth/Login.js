import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Copyright from 'components/main/Copyright'
import Paper from '@mui/material/Paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from 'store/auth'
import useStyles from './Login.style'

const SignInSchema = Yup.object().shape({
  email: Yup.string().trim().email('Email không đúng').required('(*) Bắt buộc.'),
  password: Yup.string().required('(*) Bắt buộc.'),
})

const SignIn = ({ history }) => {
  const classes = useStyles()
  const [_, actions] = useAuth()

  const handleSubmit = (u) => {
    try {
      actions.signIn(u)
    } catch (e) {
      alert(e.message)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: handleSubmit,
  })

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Địa chỉ Email"
            autoComplete="off"
            autoFocus
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="off"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container style={{ marginTop: 16 }}>
            <Grid item xs />
            <Grid item>
              <Link href="/dang-ky" variant="body2">
                Đăng ký tài khoản mới
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

SignIn.propTypes = {
  history: PropTypes.shape(),
}

export default SignIn
