import { useState, useEffect } from "react";
import Filer from "./components/Filer";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [messageState, setMessageState] = useState("success");

  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (newPerson) => {
    phonebookService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setMessageState("success");
      setMessage(`Added ${returnedPerson.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  const updatePerson = (id, updatedPerson) => {
    phonebookService.updatePerson(id, updatedPerson).then((returnedPerson) => {
      setPersons(
        persons.map((person) => (person.id === id ? returnedPerson : person))
      );
      setMessageState("success");
      setMessage(`Updated ${returnedPerson.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    phonebookService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        setMessageState("error");
        setMessage(
          `Information of ${personToDelete.name} has already been removed from server`
        );
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} state={messageState} />
      <Filer search={search} setSearch={setSearch}></Filer>
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        addPerson={addPerson}
        updatePerson={updatePerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
