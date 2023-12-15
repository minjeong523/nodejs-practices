const db = require("../models");
const bcrypt = require("bcryptjs");
const { QueryTypes } = require("sequelize");
const shortid = require("shortid");

module.exports = {
  ChkDuplicate: async (req, res) => {
    try {
      let { chk_type, chk_value } = req.body;
      // chk_type = > email
      let db_condition = {};
      if (chk_type == "email") {
        db_condition = {
          where: {
            email: chk_value,
          },
        };
      } else if (chk_type == "nickname") {
        db_condition = {
          where: {
            nickname: chk_value,
          },
        };
      } else if (chk_type == "hp") {
        db_condition = {
          where: {
            hp: chk_value,
          },
        };
      } else {
        return res.json({ alert: "chk_type이 없습니다." });
      }
      const duplicate = await db.join_user.findOne(db_condition);
      if (duplicate != null) {
        return res.json({ duplicate: true });
      }
      return res.json({ duplicate: false });
    } catch (error) {
      return res.json({ error: error.toString() });
    }
  },
  SignUp: async (req, res) => {
    try {
      let { nickname, login_id, login_pw, hp, email } = req.body;
      req.body.login_pw = bcrypt.hashSync(
        req.body.login_pw,
        bcrypt.genSaltSync(8)
      );
      req.body.id = shortid.generate();
      await db.join_user.create(req.body);
      return res.json({ result: "success" });
    } catch (error) {
      return res.json({ error: error.toString() });
    }
  },
  SignIn: async (req, res) => {
    try {
      let { id, pw } = req.body;
      const user = await db.join_user.findOne({
        where: {
          login_id: id,
        },
      });
      if (user == null) {
        return res.json({ result: "가입되지 않은 아이디입니다." });
      }
      if (bcrypt.compareSync(pw, user.login_pw)) {
        return res.json({
          result: "로그인 성공",
          user_id: user.id,
        });
      }
      return res.json({ result: "비밀번호가 틀립니다." });
    } catch (error) {
      return res.json({ error: error.toString() });
    }
  },
  BoardCreate: async (req, res) => {
    try {
      let { user_id, description } = req.body;
      req.body.id = shortid.generate();
      await db.join_board.create(req.body);
      return res.json({ result: "success" });
    } catch (error) {
      return res.json({ error: error.toString() });
    }
  },
  BoardUpdate: async (req, res) => {
    try {
      let { board_id, description } = req.body;
      await db.join_board.update(
        {
          description: description,
        },
        {
          where: {
            id: board_id,
          },
        }
      );
      return res.json({ result: "success" });
    } catch (error) {
      return res.json({ error: error.toString() });
    }
  },
  BoardList: async (req, res) => {
    try {
      const rows = await db.sequelize.query(
        `select b.*, u.nickname from join_board b 
            inner join join_user u on b.user_id = u.id`,
        {
          type: QueryTypes.SELECT,
        }
      );
      console.log(rows);
      return res.json(rows);
    } catch (error) {
      return res.json({ error: error.toString() });
    }
  },
};
