// create table join_board(
//     id int not null primary key auto_increment,
//     title varchar(50) not null,
//     desc varchar(500) not null, //description:본문내용
//     created_at datetime not null
// );

module.exports = (seqeulize, DataTypes) => {
  const join_board = seqeulize.define(
    "join_board",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
  return join_board;
};
