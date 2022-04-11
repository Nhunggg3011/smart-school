import React, { useEffect, useMemo, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Select from 'components/common/Select'
import Button from 'components/common/Button'

import { useClass } from 'store/class'
import { TableCell, TableRow } from 'components/common/Table'
import { SUBJECT_MAP } from 'constants/Subject'
import Input from 'components/common/TextInput'
import moment from 'moment'
import { useFetchLessons } from 'store/lesson'
import { useTeachers } from 'store/teachers'
import { useHistory } from 'react-router'
import useStyles from './class.style'

const defaultVals = [{
  value: 'all',
  label: 'Tất cả',
}]

const Class = () => {
  const classes = useStyles()
  const [selectedClass, setClass] = useState('all')
  const [selectedTeacher, setTeacher] = useState('all')
  const [startDate, setStartDate] = useState(moment().add(-7, 'days').format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'))
  const [filter, setFilter] = useState({
    selectedClass: 'all',
    selectedTeacher: 'all',
    startDate,
    endDate,
  })
  const [teachers] = useTeachers()
  const [lessons, loading, error, actions] = useFetchLessons()
  const [classesData] = useClass()
  const classOptions = useMemo(() => defaultVals.concat((classesData || []).map((cls) => ({ value: `${cls.grade}${cls.class}`, label: `Lớp ${cls.grade}${cls.class}` }))), [classesData])
  const teacherOptions = useMemo(() => defaultVals.concat((teachers || []).map((u) => ({ value: u.uid, label: u.displayName }))), [classesData])
  const history = useHistory()

  const teacherMap = useMemo(() => (teachers || []).reduce((acc, t) => {
    acc[t.uid] = t
    return acc
  }, {}))

  const classMap = useMemo(() => (classesData || []).reduce((acc, cls) => {
    acc[`${cls.grade}${cls.class}`] = cls
    return acc
  }, {}))

  const handleFilter = () => {
    setFilter({
      selectedClass,
      selectedTeacher,
      startDate,
      endDate,
    })
  }
  const handleClearFilter = () => {
    setClass('all')
    setTeacher('all')
    setStartDate(moment().add(-7, 'days').format('YYYY-MM-DD'))
    setStartDate(moment().format('YYYY-MM-DD'))
    setFilter({
      selectedClass: 'all',
      selectedTeacher: 'all',
      startDate: moment().add(-7, 'days').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    })
  }

  useEffect(() => {
    actions.fetchLesson(filter.selectedClass, filter.selectedTeacher, filter.startDate, filter.endDate)
  }, [filter])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={6}>
              <div className={classes.filter}>
                <div style={{ flex: 1 }} />
                <Input
                  legend="Từ ngày"
                  type="date"
                  value={startDate}
                  name="fromDate"
                  inputFormat="yyyy-MM-dd"
                  onChange={(e) => setStartDate(e.target.value)} />
                <Input
                  legend="Đến ngày ngày"
                  type="date"
                  value={endDate}
                  name="endDate"
                  inputFormat="yyyy-MM-dd"
                  onChange={(e) => setEndDate(e.target.value)} />
                <Select
                  legend="Giáo viên"
                  value={selectedTeacher}
                  onChange={(val) => setTeacher(val)}
                  options={teacherOptions}
                  placeholder="Chọn Giáo viên" />
                <Select
                  legend="Lớp"
                  value={selectedClass}
                  onChange={(val) => setClass(val)}
                  options={classOptions}
                  placeholder="Chọn lớp" />
                <Button onClick={handleFilter}>Lọc</Button>
                <Button onClick={handleClearFilter} color="Secondary" variant="outlined">Xoá</Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ngày</TableCell>
            <TableCell>Lớp</TableCell>
            <TableCell>Môn học</TableCell>
            <TableCell align="left">Giáo viên</TableCell>
            <TableCell align="center">Điểm danh</TableCell>
            <TableCell align="right">Khung giờ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lessons ? lessons.map((row, idx) => (
            <TableRow
              key={`${row.subject}${idx}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => history.push(`/phong-hoc?eventId=${row.eventId}&date=${row.date}`)}
            >
              <TableCell>
                {moment(row.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}
              </TableCell>
              <TableCell>
                {row.class || ''}
              </TableCell>
              <TableCell>{SUBJECT_MAP[row.subject]?.label || ''}</TableCell>
              <TableCell align="left">{`${teacherMap[row.teacher]?.displayName || 'Any'}${row.teacherTracked ? ' (Đã điểm danh)' : ' (Chưa điểm danh)'}`}</TableCell>
              <TableCell align="center">{`${row?.tracked?.length || 0} / ${classMap[row.class]?.students?.length || 0}`}</TableCell>
              <TableCell align="right">{`${row.startTime} - ${row.endTime}`}</TableCell>
            </TableRow>
          )) : ''}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default Class
