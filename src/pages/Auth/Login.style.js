import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(22),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },
}))

export default useStyles
