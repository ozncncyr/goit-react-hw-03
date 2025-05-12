import css from "./SearchBox.module.css";

const SearchBox = ({ filter, onFilterChange }) => {
  return (
    <div className={css.SearchBoxContainer}>
      <input
        id="filter"
        value={filter}
        className={css.SearchBox}
        type="text"
        placeholder="Find contacts by name"
        onChange={(evt) => onFilterChange(evt.target.value)}
      />
    </div>
  );
};

export default SearchBox;
