import React, { useEffect } from 'react'
import clsx from 'clsx'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import PropTypes from 'prop-types'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ExitToApp from '@mui/icons-material/ExitToApp'
import Class from '@mui/icons-material/Class'
import Dashboard from '@mui/icons-material/Dashboard'
import TableView from '@mui/icons-material/TableView'
import AccountBox from '@mui/icons-material/AccountBox'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ManageSearch from '@mui/icons-material/ManageSearch'
import Avatar from '@mui/material/Avatar'
import { useAuth, useUserInfo } from 'store/auth'
import {
  useHistory, Link, matchPath, useLocation,
} from 'react-router-dom'
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning'
import FaceIcon from '@mui/icons-material/Face'
import useStyles from './Sidebar.style'

const Sidebar = ({ open, handleDrawerClose, handleDrawerOpen }) => {
  const classes = useStyles()
  const [user, actions] = useAuth()
  const userInfo = useUserInfo()
  const history = useHistory()
  const location = useLocation()

  const logout = async () => {
    await actions.logout()
    history.replace('/dang-nhap')
  }

  const selectedPath = (path) => matchPath(location.pathname, {
    path,
    exact: true,
  })

  useEffect(() => {
    if (open) handleDrawerClose()
  }, [location.pathname])

  return (
    <SwipeableDrawer
      anchor="left"
      variant="temporary"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
      onClose={handleDrawerClose}
      onOpen={handleDrawerOpen}
    >
      {/* <div className={classes.toolbarIcon} /> */}
      <div className={classes.userInfo}>
        <Avatar alt={user?.displayName} src="static/images/noavatar.png" className={classes.avatar} />
        <span>{userInfo?.displayName}</span>
        <span>{user?.email}</span>
      </div>
      <Divider />
      <List className={classes.list}>
        <ListItem component={Link} to="/trang-chu" selected={!!selectedPath('/trang-chu')}>
          <ListItemIcon>
            <Dashboard style={{ color: '#251A57' }} />
          </ListItemIcon>
          <ListItemText primary={user?.type === 'teacher' ? 'Lịch giảng dạy' : 'Lịch học hàng ngày'} />
        </ListItem>
        {user?.admin ? (
          <ListItem component={Link} to="/quan-ly-gio-hoc" selected={!!selectedPath('/quan-ly-gio-hoc')}>
            <ListItemIcon>
              <ManageSearch style={{ color: 'orange' }} />
            </ListItemIcon>
            <ListItemText primary="Quản lý giờ học" />
          </ListItem>
        ) : ''}
        <ListItem component={Link} to="/thoi-khoa-bieu" selected={!!selectedPath('/thoi-khoa-bieu')}>
          <ListItemIcon>
            <TableView style={{ color: '#0091FF' }} />
          </ListItemIcon>
          <ListItemText primary="Thời khoá biểu" />
        </ListItem>
        <Divider />
        {user?.type === 'teacher' ? (
          <ListItem component={Link} to="/quan-ly-lop-hoc" selected={!!selectedPath('/quan-ly-lop-hoc')}>
            <ListItemIcon>
              <Class style={{ color: '#455560' }} />
            </ListItemIcon>
            <ListItemText primary="QL Lớp học" />
          </ListItem>
        ) : ''}
        <ListItem component={Link} to="/quan-ly-giao-vien" selected={selectedPath('/quan-ly-giao-vien')}>
          <ListItemIcon>
            <EscalatorWarningIcon style={{ color: 'green' }} />
          </ListItemIcon>
          <ListItemText primary="QL Giáo viên" />
        </ListItem>
        <ListItem component={Link} to="/quan-ly-hoc-sinh" selected={selectedPath('/quan-ly-hoc-sinh')}>
          <ListItemIcon>
            <FaceIcon style={{ color: 'purple' }} />
          </ListItemIcon>
          <ListItemText primary="QL Học sinh" />
        </ListItem>
        <Divider />
        {user?.admin ? (
          <ListItem component={Link} to="/them-tai-khoan" selected={!!selectedPath('/ca-nhan')}>
            <ListItemIcon>
              <AccountCircle style={{ color: 'blue' }} />
            </ListItemIcon>
            <ListItemText primary="Thêm GV/HS" />
          </ListItem>
        ) : ''}
        <ListItem component={Link} to="/ca-nhan" selected={!!selectedPath('/ca-nhan')}>
          <ListItemIcon>
            <AccountBox style={{ color: '#E15454' }} />
          </ListItemIcon>
          <ListItemText primary="Thông tin tài khoản" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <ExitToApp style={{ color: '#251A57' }} />
          </ListItemIcon>
          <ListItemText primary="Đăng xuất" />
        </ListItem>
      </List>
    </SwipeableDrawer>
  )
}

Sidebar.propTypes = {
  open: PropTypes.bool,
  handleDrawerOpen: PropTypes.func,
  handleDrawerClose: PropTypes.func,
}

export default Sidebar
