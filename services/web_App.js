export default function frontEnd() {

    let storedUsername = '';
    let storedPassword = '';
    let selectedDays = [];

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
        if (username === storedUsername && password === storedPassword) {

            return true; // Return true if the provided username and password match the stored values
        } else {
            return false; // Return false if there is a mismatch
        }
    }

    //select more than one 
    function setDays(days) {
        // Check if the input is an array
        if (!Array.isArray(days)) {
            return 'Input must be an array of selected days';
        }

        // Add the selected days to the array
        selectedDays = days;

        return 'Days selected successfully';
    }

    //retrieve days selected
    function getDays() {
        return selectedDays;

    }

    //should be able to update selection of days
    function updatePreviousSelection(updatedDays) {
        // Check if the input is an array
        if (!Array.isArray(updatedDays)) {
            return 'Input must be an array of updated days';
        }

        // Update the selectedDays array with the new selection
        selectedDays = updatedDays;

        return 'Selection updated successfully';
    }



    //allow admin to reset days 
    function resetDays() {
        // Reset the selectedDays array
        selectedDays = [];

        return 'Days reset by admin';
    }


    //clear storage
    function clearDatabase() {
        // Clear the selectedDays array
        selectedDays = [];

        return 'Storage cleared';
    }

    return {
        setUsername,
        getUsername,
        setPassword,
        getPassword,
        login,
        setDays,
        getDays,
        updatePreviousSelection,
        resetDays,
        clearDatabase
    }
}






