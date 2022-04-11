import React from 'react'
import { Dialog, Typography } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import PropTypes from 'prop-types'
import Button from 'components/common/Button'

import dialogParams from './dialogParams'
import styles from './style'

const CustomDialog = ({
  icon,
  title,
  description,
  cancelText,
  okText,
  classes,
  children,
  open,
  onClose,
  onCancel,
  onOk,
  closeOnClick,
  ...props
}) => {
  const iconImage = {
    warn: '/icons/warning.svg',
    success: '/icons/success.svg',
    update: '',
    trash: '/icons/trash.svg',
    mail: '/icons/mail.svg',
    importing: '/icons/importing.svg',
    default: '',
    file: '/icons/file-break.svg',
    redWarn: '/icons/red-warning.svg',
    loader: '/icons/feather-loader.svg',
  }

  const cancel = () => {
    if (closeOnClick) {
      onCancel()
      onClose()
    } else {
      onCancel()
    }
  }

  const ok = () => {
    if (closeOnClick) {
      onOk()
      onClose()
    } else {
      onOk()
    }
  }

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      onClose={cancel}
      onKeyPress={(e) => !cancelText && e.key === 'Enter' && ok()}
      disableEscapeKeyDown
      {...props}
    >
      {
        typeof children === 'function'
          ? children({ onClose })
          : (
            <div className={classes.container}>
              <div className={classes.dialogHeader}>
                <img
                  src={icon
                    ? iconImage[icon]
                    : iconImage.default}
                  alt={`${icon} icon`}
                />
                <Typography variant="h6">{title}</Typography>
              </div>

              {description && (
                <div className={classes.dialogContent}>
                  {typeof description === 'string'
                    ? <p className={classes.description}>{description}</p>
                    : Array.isArray(description) && (
                      <>
                        {description.map((d, i) => <p className={classes.description} key={i}>{d}</p>)}
                      </>
                    )}
                </div>
              )}

              {children && (
                <div className={classes.dialogContent}>
                  {children}
                </div>
              )}

              <div className={classes.dialogFooter}>
                {
                  cancelText
                  && (
                    <Button
                      className={`${classes.actionBtn} ${classes.cancelButton}`}
                      onClick={cancel}
                      rounded
                    >
                      {cancelText}
                    </Button>
                  )
                }
                <Button
                  className={`${classes.actionBtn} ${classes.okButton}`} onClick={ok}
                  rounded
                >
                  {okText}
                </Button>
              </div>

            </div>
          )
      }
    </Dialog>
  )
}

CustomDialog.defaultProps = {
  onCancel: () => { },
  onOk: () => { },
  onClose: () => { },
  closeOnClick: true,
  children: '',
  description: '',
  cancelText: null,
  title: '',
  okText: '',
  icon: '',
}

CustomDialog.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  cancelText: PropTypes.string,
  okText: PropTypes.string,
  classes: PropTypes.shape().isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.node,
  ]),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  closeOnClick: PropTypes.bool,
}

export {
  dialogParams,
}
export default withStyles(styles)(CustomDialog)
