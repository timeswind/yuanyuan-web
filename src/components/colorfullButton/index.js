// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

// We can inject some CSS into the DOM.
const styles = {
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: 'none',
    fontFamily: "'Hiragino Sans GB','华文细黑','STHeiti','微软雅黑','Microsoft YaHei',SimHei,'Helvetica Neue',Helvetica,Arial,sans-serif !important"
  },
  flatButton: {
    background: '#9e9e9e',
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: 'none',
    fontFamily: "'Hiragino Sans GB','华文细黑','STHeiti','微软雅黑','Microsoft YaHei',SimHei,'Helvetica Neue',Helvetica,Arial,sans-serif !important"
  },
  disabled: {
    background: '#ddd',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: 'none',
    fontFamily: "'Hiragino Sans GB','华文细黑','STHeiti','微软雅黑','Microsoft YaHei',SimHei,'Helvetica Neue',Helvetica,Arial,sans-serif !important"
  }
};

function OverridesClassNames({
  classes,
  style,
  children,
  disabled,
  flat,
  ...custom
}) {
  return (
    <Button className={disabled ? classes.disabled : (flat ? classes.flatButton : classes.button)} style={style}  {...custom}>
      {children ? children : 'class names'}
    </Button>
  );
}

OverridesClassNames.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  flat: PropTypes.bool
};

OverridesClassNames.defaultProps = {
  flat: false
}

export default withStyles(styles)(OverridesClassNames);
