import mongoose from 'mongoose';

import './User';
var mongoClient = require("mongodb").MongoClient;
const User = mongoose.model('User');
var url = "mongodb://localhost:27017/usersService";

//установка соединения с бд
export function setUpConnection(){
	mongoose.connect(url);
}

//добавление нового юзера в бд
export function createUser(data){
	console.log(data.login);
	console.log(data.pass);

	if(!findUser(data)){
			const user = new User({
			login: data.login,
			pass: data.pass,
		})
		return user.save();
	}
	return null;
}

export function findUser(data){
	var bool = false;
	mongoClient.connect(url, function(err, database){
	     
	    if (err) return console.log(err);

  		var db = database.db('usersService');
     	var collections=db.collection('users');
	    collections.find({login: data.login }).toArray(function(err, results){
	             
	        console.log(results);
	        if( results.length > 0)
	        	bool = true;
	        database.close();
	    });
	});
	return bool;
}