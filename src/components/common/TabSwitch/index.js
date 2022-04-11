import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import style from './style'

const TabSwitch = ({
  classes, tabs, activeTab, onClick,
}) => (
  <div className={classes.switchContainer}>
    {tabs.map((tab, index) => (
      <div key={tab.value} role="button" tabIndex={index} className={`${classes.tab} ${activeTab === tab.value ? 'active' : ''}`} onClick={() => onClick(tab.value)}>{tab.label}</div>
    ))}
  </div>
)

TabSwitch.defaultProps = {
  tabs: [],
  activeTab: '',
}

TabSwitch.propTypes = {
  classes: PropTypes.shape().isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape()),
  activeTab: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default withStyles(style)(TabSwitch)
