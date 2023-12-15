module.exports = (seqeulize, DataTypes) => {
  const user = seqeulize.define(
    "user",
    {
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return user;
};
