import makeStyles from '@mui/styles/makeStyles'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    // backgroundColor: 'white',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: 900,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: 'initial !important',
    borderBottom: '1px solid #e5e5e5',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    flexGrow: 1,
    color: 'black',
  },
  paperNoti: {
    boxShadow: '0px 2px 10px #D6DEF2',
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 440,
  },
  imgWidthHeight: {
    maxWidth: 200,
    maxHeight: 200,
    padding: '50px 50px 20px 50px',
    margin: '0px auto',
  },
  notiTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  rootList: {
    width: '100%',
    maxWidth: 460,
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
  },
  rootListItem: {
    width: '100%',
  },
}))

export default useStyles
