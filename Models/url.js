const { Sequelize, DataTypes } = require('sequelize');
const client = require('../connect.js');

const UrlModel = client.define('url', {
    account_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    ownerurl: {
        type: DataTypes.STRING(255),
    },
    platform: {
        type: DataTypes.STRING(255)
    },
    nameurl: {
        type: DataTypes.STRING(255)
    },
    linkurl: {
        type: DataTypes.STRING(255)
    },
    post: {
        type: DataTypes.BIGINT
    },
    friend: {
        type: DataTypes.BIGINT
    },
    follow: {
        type: DataTypes.BIGINT
    }
})

/*const TimeModel = client.define('valueoftime', {
    id_time: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    account_id: {
        type: DataTypes.BIGINT,
    },
    timecheck: {
        type: DataTypes.STRING(20),
    },
    post: {
        type: DataTypes.BIGINT
    },
    friend: {
        type: DataTypes.BIGINT
    },
    follow: {
        type: DataTypes.BIGINT
    }
})

TimeModel.sync({alter: true});*/
UrlModel.sync({alter: true});


module.exports = UrlModel;
//module.exports = TimeModel;

