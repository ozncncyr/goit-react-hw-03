import css from "./Contact.module.css";

const Contact = ({ id, name, number, onDelete }) => {
  return (
    <li className={css.ContactItem}>
      <div className={css.ContactInfo}>
        <p>👤 {name}</p>
        <p>📞 {number}</p>
      </div>
      <button className={css.DeleteButton} onClick={() => onDelete(id)}>
        🗑 Delete
      </button>
    </li>
  );
};

export default Contact;
