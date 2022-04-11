import { COLORS } from 'themes/common'

const style = (theme) => ({
  container: {
    width: '100%',
    flexDirection: 'row',

    '& .MuiInputLabel-outlined': {
      [theme.breakpoints.up('lg')]: {
        fontSize: 14,

        '&:not(.MuiInputLabel-shrink)': {
          transform: 'translate(14px, 10px) scale(1)',
        },
      },

      '&:not(.MuiInputLabel-shrink)': {
        transform: 'translate(14px, 9px) scale(1)',
      },
    },
    '& .MuiSelect-iconOutlined': {
      right: 4,
    },
  },
  main: {
    flex: 1,
    minWidth: 0,
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 32,
    background: COLORS.palette.secondaryBlue3,

    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: COLORS.accent.rubyRed1,
    },
  },
  transparent: {
    background: 'transparent',
  },
  icon: {
    color: COLORS.palette.primaryBlue,
  },
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 'unset',
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 14,
    '&:focus': {
      background: COLORS.palette.secondaryBlue3,
      border: 'none',
    },
    '& ~ fieldset.MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0, 0, 0, 0.23)!important',
      borderWidth: '1px!important',
    },
    '&[aria-expanded]': {
      '& ~ fieldset.MuiOutlinedInput-notchedOutline': {
        borderColor: '#2933C5!important',
        borderWidth: '2px!important',
      },
    },
  },
  legend: {
    marginBottom: 5,
  },
  item: {
    justifyContent: 'space-between',
    borderRadius: 3,
    fontSize: 14,
  },
  title: {
    borderTop: `1px solid ${COLORS.gray.disableGray1}`,
    paddingTop: theme.spacing(1),
    paddingBottom: 1,
    marginTop: 5,
    '&.no0': {
      border: 'none',
      paddingTop: 1,
    },
    '&:focus': {
      outline: 'none',
    },
  },
  subLabel: {
    color: COLORS.gray.textGray2,
  },
  leftItem: {
    marginRight: 16,
    height: 32,
    display: 'inline-flex',
    alignItems: 'center',
  },
  leftItemWithTopSpace: {
    marginTop: 22,
  },
  rightItem: {
    marginLeft: theme.spacing(1),
  },
  error: {
    marginRight: 3,
    marginTop: 4,
    marginLeft: 0,
  },
  placeholder: {
    color: 'rgba(0,0,0,.25)',
    fontSize: 14,
    overflow: 'inherit',
    textOverflow: 'inherit',
  },
  formLabel: {
    textAlign: 'left',
    fontSize: 14,
    letterSpacing: 0,
    color: COLORS.palette.black,
    margin: theme.spacing(0, 0, 1),
    opacity: 1,
    position: 'relative',
    zIndex: 2,
    '&.Mui-error': {
      color: COLORS.palette.black,
    },
  },
  label: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  buttonContainer: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    '& > button': {
      flex: 1,
      '&:nth-child(2)': {
        marginLeft: theme.spacing(1),

      },
    },
  },
  optionItem: {
    display: 'flex',
    borderRadius: 3,
    alignItems: 'center',
    padding: 0,
    fontSize: 14,
    '&.MuiListItem-root.Mui-selected': {
      backgroundColor: 'inherit',
    },
  },
  checkbox: {
    marginLeft: 0,
    marginRight: 0,
    flex: 'none',
  },
  optionLabel: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 180,
  },
  addLabel: {
    color: '#1cb69a',
  },
  legendTooltip: {
    marginLeft: 8,
  },
})

export default style
