export default function routes(frontendInstance, logic) {
    const homeRoute = async (req, res) => {
        res.render('index');
    }

    const recognizeUser = async (req, res) => {
        const enteredUsername = req.body.username;
        const enteredPassword = req.body.password;

        if (enteredUsername && enteredPassword) {
            
            res.redirect('/waiters/' + enteredUsername);
        }
    }

    const showDays = async (req, res) => {
        const username = req.params.username;

        res.render('waiter_selection',{username});
    };

    const submitDays = async (req,res) =>{

        const selectedDays = req.body.days; 
        const username = req.params.username;

        if (selectedDays) {
            if (selectedDays.length <= 2) {
                req.flash('success', 'Days successfully added.');
                console.log(`${username} selected the following days: ${selectedDays}`);
            } else {
                req.flash('warning', 'A minimum of 2 days should be checked!');
            }
        } else {
            req.flash('error', 'Please select days');
        }

        res.render('waiter_selection',{username})
    };


    const admin = async (req, res) => {
        // Implement logic to show which days waiters are available
        // Fetch data from the database and render a template
        res.render('waiter_availability');
    };

    const clearingRoute = async (req, res) => {
        await logic.resetDaysForNewWeek();
        res.redirect('/')
    };

    return {
        homeRoute,
        recognizeUser,
        showDays,
        submitDays,
        admin,
        clearingRoute
    }
}