const { insert, consultaRut, consulta, update, eliminar } = require('./gestionE');

const { Pool } = require("pg");

const config = {
    user: "postgres",
    password: "123456",
    host: "localhost",
    port: 5432,
    database: "alwaysmusic",
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000
};

//Capturando argumentos por linea de comandos
const argvS = process.argv.slice(2);
//Definiendo argumento comando
const comando = argvS[0];

const pool = new Pool(config);

pool.connect(async (error_conexion, client, release) => {
    //captura de error de conexión
    if (error_conexion) return console.log("Error de conexion", error_conexion)

    //condicionando recepcion de argumento comando para ejecucion de funciones
    switch (comando) {
        case 'nuevo':
            await insert(client, argvS);
            release();
            break;
        case 'consulta':
            await consulta(client);
            release();
            break;
        case 'rut':
            await consultaRut(client, argvS);
            release();
            break;
        case 'editar':
            await update(client, argvS);
            release();
            break;
        case 'eliminar':
            await eliminar(client, argvS);
            release();
            break;
        default:
            console.log("El comando ingresado no es válido");
            release();
            break;
    }
    pool.end();
})

//Consultar todos los estudiantes
//node index.js consulta

//Nuevo estudiante
//node index.js nuevo 'Brian May' "12.345.678-9" "guitarra" "7"

//Consultar estudiante por rut
//node index.js rut "12.345.678-9"

//Editar estudiante
//node index.js editar "Brian May" "12.345.678-9" "guitarra" "10"

//Eliminar estudiante
//node index.js eliminar "12.345.678-9"

