// create table board(
//     id int not null primary key auto_increment,
//     title varchar(50) not null,
//     desc varchar(500) not null, //description:본문내용
//     created_at datetime not null
// );

module.exports = (seqeulize, DataTypes) => {
  const board = seqeulize.define(
    "board",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return board;
};
