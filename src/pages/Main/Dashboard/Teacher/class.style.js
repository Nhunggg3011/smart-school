import makeStyles from '@mui/styles/makeStyles'
import { COLORS, vh } from 'themes/common'

const style = makeStyles((theme) => ({
  headerTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    padding: theme.spacing(4, 2),
  },
  paper: {
    paddingTop: theme.spacing(2),
  },
  label: {
    minWidth: 150,
    display: 'inline-block',
    paddingLeft: 10,
  },
  value: {
    fontWeight: '500',
    display: 'inline-block',
  },
  actions: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plan: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listPlan: {
    width: '100%',
    '& tr': {
      cursor: 'pointer',
    },
  },
  countDown: {
    color: 'red',
  },
}))

export default style
