import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  
  useEffect(() => {
    axios.get('http://localhost/api/people')  // Adjust URL based on your setup
      .then(response => {
        setPeople(response.data);
      });
  }, []);

  const handleAddPerson = () => {
    // Handle adding a new person (show a form/modal)
  };

  const handleViewPerson = (id) => {
    axios.get(`http://localhost/api/people/${id}`)
      .then(response => {
        setSelectedPerson(response.data);
      });
  };

  const handleEditPerson = (id) => {
    // Handle edit person (show a form/modal)
  };

  const handleDeletePerson = (id) => {
    axios.delete(`http://localhost/api/people/${id}`)
      .then(response => {
        setPeople(people.filter(person => person.id !== id));
      });
  };

  const renderPerson = (person) => (
    <div key={person.id}>
      <span>{person.name}</span>
      <button onClick={() => handleViewPerson(person.id)}>View</button>
      <button onClick={() => handleEditPerson(person.id)}>Edit</button>
      <button onClick={() => handleDeletePerson(person.id)}>Delete</button>
      {person.subordinates && person.subordinates.length > 0 && (
        <div style={{ marginLeft: '20px' }}>
          {person.subordinates.map(subordinate => renderPerson(subordinate))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h1>Organizational Tree</h1>
      <button onClick={handleAddPerson}>Add Person</button>
      <div>
        {people.map(person => renderPerson(person))}
      </div>
      {selectedPerson && (
        <div>
          <h2>Details for {selectedPerson.name}</h2>
          <p>Subordinates:</p>
          <div>{selectedPerson.subordinates && selectedPerson.subordinates.map(sub => <div key={sub.id}>{sub.name}</div>)}</div>
        </div>
      )}
    </div>
  );
};

export default App;
