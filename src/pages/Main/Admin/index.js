import React, { useEffect, useMemo, useState } from 'react'
import LayoutHeader from 'components/common/Layout/LayoutHeader'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import { useAuth } from 'store/auth'
import useStyles from './Dashboard.style'
import Class from './Class'
import Students from './Students'
import Teacher from './Teachers'

const Dashboard = () => {
  const classes = useStyles()
  const [tab, setTab] = React.useState('class')
  const [user] = useAuth()

  const tabs = useMemo(() => ([{
    value: 'class',
    label: 'Lớp học',
  }, {
  //   value: 'teacher',
  //   label: 'Giáo viên',
  // }, {
    value: 'student',
    label: 'Học sinh',
  }]), [])

  const handleChangeTab = (_, t) => {
    setTab(t)
  }

  return (
    <>
      <TabContext value={tab}>
        <LayoutHeader sticky contentClassName={classes.headerContent}>
          <Container maxWidth="lg">
            <div className={classes.headerTitleContainer}>
              <div>
                <Typography variant="h2">
                  Thông tin lớp học
                </Typography>
              </div>
            </div>
            <TabList onChange={handleChangeTab}>
              {tabs.map((t) => (<Tab key={t.value} label={t.label} value={t.value} />))}
            </TabList>
          </Container>
        </LayoutHeader>
        <Container maxWidth="lg" className={classes.content}>
          {tab === 'class' && (<Class />)}
          {tab === 'teacher' && (<Teacher />)}
          {tab === 'student' && (<Students />)}
        </Container>
      </TabContext>
    </>
  )
}

export default Dashboard
