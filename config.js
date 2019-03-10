const env = 'dev'; // dev, pro, default
let config = {};
if(env == 'dev') {
    config = {
        jwt_secret: 'mindfire_dev',
        db_url: 'mongodb://localhost/mindfire_db'
    }
} else if(env == 'prod') {
    config = {
        jwt_secret: 'mindfire_live',
        db_url: 'mongodb://localhost/mindfire_db'
    }
} else {
    config = {
        jwt_secret: 'mindfire_default',
        db_url: 'mongodb://localhost/mindfire_db'
    }
}

module.exports = config;