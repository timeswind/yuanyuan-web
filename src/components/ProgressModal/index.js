import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import PropTypes from 'prop-types';

const styles = {
  modalShow: {
    zIndex: 9999,
    height: "100%",
    width: "100%",
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.17)"
  },
  innerWrapper: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "50%",
    width: 50
  },
  modalHide: {
    display: 'none'
  }
}

class ProgressModal extends React.Component {
  render() {
    const { show } = this.props
    return (
      <div style={show ? styles.modalShow : styles.modalHide}>
        <div style={styles.innerWrapper}>
          <CircularProgress style={{margin: '0 auto', width: 50}} size={50} />
        </div>
      </div>
    )
  }
}

ProgressModal.propTypes = {
  show: PropTypes.bool.isRequired,
};

ProgressModal.defaultProps = {
  show: false
}

export default ProgressModal
