const express = require("express");
const { body } = require("express-validator");
const { authenticateToken } = require("../middleware/auth");
const {
  createAbsensi,
  getAbsensiByAcara,
  getStatisticsByAcara,
  getMonthlyStatistics,
} = require("../controllers/absensiController");
const router = express.Router();

// Create Absensi
router.post(
  "/",
  authenticateToken,
  [
    body("id_acara").notEmpty().withMessage("ID acara harus diisi"),
    body("id_peserta").notEmpty().withMessage("ID peserta harus diisi"),
    body("status_kehadiran")
      .isIn(["Hadir", "Terlambat", "Izin", "Sakit", "Alfa"])
      .withMessage("Status kehadiran tidak valid"),
  ],
  createAbsensi
);

// Get Absensi by Acara
router.get("/acara/:id_acara", authenticateToken, getAbsensiByAcara);

// Get Statistics by Acara
router.get("/statistics/acara/:id_acara", authenticateToken, getStatisticsByAcara);

// Get Monthly Statistics
router.get("/statistics/month/:year/:month", authenticateToken, getMonthlyStatistics);

module.exports = router;
