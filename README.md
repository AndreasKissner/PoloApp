# PollApp

Eine Angular-Applikation zum Erstellen und Verwalten von Umfragen.

---

## Starten

```bash
npm install
npm run dev
```

Die App läuft dann unter `http://localhost:4200`.

---

## Features

- Umfragen erstellen, ansehen und löschen
- Umfragen filtern und sortieren
- Umfragen ausfüllen und Ergebnisse einsehen
- Zwei Darstellungsmodi für Umfragekarten (groß / klein)

---

## Projektstruktur

```
src/
├── app/
│   ├── features/
│   │   ├── home/                     # Startseite mit Umfrageübersicht
│   │   │   ├── hero-illustration/    # Hero-Bereich (Illustration + CTA)
│   │   │   ├── survey-card-large/    # Große Umfragekarte
│   │   │   ├── survey-card-small/    # Kleine Umfragekarte
│   │   │   ├── survey-filter/        # Filterkomponente
│   │   │   └── survey-sort/          # Sortierkomponente
│   │   ├── new-survey/               # Neue Umfrage erstellen
│   │   │   └── survey-question/      # Einzelne Frage innerhalb der Erstellungsmaske
│   │   └── survey-detail/            # Detailansicht einer Umfrage
│   │       ├── survey-form/          # Umfrage ausfüllen
│   │       └── survey-results/       # Ergebnisse einer Umfrage
│   ├── models/
│   │   └── survey.model.ts           # TypeScript-Interfaces für Umfragen
│   ├── services/
│   │   ├── supabase.service.ts       # Datenbankzugriff via Supabase
│   │   └── favicon.service.ts        # Dynamisches Favicon-Management
│   ├── shared/
│   │   ├── header/                   # App-weiter Header
│   │   ├── ui-button/                # Wiederverwendbarer Button
│   │   └── delete-btn/               # Lösch-Button
│   ├── utils/
│   │   └── survey-utils.ts           # Hilfsfunktionen für Umfragen
│   ├── app.routes.ts                 # Routing-Konfiguration
│   └── app.config.ts                 # App-Konfiguration
├── styles/
│   ├── abstracts/                    # SCSS-Variablen, Mixins, Funktionen, Farben, Typografie
│   └── base/                         # Reset und globale Styles
└── styles.scss                       # Globaler SCSS-Einstiegspunkt
```

---

## Technologien

| Technologie | Verwendung |
|---|---|
| Angular 21 | Framework |
| TypeScript | Sprache |
| SCSS + BEM | Styling |
| Supabase | Backend / Datenbank |
| WCAG | Barrierefreiheitsstandard |

---

## Build

```bash
npm run build
```

Output landet im `dist/`-Ordner.
