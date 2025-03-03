// App.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './redux/contactsOps';
import { selectIsFetching, selectError } from './redux/contactsSlice';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import StatusMessage from './components/StatusMessage/StatusMessage';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const isFetching = useSelector(selectIsFetching);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
      <StatusMessage isLoading={isFetching} error={error} />
    </div>
  );
}

export default App;