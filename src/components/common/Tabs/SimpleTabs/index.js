import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import clsx from 'clsx'
import { COLORS } from 'themes/common'

const style = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  item: {
    cursor: 'pointer',
    color: COLORS.palette.secondaryBlue2,
    borderRight: `1px solid ${COLORS.gray.disableGray}`,
    margin: theme.spacing(0.5),
    marginRight: theme.spacing(2),
    paddingRight: theme.spacing(2),
    '&.active': {
      color: COLORS.palette.primaryBlue,
    },
    '&.last': {
      border: 'none',
      marginRight: 0,
      paddingRight: 0,
    },
  },
})

const SimpleTabs = ({
  classes, tabs, value, handleChangeTab, className,
}) => (
  <div className={clsx(classes.container, className)}>
    {
        tabs.map((x, index) => (
          <div
            role="presentation"
            key={x.value}
            className={clsx(classes.item, { active: value === x.value, last: index === tabs.length - 1 })}
            onClick={() => handleChangeTab(x.value)}
          >
            {x.label}
          </div>
        ))
      }
  </div>
)

SimpleTabs.defaultProps = {
  tabs: [],
  handleChangeTab: () => {},
  className: '',

}

SimpleTabs.propTypes = {
  classes: PropTypes.shape().isRequired,
  tabs: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.array,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  handleChangeTab: PropTypes.func,
  className: PropTypes.string,
}

export default withStyles(style)(SimpleTabs)
