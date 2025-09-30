const express = require("express");
const { body } = require("express-validator");
const { authenticateToken } = require("../middleware/auth");
const {
  createAcara,
  getAllAcara,
  getAcaraById,
  updateAcara,
  deleteAcara,
  getAcaraByMonth,
} = require("../controllers/acaraController");
const router = express.Router();

// Create Acara
router.post(
  "/",
  authenticateToken,
  [
    body("nama_acara").notEmpty().withMessage("Nama acara harus diisi"),
    body("tanggal_mulai").notEmpty().withMessage("Tanggal mulai harus diisi"),
    body("tanggal_selesai").notEmpty().withMessage("Tanggal selesai harus diisi"),
    body("lokasi").notEmpty().withMessage("Lokasi harus diisi"),
    body("status_acara")
      .isIn(["scheduled", "ongoing", "completed", "canceled"])
      .withMessage("Status acara tidak valid"),
  ],
  createAcara
);

// Get All Acara
router.get("/", authenticateToken, getAllAcara);

// Get Acara by ID
router.get("/:id", authenticateToken, getAcaraById);

// Update Acara
router.put(
  "/:id",
  authenticateToken,
  [
    body("nama_acara").optional().notEmpty().withMessage("Nama acara harus diisi"),
    body("tanggal_mulai").optional().notEmpty().withMessage("Tanggal mulai harus diisi"),
    body("tanggal_selesai").optional().notEmpty().withMessage("Tanggal selesai harus diisi"),
    body("lokasi").optional().notEmpty().withMessage("Lokasi harus diisi"),
    body("status_acara")
      .optional()
      .isIn(["scheduled", "ongoing", "completed", "canceled"])
      .withMessage("Status acara tidak valid"),
  ],
  updateAcara
);

// Delete Acara
router.delete("/:id", authenticateToken, deleteAcara);

// Get Acara by Month
router.get("/month/:year/:month", authenticateToken, getAcaraByMonth);

module.exports = router;
