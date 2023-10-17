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

        res.render('waiter_selection', { username });
    };

    const submitDays = async (req, res) => {

        const selectedDays = req.body.days;
        const username = req.params.username;

        if (selectedDays) {
            if (selectedDays.length >= 2) {
                req.flash('success', 'Days successfully added.');
                await logic.insertWaiterAndDayIdIntoShiftTable(username, selectedDays);
            } else {
                req.flash('warning', 'A minimum of 2 days should be checked!');
            }
        } else {
            req.flash('error', 'Please select days');
        }

        res.render('waiter_selection', { username })
    };


    const admin = async (req, res) => {

        let staff = await logic.getShiftsData();

        res.render('waiter_availability', { staff });

    };

    const clearingRoute = async (req, res) => {
        await logic.resetDaysForNewWeek();
        res.redirect('/days');
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