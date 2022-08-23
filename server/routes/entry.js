const express = require("express")
const router = express.Router();
const {createEntry, fetchEntries, deleteEntries, updateEntry, searchEntry} = require("../controller/entry")
const isAuth = require("../middleware/isAuth")
// routes
// create entry
router.post("/create", isAuth, createEntry)
// fetch all entries
router.get("/fetch", isAuth ,fetchEntries)
// delete entry look at name of middleware
router.delete("/delete/:id", isAuth, deleteEntries)
// update entry
router.put("/update/:id", isAuth, updateEntry)
// search entries
router.get("/search" , isAuth, searchEntry)


module.exports = router