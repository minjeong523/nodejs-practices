const db = require("../models");

module.exports = {
  FindAllBoard: async (req, res) => {
    try {
      const rows = await db.board.findAll();
      return res.json(rows);
    } catch (error) {
      return res.json({ error: error });
    }
  },
  FindOneBoard: async (req, res) => {
    try {
      let { id } = req.query;
      const rows = await db.board.findOne({
        where: {
          id: id,
        },
      });
      return res.json(rows);
    } catch (error) {
      return res.json({ error: error });
    }
  },
  CreateBoard: async (req, res) => {
    try {
      let { title, desc } = req.body;
      await db.board.create({
        title: title,
        desc: desc,
        created_at: Date.now(),
      });
      return res.json({ result: "success" });
    } catch (error) {
      return res.json({ error: error });
    }
  },

  Updateboard: async (req, res) => {
    try {
      let { id, title, desc } = req.body;
      await db.board.update(
        {
          title: title,
          desc: desc,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res.json({ result: "success" });
    } catch (error) {
      return res.json({ error: error });
    }
  },
  Deleteboard: async (req, res) => {
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
  },
};
