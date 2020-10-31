const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                validate: {}
            },
            email:{
                type: DataTypes.STRING,
                validate: {
                    
                }
            },
            password: DataTypes.STRING
        },{
            hooks: {
                beforeCreate:(async (user) => {
                    const hash = await bcrypt.hash(user.password, 10)
                    user.password = hash;
                  })
              },
            sequelize,
            tableName: 'users'
        })
    }
    static associate(models){
        //
    }

}

module.exports = User;