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
    `;

    const form = this.querySelector("#note-form");
    const titleInput = this.querySelector("#title");
    const bodyInput = this.querySelector("#body");
    const button = this.querySelector("button");

    form.addEventListener("input", () => {
      button.disabled = !(titleInput.value && bodyInput.value);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const newNote = {
        title: titleInput.value,
        body: bodyInput.value,
      };
      notes.push(newNote);
      document.querySelector("note-list").render();
      titleInput.value = "";
      bodyInput.value = "";
      button.disabled = true;
    });
  }
}

class NoteList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = notes
      .map(
        (note) => `
      <note-item title="${note.title}" body="${note.body}"></note-item>
    `
      )
      .join("");
  }
}

class NoteItem extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h2>${this.getAttribute("title")}</h2>
      <p>${this.getAttribute("body")}</p>
    `;
  }
}

customElements.define("app-bar", AppBar);
customElements.define("note-form", NoteForm);
customElements.define("note-list", NoteList);
customElements.define("note-item", NoteItem);
