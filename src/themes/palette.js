import { COLORS } from 'themes/common'

export default {
  primary: {
    main: COLORS.palette.primaryBlue,
  },
  secondary: {
    main: COLORS.palette.secondaryBlue3,
    light: COLORS.palette.secondaryBlue2,
    contrastText: COLORS.palette.secondaryBlue2,
  },
  error: {
    main: COLORS.accent.rubyRed1,
    light: COLORS.accent.rubyRed2,
  },
  success: {
    main: COLORS.accent.viridianGreen1,
    light: COLORS.accent.viridianGreen2,
  },
  warning: {
    main: COLORS.accent.mustardYellow1,
    light: COLORS.accent.mustardYellow2,
  },
  textPrimary: {
    main: COLORS.palette.black,
  },
  text: {
    secondary: COLORS.gray.textGray2,
  },
}
