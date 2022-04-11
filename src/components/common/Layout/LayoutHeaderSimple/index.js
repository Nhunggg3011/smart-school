import React from 'react'
import PropTypes from 'prop-types'
import { Grid, IconButton, Typography } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import clsx from 'clsx'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { COLORS } from 'themes/common'
import BreadCrumbs from '../../BreadCrumbs'
import Icon from '../../Icon'
import { TextBlockToolTip } from '~components/common/TextBlock'

const style = (theme) => ({
  container: {
    marginBottom: theme.spacing(2),
  },
  leftIcon: {
    '&.medium': {
      width: 25,
      height: 25,
    },
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnBack: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '65%', // TODO: need optimize this line code
    wordBreak: 'break-all ',
    '& h2': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '@media (max-width: 768px)': {
      maxWidth: '44%',
    },
    '@media (max-width: 1024px) and (min-width: 769px)': {
      maxWidth: '50%',
    },
  },
  btnBackIcon: {
    padding: 0,
    marginRight: theme.spacing(1),
  },
  boxBtns: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
})

const LayoutHeaderSimple = ({
  classes,
  className,
  breadCrumbs,
  title,
  leftIcon,
  onLeftIcon,
  children,
  tooltip,
  maxWidthTablet,
}) => {
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down(undefined))
  return (
    <Grid container className={clsx(classes.container, className)}>
      <Grid item xs={12}>
        <BreadCrumbs tooltip={tooltip} list={breadCrumbs} />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.title}>
          <div className={classes.btnBack} style={{ maxWidth: isTablet ? maxWidthTablet : '65%' }}>
            <IconButton className={classes.btnBackIcon} onClick={onLeftIcon} size="large">
              <Icon name={leftIcon} className={classes.leftIcon} color={COLORS.palette.primaryBlue} />
            </IconButton>
            <TextBlockToolTip title={tooltip ? <span>{title}</span> : ''}>
              <Typography data-tooltip variant="h2">
                {title}
              </Typography>
            </TextBlockToolTip>
          </div>
          <div className={classes.boxBtns} style={{ paddingRight: isTablet ? '15px' : 'unset' }}>
            {children}
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

LayoutHeaderSimple.defaultProps = {
  breadCrumbs: [],
  className: '',
  leftIcon: 'back',
  onLeftIcon: () => { },
  title: '',
  children: '',
  tooltip: false,
  maxWidthTablet: '65%',
}

LayoutHeaderSimple.propTypes = {
  classes: PropTypes.shape().isRequired,
  className: PropTypes.string,
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape()),
  leftIcon: PropTypes.string,
  onLeftIcon: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  tooltip: PropTypes.bool,
  maxWidthTablet: PropTypes.string,
}

export default withStyles(style)(LayoutHeaderSimple)
