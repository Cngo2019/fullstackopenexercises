import { useState, useEffect } from 'react'
import {ShowPersons, Filter, PersonForm} from './components/Person'
import PhoneBookService from './services/PhoneBookService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const updateName = (event) => {
    setNewName(event.target.value)
  }

  const updateNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (!PhoneBookService.personExists(newPerson, persons)) {
      PhoneBookService.addPerson(newPerson)
      setPersons(persons.concat(newPerson)) 
    }
    else { 
      window.alert(`${newPerson.name} already exists or phone number is empty`) 
    }
    setNewName('')
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
  
  useEffect(() => {
    PhoneBookService.getPersons().then(data => {
      setPersons(data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
          stateName={filterName}
          nameFunction={(event) => {setFilterName(event.target.value)}}
      />
      <PersonForm 
          stateName={newName}
          stateNumber={newNumber}
          nameFunction={updateName}
          numberFunction={updateNumber}
          submitFunction={addPerson}
      />

      <h2>Numbers</h2>
      <ShowPersons personList={personsToShow}/>
    </div>
  )
}

export default App