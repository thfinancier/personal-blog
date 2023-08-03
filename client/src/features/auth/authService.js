import axios from 'axios'

const API_AUTH_URL = '/api/users/registration'

// Register user
const register = async (userData) => {
    // Like using postman by using axios a request with a payload will be made and in this case the response 
    // will be saved to the "response" variable
    // If the req successfull the payload will be stored in an object called data
    const response = await axios.post(API_AUTH_URL, userData)

    // Checking if the data actually arrived
    if (response.data) {
        // Only strings could be stored in a localStorage
        // With response.data not only user name, email should be gotten, but also a token
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const authService = {
    register
}

export default authService