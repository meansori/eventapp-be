const pool = require("../config/db");

class Peserta {
  static async create(data) {
    const { nama_peserta, asal, kategori, jenis_kelamin, agama } = data;
    const [result] = await pool.query(
      "INSERT INTO peserta (nama_peserta, asal, kategori,jenis_kelamin,agama) VALUES (?, ?, ?, ?, ?)",
      [nama_peserta, asal, kategori, jenis_kelamin, agama]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await pool.query("SELECT * FROM peserta");
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM peserta WHERE id_peserta = ?", [id]);
    return rows[0];
  }

  static async update(id, data) {
    const { nama_peserta, asal, kategori, jenis_kelamin, agama } = data;
    const [result] = await pool.query(
      "UPDATE peserta SET nama_peserta = ?, asal = ?, kategori = ?, jenis_kelamin = ?, agama = ? WHERE id_peserta = ?",
      [nama_peserta, asal, kategori, jenis_kelamin, agama, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.query("DELETE FROM peserta WHERE id_peserta = ?", [id]);
    return result.affectedRows;
  }

  static async findByName(nama_peserta) {
    const [rows] = await pool.query("SELECT * FROM peserta WHERE nama_peserta LIKE ?", [`%${nama_peserta}%`]);
    return rows;
  }
}

module.exports = Peserta;
