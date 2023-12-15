const db = require("../models");
const bcrypt = require("bcryptjs");
module.exports = {
  user2SignUp: async (req, res) => {
    try {
      let { user_id, nickname, password, hp } = req.body;
      const duplicate_id = await db.user2.findOne({
        where: {
          user_id: user_id,
        },
      });

      if (duplicate_id != null) {
        return res.json({ result: "user_id가 중복되었습니다." });
      }

      const duplicate_nickname = await db.user2.findOne({
        where: {
          nickname: nickname,
        },
      });
      if (duplicate_nickname != null) {
        return res.json({ result: "nickname이 중복되었습니다." });
      }

      const duplicate_hp = await db.user2.findOne({
        where: {
          hp: hp,
        },
      });
      if (duplicate_hp != null) {
        return res.json({ result: "전화번호가 중복되었습니다." });
      }

      const salt = bcrypt.genSaltSync(8);
      const hash = bcrypt.hashSync(password, salt);

      await db.user2.create({
        user_id: user_id,
        nickname: nickname,
        password: hash,
        hp: hp,
      });
      return res.json({ result: "success" });
    } catch (error) {
      return res.json({ error: error });
    }
  },

  user2SignIn: async (req, res) => {
    try {
      let { user_id, password } = req.body;
      console.log(1);
      const findUser = await db.user2.findOne({
        where: {
          user_id: user_id,
        },
      });
      console.log(2, findUser);
      if (findUser == null) {
        return res.json({ result: "가입되지 않은 아이디입니다." });
      }
      console.log(3);
      if (bcrypt.compareSync(password, findUser.password)) {
        return res.json({ result: "로그인 성공" });
      }
      console.log(4);
      return res.json({ result: "비밀번호가 틀립니다." });
    } catch (error) {
      return res.json({ error: error.toString() });
    }
  },
};
