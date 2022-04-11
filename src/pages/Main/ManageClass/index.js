import React, { useMemo, useState } from 'react'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from 'components/common/Button'
import { useClass } from 'store/class'
import { TableCell, TableRow, Table } from 'components/common/Table'
import LayoutHeader from 'components/common/Layout/LayoutHeader'
import Container from '@mui/material/Container'
import { Link } from 'react-router-dom'
import GradeColors from 'themes/GradeColors'
import { useAuth } from 'store/auth'
import useStyles from './class.style'
import CreateClassDialog from './CreateClass'

const Class = () => {
  const classes = useStyles()
  const [user] = useAuth()
  const [classesData] = useClass()
  const [openClassDialog, setOpenClassDialog] = useState(false)

  const createClass = () => {
    setOpenClassDialog(true)
  }
  return (
    <>
      <LayoutHeader sticky contentClassName={classes.headerContent}>
        <Container maxWidth="lg">
          <div className={classes.headerTitleContainer}>
            <Typography variant="h2">
              Quản lý lớp học
            </Typography>

            <Button onClick={createClass} disabled={!user?.admin}>Tạo lớp học</Button>
          </div>
        </Container>
      </LayoutHeader>
      <Container maxWidth="lg" className={classes.content}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell>#</TableCell> */}
                <TableCell>Lớp</TableCell>
                <TableCell align="center">Sĩ số</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classesData ? classesData.map((row, idx) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                  <TableCell>
                    <div className={classes.classBox}>
                      <div className={classes.grade} style={{ backgroundColor: GradeColors[`C${row.grade}`] }}>
                        <div>Khối</div>
                        <div>{row.grade}</div>
                      </div>
                      <div className={classes.classContent}>
                        <p className={classes.className}>{`${row.grade}${row.class}`}</p>
                        <p className={classes.actions}>
                          <Link to={`/thoi-khoa-bieu?lop=${row.grade}${row.class}`}>Thời khoá biểu</Link>
                          {' '}
                          |
                          {' '}
                          <Link to={`/quan-ly-hoc-sinh?lop=${row.grade}${row.class}`}>Danh sách học sinh</Link>
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  {/* <TableCell align="center">{`Khối lớp ${row.grade}`}</TableCell> */}
                  <TableCell align="center">{`${(row.students || []).length} hs`}</TableCell>
                </TableRow>
              )) : ''}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {openClassDialog && <CreateClassDialog handleClose={() => setOpenClassDialog(false)} />}
    </>
  )
}
export default Class
