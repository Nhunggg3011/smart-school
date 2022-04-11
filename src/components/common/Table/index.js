import TableCellRaw, { tableCellClasses } from '@mui/material/TableCell'
import TableRowRaw from '@mui/material/TableRow'
import TableRaw from '@mui/material/Table'

import { styled } from '@mui/material/styles'

export const TableCell = styled(TableCellRaw)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

export const TableRow = styled(TableRowRaw)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgb(16 72 72 / 7%)',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export const Table = styled(TableRaw)(({ theme }) => ({
  minWidth: '0px !important',
}))
