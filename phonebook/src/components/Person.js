const Person = ({ person }) => {
    return (
        <li>
            {person.name} --- {person.number}
        </li>
    )
}

const ShowPersons = ({ personList }) => {
    return (
    <div>
      <ul>
        {personList.map(person =>
          <Person person={person}/>
        )}
      </ul>
    </div>
    )
  }
  
  const PersonForm = ({ stateName, stateNumber, nameFunction, numberFunction, submitFunction }) => {
    return (
      <form onSubmit={submitFunction}>
          <div>
            name: <input value={stateName} onChange={nameFunction}/>
            <br/>
            phone number: <input value={stateNumber} onChange={numberFunction}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
      </form>
    )
  }
  
  const Filter = ({ stateName, nameFunction }) => {
    return (
      <div>
          Filter By Name: <input value={stateName} onChange={nameFunction}/>
      </div>
    )
  }

export {ShowPersons, PersonForm, Filter}