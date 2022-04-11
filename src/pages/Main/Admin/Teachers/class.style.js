import makeStyles from '@mui/styles/makeStyles'
import { COLORS, vh } from 'themes/common'

const style = makeStyles((theme) => ({
  container: {
  },
  filter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& .MuiFormControl-root': {
      width: 'auto',
      minWidth: 200,
      marginRight: theme.spacing(1),
    },
    '& button + button': {
      marginLeft: theme.spacing(1),
    },
  },
}))

export default style
