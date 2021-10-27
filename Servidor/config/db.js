const sql = require('mssql')
const config={
    server: 'DESKTOP-093HK3B\\SQLEXPRESS',
    user:'root',
    password:'12345',
    database:'proyectoInfoAplicada',
    options: {
        trustServerCertificate: true,
    }
};
exports.config= config;
exports.sql= sql;