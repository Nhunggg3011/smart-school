import { COLORS } from 'themes/common'

export default {
  MuiOutlinedInput: {
    input: {
      fontSize: 14,
      color: COLORS.palette.black,
      '&::placeholder': {
        fontSize: 14,
        color: COLORS.gray.textGray2,
      },
      '@media (max-width: 1279px)': {
        fontSize: 16,
      },
    },
    root: {
      background: COLORS.palette.secondaryBlue3,
    },
  },
  MuiMenu: {
    paper: {
      marginTop: 8,
      marginLeft: -8,
      paddingLeft: 8,
      paddingRight: 8,
      boxShadow: '0px 2px 10px #D6DEF2',
      borderRadius: 5,
      maxWidth: 400,
    },
  },
}
