import React, { useEffect, useMemo, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Select from 'components/common/Select'
import Button from 'components/common/Button'

import { TableCell, TableRow } from 'components/common/Table'
import { SUBJECT_LIST, SUBJECT_MAP } from 'constants/Subject'
import { WEEK_MAP } from 'constants/Week'
import { useStudents } from 'store/students'
import { useFetchLessons } from 'store/lesson'
import { useHistory } from 'react-router'
import useStyles from './class.style'

const defaultVals = [{
  value: 'no-one',
  label: '-- Xem học sinh --',
}]

const Class = () => {
  const classes = useStyles()
  const [selectedStudent, setStudent] = useState('no-one')
  const [students] = useStudents()
  const history = useHistory()

  const [lessons, loading, error, actions] = useFetchLessons()
  const studentOptions = useMemo(() => defaultVals.concat((students || []).map((u) => ({ value: u.uid, label: `${u.displayName} - Lớp ${u.class || ''}` }))), [students])
  // const handleFilter = () => {}
  const selectedClass = useMemo(() => (students || []).find((x) => x.uid === selectedStudent)?.class || 'any', [students, selectedStudent])

  useEffect(() => {
    actions.fetchLesson(selectedClass)
  }, [selectedClass])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={6}>
              <div className={classes.filter}>
                <div style={{ flex: 1 }} />
                <Select
                  value={selectedStudent}
                  onChange={(val) => setStudent(val)}
                  options={studentOptions}
                  placeholder="Học sinh" />
                {/* <Button onClick={handleFilter}>Lọc</Button>
              <Button onClick={handleClearFilter} color="Secondary" variant="outlined">Xoá</Button> */}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ngày</TableCell>
            <TableCell>Lớp</TableCell>
            <TableCell>Môn học</TableCell>
            <TableCell align="center">Thứ</TableCell>
            <TableCell align="center">Khung giờ</TableCell>
            <TableCell align="right">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lessons ? lessons.map((row, idx) => (
            <TableRow
              key={`${row.subject}${idx}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => history.push(`/phong-hoc?eventId=${row.eventId}&date=${row.date}`)}
            >
              <TableCell>{row.date || ''}</TableCell>
              <TableCell>{row.class || ''}</TableCell>
              <TableCell>{SUBJECT_MAP[row.subject]?.label || ''}</TableCell>
              <TableCell align="center">{WEEK_MAP[row.weekday || '']?.label}</TableCell>
              <TableCell align="center">{`${row.startTime} - ${row.endTime}`}</TableCell>
              <TableCell align="right">{(row.tracked || []).includes(selectedStudent) ? 'Đã điểm danh' : 'Chưa điểm danh'}</TableCell>
            </TableRow>
          )) : ''}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default Class
