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
  label: {
    fontSize: 12,
    color: 'grey',
  },
  countDown: {
    color: 'red',
  },
}))

export default style
