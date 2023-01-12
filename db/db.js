const path = require('path');
const { Sequelize, Model } = require('sequelize');

//THE SEQUELIZE INSTANCE 
const sequelize = new Sequelize({
    dialect: 'sqlite',
    //THE STORAGE PATH 
    storage: path.join(__dirname, 'db.sqlite'),
    logging: false
});

//ALTERNATIVE 
//const sequelize = new Sequelize('sqlite::memory', {logging:false})

module.exports = {
    sequelize,
    Sequelize
};