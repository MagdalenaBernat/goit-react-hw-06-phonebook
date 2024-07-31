import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import FindContact from '../FindContact/FindContact';
import ContactList from '../ContactList/ContactList';
import { addContact as addContactAction } from '../../redux/contactsSlice';

const Phonebook = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  const addContact = () => {
    if (name && number) {
      const newContact = { id: Date.now().toString(), name, number };
      dispatch(addContactAction(newContact));
      setName('');
      setNumber('');
    }
  };

  return (
    <>
      <h2>Phonebook</h2>
      <div>
        <p>Name</p>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+((['\s\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>Number</p>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="button" onClick={addContact}>Add contact</button>
      </div>
      <h2>Contacts</h2>
      <ContactList contacts={contacts} />
      <FindContact />
    </>
  );
};

Phonebook.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
};

export default Phonebook;