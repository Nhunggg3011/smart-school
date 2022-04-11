/* eslint-disable no-underscore-dangle */
import React, { useMemo, useState } from 'react'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from 'components/common/Button'
import { TableCell, TableRow, Table } from 'components/common/Table'
import LayoutHeader from 'components/common/Layout/LayoutHeader'
import Container from '@mui/material/Container'
import { Link, useLocation, useHistory } from 'react-router-dom'
import GradeColors from 'themes/GradeColors'
import { useStudents, useImportCSVFile } from 'store/students'
import { useClass } from 'store/class'
import Select from 'components/common/Select'
import Loading from 'components/common/Loading'
import CSVReader from 'react-csv-reader'
import { useAuth } from 'store/auth'
import useStyles from './class.style'

const Students = () => {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const [selectClass, setSelectClass] = useState(queryParams.get('lop'))
  const [values] = useStudents(queryParams.get('lop'))
  const [classesData, loading] = useClass()
  const [user] = useAuth()
  const classOptions = useMemo(() => (classesData || []).map((cls) => ({ value: `${cls.grade}${cls.class}`, label: `Lớp ${cls.grade}${cls.class}` })), [classesData])

  const handleFilter = () => {
    const params = new URLSearchParams(location.search)
    if (selectClass) {
      params.set('lop', selectClass)
    } else {
      params.set('lop', '')
    }
    history.replace({ search: params.toString() })
  }

  const handleClearFilter = () => {
    setSelectClass(null)
    const params = new URLSearchParams(location.search)
    params.delete('lop')
    history.replace({ search: params.toString() })
  }

  const [importCSV, iLoading, iError] = useImportCSVFile()

  const createStudent = () => {
    document.getElementById('csvstudent')?.click()
  }

  const onLoadFile = (data) => importCSV(data)

  return (
    <>
      <Loading loading={loading || iLoading} />
      <LayoutHeader sticky contentClassName={classes.headerContent}>
        <Container maxWidth="lg">
          <div className={classes.headerTitleContainer}>
            <Typography variant="h2">
              Học sinh
            </Typography>
            <Button onClick={createStudent} disabled={!user?.admin}>Nạp danh sách học sinh *.csv</Button>
            <CSVReader cssClass={classes.csv} inputId="csvstudent" onFileLoaded={onLoadFile} />
          </div>
          <div className={classes.headerTitleContainer}>
            <div />
            <a href="/static/csv/students.csv" target="_blank" style={{ color: 'green' }}>Download file csv mẫu</a>
          </div>
        </Container>
      </LayoutHeader>
      <Container maxWidth="lg" className={classes.content}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>
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
              <TableRow>
                <TableCell>Tên</TableCell>
                <TableCell align="center" width="15%">Lớp</TableCell>
                <TableCell align="center" width="15%">Số điện thoại</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values ? values.map((row, idx) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                  <TableCell>
                    <div className={classes.classBox}>
                      <Link to={`/ca-nhan?id=${row.uid}`} style={{ textDecoration: 'none' }}>
                        <div className={classes.icon} style={{ backgroundColor: GradeColors[`C${Math.floor(idx % 12) + 1}`] }}>
                          <div>{(row.displayName || '').charAt(0)}</div>
                        </div>
                      </Link>
                      <div className={classes.classContent}>
                        <p className={classes.className}>{row.displayName}</p>
                        <p className={classes.actions}>
                          {`Email: ${row.email || '-'}`}
                        </p>
                        <p className={classes.actions}>
                          <Link to={`/thoi-khoa-bieu?lop=${row.class}`}>Thời khoá biểu</Link>
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center">{row.class}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                </TableRow>
              )) : ''}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}
export default Students
