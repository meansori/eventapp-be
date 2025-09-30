const pool = require("../config/db");

class Absensi {
  static async create(data) {
    const { id_acara, id_peserta, status_kehadiran } = data;
    try {
      const [result] = await pool.query("INSERT INTO Absensi (id_acara, id_peserta, status_kehadiran) VALUES (?, ?, ?)", [id_acara, id_peserta, status_kehadiran]);
      return result.insertId;
    } catch (error) {
      // Jika terjadi error karena duplikat (unique constraint)
      if (error.code === "ER_DUP_ENTRY") {
        throw new Error("Peserta sudah tercatat absensinya untuk acara ini");
      }
      throw error;
    }
  }

  static async findByAcara(id_acara) {
    const [rows] = await pool.query(
      `SELECT a.*, p.nama_peserta, p.asal, p.kategori 
       FROM Absensi a 
       JOIN Peserta p ON a.id_peserta = p.id_peserta 
       WHERE a.id_acara = ?`,
      [id_acara]
    );
    return rows;
  }

  static async findAll(id) {
    console.log("model id pes " + id);

    const [rows] = await pool.execute(
      `SELECT *
   FROM absensi a
   JOIN acara ac ON a.id_acara = ac.id_acara
   WHERE a.id_peserta = ?
   ORDER BY a.waktu_absen DESC`,
      [id]
    );
    return rows;
  }

  static async getStatisticsByAcara(id_acara) {
    const [rows] = await pool.query(
      `SELECT 
          status_kehadiran,
          COUNT(*) AS jumlah
       FROM Absensi 
       WHERE id_acara = ?
       GROUP BY status_kehadiran`,
      [id_acara]
    );
    return rows;
  }

  static async getMonthlyStatistics(year, month) {
    const [rows] = await pool.query(
      `SELECT 
          a.status_kehadiran,
          COUNT(*) AS jumlah
       FROM Absensi a
       JOIN Acara e ON a.id_acara = e.id_acara
       WHERE YEAR(e.tanggal_mulai) = ? AND MONTH(e.tanggal_mulai) = ?
       GROUP BY a.status_kehadiran`,
      [year, month]
    );
    return rows;
  }
}

module.exports = Absensi;
