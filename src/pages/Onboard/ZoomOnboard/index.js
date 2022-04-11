import React, { useEffect, useMemo } from 'react'
import { useLocation, useQ } from 'react-router-dom'
import { ZOOM_CLIENT_KEY, ZOOM_REDIRECT_URL } from 'common/Zoom'
import { useAuth } from 'store/auth'
import { connectZoom } from 'services/zoomService'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Copyright from 'components/main/Copyright'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import useStyles from './zoom.style'

const ZoomOnboard = () => {
  const classes = useStyles()
  const location = useLocation()
  const query = useMemo(() => new URLSearchParams(location.search), [location])
  const [_, actions] = useAuth()
  useEffect(() => {
    const code = query.get('code')
    if (code) {
      connectZoom(code).then((data) => actions.updateBoard(data))
        .catch((e) => {
          // actions.updateBoard(null)
        })
    }
  }, [query])

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Button
          as="a"
          variant="outlined"
          href={`https://zoom.us/oauth/authorize?response_type=code&client_id=${ZOOM_CLIENT_KEY}&redirect_uri=${ZOOM_REDIRECT_URL}`}>
          Kết nối tài khoản Zoom
        </Button>
      </Paper>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default ZoomOnboard
