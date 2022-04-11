/* eslint-disable no-underscore-dangle */
import React, { useEffect, useMemo, useState } from 'react'
import Typography from '@mui/material/Typography'
import LayoutHeader from 'components/common/Layout/LayoutHeader'
import Container from '@mui/material/Container'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import Select from 'components/common/Select'
import Button from 'components/common/Button'
import { useClass } from 'store/class'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useAuth } from 'store/auth'
import { useFetchEvent, useImportCSVFile } from 'store/events'
import TableBody from '@mui/material/TableBody'
import { SUBJECT_LIST, SUBJECT_MAP } from 'constants/Subject'
import CSVReader from 'react-csv-reader'
import Loading from 'components/common/Loading'
import useStyles from './class.style'
import EventDialog from './CreateEvents'

const TimeTable = () => {
  const classes = useStyles()
  const [openDialog, setShowDialog] = useState(false)
  const history = useHistory()
  const location = useLocation()
  const [user] = useAuth()
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const [selectClass, setSelectClass] = useState(queryParams.get('lop'))
  const [classesData] = useClass()
  const classOptions = useMemo(() => (classesData || []).map((cls) => ({ value: `${cls.grade}${cls.class}`, label: `Lớp ${cls.grade}${cls.class}` })), [classesData])
  const [events, loading, error, actions] = useFetchEvent(user?.type === 'student' ? user.class : queryParams.get('lop'))
  const [importCSVTimeTable, iLoading, iError] = useImportCSVFile()

  const handleFilter = () => {
    const params = new URLSearchParams(location.search)
    if (selectClass) {
      params.set('lop', selectClass)
    } else {
      params.set('lop', '')
    }
    history.replace({ search: params.toString() })
  }

  useEffect(() => {
    if (user?.type !== 'student' && classOptions.length > 0 && !queryParams.get('lop')) {
      const params = new URLSearchParams(location.search)
      params.set('lop', classOptions[0].value)
      history.replace({ search: params.toString() })
      setSelectClass(classOptions[0].value)
    }
  }, [user, classOptions, queryParams])

  const handleClearFilter = () => {
    setSelectClass(null)
    const params = new URLSearchParams(location.search)
    params.delete('lop')
    history.replace({ search: params.toString() })
  }

  const tableData = useMemo(() => (events || []).reduce((acc, event) => {
    acc.data[event.weekday] = (acc.data[event.weekday] || []).concat([event])
    acc.count = acc.data[event.weekday].length > acc.count ? acc.data[event.weekday].length : acc.count
    return acc
  }, { data: {}, count: 0 }), [events])

  const renderLesson = (weekday, idx) => {
    if (tableData.data[weekday] && tableData.data[weekday].length > idx) {
      const lesson = tableData.data[weekday][idx]
      return (
        <div
          className={classes.lesson} onClick={() => {
            history.push(`/tiet-hoc?id=${lesson._id}`)
          }}
          role="presentation">
          <span className={classes.lessonTitle} style={{ color: SUBJECT_MAP[lesson.subject]?.color }}>{SUBJECT_MAP[lesson.subject]?.label}</span>
          <div className={classes.lessonTime}>{`${lesson.startTime || '--:--'} - ${lesson.endTime || '--:--'}`}</div>
        </div>
      )
    }
    return ''
  }

  const createEvent = () => {
    setShowDialog(true)
  }

  const importCSV = () => {
    document.getElementById('csvTimeTable')?.click()
  }

  const onLoadFile = (data) => {
    importCSVTimeTable(data)
  }

  return (
    <>
      <Loading loading={loading || iLoading} />
      <LayoutHeader sticky contentClassName={classes.headerContent}>
        <Container maxWidth="lg">
          <div className={classes.headerTitleContainer}>
            <Typography variant="h2">
              Thời khoá biểu
            </Typography>
            <div>
              {user?.admin ? <Button onClick={createEvent} style={{ marginRight: 10 }}>Thêm tiết học</Button> : ''}
              {user?.admin ? (
                <>
                  <Button onClick={importCSV}>Nạp TKB từ *.csv</Button>
                  <CSVReader cssClass={classes.csv} inputId="csvTimeTable" onFileLoaded={onLoadFile} />
                </>
              ) : ''}
            </div>
          </div>
          <div className={classes.headerTitleContainer}>
            <div />
            <a href="/static/csv/timetable.csv" target="_blank" style={{ color: 'green' }}>Download file csv mẫu</a>
          </div>
        </Container>
      </LayoutHeader>
      <Container maxWidth="lg" className={classes.content}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              {user?.type !== 'student' && (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className={classes.filter}>
                    <div style={{ flex: 1 }} />
                    <Select
                      value={selectClass}
                      onChange={(val) => setSelectClass(val)}
                      options={classOptions}
                      placeholder="Chọn lớp" />
                    <Button onClick={handleFilter}>Lọc</Button>
                    <Button onClick={handleClearFilter} color="Secondary" variant="outlined">Xoá</Button>
                  </div>
                </TableCell>
              </TableRow>
              )}
              <TableRow>
                {/* <TableCell align="center">Chủ nhật</TableCell> */}
                <TableCell align="center" style={{ width: '14%' }}>Thứ 2</TableCell>
                <TableCell align="center" style={{ width: '14%' }}>Thứ 3</TableCell>
                <TableCell align="center" style={{ width: '14%' }}>Thứ 4</TableCell>
                <TableCell align="center" style={{ width: '14%' }}>Thứ 5</TableCell>
                <TableCell align="center" style={{ width: '14%' }}>Thứ 6</TableCell>
                <TableCell align="center" style={{ width: '14%', backgroundColor: '#edf1fbad' }}>Thứ 7</TableCell>
                <TableCell align="center" style={{ width: '14%', backgroundColor: '#ffd9d987' }}>Chủ nhật</TableCell>
                {/* <TableCell align="center">Thứ 7</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(Array(tableData.count).keys()).map((xkey, idx) => (
                <TableRow
                  key={`${xkey}`}
           >
                  <TableCell align="center">{renderLesson('mon', idx)}</TableCell>
                  <TableCell align="center">{renderLesson('tue', idx)}</TableCell>
                  <TableCell align="center">{renderLesson('wed', idx)}</TableCell>
                  <TableCell align="center">{renderLesson('thu', idx)}</TableCell>
                  <TableCell align="center">{renderLesson('fri', idx)}</TableCell>
                  <TableCell align="center" style={{ backgroundColor: '#edf1fbad' }}>{renderLesson('sat', idx)}</TableCell>
                  <TableCell align="center" style={{ backgroundColor: '#ffd9d987' }}>{renderLesson('sun', idx)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {openDialog && (
      <EventDialog
        handleClose={() => {
          setShowDialog(false)
          actions.fetchData()
        }} selectClass={queryParams.get('lop')} />
      )}
    </>
  )
}

export default TimeTable
