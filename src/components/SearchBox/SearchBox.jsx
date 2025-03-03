// components/SearchBox.jsx
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filtersSlice'; // Оновлений екшен
import { selectNameFilter } from '../../redux/filtersSlice'; // Селектор для фільтру
import styles from './SearchBox.module.css';

const SearchBox = () => {
  const filter = useSelector(selectNameFilter); // Отримуємо значення фільтру
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(setFilter(e.target.value)); // Викликаємо оновлений екшен
  };

  return (
    <div className={styles.searchBox}>
      <label htmlFor="search" className={styles.label}>Find contacts by name</label>
      <input
        type="text"
        id="search"
        value={filter}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
};

export default SearchBox;