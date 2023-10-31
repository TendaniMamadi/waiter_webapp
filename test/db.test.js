import assert from 'assert';
import db_queries from '../services/db_queries.js';
import pgPromise from 'pg-promise';
import 'dotenv/config';

const pgp = pgPromise({});
const connectionString = process.env.DATABASE_URL_TEST;

const db = pgp(connectionString);
let dbQueries = db_queries(db);

// Test cases
describe('Database test', function () {
    this.timeout(20000);

    it('should be able to get waiter credentials (username and password)', async function () {
        // Write test logic for getCredentials function
        const result = await dbQueries.getCredentials('Mary', 'password456');
        assert.strictEqual(false, result.admin);
    });

    it('should be able to get admin credentials (username and password)', async function () {
        // Write test logic for getCredentials function
        const result = await dbQueries.getCredentials('Mike', 'password000');
        assert.strictEqual(true, result.admin);
    });


    it('should be able to get Waiter Id', async function () {
        // Write test logic for getWaiterId function
        const result = await dbQueries.getWaiterId('Mary');
        assert.strictEqual(1, result);
    });

    it('should show All Days', async function () {
        // Write test logic for showAllDays function
        const result = await dbQueries.showAllDays();
        assert.deepStrictEqual(
            [
                {
                    "day_id": 1
                    , "day_name": "Monday"
                },
                 {
                    "day_id": 2
                        ,"day_name": "Tuesday"
                },
                      {
                    "day_id": 3
                       , "day_name": "Wednesday"
                },
                      {
                    "day_id": 4
                       , "day_name": "Thursday"
                },
                      {
                    "day_id": 5
                       , "day_name": "Friday"
                },
                      {
                    "day_id": 6
                       , "day_name": "Saturday"
                },
                      {
                    "day_id": 7
                        ,"day_name": "Sunday"
                }


            ], result);
    });

    it('should get Day Id', async function () {
        // Write test logic for getDayId function
        const result = await dbQueries.getDayId('Monday');
        assert.strictEqual(1, result);
    });

    it('should get Selected Days', async function () {
        // Write test logic for getSelectedDays function
        const result = await dbQueries.getSelectedDays('Monday', 'Tuesday');
        assert.deepStrictEqual([], result);
    });

    it('should insert Waiter And Day Id Into Shift Table', async function () {
        // Write test logic for insertWaiterAndDayIdIntoShiftTable function
        const result = await dbQueries.insertWaiterAndDayIdIntoShiftTable('Mary', ['Monday', 'Tuesday']);
        assert.strictEqual(true, result);
    });

    it('should get Shifts Data', async function () {
        // Write test logic for getShiftsData function
        const result = await dbQueries.getShiftsData();
        assert.deepStrictEqual([
            { day_name: 'Monday', waiter_name: 'Mary' },
            { day_name: 'Tuesday', waiter_name: 'Mary' }
        ], result);
    });

    it('should reset Days For New Week', async function () {
        // Write test logic for resetDaysForNewWeek function
        await db.none('INSERT INTO shifts (waiter_id, day_id) VALUES ($1, $2);', [1, 1]);
        await dbQueries.resetDaysForNewWeek();

        const result = await dbQueries.getShiftsData();

        assert.deepEqual(result, []);
    });

    after(function () {
        db.$pool.end(); // Close the pool after all tests are finished
    });
});
