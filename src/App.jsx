import { useState, useEffect } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }, [contacts]);

  const handleSearch = (value) => {
    setFilter(value);
  };

  const handleDelete = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  const handleAddContact = (name, number) => {
    const newContact = { id: nanoid(), name, number };
    setContacts((prevContacts) => {
      const updatedContacts = [...prevContacts, newContact];
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      return updatedContacts;
    });
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h1 className="mainTitle">
        <span>📱</span> Phonebook
      </h1>
      <ContactForm onSubmit={handleAddContact} />
      <SearchBox filter={filter} onFilterChange={handleSearch} />
      {filteredContacts.length > 0 ? (
        <div>
          <h2 className="contactTitle">
            <span>📖 </span>Contacts
          </h2>
          <ContactList contacts={filteredContacts} onDelete={handleDelete} />
        </div>
      ) : (
        <div>
          <h2 className="contactTitle">
            <span>📖 </span>Contacts
          </h2>
          <p className="emptyList">
            No results were found in your contact list.
          </p>
        </div>
      )}
    </>
  );
};

export default App;
