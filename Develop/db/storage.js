const util = require("util");
const fs = require("fs");
const uuidv1 = require("uuid/v1");
const readFileASync = util.promisify(fs.readFile);
const writeFileASync = util.promisify(fs.writeFile);

class Storage {
  read() {
    return readFileASync("db/db.json", "utf8");
  }
  write(note) {
    return writeFileASync("db/db.json", JSON.stringify(note));
  }
  getNotes() {
    return this.read().then((notes) => {
      let addedNotes;
      try {
        addedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        addedNotes = [];
      }
      return addedNotes;
    });
  }
  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("title and text cannot be blank!");
    }
    const newNote = { title, text, id: uuidv1() };
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNote) => this.write(updatedNote))
      .then(() => newNote);
  }
  removeNotes(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new Storage();
