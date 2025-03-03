import PropTypes from 'prop-types';
import styles from './StatusMessage.module.css';

const StatusMessage = ({ isLoading, error }) => {
  return (
    <div className={styles.statusContainer}>
      {isLoading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
    </div>
  );
};

StatusMessage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default StatusMessage;