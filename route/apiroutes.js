const router = require("express").Router();
const storage = require("../db/storage");

router.get("/notes", (req, res) => {
  storage
    .getNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.json(err));
});
router.post("/notes", (req, res) => {
  storage
    .addNote(req.body)
    .then((notes) => res.json(notes))
    .catch((err) => res.json(err));
});
router.delete("/notes/:id", (req, res) => {
  storage
    .removeNotes(req.params.id)
    .then(() =>
      res.json({
        ok: true,
      })
    )
    .catch((err) => res.json(err));
});

module.exports = router;
