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


  // async function insertDaysinDb(days) {
  //   try {

  //     const insertQuery = 'INSERT INTO days (day_name) VALUES ($1)';

  //     // Use a loop to insert multiple days
  //     for (const day of days) {
  //       await db.none(insertQuery, [day]);
  //     }

  //     return 'Days inserted successfully';
  //   } catch (error) {
  //     // Handle database insertion errors
  //     throw new Error('Error inserting days into the database: ' + error.message);
  //   }
  // }

  // async function getAllDaysFromDb() {
  //   let days;
  //   days = await db.manyOrNone('SELECT day_name FROM days');
  //   return days;

  // }

  // async function updateDaysSelected() {
  //   try {

  //     const query = `
  //             INSERT INTO shifts (waiter_id, day_id)
  //             VALUES ($1, $2)
  //             ON CONFLICT (waiter_id)
  //             DO UPDATE SET day_id = excluded.day_id;
  //           `;

  //     // Convert the selectedDays array to a string or format suitable for storage in the database
  //     const formattedDays = selectedDays.join(', ');

  //     await db.none(query, [username, formattedDays]);

  //     return 'Days selected updated successfully';
  //   } catch (error) {
  //     // Handle database query errors
  //     throw new Error('Error updating days selected: ' + error.message);
  //   }
  // }

  // async function resetDaysForNewWeek() {

  //   try {
  //     await db.none('DELETE FROM shifts');
  //   } catch (error) {
  //     throw error;
  //   }

  // }



  // return {
  //   getCredentials,
  //   insertDaysinDb,
  //   getAllDaysFromDb,
  //   updateDaysSelected,
  //   resetDaysForNewWeek

  // }
}