import { storageService } from "../../../services/storageService.js";
import { utilService } from "../../../services/utilService.js";

export const keepService = {
   query,
   addNote,
   removeNote,
   getNoteById,
   saveNotesToStorage,
   clearKeepStorage,
}

var notes
const STORAGE_KEY = 'keepDB'
_createNotes()

function query() {
   return Promise.resolve(notes)
}

function getNoteById(noteId) {
   const note = notes.find(note => note.id === noteId);
   return Promise.resolve(note)
}

function addNote() {
   notes.unshift(_createNote())
   saveNotesToStorage()
   return Promise.resolve()
}

function removeNote(noteId) {
   notes = notes.filter(note => note.id !== noteId);
   saveNotesToStorage()
   return Promise.resolve()
}

function clearKeepStorage() {
   storageService.clear(STORAGE_KEY)
}

function saveNotesToStorage() {
   storageService.save(STORAGE_KEY, notes)
}

function _createNote() {
   return {
      id: utilService.makeId(),
      type: "",
      isPinned: false,
      createdAt: Date.now(),
      info: {
         title: "",
         txt: "",
         url: '',
         items: []
      },
      style: {
         bgc: utilService.randomColor()
      }
   }
}

function _createNotes() {
   notes = storageService.load(STORAGE_KEY);
   if (!notes || !notes.length) {
      notes = _getDemoNotes()
      saveNotesToStorage();
   }
}

function _getDemoNotes() {
   const _notes = [{
      id: 'demo_id_1',
      type: "text",
      isPinned: false,
      createdAt: Date.now(),
      info: {
         title: "asd",
         txt: "Fullstack Me Baby!"
      },
      style: {
         bgc: "#FDCFE8"
      }
   },
   {
      id: 'demo_id_2',
      type: "image",
      isPinned: true,
      createdAt: Date.now(),
      info: {
         url: "https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg",
         title: "Me playing Mi"
      },
      style: {
         bgc: "#CCFF90"
      }
   },
   {
      id: 'demo_id_3',
      type: "list",
      isPinned: true,
      createdAt: Date.now(),
      info: {
         title: "What to buy:",
         items: [
            { txt: "Milk", isChecked: true },
            { txt: "Bread", isChecked: false },
            { txt: "Cheese", isChecked: true },
            { txt: "Eggs", isChecked: false }
         ]
      },
      style: {
         bgc: "#FFF475"
      }
   }];
   return _notes;
}