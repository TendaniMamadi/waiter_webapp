export default function routes(frontendInstance, logic) {
    const homeRoute = async (req, res) => {
        res.render('index');
    }


    const authenticateUser = async (req, res) => {
        const { username, password } = req.body;
        const user = {
            username,
            password
        };
        console.log(user);
        if (user) {
            const result = await logic.getCredentials(username, password);
            if (result.password === user.password) { // Compare the stored password with the input password
                if (result.admin === true) {
                    res.redirect(`/days`);
                } else {
                    res.redirect(`/waiters/${username}`);
                }
            } else {
                req.flash('error', 'Invalid username or password');
            }
        } else {
            req.flash('error', 'User not found');
        }
    }


    const showDays = async (req, res) => {
        const username = req.params.username;

        res.render('waiter_selection', { username });
    };

    const submitDays = async (req, res) => {
        const selectedDays = req.body.days;
        const username = req.params.username;

        if (!selectedDays) {
            req.flash('error', 'Please select days');
        } else if (typeof selectedDays === 'string') {
            req.flash('warning', 'A minimum of 2 days should be checked!');
        } else {
            try {
                const result = await logic.insertWaiterAndDayIdIntoShiftTable(username, selectedDays);
                if (result) {
                    req.flash('success', 'Days successfully added.');
                } else {
                    req.flash('error', 'Waiter unknown');
                }
            } catch (error) {
                req.flash('error', 'An error occurred while processing the request.');
                console.error('Error: ', error);
            }
        }

        res.render('waiter_selection', { username });
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


        res.render('waiter_availability', { groupedData });

    };

    const clearingRoute = async (req, res) => {
        await logic.resetDaysForNewWeek();
        res.redirect('/days');
    };



    return {
        homeRoute,
        // recognizeUser,
        authenticateUser,
        showDays,
        submitDays,
        admin,
        clearingRoute
    }
}




// app.get('/', async (req, res) => {
//     try {
//         const data = await db.any('SELECT * FROM days'); // Assuming you have a table called 'days'
//         // Assuming you have a list of selectedDays from the database
//         const selectedDays = ['Monday', 'Tuesday']; // Replace with your actual data
//         data.forEach(day => {
//             if (selectedDays.includes(day.day_name)) {
//                 day.checked = true;
//             } else {
//                 day.checked = false;
//             }
//         });
//         res.render('your_template', { days: data });
//     } catch (error) {
//         res.status(500).send('Error fetching data');
//     }
// });