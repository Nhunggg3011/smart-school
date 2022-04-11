import makeStyles from '@mui/styles/makeStyles'
import { COLORS, vh } from 'themes/common'

const style = makeStyles((theme) => ({
  headerTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  contentContainer: {
    padding: 0,
  },
  headerContent: {
    marginTop: '0px !important',
    paddingTop: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
  },
}))

export default style
