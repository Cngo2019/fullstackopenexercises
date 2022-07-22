import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons';

const getPersons = (t) => {
    const response = axios.get(baseUrl)
    return response.then(response => {
        return response.data
    })
}
const addPerson = (newPerson) => {
        axios
        .post(baseUrl, newPerson)
        .then(response => {
            console.log(response)
        })
}

const personExists = (personToAdd, currentPersonsList) => {
    const alreadyExists = (currentPerson) => currentPerson.name.toLowerCase() == personToAdd.name.toLowerCase()
    const phoneEmpty = personToAdd.number == ''

    if (!currentPersonsList.some(alreadyExists) && !phoneEmpty) {
        return false;
    }

    return true;
} 

export default {addPerson, personExists, getPersons}