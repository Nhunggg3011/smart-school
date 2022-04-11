import { FormLabel } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import { COLORS } from 'themes/common'

const FormLabelStyled = withStyles((theme) => ({
  root: {
    textAlign: 'left',
    fontSize: 14,
    letterSpacing: 0,
    color: COLORS.palette.black,
    marginBottom: theme.spacing(1),
    opacity: 1,
    padding: '4px 0 0 0',
  },
}))(FormLabel)

export default FormLabelStyled
