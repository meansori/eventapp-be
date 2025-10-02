const pool = require("../config/db");

class Acara {
  static async create(data) {
    const { nama_acara, deskripsi, tanggal_mulai, tanggal_selesai, lokasi, status_acara, created_by } = data;
    const [result] = await pool.query(
      `INSERT INTO acara (nama_acara, deskripsi, tanggal_mulai, tanggal_selesai, lokasi, status_acara, created_by) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nama_acara, deskripsi, tanggal_mulai, tanggal_selesai, lokasi, status_acara, created_by]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await pool.query("SELECT * FROM acara");
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM acara WHERE id_acara = ?", [id]);
    return rows[0];
  }

  static async update(id, data) {
    const { nama_acara, deskripsi, tanggal_mulai, tanggal_selesai, lokasi, status_acara } = data;
    const [result] = await pool.query(
      `UPDATE acara 
       SET nama_acara = ?, deskripsi = ?, tanggal_mulai = ?, tanggal_selesai = ?, lokasi = ?, status_acara = ? 
       WHERE id_acara = ?`,
      [nama_acara, deskripsi, tanggal_mulai, tanggal_selesai, lokasi, status_acara, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.query("DELETE FROM acara WHERE id_acara = ?", [id]);
    return result.affectedRows;
  }

  static async findByMonth(year, month) {
    const [rows] = await pool.query("SELECT * FROM acara WHERE YEAR(tanggal_mulai) = ? AND MONTH(tanggal_mulai) = ?", [
      year,
      month,
    ]);
    return rows;
  }
}

module.exports = Acara;
