import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Задай базовий URL MockAPI
axios.defaults.baseURL = 'https://connections-api.goit.global/';

// Отримання контактів
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Додавання контакту
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', newContact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Видалення контакту
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${id}`);
      return id; // Повертаємо ID для видалення зі стану
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);