const express = require("express");
const { body } = require("express-validator");
const { authenticateToken } = require("../middleware/auth");
const { createPeserta, getAllPeserta, getPesertaById, updatePeserta, deletePeserta, searchPeserta, importParticipants } = require("../controllers/pesertaController");
const router = express.Router();

// Create Peserta
router.post("/", authenticateToken, [body("nama_peserta").notEmpty().withMessage("Nama peserta harus diisi")], createPeserta);

// Create Peserta with importt
router.post("/import", authenticateToken, importParticipants);

// Get All Peserta
router.get("/", authenticateToken, getAllPeserta);

// Get Peserta by ID
router.get("/:id", authenticateToken, getPesertaById);

// Update Peserta
router.put("/:id", authenticateToken, [body("nama_peserta").optional().notEmpty().withMessage("Nama peserta harus diisi")], updatePeserta);

// Delete Peserta
router.delete("/:id", authenticateToken, deletePeserta);

// Search Peserta by name
router.get("/search", authenticateToken, searchPeserta);

module.exports = router;
