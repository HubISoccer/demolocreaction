/* ============================================================
   Loc'Reaction VTC — store.js
   Données mockées + persistance localStorage
   ============================================================ */

const LR = {

  /* ─── Clés localStorage ─── */
  KEYS: {
    USERS:        'lr_users',
    RIDES:        'lr_rides',
    SESSION:      'lr_session',
    WALLETS:      'lr_wallets',
    NOTIFICATIONS:'lr_notifications',
    TARIFFS:      'lr_tariffs',
  },

  /* ─── Init : charge ou crée les données seed ─── */
  init() {
    if (!localStorage.getItem(this.KEYS.USERS)) {
      this._seed();
    }
  },

  _seed() {
    /* ── Utilisateurs ── */
    const users = [
      { id:'u1', role:'client',   prenom:'Sophie',  nom:'Martin',    email:'client@demo.com',  tel:'+33 6 12 34 56 78', password:'demo123', avatar:'SM', ville:'Paris', createdAt:'2025-01-15', actif:true },
      { id:'u2', role:'chauffeur',prenom:'Régine',  nom:'Gatibelza', email:'driver@demo.com',  tel:'+33 7 98 76 54 32', password:'demo123', avatar:'RG', ville:'Paris', createdAt:'2025-02-01', actif:true, voiture:'Mercedes Classe E', plaque:'AA-123-BB', note:4.9, coursesTotal:347, disponible:false },
      { id:'u3', role:'admin',    prenom:'Léonce',  nom:'Dossou-Yovo',email:'admin@demo.com', tel:'+33 6 55 44 33 22', password:'demo123', avatar:'LD', ville:'Paris', createdAt:'2025-01-01', actif:true },
      { id:'u4', role:'client',   prenom:'Marc',    nom:'Dupont',     email:'marc@demo.com',   tel:'+33 6 22 33 44 55', password:'demo123', avatar:'MD', ville:'Lyon',  createdAt:'2025-02-10', actif:true },
      { id:'u5', role:'chauffeur',prenom:'Karim',   nom:'Benzara',    email:'karim@demo.com',  tel:'+33 7 11 22 33 44', password:'demo123', avatar:'KB', ville:'Paris', createdAt:'2025-01-20', actif:true, voiture:'BMW Série 5', plaque:'CC-456-DD', note:4.7, coursesTotal:215, disponible:true },
      { id:'u6', role:'client',   prenom:'Amina',   nom:'Koné',       email:'amina@demo.com',  tel:'+33 6 77 88 99 00', password:'demo123', avatar:'AK', ville:'Paris', createdAt:'2025-03-05', actif:true },
    ];

    /* ── Wallets ── */
    const wallets = [
      { userId:'u1', solde:150.00, transactions:[
        { id:'t1', type:'credit',  montant:100, desc:'Rechargement Carte Visa', date:'2025-04-10', statut:'success' },
        { id:'t2', type:'debit',   montant:28.50, desc:'Course Bastille → CDG', date:'2025-04-12', statut:'success' },
        { id:'t3', type:'debit',   montant:12.00, desc:'Course Marais → Opera', date:'2025-04-13', statut:'success' },
        { id:'t4', type:'credit',  montant:50, desc:'Rechargement Apple Pay', date:'2025-04-14', statut:'success' },
        { id:'t5', type:'debit',   montant:35.00, desc:'Course Nation → La Défense', date:'2025-04-14', statut:'success' },
      ]},
      { userId:'u4', solde:80.00, transactions:[
        { id:'t6', type:'credit',  montant:100, desc:'Rechargement', date:'2025-04-08', statut:'success' },
        { id:'t7', type:'debit',   montant:20, desc:'Course', date:'2025-04-11', statut:'success' },
      ]},
      { userId:'u6', solde:200.00, transactions:[] },
    ];

    /* ── Courses ── */
    const rides = [
      { id:'r1', clientId:'u1', chauffeurId:'u2', depart:'Bastille, Paris', arrivee:'Aéroport CDG', statut:'termine', prix:28.50, duree:45, distance:28.3, date:'2025-04-12T08:30:00', noteClient:5, noteChauffeur:5, paiement:'wallet' },
      { id:'r2', clientId:'u1', chauffeurId:'u5', depart:'Marais, Paris', arrivee:'Opéra, Paris', statut:'termine', prix:12.00, duree:18, distance:4.2, date:'2025-04-13T14:15:00', noteClient:5, noteChauffeur:4, paiement:'wallet' },
      { id:'r3', clientId:'u1', chauffeurId:'u2', depart:'Nation, Paris', arrivee:'La Défense', statut:'termine', prix:35.00, duree:35, distance:18.5, date:'2025-04-14T09:00:00', noteClient:5, noteChauffeur:5, paiement:'wallet' },
      { id:'r4', clientId:'u4', chauffeurId:'u5', depart:'Lyon Centre', arrivee:'Aéroport LYS', statut:'termine', prix:45.00, duree:40, distance:22.0, date:'2025-04-10T06:00:00', noteClient:4, noteChauffeur:5, paiement:'carte' },
      { id:'r5', clientId:'u6', chauffeurId:'u2', depart:'Châtelet, Paris', arrivee:'Versailles', statut:'en_cours', prix:55.00, duree:50, distance:30.0, date:'2025-04-15T10:30:00', chauffeurLat:48.860, chauffeurLng:2.347, paiement:'wallet' },
      { id:'r6', clientId:'u1', chauffeurId:null, depart:'', arrivee:'', statut:'en_attente', prix:0, date:'2025-04-15T11:00:00', paiement:'wallet' },
    ];

    /* ── Tarifs ── */
    const tariffs = [
      { id:'z1', zone:'Paris Intra-muros',    prixBase:3.50, prixKm:1.50, prixMin:0.45, surcharge_nuit:1.3, surcharge_pointe:1.5 },
      { id:'z2', zone:'Petite Couronne',       prixBase:4.00, prixKm:1.70, prixMin:0.50, surcharge_nuit:1.3, surcharge_pointe:1.5 },
      { id:'z3', zone:'Grande Couronne',       prixBase:4.50, prixKm:1.90, prixMin:0.55, surcharge_nuit:1.3, surcharge_pointe:1.5 },
      { id:'z4', zone:'Aéroports (CDG/ORY)',  prixBase:7.00, prixKm:2.00, prixMin:0.60, surcharge_nuit:1.3, surcharge_pointe:1.2 },
    ];

    localStorage.setItem(this.KEYS.USERS,    JSON.stringify(users));
    localStorage.setItem(this.KEYS.WALLETS,  JSON.stringify(wallets));
    localStorage.setItem(this.KEYS.RIDES,    JSON.stringify(rides));
    localStorage.setItem(this.KEYS.TARIFFS,  JSON.stringify(tariffs));
    localStorage.setItem(this.KEYS.NOTIFICATIONS, JSON.stringify([]));
  },

  /* ─── Getters ─── */
  get(key)          { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } },
  set(key, val)     { localStorage.setItem(key, JSON.stringify(val)); },

  getUsers()        { return this.get(this.KEYS.USERS); },
  getRides()        { return this.get(this.KEYS.RIDES); },
  getWallets()      { return this.get(this.KEYS.WALLETS); },
  getTariffs()      { return this.get(this.KEYS.TARIFFS); },

  getUserById(id)   { return this.getUsers().find(u => u.id === id) || null; },
  getSession()      { try { return JSON.parse(sessionStorage.getItem(this.KEYS.SESSION)); } catch { return null; } },

  /* ─── Session ─── */
  login(email, password) {
    const user = this.getUsers().find(u => u.email === email && u.password === password);
    if (!user) return null;
    const session = { userId:user.id, role:user.role, prenom:user.prenom, nom:user.nom, avatar:user.avatar };
    sessionStorage.setItem(this.KEYS.SESSION, JSON.stringify(session));
    return session;
  },
  logout() {
    sessionStorage.removeItem(this.KEYS.SESSION);
    window.location.href = (this._getDepth() === 0 ? '' : '../') + 'auth/login.html';
  },
  requireAuth(requiredRole) {
    const s = this.getSession();
    if (!s) { window.location.href = (this._getDepth() === 0 ? '' : '../') + 'auth/login.html'; return null; }
    if (requiredRole && s.role !== requiredRole && s.role !== 'admin') {
      window.location.href = this._dashboardFor(s.role);
      return null;
    }
    return s;
  },
  _getDepth() {
    const p = window.location.pathname;
    return (p.match(/\//g) || []).length - 1;
  },
  _dashboardFor(role) {
    const map = { client:'../client/dashboard.html', chauffeur:'../driver/dashboard.html', admin:'../admin/dashboard.html' };
    return map[role] || '../auth/login.html';
  },

  /* ─── Wallet ─── */
  getWallet(userId) {
    return this.getWallets().find(w => w.userId === userId) || { userId, solde:0, transactions:[] };
  },
  updateWallet(userId, data) {
    const wallets = this.getWallets();
    const idx = wallets.findIndex(w => w.userId === userId);
    if (idx !== -1) wallets[idx] = { ...wallets[idx], ...data };
    else wallets.push({ userId, ...data });
    this.set(this.KEYS.WALLETS, wallets);
  },
  debitWallet(userId, montant, desc) {
    const w = this.getWallet(userId);
    if (w.solde < montant) return false;
    w.solde = +(w.solde - montant).toFixed(2);
    w.transactions.unshift({ id:'t'+Date.now(), type:'debit', montant, desc, date:new Date().toISOString().slice(0,10), statut:'success' });
    this.updateWallet(userId, w);
    return true;
  },
  creditWallet(userId, montant, desc) {
    const w = this.getWallet(userId);
    w.solde = +(w.solde + montant).toFixed(2);
    w.transactions.unshift({ id:'t'+Date.now(), type:'credit', montant, desc, date:new Date().toISOString().slice(0,10), statut:'success' });
    this.updateWallet(userId, w);
  },

  /* ─── Rides ─── */
  createRide(data) {
    const rides = this.getRides();
    const ride = { id:'r'+Date.now(), statut:'en_attente', date:new Date().toISOString(), ...data };
    rides.push(ride);
    this.set(this.KEYS.RIDES, rides);
    return ride;
  },
  updateRide(rideId, data) {
    const rides = this.getRides();
    const idx = rides.findIndex(r => r.id === rideId);
    if (idx !== -1) { rides[idx] = { ...rides[idx], ...data }; this.set(this.KEYS.RIDES, rides); }
  },
  getPendingRides()  { return this.getRides().filter(r => r.statut === 'en_attente'); },
  getActiveRide(clientId) { return this.getRides().find(r => r.clientId === clientId && ['en_attente','accepte','en_cours'].includes(r.statut)) || null; },

  /* ─── Calcul de prix ─── */
  calculPrix(zoneId, distanceKm, dureeMin, isNuit, isPointe) {
    const t = this.getTariffs().find(t => t.id === zoneId) || this.getTariffs()[0];
    let prix = t.prixBase + (distanceKm * t.prixKm) + (dureeMin * t.prixMin);
    if (isNuit)   prix *= t.surcharge_nuit;
    if (isPointe) prix *= t.surcharge_pointe;
    return +prix.toFixed(2);
  },

  /* ─── Users (admin) ─── */
  updateUser(userId, data) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) { users[idx] = { ...users[idx], ...data }; this.set(this.KEYS.USERS, users); }
  },
  createUser(data) {
    const users = this.getUsers();
    const user = { id:'u'+Date.now(), createdAt:new Date().toISOString().slice(0,10), actif:true, ...data };
    users.push(user);
    this.set(this.KEYS.USERS, users);
    return user;
  },
};

/* ─── Helpers UI partagés ─── */
function showToast(msg, type='info', duration=3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success:'fa-check-circle', error:'fa-times-circle', warning:'fa-exclamation-triangle', info:'fa-info-circle' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${icons[type]||icons.info} toast-icon"></i><span class="toast-msg">${msg}</span><button class="toast-close" onclick="this.parentElement.remove()">✕</button>`;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('hiding'); setTimeout(() => toast.remove(), 300); }, duration);
}

function hideLoader() {
  const l = document.getElementById('global-loader');
  if (l) { l.classList.add('hidden'); setTimeout(() => l.remove(), 400); }
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day:'2-digit', month:'short', year:'numeric' });
}
function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' });
}
function formatPrice(n) { return Number(n).toFixed(2) + ' €'; }
function formatInitials(prenom='', nom='') { return (prenom[0]||'')+(nom[0]||''); }

function renderStars(note) {
  const full = Math.floor(note), half = (note%1)>=0.5;
  let s='';
  for(let i=0;i<full;i++) s+='★';
  if(half) s+='½';
  return s;
}

/* ─── Adresses suggestions mock ─── */
const ADRESSES_PARIS = [
  'Aéroport Charles de Gaulle (CDG)', 'Aéroport d\'Orly (ORY)',
  'Gare du Nord, Paris', 'Gare de Lyon, Paris', 'Gare Montparnasse, Paris',
  'Tour Eiffel, Paris 7e', 'Louvre, Paris 1er', 'Notre-Dame, Paris 4e',
  'Champs-Élysées, Paris 8e', 'Opéra Garnier, Paris 9e',
  'La Défense, Puteaux', 'Versailles, Centre', 'Stade de France, Saint-Denis',
  'Disneyland Paris, Chessy', 'Bastille, Paris 11e', 'République, Paris 3e',
  'Châtelet-Les Halles, Paris 1er', 'Nation, Paris 11e', 'Vincennes',
  'Boulogne-Billancourt Centre', 'Neuilly-sur-Seine', 'Levallois-Perret',
];

function suggestAddresses(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return ADRESSES_PARIS.filter(a => a.toLowerCase().includes(q)).slice(0,5);
}

/* ─── Init auto ─── */
LR.init();
