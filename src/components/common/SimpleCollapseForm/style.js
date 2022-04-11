import { COLORS } from 'themes/common'

const BORDER_RADIUS = 6

const style = (theme) => ({
  root: {
    width: '100%',
    border: `1px solid ${COLORS.palette.secondaryBlue2}`,
    borderRadius: BORDER_RADIUS,
  },
  header: {
    padding: theme.spacing(1, 2),
    backgroundColor: COLORS.palette.secondaryBlue3,
    borderRadius: BORDER_RADIUS,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerCheckbox: {
    '& .MuiButtonBase-root': {
      padding: '0px 8px 0px 0px',
    },
  },
  headerExpand: {
    borderBottom: `1px solid ${COLORS.palette.secondaryBlue2}`,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  content: {
    padding: theme.spacing(2),
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: COLORS.palette.primaryBlue,
    fontSize: 14,
    lineHeight: '17px',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  btnArrow: {
    padding: 0,
  },
  icArrow: {
    color: COLORS.palette.primaryBlue,
  },
  icArrowOpen: {
    transform: 'rotate(-180deg)',
  },
  icArrowClosed: {
    transform: 'rotate(0)',
  },
  icSort: {
    width: '22px !important',
    height: '22px !important',
    margin: theme.spacing(0, 0.5),
  },
  btnSort: {
    padding: 0,
    margin: theme.spacing(0, 0.5),
  },
  headerSubTitle: {
    color: COLORS.gray.midGray,
    fontSize: 12,
    lineHeight: '14px',
    fontWeight: '400',
    margin: theme.spacing(0, 0.5, 0, 1),
  },
})

export default style
