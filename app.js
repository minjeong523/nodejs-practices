const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = require("./models");

// async ~ await : 이함수가 끝날때까지 기다려라.
(async () => {
  await db.sequelize.sync({ force: false });
})();

const router = require("./routes");

app.use("/", router);

app.listen(3000);

//숙제
// 회원가입, 로그인
