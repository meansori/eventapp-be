const pool = require("../config/db");

class Peserta {
  static async create(data) {
    const { nama_peserta, asal, kategori } = data;
    const [result] = await pool.query("INSERT INTO Peserta (nama_peserta, asal, kategori) VALUES (?, ?, ?)", [
      nama_peserta,
      asal,
      kategori,
    ]);
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await pool.query("SELECT * FROM Peserta");
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM Peserta WHERE id_peserta = ?", [id]);
    return rows[0];
  }

  static async update(id, data) {
    const { nama_peserta, asal, kategori } = data;
    const [result] = await pool.query(
      "UPDATE Peserta SET nama_peserta = ?, asal = ?, kategori = ? WHERE id_peserta = ?",
      [nama_peserta, asal, kategori, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.query("DELETE FROM Peserta WHERE id_peserta = ?", [id]);
    return result.affectedRows;
  }

  static async findByName(nama_peserta) {
    const [rows] = await pool.query("SELECT * FROM Peserta WHERE nama_peserta LIKE ?", [`%${nama_peserta}%`]);
    return rows;
  }
}

module.exports = Peserta;
