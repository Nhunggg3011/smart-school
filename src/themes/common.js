export const COLORS = {
  palette: {
    primaryBlue: '#2933C5',
    secondaryBlue1: '#2959C5',
    secondaryBlue2: '#B4BFD9',
    secondaryBlue3: '#EDF1FB',
    secondaryBlue4: '#4551C6',
    secondaryBlue5: '#6874CF',
    secondaryBlue6: '#8B97D8',
    secondaryBlue7: '#ADB9E1',
    secondaryBlue8: '#2D36BD',
    secondaryBlue9: '#FAFCFF',
    blueGradientStart: '#2933C5',
    blueGradientEnd: '#B6C2E3',
    white: '#FFFFFF',
    black: '#2E2E2E',
    backgroundBlue: '#F8F9FF',
  },
  accent: {
    mustardYellow1: '#F0CE12',
    mustardYellow2: '#FFF5BF',
    apricotOrange1: '#FFA92B',
    apricotOrange2: '#FFF6E9',
    rubyRed1: '#F64066',
    rubyRed2: '#FEEBEF',
    viridianGreen1: '#1CB69A',
    viridianGreen2: '#E7F8F5',
    starYellow: '#E1AD01',
    red: '#F64066',
  },
  gray: {
    textGray: '#2E2E2E',
    textGray1: '#414141',
    textGray2: '#7f8597cf',
    textGray3: '#3B4757',
    disableGray: '#C7C7C7',
    disableGray1: '#EAEAEA',
    disableGray2: '#F4F4F4',
    background: '#FDFDFF',
    darkGray: '#414141',
    grayBorder: '#E0E0E0',
    grayBorder2: '#E4E4E4',
    midGray: '#74798C',
    backgroundIcon: '#C3C3C3',
  },
}

// Double check when changing the bellow numbers
export const VIEWPORT_HEIGHT = {
  md: 768,
}

export const vh = {
  up: (key) => `@media screen and (min-height: ${typeof key === 'number' ? key : VIEWPORT_HEIGHT[key]}px)`,
  down: (key) => `@media screen and (max-height: ${typeof key === 'number' ? key : VIEWPORT_HEIGHT[key] - 1}px)`,
}
