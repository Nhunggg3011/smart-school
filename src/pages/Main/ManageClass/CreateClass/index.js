import React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useClassAction } from 'store/class'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import useStyles from './index.style'

const ClassSchema = Yup.object().shape({
  class: Yup.string().trim().required('(*) Bắt buộc.'),
  grade: Yup.string().trim().required('(*) Bắt buộc.'),
})

const CreateClassDialog = ({ handleClose }) => {
  const classes = useStyles()
  const actions = useClassAction()
  const formik = useFormik({
    initialValues: {
      class: '',
      grade: 12,
      students: [],
    },
    validationSchema: ClassSchema,
    onSubmit: (v) => {
      actions.makeClass(v)
      handleClose()
    },
  })

  return (
    <Dialog open onClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Tạo lớp học</DialogTitle>
        <DialogContent>
          <Select
            id="grade"
            value={formik.values.grade}
            label="Khối"
            name="grade"
            fullWidth
            onChange={formik.handleChange}
            required
            variant="standard"
            error={formik.touched.grade && Boolean(formik.errors.grade)}
            helperText={formik.touched.grade && formik.errors.grade}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (<MenuItem key={`${grade}`} value={grade}>{`Khối lớp ${grade}`}</MenuItem>))}
          </Select>
          <TextField
            autoFocus
            labelId="class-text-field"
            margin="dense"
            name="class"
            label="Tên lớp"
            fullWidth
            required
            variant="standard"
            value={formik.values.class}
            onChange={formik.handleChange}
            error={formik.touched.class && Boolean(formik.errors.class)}
            helperText={formik.touched.class && formik.errors.class} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Bỏ qua</Button>
          <Button type="submit">Tạo lớp</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

CreateClassDialog.propTypes = {
  handleClose: PropTypes.func,
}

export default CreateClassDialog
