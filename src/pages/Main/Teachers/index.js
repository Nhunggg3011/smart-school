import React, { useRef } from 'react'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { TableCell, TableRow, Table } from 'components/common/Table'
import LayoutHeader from 'components/common/Layout/LayoutHeader'
import Container from '@mui/material/Container'
import { Link } from 'react-router-dom'
import GradeColors from 'themes/GradeColors'
import { useImportCSVFile, useTeachers } from 'store/teachers'
import { SUBJECT_MAP } from 'constants/Subject'
import CSVReader from 'react-csv-reader'
import Button from 'components/common/Button'
import Loading from 'components/common/Loading'
import { useAuth } from 'store/auth'
import useStyles from './class.style'

const Teachers = () => {
  const classes = useStyles()
  const [values, loading] = useTeachers()
  const [importCSV, iLoading, iError] = useImportCSVFile()
  const [user] = useAuth()
  const createTeacher = () => {
    document.getElementById('csvteacher')?.click()
  }

  const onLoadFile = (data) => {
    importCSV(data)
  }

  return (
    <>
      <Loading loading={loading || iLoading} />
      <LayoutHeader sticky contentClassName={classes.headerContent}>
        <Container maxWidth="lg">
          <div className={classes.headerTitleContainer}>
            <Typography variant="h2">
              Giáo viên
            </Typography>

            <Button onClick={createTeacher} disabled={!user?.admin}>Nạp danh sách giáo viên *.csv</Button>
            <CSVReader cssClass={classes.csv} inputId="csvteacher" onFileLoaded={onLoadFile} />
          </div>

          <div className={classes.headerTitleContainer}>
            <div />
            <a href="/static/csv/teacher.csv" target="_blank" style={{ color: 'green' }}>Download file csv mẫu</a>
          </div>
        </Container>
      </LayoutHeader>
      <Container maxWidth="lg" className={classes.content}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Tên</TableCell>
                <TableCell align="center" width="20%">Môn học</TableCell>
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
                          {`${row.admin ? 'Admin | ' : ''}Email: ${row.email || '-'}`}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center">{SUBJECT_MAP[row.subject]?.label}</TableCell>
                </TableRow>
              )) : ''}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {/* {openClassDialog && <CreateClassDialog handleClose={() => setOpenClassDialog(false)} />} */}
    </>
  )
}
export default Teachers
