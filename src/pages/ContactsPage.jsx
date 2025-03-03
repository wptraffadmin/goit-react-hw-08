import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../redux/contacts/operations';
import { selectIsLoggedIn } from '../redux/auth/slice';
import { selectIsFetching, selectError } from '../redux/contacts/slice';
import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import SearchBox from '../components/SearchBox/SearchBox';
import StatusMessage from '../components/StatusMessage/StatusMessage';

export const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isFetching = useSelector(selectIsFetching);
  const error = useSelector(selectError);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div>
      <h1>Contacts</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
      <StatusMessage isLoading={isFetching} error={error} />
    </div>
  );
};