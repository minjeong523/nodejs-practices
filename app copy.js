const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = require("./models");

// async ~ await : 이함수가 끝날때까지 기다려라.
(async () => {
  await db.sequelize.sync({ force: false });
})();

app.get("/", (req, res) => {
  res.send("hello");
});

//select 다가져옴
// localhost:3000/all/board
app.get("/all/board", async (req, res) => {
  try {
    //db logic
    const rows = await db.board.findAll();
    return res.json(rows);
  } catch (error) {
    return res.json(error);
  }
});

app.get("/board", async (req, res) => {
  let { id } = req.query;
  const rows = await db.board.findOne({
    where: {
      id: id,
    },
  });
  return res.json(rows);
});

app.post("/board/create", async (req, res) => {
  console.log("1");
  try {
    let { title, desc } = req.body;
    await db.board.create({
      title: title,
      desc: desc,
      created_at: Date.now(),
    });
    console.log(2);
    return res.json({ result: "success" });
  } catch (error) {
    console.log(3);
    console.log(error);
    return res.json({ error: error });
  }
});
// get post delete put
// get post <-
// 프론트 입장에서는 우리가 서버에요.
// 디비입장에서는 우리가 프론트에요
// 실질적으로 데이터를 넣고 수정하는 곳은 디비에요.
// 프론트랑 백엔드는 디비로 데이터를 전달하는 통로일뿐이에요.
app.post("/board/update", async (req, res) => {
  try {
    let { id, title, desc } = req.body;
    await db.board.update(
      {
        //수정내용
        title: title,
        desc: desc,
      },
      {
        //where
        where: {
          id: id,
        },
      }
    );
    return res.json({ result: "success" });
  } catch (error) {
    return res.json({ error: error });
  }
});

app.post("/board/delete", async (req, res) => {
  try {
    let { id } = req.body;
    await db.board.destroy({
      where: {
        id: id,
      },
    });
    return res.json({ result: "success" });
  } catch (error) {
    return res.json({ error: error });
  }
});

app.listen(3000);
