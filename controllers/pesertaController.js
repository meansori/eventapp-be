const Peserta = require("../models/pesertaModel");
const { validationResult } = require("express-validator");

const createPeserta = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nama_peserta, asal, kategori, jenis_kelamin, agama } = req.body;

  try {
    const pesertaId = await Peserta.create({ nama_peserta, asal, kategori, jenis_kelamin, agama });
    res.status(201).json({ message: "Peserta berhasil ditambahkan", pesertaId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const importParticipants = async (req, res) => {
  try {
    const { participants, created_by } = req.body;

    if (!participants || !Array.isArray(participants)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    // Loop insert tiap peserta
    const createdParticipants = [];
    for (const p of participants) {
      const id = await Peserta.create({ ...p, created_by });
      createdParticipants.push(id);
    }

    res.status(201).json({
      message: "Participants imported successfully",
      count: createdParticipants.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllPeserta = async (req, res) => {
  try {
    const peserta = await Peserta.findAll();
    res.json(peserta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPesertaById = async (req, res) => {
  const { id } = req.params;

  try {
    const peserta = await Peserta.findById(id);
    if (!peserta) {
      return res.status(404).json({ message: "Peserta tidak ditemukan" });
    }
    res.json(peserta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePeserta = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { nama_peserta, asal, kategori, jenis_kelamin, agama } = req.body;

  try {
    const affectedRows = await Peserta.update(id, { nama_peserta, asal, kategori, jenis_kelamin, agama });
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Peserta tidak ditemukan" });
    }
    res.json({ message: "Peserta berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePeserta = async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await Peserta.delete(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Peserta tidak ditemukan" });
    }
    res.json({ message: "Peserta berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchPeserta = async (req, res) => {
  const { nama } = req.query;

  try {
    const peserta = await Peserta.findByName(nama);
    res.json(peserta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPeserta,
  getAllPeserta,
  getPesertaById,
  updatePeserta,
  deletePeserta,
  searchPeserta,
  importParticipants,
};
