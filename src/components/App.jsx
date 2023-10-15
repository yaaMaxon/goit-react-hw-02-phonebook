import { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

export class App extends Component {
state = {
  contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: '',
}

// Додавання контактів
handleAddInf = contact => {
// console.log('element:', contact);

const isContactDuplicate = this.state.contacts.some(user => 
  user.name.toLowerCase() === contact.name.toLowerCase());

if(isContactDuplicate){
  alert(`${contact.name} is already in contacts.`);
  return;
}

this.setState(prevState => {
  return {
    contacts: [contact, ...prevState.contacts],
  }
});

}

handleChange = event => {
this.setState({
  filter: event.target.value,
})
}

onDelete = contactId => {
console.log('contactId:', contactId)

this.setState(prevState => {
  return {
    contacts: prevState.contacts.filter(contact => 
      contact.id !== contactId)
  }
})
}

  render() {
    const {contacts, filter} = this.state;
    const filteredContacts = contacts.filter( contact =>  
      contact.name.toLowerCase().includes(filter.toLowerCase()));

    return (
      <div
      style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '5px',
          backgroundColor: '#f2f2f2',
          padding: '20px',
        }}>
        <h1
        style={{
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: '15px',
            color: '#333'
          }}>
            Phonebook
            </h1>
        <ContactForm handleAddInf={this.handleAddInf}/>
        <h2 
        style={{
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: '15px',
            color: '#333'
          }}>
          Contacts
          </h2>
        <Filter filter={filter} handleChange={this.handleChange}/>
        <ContactList contacts={filteredContacts} onDelete={this.onDelete}/>
      </div>
    );
      }
};
