import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import withStyles from '@mui/styles/withStyles'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Skeleton from '@mui/material/Skeleton'
import { FiberManualRecord } from '@mui/icons-material'
import { COLORS } from 'themes/common'
import SimpleTabs from './SimpleTabs'

const style = (theme) => ({
  subLabel: {
    fontSize: 28,
    fontWeight: 400,
    color: COLORS.gray.textGray1,
  },
  label: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: COLORS.gray.textGray2,
    fontSize: 16,
    fontWeight: 'normal',
    textTransform: 'none',
  },
  tab: {
    minWidth: 0,
    padding: theme.spacing(0, 2),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    borderRadius: 3,
  },
  subtitleLoader: {
    minWidth: 60,
    fontSize: 28,
  },
  titleLoader: {
    minWidth: 60,
    fontSize: 16,
  },
  // TODO: improve because opacity is changed when button is seleted
  divBefore: {
    overflow: 'visible',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: -4,
      width: 1,
      height: `calc(100% - ${theme.spacing(2)})`,
      backgroundColor: COLORS.gray.grayBorder,
    },
  },
  redDot: {
    color: 'red',
    marginLeft: 8,
    fontSize: 14,
  },
})

const StyledTabs = withStyles((theme) => ({
  root: {
    marginLeft: -theme.spacing(2),
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: '3px !important',
    '& > span': {
      maxWidth: 110,
      minWidth: 60,
      width: '100%',
      backgroundColor: '#3B3BC7',
    },
  },
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />)

const TabsTheme = ({
  classes,
  handleChangeTab,
  tabs,
  children,
  preview,
  loaderCount,
  value,
  dividerBefore,
  ...props
}) => {
  const renderTabs = () => tabs.map((tab, index) => (
    <Tab
      key={`${index}${tab.label}`}
      className={clsx(
        classes.tab,
        {
          [classes.divBefore]: dividerBefore.includes(index),
        },
      )}
      style={tab.styles || {}}
      value={tab.value}
      label={(
        <>
          <span className={classes.subLabel}>
            {tab.subLabel || ''}
          </span>
          <div className={classes.label}>
            <span className={classes.title}>
              {tab.label || ''}
            </span>
            {tab.hasNoti && <FiberManualRecord className={classes.redDot} />}
          </div>
        </>
      )}
    />
  ))

  const renderTabsLoader = () => [...Array(loaderCount).keys()].map((_, index) => (
    <Tab
      key={index}
      className={classes.tab}
      label={(
        <>
          <Skeleton className={classes.subtitleLoader} />
          <Skeleton className={classes.titleLoader} />
        </>
    )}
    />
  ))

  return (
    <>
      <StyledTabs
        value={value}
        onChange={(_, v) => handleChangeTab(v)}
        aria-label="tabs"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        {...props}
      >
        {
          preview ? renderTabsLoader() : renderTabs()
        }
      </StyledTabs>
      {children}
    </>
  )
}

TabsTheme.defaultProps = {
  tabs: [],
  children: '',
  preview: false,
  handleChangeTab: () => {},
  loaderCount: 7,
  dividerBefore: [],
}

TabsTheme.propTypes = {
  classes: PropTypes.shape().isRequired,
  children: PropTypes.node,
  tabs: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.array,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  handleChangeTab: PropTypes.func,
  preview: PropTypes.bool,
  loaderCount: PropTypes.number,
  dividerBefore: PropTypes.arrayOf(PropTypes.number),
}

TabsTheme.Simple = SimpleTabs

export default withStyles(style)(TabsTheme)
