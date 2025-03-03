// components/Contact/Contact.jsx
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';
import { selectDeletingIds } from '../../redux/contactsSlice'; // Оновлений селектор
import Phone from '../../assets/phone.svg';
import User from '../../assets/user.svg';
import styles from './Contact.module.css';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const deletingIds = useSelector(selectDeletingIds); // Отримуємо масив ID
  const isDeleting = deletingIds.includes(contact.id);
  
  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <li className={styles.item}>
      <div className={styles.itemContainer}>
        <span className={styles.name}>
          <User className={styles.icon} />
          {contact.name}
        </span>
        <span className={styles.number}>
          <Phone className={styles.icon} />
          {contact.number}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className={styles.delete}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};

export default Contact;