import phonebookService from "../services/persons";

const Persons = ({ search, persons, deletePerson }) => {
  const personsToShow =
    search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        );

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      deletePerson(person.id);
    }
  };

  return personsToShow.map((person) => (
    <div key={person.id}>
      <p>
        {person.name} {person.number}
      </p>
      <button onClick={() => handleDelete(person)}>delete</button>
    </div>
  ));
};

export default Persons;
