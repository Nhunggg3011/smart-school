import makeStyles from '@mui/styles/makeStyles'
import { COLORS, vh } from 'themes/common'

const style = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
  },
  headerTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  className: {
    margin: 0,
    fontWeight: '600',
  },
  actions: {
    margin: 0,
    '& a': {
      textDecoration: 'none',
    },
    '& a:first-child': {
      color: 'green',
    },
    '& a:last-child': {
      color: 'grey',
    },
  },
  classBox: {
    display: 'flex',
    alignItems: 'center',
  },
  grade: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'grey',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    color: 'white',
    '& div:first-child': {
      fontSize: 9,
    },
    '& div:last-child': {
      fontSize: 20,
      fontWeight: '500',
    },
  },
}))

export default style
