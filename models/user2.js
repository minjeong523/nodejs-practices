module.exports = (sequelize, DataTypes) => {
  const user2 = sequelize.define(
    "user2",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      hp: {
        type: DataTypes.STRING(13),
        allowNull: false,
        unique: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return user2;
};
