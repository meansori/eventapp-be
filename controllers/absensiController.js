const Absensi = require("../models/absensiModel");
const { validationResult } = require("express-validator");

const createAbsensi = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id_acara, id_peserta, status_kehadiran } = req.body;

  try {
    const absensiId = await Absensi.create({ id_acara, id_peserta, status_kehadiran });
    res.status(201).json({ message: "Absensi berhasil dicatat", absensiId });
  } catch (error) {
    if (error.message === "Peserta sudah tercatat absensinya untuk acara ini") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const getAbsensiByAcara = async (req, res) => {
  const { id_acara } = req.params;

  try {
    const absensi = await Absensi.findByAcara(id_acara);
    res.json(absensi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStatisticsByAcara = async (req, res) => {
  const { id_acara } = req.params;

  try {
    const statistics = await Absensi.getStatisticsByAcara(id_acara);
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMonthlyStatistics = async (req, res) => {
  const { year, month } = req.params;

  try {
    const statistics = await Absensi.getMonthlyStatistics(year, month);
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAbsensi,
  getAbsensiByAcara,
  getStatisticsByAcara,
  getMonthlyStatistics,
};
