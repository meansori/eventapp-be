const pool = require("../config/db");

class Admin {
  static async create(data) {
    const { username, password } = data;
    const [result] = await pool.query("INSERT INTO admin (username, password) VALUES (?, ?)", [username, password]);
    return result.insertId;
  }

  static async findByUsername(username) {
    const [rows] = await pool.query("SELECT * FROM admin WHERE username = ?", [username]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM admin WHERE id_admin = ?", [id]);
    return rows[0];
  }
}

module.exports = Admin;
