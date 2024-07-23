import { fetchNotes, createNote, deleteNote } from './data';

class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Notes App</h1>`;
  }
}

class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form id="note-form">
        <input type="text" id="title" placeholder="Title" required>
        <textarea id="body" placeholder="Body" required></textarea>
        <button type="submit" disabled>Add Note</button>
      </form>
      <div id="loading" class="hidden">Loading...</div>
    `;

    const form = this.querySelector('#note-form');
    const titleInput = this.querySelector('#title');
    const bodyInput = this.querySelector('#body');
    const button = this.querySelector('button');
    const loading = this.querySelector('#loading');

    form.addEventListener('input', () => {
      button.disabled = !(titleInput.value && bodyInput.value);
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      loading.classList.remove('hidden');
      await createNote(titleInput.value, bodyInput.value);
      loading.classList.add('hidden');
      document.querySelector('note-list').render();
      titleInput.value = '';
      bodyInput.value = '';
      button.disabled = true;
    });
  }
}

class NoteList extends HTMLElement {
  async connectedCallback() {
    this.render();
  }

  async render() {
    const notes = await fetchNotes();
    this.innerHTML = notes
      .map(
        (note) => `
      <note-item title="${note.title}" body="${note.body}" id="${note.id}"></note-item>
    `,
      )
      .join('');
  }
}

class NoteItem extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h2>${this.getAttribute('title')}</h2>
      <p>${this.getAttribute('body')}</p>
      <button>Delete</button>
    `;

    const button = this.querySelector('button');
    button.addEventListener('click', async () => {
      await deleteNote(this.getAttribute('id'));
      document.querySelector('note-list').render();
    });
  }
}

customElements.define('app-bar', AppBar);
customElements.define('note-form', NoteForm);
customElements.define('note-list', NoteList);
customElements.define('note-item', NoteItem);
