const API_BASE_URL = 'https://notes-api.dicoding.dev/v2';
const notes = [];

const fetchNotes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
};

const createNote = async (title, body) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error creating note:', error);
  }
};

const deleteNote = async (id) => {
  try {
    await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting note:', error);
  }
};

export { fetchNotes, createNote, deleteNote };
