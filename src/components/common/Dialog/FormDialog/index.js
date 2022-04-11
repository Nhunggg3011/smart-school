import React, { useLayoutEffect } from 'react'
import withStyles from '@mui/styles/withStyles'
import MuiDialog from '@mui/material/Dialog'
import MuiDialogTitle from '@mui/material/DialogTitle'
import MuiDialogContent from '@mui/material/DialogContent'
import MuiDialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { COLORS } from 'themes/common'

const Dialog = withStyles((theme) => ({
  paper: {
    'body.visual-viewport-height-small &': {
      display: 'block',
    },
  },
  paperScrollPaper: {
    'body.visual-viewport-height-small &': {
      maxHeight: `calc(100% - ${theme.spacing(2)})`,
    },
  },
}))((props) => <MuiDialog {...props} />)

const DialogTitle = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1, 2),
  },
  closeButton: {
    color: COLORS.gray.darkGray,
    marginTop: -6,
  },
  header: {
    padding: theme.spacing(2, 2),
  },
  titleText: {
    fontSize: 16,
    color: COLORS.palette.primaryBlue,
    marginRight: theme.spacing(3),
    fontWeight: 500,
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  description: {
    color: COLORS.gray.midGray,
    fontSize: 14,
  },
}))((props) => {
  const {
    children, extraHeader, classes, onClose, disableXClose, ...other
  } = props
  return (
    <MuiDialogTitle disableTypography className={`${classes.root} ${classes.header}`} {...other}>
      <div className={classes.headerContent}>
        <Typography variant="h6" className={classes.titleText}>{children}</Typography>
        {onClose && !disableXClose ? (
          <IconButton aria-label="close" size="small" className={classes.closeButton} onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        ) : null}
      </div>
      {extraHeader ? (<div className={classes.description}>{extraHeader}</div>) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(() => ({
  root: {
    padding: 0,
    borderTopWidth: 0,
    '&.displayBorderTop': {
      borderTopWidth: 1,
    },
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1, 2),
    justifyContent: 'unset',
    minHeight: 61,
  },
}))(MuiDialogActions)

const CustomizedDialogs = ({
  open,
  onClose,
  title,
  extraHeader,
  children,
  footer,
  disableXClose,
  contentClassName,
  displayBorderTop,
  ...props
}) => {
  const handleClose = () => {
    onClose()
  }

  useLayoutEffect(() => {
    // @TODO: visualViewport has not supported Firefox & IE yet.
    // Refer: https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport

    const handleResize = () => {
      if (!window.visualViewport) return

      if (window.visualViewport.height < 400) {
        document.body.classList.add('visual-viewport-height-small')
      } else {
        document.body.classList.remove('visual-viewport-height-small')
      }
    }

    handleResize()
    window.visualViewport?.addEventListener('resize', handleResize)

    return () => window.visualViewport?.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      {...props}
    >
      {title && (
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
        disableXClose={disableXClose}
        extraHeader={extraHeader}
      >
        {title}
      </DialogTitle>
      )}
      <DialogContent
        className={clsx(contentClassName, {
          displayBorderTop,
        })}
        id="form-dialog-content"
        dividers={!!title}
      >
        {children}
      </DialogContent>
      {footer() && (
      <DialogActions>
        {footer()}
      </DialogActions>
      )}

    </Dialog>
  )
}

CustomizedDialogs.defaultProps = {
  extraHeader: '',
  onClose: () => {},
  disableXClose: false,
  footer: () => {},
  title: null,
  children: '',
  contentClassName: '',
  displayBorderTop: false,
}

CustomizedDialogs.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  disableXClose: PropTypes.bool,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  extraHeader: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
  contentClassName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  displayBorderTop: PropTypes.bool,
}

export default CustomizedDialogs
