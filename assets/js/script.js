(function () {
  const STORAGE_KEY = "tasks_app_v3";

  function loadTasks() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Gagal load JSON:", e);
      return [];
    }
  }

  function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  // Formatter tanggal Indonesia
  function formatTanggalIndonesia(tanggalString) {
    if (!tanggalString) return "-";
    const t = new Date(tanggalString);
    if (isNaN(t.getTime())) return tanggalString;

    const hari = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const bulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    return (
      hari[t.getDay()] +
      " " +
      t.getDate() +
      " " +
      bulan[t.getMonth()] +
      " " +
      t.getFullYear()
    );
  }

  if (loadTasks().length === 0) {
    const dummy = [
      {
        id: "1",
        namaPelajaran: "Nama Pelajaran",
        dosen: "Dosen",
        judulTugas: "Judul Tugas",
        tanggalDiberi: "1945-08-17",
        tanggalKumpul: "2077-01-01",
        catatan: "Contoh Tugas",
        prioritas: "sedang",
        estimasi: "1 semester",
        link: "",
        status: "aktif",
      },
    ];
    saveTasks(dummy);
  }

  window.TaskAPI = {
    getAll() {
      return loadTasks();
    },
    getById(id) {
      return loadTasks().find((t) => t.id == id);
    },
    add(task) {
      const tasks = loadTasks();
      tasks.push(task);
      saveTasks(tasks);
    },
    update(id, newData) {
      const tasks = loadTasks();
      const idx = tasks.findIndex((t) => t.id == id);
      if (idx !== -1) {
        tasks[idx] = { ...tasks[idx], ...newData };
        saveTasks(tasks);
      }
    },
    delete(id) {
      let tasks = loadTasks();
      tasks = tasks.filter((t) => t.id != id);
      saveTasks(tasks);
    },
  };

  window.markDone = function (id) {
    const t = TaskAPI.getById(id);
    if (!t) return;
    TaskAPI.update(id, { status: t.status === "aktif" ? "selesai" : "aktif" });
    location.reload();
  };

  window.deleteTask = function (id) {
    if (confirm("Yakin ingin menghapus?")) {
      TaskAPI.delete(id);
      location.reload();
    }
  };

  // Daftar tugas
  if (document.getElementById("taskList")) {
    const list = document.getElementById("taskList");
    const noTaskMessage = document.getElementById("noTaskMessage");
    const tasks = TaskAPI.getAll();

    if (tasks.length === 0) {
      noTaskMessage.style.display = "block";
      list.innerHTML = "";
    } else {
      noTaskMessage.style.display = "none";

      list.innerHTML = tasks
        .map((t) => {
          let prioClass = "";
          if (t.prioritas === "rendah") prioClass = "prio-rendah";
          if (t.prioritas === "sedang") prioClass = "prio-sedang";
          if (t.prioritas === "tinggi") prioClass = "prio-tinggi";

          const statusIcon = t.status === "selesai" ? "✔️" : "⚡";
          const doneStyle =
            t.status === "selesai"
              ? "style='background:#d9d9d9;opacity:0.7;'"
              : "";

          return `
            <div class="task-card ${prioClass}" ${doneStyle}>
              <div class="task-info">
                <div class="task-title">${statusIcon} ${t.judulTugas}</div>
                <div class="task-meta">📘 ${t.namaPelajaran}</div>
                <div class="task-meta">⏳ Deadline: ${formatTanggalIndonesia(
                  t.tanggalKumpul
                )}</div>
                <div class="task-meta">📌 Status: ${t.status}</div>
              </div>
    
              <div class="actions">
                <button class="icon-btn" onclick="location.href='detail.html?id=${
                  t.id
                }'">📄 Detail</button>
                <button class="icon-btn green" onclick="markDone('${t.id}')">
                  ${t.status === "aktif" ? "✔️ Selesai" : "♻️ Aktifkan"}
                </button>
                <button class="icon-btn red" onclick="deleteTask('${
                  t.id
                }')">🗑️ Hapus</button>
              </div>
            </div>
          `;
        })
        .join("");
    }
  }

  // Tambah tugas
  if (document.getElementById("taskForm")) {
    const form = document.getElementById("taskForm");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const task = {
        id: Date.now().toString(),
        namaPelajaran: document.getElementById("subject").value,
        dosen: document.getElementById("lecturer").value,
        judulTugas: document.getElementById("title").value,
        tanggalDiberi: document.getElementById("givenDate").value,
        tanggalKumpul: document.getElementById("deadline").value,
        catatan: document.getElementById("notes").value,
        prioritas: document.getElementById("priority").value,
        estimasi: document.getElementById("estimate").value,
        link: document.getElementById("reference").value,
        status: "aktif",
      };

      TaskAPI.add(task);
      location.href = "index.html";
    });
  }

  // Detail tugas
  if (document.getElementById("detailTitle")) {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const t = TaskAPI.getById(id);

    if (t) {
      document.getElementById("detailSubject").textContent = t.namaPelajaran;
      document.getElementById("detailLecturer").textContent = t.dosen || "-";
      document.getElementById("detailTitle").textContent = t.judulTugas;
      document.getElementById("detailGiven").textContent =
        formatTanggalIndonesia(t.tanggalDiberi);
      document.getElementById("detailDeadline").textContent =
        formatTanggalIndonesia(t.tanggalKumpul);
      document.getElementById("detailPriority").textContent = t.prioritas;
      document.getElementById("detailEstimate").textContent = t.estimasi || "-";

      const ref = document.getElementById("detailReference");
      if (t.link) {
        ref.textContent = t.link;
        ref.href = t.link;
      } else {
        ref.textContent = "-";
        ref.removeAttribute("href");
      }

      const statusBox = document.getElementById("detailStatus");
      statusBox.textContent = t.status;
      if (t.status === "selesai") statusBox.classList.add("status-done");

      document.getElementById("detailNotes").textContent = t.catatan || "-";
    }
  }
})();
