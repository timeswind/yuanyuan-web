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
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
  },
  disabled: {
    background: '#ddd',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 0px 0px 0px rgba(255, 105, 135, .30)',
  }
};

function OverridesClassNames({
  classes,
  style,
  children,
  disabled,
  ...custom
}) {
  return (
    <Button className={disabled ? classes.disabled : classes.button} style={style}  {...custom}>
      {children ? children : 'class names'}
    </Button>
  );
}

OverridesClassNames.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OverridesClassNames);
