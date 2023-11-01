export default function db_queries(db) {


  async function getCredentials(waiter, password) {
    try {
      const query = 'SELECT * FROM waiters WHERE name = $1 AND password = $2';
      const values = [waiter, password]
      const result = await db.oneOrNone(query, values);
      return result;
    } catch (error) {
      return false
    }
  };

  async function checkUserExists(username) {
    try {
      const result = await db.oneOrNone('SELECT * FROM waiters WHERE name = $1', [username]);
      return !!result; // Returns true if the result is not null, indicating the user exists
    } catch (error) {
      throw new Error('Error checking user existence: ' + error.message);
    }
  }

  async function pushNewSignUpNamesToDatabase(username, password) {
    try {
      const query = 'INSERT INTO waiters (name, password, admin) VALUES ($1, $2, $3)';
      const values = [username, password, false];
      await db.none(query, values);
      return true; // Return true if the insertion is successful
    } catch (error) {
      // Handle database insertion errors
      console.error('Error inserting new user:', error);
      return false; // Return false if an error occurs
    }
  }


  async function getWaiterId(name) {
    try {
      const query = 'SELECT waiter_id FROM waiters WHERE name = $1;';
      const values = [name];
      const result = await db.one(query, values);
      return result.waiter_id;
    } catch (error) {
      // Handle database retrieval errors
      throw new Error('Error retrieving waiter ID from the database: ' + error.message);
    }
  };

  async function showAllDays() {
    try {
      const allDays = await db.any('SELECT * FROM days');
      return allDays;
    } catch (error) {
      throw new Error('Error retrieving all days from the database: ' + error.message);
    }
  };

  async function getDayId(dayName) {
    try {
      const query = 'SELECT day_id FROM days WHERE day_name = $1;';
      const values = [dayName];
      const result = await db.one(query, values);
      return result.day_id;
    } catch (error) {

      throw new Error('Error retrieving day ID from the database: ' + error.message);
    }
  };

  async function getSelectedDays(username) {
    try {
      const query = 'SELECT days.day_name FROM days JOIN shifts ON shifts.day_id = days.day_id JOIN waiters ON shifts.waiter_id = waiters.waiter_id WHERE waiters.name = $1';
      const selectedDays = await db.any(query, [username]);
      return selectedDays.map(day => day.day_name);
    } catch (error) {
      throw new Error('Error retrieving selected days from the database: ' + error.message);
    }
  };


  async function insertWaiterAndDayIdIntoShiftTable(waiter, days) {
    try {
      const query = 'INSERT INTO shifts (waiter_id, day_id) VALUES ($1, $2);';
      let waiterId = await getWaiterId(waiter);
      await db.none(`delete from shifts where waiter_id = $1`, [waiterId])
      for (let i = 0; i < days.length; i++) {
        const day = days[i];
        let dayID = await getDayId(day)
        const values = [waiterId, dayID];
        await db.query(query, values);
      }
      return true
    } catch (error) {
      // Handle database insertion errors
      return false
    }
  };



  async function getShiftsData() {
    try {
      const query = `
      SELECT days.day_name, waiters.name as waiter_name
      FROM shifts
      INNER JOIN waiters ON shifts.waiter_id = waiters.waiter_id
      INNER JOIN days ON shifts.day_id = days.day_id;
      `;
      const result = await db.any(query);
      return result;
    } catch (error) {
      // Handle errors
      throw new Error('Error retrieving shifts data from the database: ' + error.message);
    }
  };


  async function resetDaysForNewWeek() {

    try {
      await db.none('DELETE FROM shifts');
    } catch (error) {
      throw error;
    }

  };



  return {
    getCredentials,
    checkUserExists,
    pushNewSignUpNamesToDatabase,
    getWaiterId,
    showAllDays,
    getSelectedDays,
    getDayId,
    insertWaiterAndDayIdIntoShiftTable,
    getShiftsData,
    resetDaysForNewWeek
  }
}