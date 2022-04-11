import { createTheme, adaptV4Theme } from '@mui/material/styles'
import overrides from './overrides'
import typography from './typography'
import palette from './palette'

const theme = createTheme(adaptV4Theme({
  typography,
  palette,
  overrides,
}))

export default theme
