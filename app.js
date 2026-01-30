const modules = [
  {
    id: "start",
    label: "Start",
    enabled: true,
    context: ["Übersicht", "Workflows", "KPI-Dashboard", "Aktivitäten"],
  },
  {
    id: "daten",
    label: "Daten",
    enabled: true,
    context: [
      "Kinderdaten",
      "Vertragspartner",
      "Ärzte",
      "Schulen",
      "Weitere Adressen",
      "Dokumente",
    ],
  },
  {
    id: "beitraege",
    label: "Beiträge",
    enabled: true,
    context: ["Tarifreglemente", "Beitragsparameter", "Rabatte", "Sonderbeiträge"],
  },
  {
    id: "belegung",
    label: "Belegung",
    enabled: true,
    context: [
      "Wochenplan",
      "Tageslisten",
      "Gantt-Planung",
      "Auslastung",
      "Statistiken",
    ],
  },
  {
    id: "rechnungen",
    label: "Rechnungen/Zahlungen",
    enabled: true,
    context: ["Rechnungslauf", "PDF-Versand", "Zahlungskontrolle", "Salden"],
  },
  {
    id: "listen",
    label: "Listen",
    enabled: true,
    context: ["Standardlisten", "Flexible Listen", "Exportcenter"],
  },
  {
    id: "formulare",
    label: "Formulare",
    enabled: true,
    context: ["Vorlagen", "Generator", "Briefpapier"],
  },
  {
    id: "kommunikation",
    label: "Kommunikation",
    enabled: true,
    context: ["E-Mail Modul", "Briefe", "Gespräche"],
  },
  {
    id: "personal",
    label: "Personal",
    enabled: true,
    context: ["Personalstamm", "Arbeitspläne", "Zeitkonten"],
  },
  {
    id: "planung",
    label: "Planung",
    enabled: true,
    context: ["Szenarien", "Warteliste", "Planungsjournal"],
  },
  {
    id: "buchhaltung",
    label: "Buchhaltung",
    enabled: true,
    context: ["Journal", "Kontenplan", "Bilanz/ER", "Exporte"],
  },
  {
    id: "debitoren",
    label: "Debitoren/Mahnwesen",
    enabled: true,
    context: ["Offene Posten", "Mahnstufen", "Korrekturen"],
  },
  {
    id: "admin",
    label: "Admin/System",
    enabled: true,
    context: ["Benutzer & Rollen", "Module", "Institution", "Audit-Log"],
  },
];

const moduleState = new Map(modules.map((module) => [module.id, module.enabled]));
let activeModule = "start";

const topnav = document.getElementById("topnav");
const contextMenu = document.getElementById("context-menu");
const main = document.getElementById("main");
const moduleTitle = document.getElementById("module-title");

function renderTopnav() {
  topnav.innerHTML = "";
  modules
    .filter((module) => moduleState.get(module.id))
    .forEach((module) => {
      const button = document.createElement("button");
      button.textContent = module.label;
      button.className = module.id === activeModule ? "active" : "";
      button.addEventListener("click", () => setActiveModule(module.id));
      topnav.appendChild(button);
    });
}

function renderContextMenu() {
  const active = modules.find((module) => module.id === activeModule);
  moduleTitle.textContent = active.label;
  contextMenu.innerHTML = "";
  active.context.forEach((item) => {
    const button = document.createElement("button");
    button.textContent = item;
    contextMenu.appendChild(button);
  });
}

function renderMain() {
  main.innerHTML = "";
  if (activeModule === "start") {
    renderStart();
  } else if (activeModule === "admin") {
    renderAdmin();
  } else {
    renderModuleOverview();
  }
}

function renderStart() {
  main.appendChild(createSection("Schnellzugriff", "Die wichtigsten Workflows in maximal 3 Klicks."));
  main.querySelector(".section:last-child").appendChild(
    buildCardGrid([
      {
        title: "Kind anlegen",
        description: "Stammdaten, Vertragspartner, Belegung und Tarifparameter in einem Flow.",
        badge: "Workflow",
      },
      {
        title: "Rechnungslauf starten",
        description: "Automatische Monatsrechnung, PDF-Export & E-Mail-Versand.",
        badge: "Automatik",
      },
      {
        title: "Belegung auswerten",
        description: "Tages-/Monatsplan, Auslastung, subventionierte Plätze.",
        badge: "Auslastung",
      },
      {
        title: "Serienmail senden",
        description: "Empfänger filtern, Vorlage wählen, Versand archivieren.",
        badge: "Kommunikation",
      },
    ])
  );

  main.appendChild(createSection("Aktueller Status", "Alles auf einen Blick – ohne Doppelerfassung."));
  const statusSection = main.querySelector(".section:last-child");
  statusSection.appendChild(
    buildCardGrid([
      {
        title: "Belegung heute",
        description: "32 Kinder | 5 Babyplätze | 3 Plätze frei",
        badge: "Live",
      },
      {
        title: "Rechnungslauf",
        description: "September 2024 bereit zum Start",
        badge: "Bereit",
        badgeClass: "success",
      },
      {
        title: "Offene Mahnungen",
        description: "4 Vertragspartner mit Mahnstufe 1",
        badge: "Aktion",
        badgeClass: "warning",
      },
    ])
  );

  main.appendChild(createSection("Letzte Aktivitäten", "Alle Änderungen sind protokolliert."));
  const activitySection = main.querySelector(".section:last-child");
  activitySection.appendChild(buildActivityTable());
}

function renderModuleOverview() {
  const active = modules.find((module) => module.id === activeModule);
  main.appendChild(
    createSection(
      `${active.label} – Übersicht`,
      "Einheitliche Tabellen, schnelle Aktionen und klare Status-Badges."
    )
  );

  const section = main.querySelector(".section:last-child");
  section.appendChild(buildToolbar());
  section.appendChild(buildDataTable(active.label));

  main.appendChild(
    createSection(
      "Quick-Actions",
      "Jede Seite hat + Neu, Import/Export und Favoriten."
    )
  );
  const quickSection = main.querySelector(".section:last-child");
  quickSection.appendChild(
    buildCardGrid([
      {
        title: "+ Neu",
        description: "Sofort ein neues Objekt anlegen (Kind, Vertrag, Rechnung).",
        badge: "Aktion",
      },
      {
        title: "Export",
        description: "PDF/Excel mit einem Klick – ideal für Gemeinde & Träger.",
        badge: "Export",
      },
      {
        title: "Notizen",
        description: "Interne Notizen, Aufgaben und Follow-ups pro Datensatz.",
        badge: "Team",
      },
      {
        title: "Dokumente",
        description: "Versionen, Tags, Ablaufdatum – alles am Datensatz.",
        badge: "DMS",
      },
    ])
  );
}

function renderAdmin() {
  main.appendChild(
    createSection(
      "Module ein-/ausblenden",
      "Aktivieren Sie nur die Funktionen, die Ihre Einrichtung braucht."
    )
  );

  const moduleSection = main.querySelector(".section:last-child");
  moduleSection.appendChild(buildModuleToggles());

  main.appendChild(
    createSection(
      "Rollen & Rechte (RBAC)",
      "Lesen, Schreiben, Löschen, Export – alles pro Rolle steuerbar."
    )
  );
  const roleSection = main.querySelector(".section:last-child");
  roleSection.appendChild(buildPermissionGrid());

  main.appendChild(
    createSection(
      "System-Status",
      "PWA, Offline-Cache und Protokollierung immer im Blick."
    )
  );

  const systemSection = main.querySelector(".section:last-child");
  systemSection.appendChild(
    buildCardGrid([
      {
        title: "PWA installiert",
        description: "Desktop, Android und iOS sind bereit.",
        badge: "Installiert",
        badgeClass: "success",
      },
      {
        title: "Offline-Cache",
        description: "Zuletzt geöffnete Listen sind offline verfügbar.",
        badge: "Cache",
      },
      {
        title: "Audit-Log",
        description: "Änderungen werden automatisch protokolliert.",
        badge: "DSGVO",
      },
    ])
  );
}

function createSection(title, subtitle) {
  const section = document.createElement("section");
  section.className = "section";
  const heading = document.createElement("div");
  heading.innerHTML = `<h3>${title}</h3><p class="muted">${subtitle}</p>`;
  section.appendChild(heading);
  return section;
}

function buildCardGrid(cards) {
  const grid = document.createElement("div");
  grid.className = "card-grid";
  cards.forEach((card) => {
    const item = document.createElement("div");
    item.className = "card";
    const badgeClass = card.badgeClass ? `badge ${card.badgeClass}` : "badge";
    item.innerHTML = `
      <span class="${badgeClass}">${card.badge}</span>
      <h4>${card.title}</h4>
      <p class="muted">${card.description}</p>
    `;
    grid.appendChild(item);
  });
  return grid;
}

function buildToolbar() {
  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";
  toolbar.innerHTML = `
    <div class="search">
      <input type="text" placeholder="Suche" />
      <select>
        <option>Filter</option>
        <option>Status: aktiv</option>
        <option>Status: warteliste</option>
        <option>Status: archiv</option>
      </select>
      <button>Spalten</button>
    </div>
    <div class="search">
      <button class="ghost">PDF</button>
      <button class="ghost">Excel</button>
      <button class="primary">+ Neu</button>
    </div>
  `;
  return toolbar;
}

function buildDataTable(title) {
  const table = document.createElement("table");
  table.className = "table";
  table.innerHTML = `
    <thead>
      <tr>
        <th>${title}</th>
        <th>Status</th>
        <th>Letzte Änderung</th>
        <th>Aktionen</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Beispieldatensatz A</td>
        <td><span class="badge success">Aktiv</span></td>
        <td>Heute, 09:14</td>
        <td>
          <div class="table-actions">
            <button>Bearbeiten</button>
            <button>Notizen</button>
            <button>Dokumente</button>
          </div>
        </td>
      </tr>
      <tr>
        <td>Beispieldatensatz B</td>
        <td><span class="badge warning">Warteliste</span></td>
        <td>Gestern, 16:22</td>
        <td>
          <div class="table-actions">
            <button>Bearbeiten</button>
            <button>Archivieren</button>
            <button>Export</button>
          </div>
        </td>
      </tr>
      <tr>
        <td>Beispieldatensatz C</td>
        <td><span class="badge">Archiv</span></td>
        <td>12.09.2024</td>
        <td>
          <div class="table-actions">
            <button>Bearbeiten</button>
            <button>Notizen</button>
            <button>Dokumente</button>
          </div>
        </td>
      </tr>
    </tbody>
  `;
  return table;
}

function buildActivityTable() {
  const table = document.createElement("table");
  table.className = "table";
  table.innerHTML = `
    <thead>
      <tr>
        <th>Aktion</th>
        <th>Modul</th>
        <th>Person</th>
        <th>Zeit</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Belegung angepasst</td>
        <td>Belegung</td>
        <td>Leitung</td>
        <td>Heute, 08:42</td>
      </tr>
      <tr>
        <td>Rechnungslauf vorbereitet</td>
        <td>Rechnungen/Zahlungen</td>
        <td>Office</td>
        <td>Gestern, 17:03</td>
      </tr>
      <tr>
        <td>Serienbrief gesendet</td>
        <td>Kommunikation</td>
        <td>Gruppenleitung</td>
        <td>Gestern, 14:18</td>
      </tr>
    </tbody>
  `;
  return table;
}

function buildModuleToggles() {
  const container = document.createElement("div");
  container.className = "toggle-list";
  modules
    .filter((module) => module.id !== "start")
    .forEach((module) => {
      const item = document.createElement("div");
      item.className = "toggle-item";
      item.innerHTML = `
        <div>
          <strong>${module.label}</strong>
          <p class="muted">${module.context[0]}</p>
        </div>
      `;
      const toggle = document.createElement("input");
      toggle.type = "checkbox";
      toggle.checked = moduleState.get(module.id);
      toggle.addEventListener("change", () => {
        moduleState.set(module.id, toggle.checked);
        if (!toggle.checked && activeModule === module.id) {
          activeModule = "start";
        }
        renderAll();
      });
      item.appendChild(toggle);
      container.appendChild(item);
    });
  return container;
}

function buildPermissionGrid() {
  const grid = document.createElement("div");
  grid.className = "permission-grid";
  const roles = [
    "Leitung/Admin",
    "Gruppenleitung",
    "Sachbearbeitung",
    "Treuhand",
    "Gemeinde",
    "Read-only",
  ];
  const rights = [
    "Stammdaten",
    "Belegung",
    "Rechnungen",
    "Buchhaltung",
    "Exporte",
  ];

  grid.appendChild(headerCell("Modul"));
  roles.forEach((role) => grid.appendChild(headerCell(role)));

  rights.forEach((right) => {
    grid.appendChild(cell(right));
    roles.forEach((role) => {
      const isFull = role === "Leitung/Admin";
      const isReadOnly = role === "Read-only";
      const label = isFull ? "Lesen • Schreiben • Löschen" : isReadOnly ? "Nur lesen" : "Lesen • Schreiben";
      grid.appendChild(cell(label));
    });
  });

  return grid;
}

function headerCell(text) {
  const div = document.createElement("div");
  div.className = "header";
  div.textContent = text;
  return div;
}

function cell(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div;
}

function setActiveModule(id) {
  activeModule = id;
  renderAll();
}

function renderAll() {
  renderTopnav();
  renderContextMenu();
  renderMain();
}

renderAll();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {
      // Silent fail for demo
    });
  });
}
