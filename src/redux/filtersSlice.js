import { createSlice } from '@reduxjs/toolkit'; // Імпорт для створення слайсу

const filtersSlice = createSlice({
  name: 'filters', // Назва слайсу
  initialState: { // Початковий стан
    name: '', // Рядок для фільтрації
  },
  reducers: { // Функції для зміни стану
    setFilter(state, action) {
      state.name = action.payload;
    },
  },
});

// Екшен для зміни фільтру
export const { setFilter } = filtersSlice.actions;

// Селектор
export const selectNameFilter = state => state.filters.name;export default filtersSlice.reducer; // Експорт редюсера