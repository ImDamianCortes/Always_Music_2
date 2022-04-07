
//Registrar Estudiante
const insert = async (client, argvS) => {
    //recepcion de argumentos
    const nombre = argvS[1]
    const rut = argvS[2]
    const curso = argvS[3]
    const nivel = argvS[4]
    //consulta
    const query = {
        text: "INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES($1, $2, $3, $4) RETURNING *",
        values: [nombre, rut, curso, nivel]
    }
    try {
        const res = await client.query(query);
        console.log(`\nEstudiante ${res.rows[0].nombre} agregado con éxito\n`);

    } catch (error) {
        //captura error de consulta
        console.log(`\nInsert error:\ncode: ${error.code}\ndetail: ${error.detail}`);
    }
}

//consulta por rut
const consultaRut = async function (client, argvS) {
    //recepcion de argumentos
    const rut = argvS[1]
    //consulta
    const query = {
        text: "SELECT * FROM estudiantes WHERE rut = $1",
        values: [rut]
    }
    try {
        const res = await client.query(query);
        //si rowCount es mayor a 0, es que encontro el rut
        if (res.rowCount == 0) {
            console.log("No existe el estudiante con rut:", rut);
        } else {
            console.log(`\nEstudiante con rut ${rut} encontrado\n`);
            console.log(res.rows[0]);
        }

    } catch (error) {
        //captura error de consulta
        console.log(`\nConsulta rut error:\ncode: ${error.code}\ndetail: ${error.detail}`);
    }
}

//consulta estudiantes
const consulta = async (client) => {
    //consulta
    const query = {
        name: "info_estudiantes",
        rowMode: 'array',
        text: "SELECT * FROM estudiantes"
    };
    try {
        const res = await client.query(query);
        console.log(`\nEstudiantes encontrados\n`);
        console.log(res.rows);
    } catch (error) {
        //captura error de consulta
        console.log(`\nConsulta estudiantes error:\ncode: ${error.code}\ndetail: ${error.detail}`);
    };

}

//update estudiante
const update = async (client, argvS) => {
    //recepcion de argumentos
    const nombre = argvS[1]
    const rut = argvS[2]
    const curso = argvS[3]
    const nivel = argvS[4]
    //consulta
    const query = {
        text: "UPDATE estudiante SET nombre = $1, curso = $3, nivel = $4 WHERE rut = $2 RETURNING *",
        values: [nombre, rut, curso, nivel]
    }
    try {
        const res = await client.query(query);
        console.log(`\nEstudiante ${res.rows[0].nombre} editado con éxito\n`);
    } catch (error) {
        //captura error de consulta
        console.log(`\nUpdate error:\ncode: ${error.code}\ndetail: ${error.detail}`);
    }
}

//Delete estudiante
const eliminar = async function (client, argvS) {
    //recepcion de argumentos
    const rut = argvS[1]
    //consulta
    const query = {
        text: "DELETE FROM estudiantes WHERE rut = $1",
        values: [rut]
    }
    try {
        const res = await client.query(query);
        //si rowCount es mayor a 0, es que encontro el rut
        if (res.rowCount == 0){
            console.log(`\nNo existe el estudiante con rut: ${rut}\n`);
        }else if(res.rowCount == 1){
            console.log(`\nRegistro de estudiante con rut ${rut} eliminado con éxito\n`);
        }

    } catch (error) {
        //captura error de consulta
        console.log(`\nDelete error:\ncode: ${error.code}\ndetail: ${error.detail}`);
    }
}

module.exports = { insert, consultaRut, consulta, update, eliminar };