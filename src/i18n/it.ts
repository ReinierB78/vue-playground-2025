// src/i18n/it.ts
export default {
  widgets: {
    joke: {
      title: 'Lasciami raccontarti una barzelletta',
      jokeTypes: {
        single: 'Singola',
        twopart: 'In due parti'
      },
      refresh: "Un'altra"
    },
    todo: {
      title: 'La mia lista di cose da fare',
      addTask: 'Aggiungi attività',
      placeholder: "Cosa c'è da fare?",
      empty: 'Non hai attività per oggi! 🎉',
      descriptionPlaceholder: "Descrizione di cosa c'è da fare"
    }
  },
  contactForm: {
    title: 'Contattaci',
    name: {
      label: 'Nome',
      placeholder: 'Il tuo nome'
    },
    email: {
      label: 'Indirizzo email',
      placeholder: 'Inserisci un indirizzo email valido'
    },
    reason: {
      label: 'Motivo del contatto',
      placeholder: 'Seleziona il motivo',
      options: ['Generale', 'Richiesta di vendita', 'Assistenza']
    },
    message: {
      label: 'Messaggio',
      placeholder: 'Fornisci qualche dettaglio in anticipo sul motivo del tuo contatto'
    }
  },
  message: {
    hello: 'Ciao',
    welcome: 'Benvenuto su {appName}',
    routes: {
      home: 'Radico',
      about: 'Chi siamo',
      contact: 'Contatti',
      buyProduct: 'Compra prodotto',
      search: 'Cherco'
    },
    footer: {
      solutions: 'Soluzioni',
      support: 'Supporto',
      contact: 'Contatti'
    }
  }
}
