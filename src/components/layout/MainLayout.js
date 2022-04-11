/* eslint-disable no-empty */
import React, {
  Suspense, useState, useEffect, useCallback,
} from 'react'
import PropTypes from 'prop-types'
import { Redirect, useHistory } from 'react-router-dom'
import Guard, { isLogined } from 'components/guard'
import CssBaseline from '@mui/material/CssBaseline'
import Topbar from 'components/main/TopBar'
import Sidebar from 'components/main/Sidebar'
import BackToTopButton from 'components/common/BackToTop'
import Loading3Dot from 'components/common/Loading3Dot'
import { requestFirebaseNotificationPermission, isMessagingSupported } from 'utils/messaging'
import { useAuth } from 'store/auth'
import { useUpdateNotficationToken } from 'store/user'
import { messaging } from 'common/firebase'
import ReactNotification, { store } from 'react-notifications-component'
import clsx from 'clsx'
import { useInitStore } from 'recoils/user'
import { refreshRoom } from 'services/zoomService'
import useStyles from './MainLayout.style'
import './main.css'
import 'react-notifications-component/dist/theme.css'

const MainLayout = ({ children }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleDrawer = () => setOpen(!open)
  const handleDrawerClose = () => setOpen(false)
  const handleDrawerOpen = () => setOpen(true)
  const history = useHistory()

  const [user] = useAuth()
  const [updateNotficationToken] = useUpdateNotficationToken()

  useInitStore()

  const refreshZoom = useCallback(async () => {
    try {
      if (user) await refreshRoom(user.uid)
    } catch (e) {}
  }, [user])

  useEffect(() => {
    if (user?.uid) {
      refreshZoom()
    }
  }, [])

  useEffect(() => {
    if (user?.uid && isMessagingSupported()) {
      requestFirebaseNotificationPermission().then((currentToken) => {
        updateNotficationToken(user.uid, currentToken)
      })
    }
  }, [user?.uid])

  const showNotification = (payload) => {
    store.addNotification({
      title: <div onClick={() => history.push(`/phong-hoc?eventId=${payload.data?.eventId}&date=${payload.data?.date}`)} role="presentation">{payload?.data?.title}</div>,
      message: <div onClick={() => history.push(`/phong-hoc?eventId=${payload.data?.eventId}&date=${payload.data?.date}`)} role="presentation">{payload?.data?.body || 'Môn học tiếp theo'}</div>,
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    })
  }

  useEffect(() => {
    messaging.onMessage((payload) => {
      showNotification(payload)
    })
  }, [])

  return (
    <Guard accessWhen={isLogined} fallbackComp={<Redirect to="/dang-nhap" />}>
      <div className={clsx(classes.root, 'app-container')}>
        <CssBaseline />
        <Topbar handleDrawer={handleDrawer} />
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} />
        <main id="content" className={classes.content}>
          <div className={classes.appBarSpacer} />
          <BackToTopButton showBelow={500} />
          <Suspense fallback={<Loading3Dot />}>
            {children}
          </Suspense>
        </main>
        <ReactNotification />
      </div>
    </Guard>
  )
}

MainLayout.propTypes = {
  children: PropTypes.any,
}

export default MainLayout
