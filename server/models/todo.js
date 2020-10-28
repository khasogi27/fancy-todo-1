'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {
        foreignKey: 'UserId',
        targetKey: 'id'
      })
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date:{
      type: DataTypes.DATE,
      validate: {
        isDate(date) {
          if (date < new Date()) {
            throw new Error('Tidak boleh kurang dari tanggal hari ini')
          }
        }
      }
    }, 
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      afterFind(instance) {
        if (!instance) {
          throw new Error('Not Found : Data tidak ditemukan')
        }
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
