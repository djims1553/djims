const {Pool} = require('pg');
const pool = new pool ({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
});

pool.connect()
    .then(() => console.log('Connexion à PostgreSQL réussie'))
    .catch((err) => console.error('Erreur de connexion à PostgreSQL',err));

    module.exports=pool;