import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/slice';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [errorMessage, setErrorMessage] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setErrorMessage(null); // Очищаємо попередню помилку
    try {
      await dispatch(register(values)).unwrap(); // unwrap кидає помилку, якщо reject
      resetForm();
    } catch (error) {
      if (error === 'Email is already registered') {
        setErrorMessage('Ви вже зареєстровані. Увійти?');
      } else {
        setErrorMessage('Registration failed. Try again.');
      }
    }
  };

  if (isLoggedIn) return null;

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label>Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" component="div" />
        </div>
        <div>
          <label>Email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" />
        </div>
        <div>
          <label>Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" />
        </div>
        {errorMessage && (
          <div>
            {errorMessage}{' '}
            {errorMessage.includes('Увійти') && <Link to="/login">Login</Link>}
          </div>
        )}
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};