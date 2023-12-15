const db = require("../models");
const bcrypt = require("bcryptjs");
module.exports = {
  //user_id, user_name, password
  UserSignUp: async (req, res) => {
    try {
      let { user_id, user_name, password } = req.body;
      // 중복검사 (닉네임중복검사, 아이디중복검사)
      const duplicate_id = await db.user.findOne({
        where: {
          user_id: user_id,
        },
      });
      //같지않다면, null이 아니라면
      if (duplicate_id != null) {
        return res.json({ result: "user_id가 중복되었습니다." });
      }
      const duplicate_username = await db.user.findOne({
        where: {
          user_name: user_name,
        },
      });
      if (duplicate_username != null) {
        return res.json({ result: "user_name이 중복되었습니다." });
      }

      const salt = bcrypt.genSaltSync(8);
      const hash = bcrypt.hashSync(password, salt);

      await db.user.create({
        user_id: user_id,
        user_name: user_name,
        password: hash,
      });
      return res.json({ result: "success" });
    } catch (error) {
      return res.json({ error: error });
    }
  },
  UserSignIn: async (req, res) => {
    try {
      let { user_id, password } = req.body;
      //로그인 로직
      //
      // const findUser = await db.user.findOne({
      //     where : {
      //         user_id : user_id,
      //         password: password
      //     }
      // })
      //1번문제 : 비밀번호가 틀리면 뭐가 문제인지 알수가 없음

      const findUser = await db.user.findOne({
        where: {
          user_id: user_id,
        },
      });

      if (findUser == null) {
        return res.json({ result: "가입되지 않은 아이디입니다." });
      }
      //   if (findUser.password == password) {
      //     return res.json({ result: "로그인에 성공하였습니다." });
      //   }
      if (bcrypt.compareSync(password, findUser.password)) {
        return res.json({ result: "로그인에 성공하였습니다." });
      }
      return res.json({ result: "비밀번호가 틀립니다." });
    } catch (error) {
      return res.json({ error: error });
    }
  },
};

//암호화
// 양방향 암호화, 단방향 암호화
// 양방향은 해독이 가능
// 단방향 암호화는 해독이 불가능해요
// 단방향에서 사용되는 암호화 알고리즘 라이브러리
//bcrypt
// npm i bcryptjs
