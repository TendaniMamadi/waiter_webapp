export default function routes(frontendInstance, logic) {
    const homeRoute = async (req, res) => {
        res.render('index');
    }

    const signUp = async (req, res) => {
        res.render('signup')
    };

    const register = async (req, res) => {
        const { username, password } = req.body;
        try {
            const result = await logic.pushNewSignUpNamesToDatabase(username, password);
            if (result) {
                req.flash('success', 'You have successfully signed up');

                res.redirect('/signup');
            } else {
                res.redirect('/signup')
            }
        } catch (error) {
            req.flash('error', 'An error occurred while processing the request');
            console.error('Error:', error);
            res.render('index', { username, error });
        }
    };



    // const authenticateUser = async (req, res) => {
    //     const { username, password } = req.body;

    //     try {
    //         const result = await logic.getCredentials(username, password);

    //         if (!result) {
    //             req.flash('error', 'User not found');
    //             res.render('index', { username });
    //         } else {
    //             if (result.password === password) {
    //                 if (result.admin === true) {
    //                     res.redirect(`/days`);
    //                 } else {
    //                     res.redirect(`/waiters/${username}`);
    //                 }
    //             } else {
    //                 req.flash('error', 'Invalid username or password');
    //                 res.render('index', { username });
    //             }
    //         }
    //     } catch (error) {
    //         req.flash('error', 'An error occurred while processing the request');
    //         console.error('Error:', error);
    //         res.render('index', { username });
    //     }
    // };


    // Middleware to check if the user is authenticated
    const checkAuth = (req, res, next) => {
        if (req.session.username) {
            // If the user is authenticated, allow them to proceed
            next();
        } else {
            // If the user is not authenticated, redirect them to the login page or display an error message
            req.flash('error', 'Please log in to access this page');
            res.redirect('/');
        }
    };

    const authenticateUser = async (req, res) => {
        const { username, password } = req.body;

        try {
            const result = await logic.getCredentials(username, password);

            if (!result) {
                req.flash('error', 'User not found');
                res.render('index', { username });
            } else {
                if (result.password === password) {
                    req.session.username = username; // Set the username in the session
                    if (result.admin === true) {
                        res.redirect(`/days`);
                    } else {
                        res.redirect(`/waiters/${username}`);
                    }
                } else {
                    req.flash('error', 'Invalid username or password');
                    res.render('index', { username });
                }
            }
        } catch (error) {
            req.flash('error', 'An error occurred while processing the request');
            console.error('Error:', error);
            res.render('index');
        }
    };



    const showDays = async (req, res, next) => {
        const username = req.params.username;
        try {
            // Check if the user exists in the database
            const userExists = await logic.checkUserExists(username);
            if (!userExists) {
                // Redirect the user to the login page if they are not signed up or in the database
                return res.redirect('/');
            }

            const allDays = await logic.showAllDays();
            const selectedDays = await logic.getSelectedDays(username);

            allDays.forEach(day => {
                if (selectedDays.includes(day.day_name)) {
                    day.checked = true;
                } else {
                    day.checked = false;
                }
            });

            res.render('waiter_selection', { username, days: allDays });
        } catch (error) {
            res.status(500).send('Error fetching data');
            console.error('Error: ', error);
        }
    };


    // // // Middleware to be used before the showDays route
    // const checkWaiterAuthentication = async (req, res, next) => {
    //     const username = req.params.username;
    //     try {
    //         // Check if the user exists in the database
    //         const userExists = await logic.checkUserExists(username);
    //         if (!userExists) {
    //             // Redirect the user to the signup page if they are not signed up or in the database
    //             return res.redirect('/signup');
    //         }
    //         // If the user exists, allow them to proceed to the next middleware or route handler
    //         next();
    //     } catch (error) {
    //         res.status(500).send('Error fetching data');
    //         console.error('Error: ', error);
    //     }
    // };

    // const checkAdminAuthentication = async (req, res, next) => {
    //     const username = req.body.username;
    //     try {
    //         const isAdmin = await logic.checkIfAdmin(username);
    //         if (isAdmin) {
    //             // If the user is an admin, allow them to proceed to the next middleware or route handler
    //             next();
    //         } else {
    //             // If the user is not an admin, redirect them or handle the unauthorized access accordingly
    //             res.redirect('/'); // Redirect to an unauthorized access page
    //         }
    //     } catch (error) {
    //         res.status(500).send('Error checking if user is admin');
    //         console.error('Error: ', error);
    //     }
    // };


    const submitDays = async (req, res) => {
        const selectedDays = req.body.days;
        const username = req.params.username;

        if (!selectedDays) {
            req.flash('error', 'Please select days');
            res.redirect('/waiters/' + username);
            return;
        }

        if (typeof selectedDays === 'string') {
            req.flash('warning', 'A minimum of 2 days should be checked!');
            res.redirect('/waiters/' + username);
            return;
        }

        try {
            const result = await logic.insertWaiterAndDayIdIntoShiftTable(username, selectedDays);
            if (result) {
                req.flash('success', 'Days successfully added.');
            } else {
                req.flash('error', 'Waiter unknown');
                res.redirect('/');
                return;

            }

        } catch (error) {
            req.flash('error', 'An error occurred while processing the request.');
            console.error('Error: ', error);
        }

        res.redirect('/waiters/' + username);
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

        for (const key in groupedData) {
            const element = groupedData[key];
            if (element.length > 3) {
                groupedData[key].colour = "red";
            } else if (element.length < 3) {
                groupedData[key].colour = "orange";
            }
            else {
                groupedData[key].colour = "green";
            }
        }

        res.render('waiter_availability', { groupedData });
    };

    const clearingRoute = async (req, res) => {
        await logic.resetDaysForNewWeek();
        res.redirect('/days');
    };

    const endSession = async (req, res) => {
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                console.log('Error destroying session:', err);
            } else {
                res.redirect('/'); // Redirect to the login page after destroying the session
            }
        });
    }


    return {
        homeRoute,
        signUp,
        register,
        authenticateUser,
        showDays,
        checkAuth,
        // checkWaiterAuthentication,
        // checkAdminAuthentication,
        submitDays,
        admin,
        clearingRoute,
        endSession
    }
}
