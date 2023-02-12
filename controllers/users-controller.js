//========== USERS CONTROLLER ==========
const fs = require('fs');


//========== JSON FILE CONNECTION ==========

const usersSignUp = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/users-sign-up.json`)
);

const usersSignIn = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/users-sign-in.json`)
);


//========== ROUTE HANDLERS ==========

//CREATE USER SIGN UP  
exports. createUserSignUp = (req, res) => {
    const newUserSignUp = Object.assign(req.body);
    
    if( !newUserSignUp.firstName  ||
        !newUserSignUp.lastName   ||
        !newUserSignUp.birthDate  ||
        !newUserSignUp.city       ||
        !newUserSignUp.country    ||
        !newUserSignUp.email      ||
        !newUserSignUp.password   ||
        !newUserSignUp.confirmPassword){
             res.status(400).json({
                status: 'fail',
                message: 'INVALID BODY'
            });
        }
    
    else{
        usersSignUp.push(newUserSignUp);
        fs.writeFile(`${__dirname}/../data/users-sign-up.json`, 
        JSON.stringify(usersSignUp), err => {
            res.status(201).json({
                status: 'sucess',
                data: {
                    user: newUserSignUp
                }
            })
        })
    }
}


//CREATE USER SIGN IN
exports. createUserSignIn = (req, res) => {
    const newUserSignIn = Object.assign(req.body);

    if( !newUserSignIn.email || 
        !newUserSignIn.password){
            res.status(404).json({
                status: 'fail',
                message: 'INVALID BODY'
            }); 
        }
    
    else{
        usersSignIn.push(newUserSignIn);
        fs.writeFile(`${__dirname}/../data/users-sign-in.json`,
        JSON.stringify(usersSignIn), err => {
            res.status(201).json({
                status: 'sucess',
                data: {
                    user: newUserSignIn
                }
            })
        })
    }
}