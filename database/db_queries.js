export default function db_queries(db){


    function getCredentials(username,password){

    }

    function getAllDaysFromDb(){

    }

    function updateDaysSelected(){

    }

    async function resetDaysForNewWeek(){

        try {
            await db.none('DELETE FROM shifts');
        } catch (error) {
            throw error;
        }

    }




    return{
        getCredentials,
        getAllDaysFromDb,
        updateDaysSelected,
        resetDaysForNewWeek

    }
}