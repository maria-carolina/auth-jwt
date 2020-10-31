const User = require ('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 84600
    });

}

module.exports = {
    async store (req, res){
        const { email } = req.body;      
        const user = await User.create(req.body)
            .then(function(user){
                user.password = undefined; //nao retornar senha 

                return res.send({ 
                    user, 
                    token: generateToken({ id: user.id})
                });
                
            }).catch(function (err) {
                return res.status(400).send({ error: err });
        });
    },

    async authenticate (req, res){
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if(!user){
            return res.send({ error: 'Usuário não encontrado'})
        }
            

        if(!await bcrypt.compare(password, user.password)){
            return res.send({ error: 'Senha incorreta'})
        }
        
        user.password = undefined; //nao retornar senha 
        
        return res.send({ 
            user, 
            token: generateToken({ id: user.id})
        });

    }
};
