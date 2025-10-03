# 🎯 DevTask Manager

Un task manager Kanban moderno e intuitivo per gestire le tue attività di sviluppo con stile.

## ✨ Caratteristiche

- **📋 Board Kanban a 4 colonne**: Backlog, In Progress, Review e Done
- **🎨 Priorità visive**: Distingui immediatamente le task critiche da quelle meno urgenti
- **🔍 Ricerca in tempo reale**: Trova rapidamente task per titolo, descrizione o assegnatario
- **👥 Assegnazione task**: Assegna ogni task a un membro del team
- **💾 Persistenza locale**: I tuoi dati vengono salvati automaticamente nel browser
- **📱 Design responsive**: Funziona perfettamente su desktop e mobile
- **🎭 UI moderna**: Interfaccia pulita con animazioni fluide e feedback visivo

## 🚀 Come iniziare

1. **Clona il repository**
   ```bash
   git clone <url-repository>
   cd devtask-manager
   ```

2. **Apri il progetto**
   - Basta aprire `index.html` nel tuo browser
   - Non servono installazioni o build!

3. **Inizia a creare task**
   - Clicca su "Nuova Issue"
   - Compila il form con titolo, descrizione, assegnatario e priorità
   - La tua prima task apparirà nel Backlog

## 🎮 Utilizzo

### Creare una nuova task
1. Premi il bottone **"+ Nuova Issue"**
2. Compila i campi del form
3. Scegli la priorità (Critica, Alta, Media, Bassa)
4. Clicca su **"Crea Issue"**

### Spostare una task
- Ogni card ha un bottone **"Sposta →"** che la muove alla colonna successiva
- Le task seguono il flusso: Backlog → In Progress → Review → Done

### Eliminare una task
- Clicca sull'icona del cestino 🗑️ sulla card

### Cercare task
- Usa la barra di ricerca in alto per filtrare per titolo, descrizione o assegnatario

## 🎨 Stack Tecnologico

- **React 18** - Libreria UI
- **Tailwind CSS** - Styling utility-first
- **localStorage** - Persistenza dati lato client
- **Vanilla JavaScript** - Nessun build tool necessario!

## 📦 Struttura del Progetto

```
devtask-manager/
├── index.html          # Entry point dell'app
├── app.js             # Componente React principale
└── README.md          # Questo file!
```

## 🎯 Funzionalità in Dettaglio

### Sistema di Priorità
- **🔴 Critica**: Per bug bloccanti e task urgenti
- **🟡 Alta**: Task importanti da completare presto
- **🔵 Media**: Task standard del workflow
- **🟢 Bassa**: Nice to have e miglioramenti futuri

### Ordinamento Intelligente
Le task sono automaticamente ordinate per:
1. **Priorità** (Critica → Bassa)
2. **Data di creazione** (Meno recenti prima)

### Contatori in Tempo Reale
L'header mostra sempre il numero di task in ogni colonna, aiutandoti a visualizzare il carico di lavoro.

## 🛠️ Personalizzazione

Il codice è pensato per essere facilmente estendibile:

- **Aggiungi nuove colonne**: Modifica l'array `COLUMNS` in `app.js`
- **Cambia i colori**: Personalizza l'oggetto `PRIORITIES`
- **Aggiungi campi**: Estendi `formData` con nuove proprietà

## 📝 Note Tecniche

- I dati vengono salvati in `localStorage` con chiave `devtask_issues`
- Ogni task ha un ID univoco basato su timestamp
- Il sistema è completamente client-side, nessun backend richiesto

## 🤝 Contribuire

Sentiti libero di forkare il progetto e proporre miglioramenti! Alcune idee:
- Drag & drop tra colonne
- Filtri per priorità
- Export/Import dati
- Dark mode
- Statistiche e analytics

## 📄 Licenza

Questo progetto è open source e disponibile per uso personale e commerciale.

---

**Buon task management! 🚀**