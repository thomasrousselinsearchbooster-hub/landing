/* global React, LpNav, PressBar, FormCard, TetesSection, ProcessSteps, Realisations, Temoignages, FAQ, MaisonsPartenaires, CtaBanner, LpFooter, PhoneFloat, TEL_DISPLAY, TEL_HREF */

// ──────────────────────────────────────────────────────────────
// Variant B — Service-led
// Editorial hero, then process steps prominently, then catalog,
// maisons, réalisations, témoignages, FAQ, and form at the end.
// ──────────────────────────────────────────────────────────────

const HERO_B_COPY = {
  editorial: {
    eyebrow: "Tapisserie d'ameublement · Atelier parisien depuis 1987",
    title: <React.Fragment>Le rideau,<br/><em>pièce maîtresse</em><br/>de la pièce.</React.Fragment>,
    lede: "Un rideau bien posé tient la lumière, l'acoustique, le regard. L'atelier conçoit, confectionne et pose pour particuliers, décorateurs et antiquaires — pièce par pièce, du salon haussmannien à la chambre d'enfant.",
  },
  direct: {
    eyebrow: 'Rideaux sur mesure · Paris',
    title: <React.Fragment>Du <em>métré</em><br/>à la pose,<br/>un seul atelier.</React.Fragment>,
    lede: "Métré à domicile, devis détaillé, confection rue Picot, pose comprise. Pas de sous-traitance — un seul interlocuteur, du premier appel au dernier pli.",
  },
};

function VariantB({ accent, showPress, showTesti, showFAQ, tone = 'editorial' }) {
  const copy = HERO_B_COPY[tone] || HERO_B_COPY.editorial;
  return (
    <div className="lp" data-variant="B" style={{ '--accent': accent, position: 'relative' }}>
      <LpNav ctaLabel="Prendre rendez-vous" ctaHref="#devis" />

      {/* HERO editorial */}
      <section className="hero-wrap" data-screen-label="Hero B">
        <img src="assets/hero-haussmann.jpg" alt="" className="hero-wrap__bg" />
        <div className="hero-b__inner">
          <div className="hero-wrap__eyebrow">{copy.eyebrow}</div>
          <h1 className="hero-wrap__title hero-b__title">{copy.title}</h1>
          <p className="hero-wrap__lede" style={{maxWidth: '46ch'}}>{copy.lede}</p>

          <div className="hero-b__cta">
            <a href="#devis" className="btn-primary">Demander un devis</a>
            <a href="#realisations" className="btn-ghost">Voir les réalisations</a>
          </div>

          <div className="hero-b__phone">
            <span>Atelier — Du lundi au vendredi</span>
            <a href={TEL_HREF} className="hero-b__phone-num">{TEL_DISPLAY}</a>
          </div>
        </div>
      </section>

      {showPress && <PressBar />}

      {/* The defining section — process */}
      <ProcessSteps />

      <TetesSection />

      <MaisonsPartenaires />

      <Realisations />

      {showTesti && <Temoignages />}

      {showFAQ && <FAQ dark={true} />}

      {/* Form lives at the end, as a proper section */}
      <section className="lp-section lp-section--bg2" data-screen-label="Devis">
        <div className="lp-section__inner" style={{maxWidth: 920}}>
          <FormCard
            variant="standalone"
            eyebrow="04 — Demande de devis"
            title={<React.Fragment>Décrivez-nous<br/><em>votre projet.</em></React.Fragment>}
            lede="L'atelier vous répond sous 48 heures ouvrées. Pour les projets urgents, contactez-nous directement au téléphone."
            submitLabel="Envoyer la demande"
          />
        </div>
      </section>

      <CtaBanner
        title={<React.Fragment>Un projet plus large ?<br/><em>Visite à l'atelier.</em></React.Fragment>}
        lede="L'atelier reçoit sur rendez-vous, rue Picot. L'occasion de voir les échantillons, les têtes confectionnées, les tissus des maisons partenaires."
      />

      <LpFooter />

      <PhoneFloat />
    </div>
  );
}

window.VariantB = VariantB;
