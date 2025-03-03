// redux/contactsSlice.js
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';
import { logout } from '../auth/operations';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isFetching: false,
    isAdding: false,
    deletingIds: [], // Масив ID контактів, що видаляються
    error: null,
  },
  extraReducers: builder => {
    builder
      // fetchContacts
      .addCase(fetchContacts.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isFetching = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      // addContact
      .addCase(addContact.pending, state => {
        state.isAdding = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isAdding = false;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.payload;
      })
      // deleteContact
      .addCase(deleteContact.pending, (state, action) => {
        state.deletingIds.push(action.meta.arg); // Додаємо ID контакту до deletingIds
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.deletingIds = state.deletingIds.filter(id => id !== action.payload); // Прибираємо ID
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.deletingIds = state.deletingIds.filter(id => id !== action.meta.arg); // Прибираємо ID при помилці
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, state => {
        state.items = []; // Очищення контактів при логауті
        state.isFetching = false;
        state.isAdding = false;
        state.deletingIds = [];
        state.error = null;
      });
  },
});

// Оновлені селектори
export const selectContacts = state => state.contacts.items;
export const selectIsFetching = state => state.contacts.isFetching;
export const selectIsAdding = state => state.contacts.isAdding;
export const selectDeletingIds = state => state.contacts.deletingIds; // Новий селектор
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, state => state.filters.name],
  (contacts, filter) =>
    contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase())
    )
);

export default contactsSlice.reducer;