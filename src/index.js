import './css/styles.css';
import './js/data.js';
import './js/components.js';
import { addNoteItemAnimation } from './js/animations';

const fetchNotes = async () => {
  try {
    const response = await fetch('https://notes-api.dicoding.dev/v2/notes');

    if (!response.ok) {
      throw new Error('Gagal mengambil data catatan');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    alert(error.message);
    return [];
  }
};

const displayNotes = (notes) => {
  const noteListElement = document.querySelector('note-list');

  if (!noteListElement) {
    console.error('Elemen note-list tidak ditemukan.');
    return;
  }

  noteListElement.notes = notes;
  addNoteItemAnimation(); // Panggil fungsi animasi setelah catatan ditampilkan
};

const initializeApp = async () => {
  const notes = await fetchNotes();
  displayNotes(notes);
};

initializeApp();
