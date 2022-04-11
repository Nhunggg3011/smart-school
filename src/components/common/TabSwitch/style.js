import { COLORS } from 'themes/common'

const style = () => ({
  switchContainer: {
    backgroundColor: COLORS.palette.secondaryBlue3,
    borderRadius: 21,
    display: 'inline-flex',
  },
  tab: {
    fontSize: 14,
    color: COLORS.palette.primaryBlue,
    padding: '8px 13px',
    cursor: 'pointer',
    '&:focus': {
      outline: 'unset',
    },
    '&.active': {
      color: COLORS.palette.white,
      backgroundColor: COLORS.palette.primaryBlue,
      borderRadius: 21,
    },
  },
})

export default style
