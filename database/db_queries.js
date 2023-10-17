export default function db_queries(db) {


  // async function getCredentials(name, password) {
  //   try {
  //     const query = 'SELECT * FROM waiters WHERE name = $1 AND password = $2';
  //     const credentials = await db.oneOrNone(query, [name, password]);

  //     if (credentials) {
  //       // Credentials found, return the user data or relevant information
  //       return credentials;
  //     } else {
  //       // Credentials not found
  //       return null;
  //     }
  //   } catch (error) {
  //     // Handle database query errors
  //     throw new Error('Error fetching credentials: ' + error.message);
  //   }
  // }

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
  }

  async function getDayId(dayName) {
    try {
      const query = 'SELECT day_id FROM days WHERE day_name = $1;';
      const values = [dayName];
      const result = await db.one(query, values);
      return result.day_id;
    } catch (error) {
      // Handle database retrieval errors
      throw new Error('Error retrieving day ID from the database: ' + error.message);
    }
  }


  async function insertWaiterAndDayIdIntoShiftTable(waiter, days) {
    try {
      const query = 'INSERT INTO shifts (waiter_id, day_id) VALUES ($1, $2);';
      let waiterId = await getWaiterId(waiter);
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
  }



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
  }


  async function resetDaysForNewWeek() {

    try {
      await db.none('DELETE FROM shifts');
    } catch (error) {
      throw error;
    }

  }



  return {
    // getCredentials,
    getWaiterId,
    getDayId,
    insertWaiterAndDayIdIntoShiftTable,
    getShiftsData,
    resetDaysForNewWeek
  }
}