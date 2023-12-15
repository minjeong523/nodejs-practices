module.exports = (sequelize, DataTypes) => {
  const join_user = sequelize.define(
    "join_user",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      login_id: {
        type: DataTypes.STRING,
      },
      login_pw: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      hp: {
        type: DataTypes.STRING(13),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
      },
      board_count: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
  return join_user;
};
