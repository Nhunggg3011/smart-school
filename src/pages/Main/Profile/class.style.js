import makeStyles from '@mui/styles/makeStyles'
import { COLORS, vh } from 'themes/common'

const style = makeStyles((theme) => ({
  headerTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  content: {
    padding: theme.spacing(2),
  },
  paper: {
    paddingTop: theme.spacing(2),
  },
}))

export default style
