export default function routes(frontendInstance, logic) {
    const homeRoute = async (req, res) => {
        const enteredUsername = req.body.username;
        const enteredPassword = req.body.password;
        // // const correctUsername = enteredUsername;
        // // const correctPassword = 'password123';

        if (enteredUsername && enteredPassword) {
            res.redirect('/waiters/' + enteredUsername);
        }
        else {

            res.render('index');
        }

    }

    const recognizeUser = async (req, res) => {
        // Implement logic to use the name entered in the textbox
        const username = req.params.username;
        // Fetch days from the database
        res.render('waiter_selection', { username: username });
    }

    const showDays = async (req, res) => {
        const selectedDays = req.body.days; // This will be an array of selected days
        const username = req.params.username;

        if (selectedDays) {
            if (selectedDays.length >= 2) {
                req.flash('success', 'Days successfully added.');
                console.log(`${username} selected the following days: ${selectedDays}`);
            } else {
                req.flash('warning', 'A minimum of 2 days should be checked!');
            }
        } else {
            req.flash('error', 'Please select days');
        }

        res.redirect('/waiters/' + username);
    };



    const clearingRoute = async (req, res) => {
        await logic.resetDaysForNewWeek();
        res.redirect('/')
    };


    return {
        homeRoute,
        recognizeUser,
        showDays,
        clearingRoute
    }
}