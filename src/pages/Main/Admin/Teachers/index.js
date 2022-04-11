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
import { SUBJECT_LIST, SUBJECT_MAP } from 'constants/Subject'
import { useFetchLessons } from 'store/lesson'
import { useHistory } from 'react-router'
import useStyles from './class.style'

const Class = () => {
  const classes = useStyles()
  const [selectedSubject, setSubject] = useState('toan')
  const [lessons, loading, error, actions] = useFetchLessons()
  const [classesData] = useClass()
  const classOptions = useMemo(() => (classesData || []).map((cls) => ({ value: `${cls.grade}${cls.class}`, label: `Lớp ${cls.grade}${cls.class}` })), [classesData])
  const history = useHistory()

  useEffect(() => {
    actions.fetchLessonBySubject(selectedSubject)
  }, [selectedSubject])

  const renderClassCount = (cls) => {
    const teacher = (classesData || []).find((x) => cls === `${x.grade}${x.class}`)
    return teacher ? teacher?.students?.length : 0
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={4}>
              <div className={classes.filter}>
                <div style={{ flex: 1 }} />
                <Select
                  value={selectedSubject}
                  onChange={(val) => setSubject(val)}
                  options={SUBJECT_LIST}
                  placeholder="Bộ môn" />
                {/* <Button onClick={handleFilter}>Lọc</Button>
              <Button onClick={handleClearFilter} color="Secondary" variant="outlined">Xoá</Button> */}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ngày</TableCell>
            <TableCell>Lớp học</TableCell>
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
              <TableCell>{row.date || ''}</TableCell>
              <TableCell>{row.class || ''}</TableCell>
              <TableCell align="center">{`${row?.tracked?.length || 0} / ${renderClassCount(row.class) || 0}`}</TableCell>
              <TableCell align="right">{`${row.startTime} - ${row.endTime}`}</TableCell>
            </TableRow>
          )) : ''}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default Class
