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
  const statusEl = document.getElementById("note-status");
  const submitBtn = form ? form.querySelector(".note-submit") : null;

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

  // Returns true only if the write actually reached storage.
  const saveNotes = (notes) => {
    if (!safeLocalStorage) return false;
    try {
      safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      return true;
    } catch (err) {
      console.warn("Failed to save notes:", err);
      return false;
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
    if (!trimmedTitle || !trimmedBody) return null;

    const note = {
      id: `note-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      title: trimmedTitle,
      body: trimmedBody,
      createdAt: new Date().toISOString(),
    };

    notes.unshift(note);
    const persisted = saveNotes(notes);
    renderNotes();
    // The note is always in this session's list; `persisted` says whether it survives a reload.
    return { persisted };
  };

  const deleteNote = (id) => {
    notes = notes.filter((note) => note.id !== id);
    saveNotes(notes);
    renderNotes();
  };

  if (form) {
    let saving = false;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (saving) return;

      const title = titleInput.value;
      const body = bodyInput.value;
      if (!title.trim() || !body.trim()) return;

      const loader = window.TermLoader;
      if (!loader || !statusEl) {
        addNote(title, body);
        form.reset();
        titleInput.focus();
        return;
      }

      // localStorage is synchronous, so hold the spinner briefly (minMs) so the
      // write is visible as a terminal-style "writing -> OK" sequence.
      saving = true;
      let added = false;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute("aria-busy", "true");
      }
      // Lock the fields for the duration so nothing typed after submit is lost by the
      // reset below (readOnly, not disabled, so focus and caret stay put).
      titleInput.readOnly = true;
      bodyInput.readOnly = true;
      try {
        await loader.wrap(
          statusEl,
          () => {
            const result = addNote(title, body);
            added = !!result;
            if (!result) throw new Error("nothing to save");
            if (!result.persisted) {
              throw new Error("couldn't write to storage, note kept for this session only");
            }
          },
          { label: "writing note", doneLabel: `saved "${title.trim().slice(0, 40)}"`, minMs: 450 }
        );
      } catch (err) {
        // wrap() already printed [FAIL]. If storage rejected the write the note still
        // exists in this session's list, so clear the form either way.
      } finally {
        titleInput.readOnly = false;
        bodyInput.readOnly = false;
        if (added) form.reset();
        saving = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.removeAttribute("aria-busy");
        }
        titleInput.focus();
      }
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

