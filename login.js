var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

var serviceAccount = {
    apiKey: "AIzaSyC5-UG6egEihQyr-PoDfvUUNP8Wfvvvp3I",
    authDomain: "thaodoan-thesis.firebaseapp.com",
    databaseURL: "https://thaodoan-thesis.firebaseio.com",
    projectId: "thaodoan-thesis",
    storageBucket: "thaodoan-thesis.appspot.com",
    messagingSenderId: "565251832636",
    appId: "1:565251832636:web:e468f4c7b7eb6f613a7c39",
    measurementId: "G-CH6ZHX4JP4"
};

firebase.initializeApp(serviceAccount);
var readline = require('readline-sync');

console.log('Welcome to Semi application \nYou must have an account to use our services.');
if (readline.keyInYN('Do you have account?')) {
    // 'Y' key was pressed.
    console.log('Login here');
    // Login
    var email = readline.question("Your email: ");
    var password = readline.question('Your password: ', { hideEchoBack: true });
    // Firebase auth
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
    const id = email.split('@')[0];
    module.exports.id = id;
} else {
    // Another key was pressed.
    console.log('Register here');
    // Register
    var email = readline.question("Your email: ");
    var password = readline.question('Your password: ', { hideEchoBack: true });
    var password = readline.question('Password comfirm ', { hideEchoBack: true });
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
    const id = email.split('@')[0];
    module.exports.id = id;
}