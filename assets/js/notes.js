// assets/js/notes.js
// Client-side notes for /notes/ page using localStorage

(function () {
  const app = document.getElementById("notes-app");
  if (!app || typeof window === "undefined") return;

  const STORAGE_KEY = "jamielab-notes-v1";

  const form = document.getElementById("note-form");
  const titleInput = document.getElementById("note-title");
  const bodyInput = document.getElementById("note-body");
  const listEl = document.getElementById("notes-list");
  const emptyEl = document.getElementById("notes-empty");
  const countEl = document.getElementById("note-count");

  const safeLocalStorage = (() => {
    try {
      const testKey = "__notes_test__";
      localStorage.setItem(testKey, "1");
      localStorage.removeItem(testKey);
      return localStorage;
    } catch (err) {
      console.warn("LocalStorage unavailable:", err);
      return null;
    }
  })();

  const loadNotes = () => {
    if (!safeLocalStorage) return [];
    try {
      const stored = safeLocalStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.warn("Failed to parse stored notes:", err);
      return [];
    }
  };

  const saveNotes = (notes) => {
    if (!safeLocalStorage) return;
    try {
      safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (err) {
      console.warn("Failed to save notes:", err);
    }
  };

  let notes = loadNotes();

  const formatTimestamp = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  const renderNotes = () => {
    listEl.innerHTML = "";

    if (!notes.length) {
      emptyEl.style.display = "block";
      if (countEl) countEl.textContent = "0 saved";
      return;
    }

    emptyEl.style.display = "none";
    if (countEl) countEl.textContent = `${notes.length} saved`;

    notes.forEach((note) => {
      const card = document.createElement("article");
      card.className = "note-card";
      card.setAttribute("data-id", note.id);

      const header = document.createElement("div");
      header.className = "note-card-header";

      const title = document.createElement("div");
      title.className = "note-title";
      title.textContent = note.title || "Untitled";

      const meta = document.createElement("div");
      meta.className = "note-meta";
      meta.textContent = formatTimestamp(note.createdAt);

      header.appendChild(title);
      header.appendChild(meta);

      const body = document.createElement("div");
      body.className = "note-body";
      body.textContent = note.body || "";

      const actions = document.createElement("div");
      actions.className = "note-actions-row";

      const delButton = document.createElement("button");
      delButton.type = "button";
      delButton.className = "note-delete";
      delButton.setAttribute("data-id", note.id);
      delButton.textContent = "delete";

      actions.appendChild(delButton);

      card.appendChild(header);
      card.appendChild(body);
      card.appendChild(actions);

      listEl.appendChild(card);
    });
  };

  const addNote = (title, body) => {
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    if (!trimmedTitle || !trimmedBody) return;

    const note = {
      id: `note-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      title: trimmedTitle,
      body: trimmedBody,
      createdAt: new Date().toISOString(),
    };

    notes.unshift(note);
    saveNotes(notes);
    renderNotes();
  };

  const deleteNote = (id) => {
    notes = notes.filter((note) => note.id !== id);
    saveNotes(notes);
    renderNotes();
  };

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      addNote(titleInput.value, bodyInput.value);
      form.reset();
      titleInput.focus();
    });
  }

  if (listEl) {
    listEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.classList.contains("note-delete")) {
        const id = target.getAttribute("data-id");
        if (id) {
          deleteNote(id);
        }
      }
    });
  }

  renderNotes();
})();

