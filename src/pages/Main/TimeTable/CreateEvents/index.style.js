import makeStyles from '@mui/styles/makeStyles'
import { COLORS, vh } from 'themes/common'

const style = makeStyles((theme) => ({
  fields: {
    display: 'flex',
    minWidth: 400,
  },
  title: {
    color: COLORS.palette.primaryBlue,
    fontWeight: '500 !important',
  },
  actionURL: {
    display: 'flex',
    '& button + button': {
      marginLeft: 5,
    },
  },
}))

export default style
