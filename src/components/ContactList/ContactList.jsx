// components/ContactList.jsx
import Contact from '../Contact/Contact';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contacts/slice'; // Імпорт мемоізованого селектора
import styles from './ContactList.module.css';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts); // Отримуємо відфільтровані контакти

  return (
    <div className={styles.container}>
      <h2>Contacts</h2>
      <ul className={styles.list}>
        {filteredContacts.map(contact => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;