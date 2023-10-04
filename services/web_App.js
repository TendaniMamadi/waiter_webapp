export default function frontEnd() {

    let storedUsername = 'testUser';
    let storedPassword = 'testPassword';

    // Function to set the username
    function setUsername(username) {
        storedUsername = username; // Store the provided username in the variable
    }

    // Function to get the username
    function getUsername() {
        return storedUsername; // Return the stored username
    }

    // Function to set the password
    function setPassword(password) {
        storedPassword = password; // Store the provided password in the variable
    }

    // Function to get the password
    function getPassword() {
        return storedPassword; // Return the stored password
    }

    // Function to perform login and check if provided username and password match
    function login(username, password) {
        if (username === 'testUser' && password === 'testPassword') {
         
            return true; // Return true if the provided username and password match the stored values
        } else {
            return false; // Return false if there is a mismatch
        }
    }

    return {
        setUsername,
        getUsername,
        setPassword,
        getPassword,
        login
    }
}






