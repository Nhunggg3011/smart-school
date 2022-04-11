const confirmDialogStyles = (theme) => ({
  container: {},

  dialogHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3, 1, 1, 1),
    '& img': {
      objectFit: 'contain',
      height: 100,
    },
    '& h6': {
      paddingTop: theme.spacing(2),
    },
  },

  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
  },
  description: {
    // color: ''
    fontWeight: 300,
    fontSize: 12,
    textAlign: 'center',
    whiteSpace: 'break-spaces',
    color: '#74798C',
    margin: 0,
    paddingBottom: theme.spacing(1),
  },

  dialogFooter: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1, 1, 2, 1),
  },

  actionBtn: {
    minWidth: 130,
    margin: theme.spacing(1),
  },
  cancelButton: {
    background: '#FEEBEF !important',
    color: '#F64066 !important',
  },
})

export default confirmDialogStyles
