import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  imageTop: {
    position: 'absolute',
    width: '900px',
    top: '-300px',
    right: '-100px',
    zIndex: -1,
    [theme.breakpoints.down('sm')]: {
      width: '500px',
      top: '-150px',
      right: '-100px',
    },
    [theme.breakpoints.down('lg')]: {
      width: '700px',
      top: '-250px',
      right: '-100px',
    },
  },
  imageBottom: {
    position: 'absolute',
    width: '400px',
    bottom: '-200px',
    left: 0,
  },
}))

export default useStyles
