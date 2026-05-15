/* global React */
// Shared building blocks for both landing-page variants.
// Each component takes the data it needs as props so copy can be tweaked.

const { useState } = React;

// ────────────────────────────────────────────────────────────
// Phone helpers — French formatted
// ────────────────────────────────────────────────────────────
const TEL_DISPLAY = '01 45 11 05 40';
const TEL_HREF = 'tel:+33145110540';

// ────────────────────────────────────────────────────────────
// Floating phone — bottom-right, anchored to artboard
// ────────────────────────────────────────────────────────────
function PhoneFloat() {
  return (
    <a href={TEL_HREF} className="phone-float" aria-label="Appeler l'atelier">
      <span className="phone-float__icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>
        </svg>
      </span>
      <span>
        <span className="phone-float__meta">Appeler l'atelier</span>
        <span className="phone-float__num">{TEL_DISPLAY}</span>
      </span>
    </a>
  );
}

// ────────────────────────────────────────────────────────────
// Nav — sticky dark bar
// ────────────────────────────────────────────────────────────
function LpNav({ ctaLabel = "Devis gratuit", ctaHref = "#devis" }) {
  return (
    <nav className="lp-nav" data-screen-label="Nav">
      <div className="lp-nav__inner">
        <a href="#" className="lp-nav__brand">
          <img src="assets/logo.png" alt="" className="lp-nav__logo" />
          <span className="lp-nav__wm">
            <span className="lp-nav__wm-main">Atelier Créa <em>Plus</em></span>
            <span className="lp-nav__wm-sub">Tapissier · Décorateur · Paris</span>
          </span>
        </a>
        <div className="lp-nav__links">
          <a href="#rideaux" className="is-active">Rideaux</a>
          <a href="#savoir-faire">Savoir-faire</a>
          <a href="#realisations">Réalisations</a>
          <a href="#temoignages">Témoignages</a>
          <a href="#contact">Contact</a>
        </div>
        <a href={TEL_HREF} className="lp-nav__phone">
          <span>
            <span className="lp-nav__phone-meta">Atelier</span>
            <span style={{display: 'block'}} className="lp-nav__phone-num">{TEL_DISPLAY}</span>
          </span>
        </a>
        <a href={ctaHref} className="lp-nav__cta">{ctaLabel}</a>
      </div>
    </nav>
  );
}

// ────────────────────────────────────────────────────────────
// Press bar — magazine logotypes as wordmarks
// ────────────────────────────────────────────────────────────
function PressBar() {
  return (
    <section className="press-bar" data-screen-label="Press">
      <div className="press-bar__inner">
        <span className="press-bar__label">Cité dans</span>
        <div className="press-bar__logos">
          <span className="press-logo">AD&nbsp;France</span>
          <span className="press-logo press-logo--caps">Côté Maison</span>
          <span className="press-logo">Art &amp; Décoration</span>
          <span className="press-logo press-logo--caps">Maison &amp; Travaux</span>
          <span className="press-logo">IDEAT</span>
          <span className="press-logo press-logo--caps">Le Figaro Madame</span>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Form card — same shape, used in hero (Variant A) or section (Variant B)
// ────────────────────────────────────────────────────────────
const PROJECT_TYPES = [
  "Rideaux & doubles rideaux",
  "Voilages",
  "Stores",
  "Têtes & passementerie",
  "Conseil & relevé",
];

function FormCard({ variant = "full", eyebrow = "Demande de devis", title, lede, submitLabel = "Envoyer ma demande", withPhoto = false }) {
  const [type, setType] = useState(PROJECT_TYPES[0]);
  const [sent, setSent] = useState(false);
  const [photos, setPhotos] = useState([]);
  const fileInputRef = React.useRef(null);

  const MAX_PHOTOS = 5;
  const MAX_BYTES = 10 * 1024 * 1024; // 10 MB per file

  const onPickFiles = (e) => {
    const incoming = Array.from(e.target.files || []);
    const valid = incoming
      .filter((f) => f.type.startsWith('image/'))
      .filter((f) => f.size <= MAX_BYTES);
    setPhotos((prev) => [...prev, ...valid].slice(0, MAX_PHOTOS));
    // allow re-selecting the same file again later
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const removePhoto = (idx) => setPhotos((prev) => prev.filter((_, i) => i !== idx));
  const fmtSize = (b) => b < 1024 * 1024 ? `${Math.round(b / 1024)} ko` : `${(b / 1024 / 1024).toFixed(1)} Mo`;

  const titleEl = title || (
    <React.Fragment>
      Décrivez-nous<br/><em>votre projet.</em>
    </React.Fragment>
  );
  const ledeEl = lede || "Métré sans engagement à Paris et région parisienne. Réponse de l'atelier sous 48h.";

  return (
    <div className={`form-card form-card--${variant}`} id="devis">
      {sent ? (
        <div className="form-card__ok">
          <span className="fleuron">❦</span>
          <h3>Votre demande nous parvient.</h3>
          <p>L'atelier reprend contact avec vous sous 48&nbsp;heures.</p>
        </div>
      ) : (
        <React.Fragment>
          <header className="form-card__head">
            <span className="form-card__eyebrow">{eyebrow}</span>
            <h3 className="form-card__title">{titleEl}</h3>
            <p className="form-card__lede">{ledeEl}</p>
          </header>

          <form className="form-card__body" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div className="form-card__row">
              <div className="form-card__group">
                <label className="form-card__label">Nom et prénom *</label>
                <input className="form-card__input" required placeholder="Madame, Monsieur…" />
              </div>
              <div className="form-card__group">
                <label className="form-card__label">Téléphone *</label>
                <input className="form-card__input" type="tel" required placeholder="06 12 34 56 78" />
              </div>
            </div>
            <div className="form-card__row">
              <div className="form-card__group">
                <label className="form-card__label">Courriel *</label>
                <input className="form-card__input" type="email" required placeholder="prenom@maison.fr" />
              </div>
              <div className="form-card__group">
                <label className="form-card__label">Quartier ou ville</label>
                <input className="form-card__input" placeholder="Paris 16ᵉ, Neuilly, Versailles…" />
              </div>
            </div>

            <div className="form-card__group">
              <label className="form-card__label">Nature du projet</label>
              <div className="form-card__chips" role="radiogroup">
                {PROJECT_TYPES.map((t) => (
                  <button
                    type="button"
                    key={t}
                    role="radio"
                    aria-checked={type === t}
                    className={`form-card__chip ${type === t ? 'is-active' : ''}`}
                    onClick={() => setType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-card__group">
              <label className="form-card__label">Quelques mots sur la pièce</label>
              <textarea
                className="form-card__input"
                placeholder="Salon d'un appartement haussmannien, 2 fenêtres de 2,80 m, doublure phonique, tissu Pierre Frey envisagé…"
              ></textarea>
            </div>

            {withPhoto && (
              <div className="form-card__group">
                <label className="form-card__label">Photos de la pièce <span className="form-card__label-aux">facultatif</span></label>
                <div className="photo-up">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onPickFiles}
                    style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
                    id="photo-up-input"
                  />
                  <button
                    type="button"
                    className="photo-up__btn"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    disabled={photos.length >= MAX_PHOTOS}
                  >
                    <span className="photo-up__btn-ico" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="5" width="18" height="14" />
                        <circle cx="9" cy="11" r="1.5" />
                        <path d="m3 17 5-5 4 4 3-3 6 6" />
                      </svg>
                    </span>
                    <span>
                      {photos.length === 0 ? "Ajouter des photos" : "Ajouter d'autres photos"}
                    </span>
                  </button>
                  <p className="photo-up__hint">
                    JPG ou PNG, 10&nbsp;Mo max par fichier &middot; 5 photos maximum &middot;
                    une vue large de la fenêtre nous aide à vous conseiller.
                  </p>
                  {photos.length > 0 && (
                    <ul className="photo-up__list">
                      {photos.map((f, i) => (
                        <li className="photo-up__item" key={`${f.name}-${i}`}>
                          <span className="photo-up__thumb">
                            <img src={URL.createObjectURL(f)} alt="" />
                          </span>
                          <span className="photo-up__meta">
                            <span className="photo-up__name">{f.name}</span>
                            <span className="photo-up__size">{fmtSize(f.size)}</span>
                          </span>
                          <button
                            type="button"
                            className="photo-up__remove"
                            aria-label={`Retirer ${f.name}`}
                            onClick={() => removePhoto(i)}
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M2 2l8 8M10 2l-8 8"/></svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            <div className="form-card__foot">
              <span className="form-card__note">
                <strong>Réponse sous 48h</strong>
                Vos coordonnées restent confidentielles · Aucune sollicitation commerciale.
              </span>
              <button type="submit" className="form-card__submit">{submitLabel}</button>
            </div>
          </form>
        </React.Fragment>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Chiffres clés
// ────────────────────────────────────────────────────────────
const CHIFFRES = [
  { n: '38', label: 'Années', sub: "d'atelier rue Picot" },
  { n: '+1 200', label: 'Paires', sub: 'de rideaux confectionnées' },
  { n: '14', label: 'Maisons', sub: 'de tissus partenaires' },
  { n: '4 à 6', label: 'Semaines', sub: 'du métré à la pose' },
];

function Chiffres({ dark = false }) {
  return (
    <section className={`lp-section ${dark ? 'lp-section--dark' : 'lp-section--bg2'}`} data-screen-label="Chiffres">
      <div className="lp-section__inner">
        <header className="lp-section__head">
          <span className="lp-section__eyebrow">L'atelier en quelques chiffres</span>
          <h2 className="lp-section__title">Un savoir-faire <em>posé,</em> mesuré.</h2>
        </header>
        <div className="chiffres-grid">
          {CHIFFRES.map((c) => (
            <div className="chiffre" key={c.label}>
              <div className="chiffre__n">{c.n}</div>
              <div className="chiffre__label">{c.label}</div>
              <div className="chiffre__sub">{c.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Têtes de rideaux catalog
// ────────────────────────────────────────────────────────────
const TETES = [
  { img: 'assets/tete-pinces.jpg', name: 'Plis pincés', em: 'doubles', desc: "Le classique parisien. Plis tenus à la main, ourlets sellier, doublure. Pour les hauteurs hauteurs sous plafond." },
  { img: 'assets/tete-creux.jpg', name: 'Plis', em: 'flamands', desc: "Plis creux profonds, retombée généreuse. Convient aux tissus lourds, velours et damas." },
  { img: 'assets/tete-wave.jpg', name: 'Plis', em: 'wave', desc: "Vague souple sur rail, contemporain. Idéal pour les baies vitrées et les volumes ouverts." },
  { img: 'assets/tete-oeillets.jpg', name: "Œillets", em: 'bronze ou laiton', desc: "Anneaux métalliques sur tringle apparente. Lignes graphiques, pose sur fenêtre haute." },
  { img: 'assets/tete-crayons.jpg', name: 'Plis', em: 'crayons', desc: "Plis serrés en bande haute, ruban fronceur. Discrets, parfaits pour les voilages." },
];

function TetesSection({ dark = false }) {
  return (
    <section id="rideaux" className={`lp-section ${dark ? 'lp-section--dark' : ''}`} data-screen-label="Têtes">
      <div className="lp-section__inner">
        <header className="lp-section__head">
          <span className="lp-section__eyebrow">Têtes &amp; finitions</span>
          <h2 className="lp-section__title">Cinq <em>têtes,</em> autant<br/>de partis pris.</h2>
          <p className="lp-section__lede">
            Le choix de la tête détermine la silhouette du rideau — sa retombée,
            sa lecture sur la fenêtre, son rapport au mur. L'atelier vous
            conseille selon la hauteur, le tissu, et la pièce.
          </p>
        </header>
        <div className="tetes-grid">
          {TETES.map((t) => (
            <article className="tete" key={t.name + t.em}>
              <img className="tete__img" src={t.img} alt={`${t.name} ${t.em}`} loading="lazy" />
              <h3 className="tete__name">{t.name} <em>{t.em}</em></h3>
              <p className="tete__desc">{t.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Process steps — RDV, métré, devis, confection, pose
// ────────────────────────────────────────────────────────────
const STEPS = [
  { n: '01', name: 'Premier', em: 'rendez-vous', desc: "Échange à l'atelier ou par téléphone. Comprendre la pièce, la lumière, votre usage.", meta: 'Sans engagement' },
  { n: '02', name: 'Métré', em: 'sur place', desc: "Visite à domicile. Relevés, conseil sur les têtes, les tissus, la pose.", meta: 'Paris · Région parisienne' },
  { n: '03', name: 'Devis', em: 'détaillé', desc: "Proposition écrite — tissus, métrages, façon, doublure, fournitures, pose. Posté sous 48h.", meta: 'Réponse 48h' },
  { n: '04', name: 'Confection', em: 'à l\'atelier', desc: "Coupe, plis tenus main, ourlets sellier, doublures. Tout est fait rue Picot.", meta: '3 à 5 semaines' },
  { n: '05', name: 'Pose', em: 'et réglages', desc: "Tringlerie, accroche, plis tendus à la main, ajustement de la retombée.", meta: 'Une demi-journée' },
];

function ProcessSteps({ dark = false }) {
  return (
    <section id="savoir-faire" className={`lp-section ${dark ? 'lp-section--dark' : 'lp-section--bg2'}`} data-screen-label="Process">
      <div className="lp-section__inner">
        <header className="lp-section__head">
          <span className="lp-section__eyebrow">Du premier appel à la pose</span>
          <h2 className="lp-section__title">Cinq étapes,<br/><em>un seul interlocuteur.</em></h2>
          <p className="lp-section__lede">
            L'atelier prend le projet du métré jusqu'à la pose. Pas de
            sous-traitance, pas d'intermédiaire — un seul interlocuteur,
            de bout en bout.
          </p>
        </header>
        <div className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <div className="step__dot">{s.n}</div>
              <h3 className="step__name">{s.name} <em>{s.em}</em></h3>
              <p className="step__desc">{s.desc}</p>
              <div className="step__meta">{s.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Réalisations
// ────────────────────────────────────────────────────────────
const REALS = [
  { img: 'assets/real-haussmann.jpg', tag: 'Plis pincés', title: "Appartement haussmannien", place: 'Paris 16ᵉ · Lin Pierre Frey' },
  { img: 'assets/real-pierrefrey.jpg', tag: 'Plis creux',  title: "Double rideaux, salon", place: 'Paris 7ᵉ · Tringle noire' },
  { img: 'assets/real-chambre.jpg', tag: 'Plis pincés', title: "Chambre, parquet ancien", place: 'Versailles · Imprimé fleuri' },
  { img: 'assets/real-floral.jpg',  tag: 'Voilages',    title: "Salle à manger sur cour", place: 'Neuilly · Coton imprimé' },
  { img: 'assets/real-oeillets.jpg',  tag: 'Œillets',     title: "Salon d'enfant", place: 'Boulogne · Toile graphique' },
  { img: 'assets/real-restaurant.jpg',tag: 'Plis flamands',title: "Salle de restaurant", place: 'Paris 6ᵉ · Velours terracotta' },
];

function Realisations() {
  return (
    <section id="realisations" className="lp-section" data-screen-label="Réalisations">
      <div className="lp-section__inner">
        <header className="lp-section__head">
          <span className="lp-section__eyebrow">Quelques projets récents</span>
          <h2 className="lp-section__title">Chaque pièce <em>retient</em><br/>sa propre lumière.</h2>
        </header>
        <div className="reals-grid">
          {REALS.map((r) => (
            <figure className="real-card" key={r.title}>
              <img className="real-card__img" src={r.img} alt={r.title} loading="lazy" />
              <figcaption className="real-card__cap">
                <div className="real-card__tag">{r.tag}</div>
                <h3 className="real-card__title">{r.title}</h3>
                <div className="real-card__place">{r.place}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Témoignages
// ────────────────────────────────────────────────────────────
const TESTIS = [
  { quote: "Trois fenêtres, trois doublures phoniques, une pose impeccable. L'atelier a pris la mesure de l'appartement avant celle des rideaux.", name: 'Madame H.', place: 'Paris 7ᵉ' },
  { quote: "Nous avons confié quatre chantiers de décoration à Créa Plus, dont un hôtel particulier. C'est rare d'avoir un seul interlocuteur, du tissu à la tringle.", name: 'Léa B., décoratrice', place: 'Paris 8ᵉ' },
  { quote: "Devis détaillé, tenue des délais, plis tenus à la main. Le travail parle pour lui — on a refait le séjour deux ans après.", name: 'Monsieur et Madame M.', place: 'Neuilly-sur-Seine' },
];

function Temoignages() {
  return (
    <section id="temoignages" className="lp-section lp-section--dark" data-screen-label="Témoignages">
      <div className="lp-section__inner">
        <header className="lp-section__head">
          <span className="lp-section__eyebrow">Ils nous ont confié leurs fenêtres</span>
          <h2 className="lp-section__title">Trois mots de <em>clients.</em></h2>
        </header>
        <div className="testis">
          {TESTIS.map((t) => (
            <blockquote className="testi" key={t.name}>
              <span className="testi__mark" aria-hidden="true">“</span>
              <p className="testi__quote">{t.quote}</p>
              <footer className="testi__meta">
                <span className="testi__name">{t.name}</span>
                <span className="testi__place">{t.place}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// FAQ
// ────────────────────────────────────────────────────────────
const FAQS = [
  { q: "Sous quels délais l'atelier répond-il à une demande de devis ?",
    a: "Sous 48 heures ouvrées. Le devis est envoyé par courriel après le métré sur place, et engage l'atelier sur le prix, les délais et les fournitures." },
  { q: "Le métré est-il payant ? Travaillez-vous en dehors de Paris ?",
    a: "Le métré est offert à Paris intra-muros et en proche région (Neuilly, Boulogne, Versailles, Saint-Cloud, Saint-Maur). Au-delà, un défraiement est convenu à l'avance." },
  { q: "Combien de temps faut-il entre la commande et la pose ?",
    a: "Comptez quatre à six semaines selon le tissu commandé chez nos maisons partenaires, la longueur des pièces et le calendrier de l'atelier. Pour les projets urgents, contactez-nous au téléphone." },
  { q: "Travaillez-vous avec mon propre tissu, ou faut-il passer par vos partenaires ?",
    a: "Les deux. L'atelier confectionne en tissu client ou commande chez Pierre Frey, Houlès, Métaphores, Nobilis, Casamance, Designers Guild — les remises maison sont reportées sur le devis." },
  { q: "Posez-vous aussi la tringlerie ? Pouvez-vous percer du marbre ou de la pierre ?",
    a: "Oui. La pose des tringles, rails motorisés, supports plafond et systèmes invisibles fait partie de la prestation. L'atelier perce moulures, plâtre, bois et pierre selon le support." },
];

function FAQ({ dark = false }) {
  return (
    <section className={`lp-section ${dark ? 'lp-section--bg2' : ''}`} data-screen-label="FAQ">
      <div className="lp-section__inner" style={{maxWidth: 1000}}>
        <header className="lp-section__head">
          <span className="lp-section__eyebrow">Questions fréquentes</span>
          <h2 className="lp-section__title">Avant <em>de nous écrire.</em></h2>
        </header>
        <div className="faq">
          {FAQS.map((f, i) => (
            <article className="faq__item" key={f.q}>
              <div className="faq__n">{String(i + 1).padStart(2, '0')}</div>
              <div>
                <h3 className="faq__q">{f.q}</h3>
                <p className="faq__a">{f.a}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Maisons partenaires
// ────────────────────────────────────────────────────────────
const MAISONS = [
  { name: 'Pierre Frey', sub: 'Tissus' },
  { name: 'Houlès', sub: 'Passementerie' },
  { name: 'Métaphores', sub: 'Tissus' },
  { name: 'Nobilis', sub: 'Tissus' },
  { name: 'Casamance', sub: 'Tissus' },
  { name: 'Designers Guild', sub: 'Tissus' },
];

function MaisonsPartenaires() {
  return (
    <section className="lp-section lp-section--dark" data-screen-label="Maisons">
      <div className="lp-section__inner">
        <header className="lp-section__head">
          <span className="lp-section__eyebrow">Maisons partenaires</span>
          <h2 className="lp-section__title">Les <em>tissus</em> que nous travaillons.</h2>
        </header>
        <div className="maisons">
          {MAISONS.map((m) => (
            <div className="maison" key={m.name}>
              <div className="maison__name">{m.name}</div>
              <div className="maison__sub">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// CTA banner (between sections)
// ────────────────────────────────────────────────────────────
function CtaBanner({ title, lede, bg = 'assets/fabric-dark.jpg' }) {
  return (
    <section className="cta-banner" data-screen-label="CTA">
      <img src={bg} alt="" className="cta-banner__bg" aria-hidden="true" />
      <div className="cta-banner__inner">
        <div>
          <h2 className="cta-banner__title">{title}</h2>
          <p className="cta-banner__lede">{lede}</p>
        </div>
        <div className="cta-banner__actions">
          <a href={TEL_HREF} className="cta-banner__phone">
            <span>
              <span className="cta-banner__phone-meta">Atelier · Du lundi au vendredi</span>
              <span style={{display: 'block'}} className="cta-banner__phone-num">{TEL_DISPLAY}</span>
            </span>
          </a>
          <span className="cta-banner__email">
            ou <a href="mailto:atelier@crea-plus.fr">atelier@crea-plus.fr</a>
          </span>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Footer
// ────────────────────────────────────────────────────────────
function LpFooter() {
  return (
    <footer id="contact" className="lp-footer" data-screen-label="Footer">
      <div className="lp-footer__inner">
        <div className="lp-footer__grid">
          <div className="lp-footer__brand">
            <div className="lp-footer__brand-wm">
              <img src="assets/logo.png" className="lp-footer__brand-logo" alt="" />
              <span className="lp-footer__brand-name">Atelier Créa <em>Plus</em></span>
            </div>
            <p className="lp-footer__pitch">
              Maison parisienne de tapisserie d'ameublement. Rideaux sur mesure,
              réfection traditionnelle, agencement intérieur.
            </p>
          </div>
          <div>
            <h4 className="lp-footer__head">Atelier</h4>
            <ul className="lp-footer__list">
              <li>13 rue Picot</li>
              <li>75116 Paris</li>
              <li>108 Avenue Carnot</li>
              <li>94100 Saint-Maur-des-Fossés</li>
            </ul>
          </div>
          <div>
            <h4 className="lp-footer__head">Contact</h4>
            <ul className="lp-footer__list">
              <li><a href={TEL_HREF}>{TEL_DISPLAY}</a></li>
              <li><a href="mailto:atelier@crea-plus.fr">atelier@crea-plus.fr</a></li>
              <li>Lun. – Ven. · 9h – 18h</li>
              <li>Samedi · 9h – 12h, sur rendez-vous</li>
            </ul>
          </div>
          <div>
            <h4 className="lp-footer__head">Nous trouver</h4>
            <img src="assets/map.jpg" alt="Carte" className="lp-footer__map" />
          </div>
        </div>
        <div className="lp-footer__base">
          <span>© Atelier Créa Plus, 2026 — N° Siret 824 661 003 00018</span>
          <span><a href="#">Mentions légales</a> · <a href="#">Politique de confidentialité</a></span>
        </div>
      </div>
    </footer>
  );
}

// ────────────────────────────────────────────────────────────
// Export to window
// ────────────────────────────────────────────────────────────
Object.assign(window, {
  PhoneFloat, LpNav, PressBar, FormCard, Chiffres,
  TetesSection, ProcessSteps, Realisations, Temoignages,
  FAQ, MaisonsPartenaires, CtaBanner, LpFooter,
  TEL_DISPLAY, TEL_HREF, PROJECT_TYPES,
});
