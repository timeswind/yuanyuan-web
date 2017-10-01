// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

// We can inject some CSS into the DOM.
const styles = {
  button: {
    background: 'linear-gradient(45deg, #00BCD4 30%, #2196F3 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: 'rgba(3, 169, 244, 0.22) 0px 3px 5px 2px'
  },
};

function OverridesClassNames({
  classes,
  style,
  children,
  ...custom
}) {
  return (
    <Button className={classes.button} style={style} {...custom}>
      {children ? children : 'class names'}
    </Button>
  );
}

OverridesClassNames.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OverridesClassNames);
