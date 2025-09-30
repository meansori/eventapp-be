const Acara = require("../models/acaraModel");
const { validationResult } = require("express-validator");

// In your backend event controller
const createAcara = async (req, res) => {
  try {
    const { nama_acara, deskripsi, tanggal_mulai, tanggal_selesai, lokasi, status_acara, created_by } = req.body;

    // Validate required fields
    if (!nama_acara || !tanggal_mulai || !tanggal_selesai || !lokasi || !created_by) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create event
    const event = await Acara.create({
      nama_acara,
      deskripsi,
      tanggal_mulai,
      tanggal_selesai,
      lokasi,
      status_acara,
      created_by,
    });

    res.status(201).json({
      message: "Event created successfully",
      eventId: event.id_acara,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllAcara = async (req, res) => {
  try {
    const acara = await Acara.findAll();
    res.json(acara);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAcaraById = async (req, res) => {
  const { id } = req.params;

  try {
    const acara = await Acara.findById(id);
    if (!acara) {
      return res.status(404).json({ message: "Acara tidak ditemukan" });
    }
    res.json(acara);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAcara = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { nama_acara, deskripsi, tanggal_mulai, tanggal_selesai, lokasi, status_acara } = req.body;

  try {
    const affectedRows = await Acara.update(id, {
      nama_acara,
      deskripsi,
      tanggal_mulai,
      tanggal_selesai,
      lokasi,
      status_acara,
    });

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Acara tidak ditemukan" });
    }

    res.json({ message: "Acara berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAcara = async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await Acara.delete(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Acara tidak ditemukan" });
    }
    res.json({ message: "Acara berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAcaraByMonth = async (req, res) => {
  const { year, month } = req.params;

  try {
    const acara = await Acara.findByMonth(year, month);
    res.json(acara);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAcara,
  getAllAcara,
  getAcaraById,
  updateAcara,
  deleteAcara,
  getAcaraByMonth,
};
