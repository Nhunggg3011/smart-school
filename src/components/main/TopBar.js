/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useAuth } from 'store/auth'
import { useMarkedNotification, useNotification } from 'store/notifications'
import Menu from '@mui/material/Menu'
import ListItemText from '@mui/material/ListItemText'
import isEmpty from 'lodash/isEmpty'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import notificationNone from 'assets/img/notification_none.svg'
import { SUBJECT_MAP } from 'constants/Subject'
import moment from 'moment'
import { useHistory } from 'react-router'
import { envValues } from 'utils/env'
import useStyles from './Topbar.style'

const Topbar = ({ handleDrawer }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const [user] = useAuth()
  const history = useHistory()
  const [notifications] = useNotification(user?.uid)
  const notifyMarked = useMarkedNotification()
  const countUnread = useMemo(() => (notifications || []).filter((n) => !n.marked).length, [notifications])
  const handleOpenNotification = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const clickNotify = (n) => {
    setAnchorEl(null)
    if (n.marked) {
      history.push(`/phong-hoc?eventId=${n.event?._id}&date=${moment(n.createdDate).format('YYYY-MM-DD')}`)
    } else {
      notifyMarked(`${n.user?.uid}${n.event?._id}${moment(n.createdDate).format('YYYYMMDD')}`).then(() => {}).catch((e) => {}).finally(() => {
        history.push(`/phong-hoc?eventId=${n.event?._id}&date=${moment(n.createdDate).format('YYYY-MM-DD')}`)
      })
    }
  }

  return (
    <AppBar position="absolute" className={classes.appBar} color="inherit">
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawer}
          className={clsx(classes.menuButton)}
          size="large"
        >
          <MenuIcon color="red" />
        </IconButton>
        <img src="/static/images/logo.jpeg" alt="logo" className={classes.logo} />
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          PM quản lý giảng dạy
        </Typography>
        <IconButton color="warning" aria-controls="simple-menu" aria-haspopup="true" variant="text" onClick={handleOpenNotification}>
          <Badge badgeContent={countUnread} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Menu
          classes={{
            paper: classes.paperNoti,
          }}
          aria-labelledby="simple-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          keepMounted
          value=""
      >
          <List
            component="div"
            aria-labelledby="nested-list-subheader"
          >
            {isEmpty(notifications) ? (
              <div style={{ textAlign: 'center', padding: '8px 16px' }}>
                <img src={notificationNone} alt="" className={classes.imgWidthHeight} />
                <Typography variant="h6" gutterBottom className={classes.notiTitle}>
                  Hiện không có thông báo nào.
                </Typography>
              </div>
            ) : notifications.map((n) => (
              <ListItem
                onClick={() => clickNotify(n)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: n.marked ? 'white' : '#fafafa',
                }}>
                <ListItemText
                  className={classes.rootListItem}
                  primary={`Môn ${SUBJECT_MAP[n.event?.subject]?.label}`}
                  secondary={(
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {`${moment(n.createdDate).format('YYYY/MM/DD')}`}
                      </Typography>
                      {` — diễn ra từ ${n.event?.startTime || ''} đến ${n.event?.endTime || ''}`}
                    </>
                  )}
               />
              </ListItem>
            ))}
          </List>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

Topbar.propTypes = {
  handleDrawer: PropTypes.func,
}

export default Topbar
