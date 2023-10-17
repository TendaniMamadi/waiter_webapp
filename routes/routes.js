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
            if (selectedDays.length < 2) {
                req.flash('warning', 'A minimum of 2 days should be checked!');
            } else if (await logic.insertWaiterAndDayIdIntoShiftTable(username, selectedDays)
            ) {
                req.flash('success', 'Days successfully added.');
            } else {
                req.flash('error', 'Waiter unknown');
            }
        } else {
            req.flash('error', 'Please select days');
        }

        res.render('waiter_selection', { username })
    };


    const admin = async (req, res) => {

        let staff = await logic.getShiftsData();

        function groupWaitersByDay(staff) {
            const result = {};
            staff.forEach(item => {
                const { day_name, waiter_name } = item;
                if (result[day_name]) {
                    result[day_name].push(waiter_name);
                } else {
                    result[day_name] = [waiter_name];
                }
            });
            return result;
        }

        const groupedData = groupWaitersByDay(staff);
        console.log(groupedData);

        res.render('waiter_availability', { groupedData });

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