const sql = require('mssql')
const config={
    server: 'localhost',
    user:'logChristian',
    password:'123',
    database:'proyectoInfoAplicada',
    options: {
        trustServerCertificate: true,
    }
};
exports.config= config;
exports.sql= sql;