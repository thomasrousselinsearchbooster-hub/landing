/* global React, LpNav, PressBar, FormCard, Chiffres, TetesSection, Realisations, Temoignages, FAQ, CtaBanner, LpFooter, PhoneFloat, TEL_DISPLAY, TEL_HREF */

// ──────────────────────────────────────────────────────────────
// Variant A — Conversion-first
// Form lives in the hero. Phone is huge. Trust badges, urgency.
// Testimonials early, FAQ before CTA banner.
// ──────────────────────────────────────────────────────────────

const HERO_A_COPY = {
  editorial: {
    eyebrow: 'Atelier Créa Plus · Tapissier-décorateur depuis 1987',
    title: <React.Fragment>Rideaux <em style={{ color: "rgb(239, 239, 239)" }}>sur mesure,</em><br />posés à Paris.</React.Fragment>,
    lede: "L'atelier confectionne et pose vos rideaux, doubles rideaux, voilages et stores. Plis tenus main, doublures, tringlerie. Métré offert à Paris et région parisienne.",
    urgency: <React.Fragment><strong style={{ color: "rgb(255, 255, 255)" }}>Devis sous 48h</strong>Délais de pose 4 à 6 semaines</React.Fragment>
  },
  direct: {
    eyebrow: 'Rideaux sur mesure · Paris',
    title: <React.Fragment>Rideaux <em>sur mesure</em>—<br />posés en 4 à 6 semaines.</React.Fragment>,
    lede: "Confection à l'atelier rue Picot. Plis main, doublures, pose comprise. Métré gratuit à Paris et alentours.",
    urgency: <React.Fragment><strong>Devis gratuit en 48h</strong>Métré à domicile inclus</React.Fragment>
  }
};

function VariantA({ accent, showPress, showTesti, showFAQ, tone = 'editorial' }) {
  const copy = HERO_A_COPY[tone] || HERO_A_COPY.editorial;
  return (
    <div className="lp" data-variant="A" style={{ '--accent': accent, position: 'relative' }}>
      <LpNav ctaLabel="Demander un devis" />

      {/* HERO with embedded form */}
      <section className="hero-wrap" data-screen-label="Hero A">
        <img src="assets/hero-haussmann.jpg" alt="" className="hero-wrap__bg" />
        <div className="hero-wrap__inner">
          <div className="hero-a__grid">
            <div>
              <div className="hero-wrap__eyebrow">{copy.eyebrow}</div>
              <h1 className="hero-wrap__title">{copy.title}</h1>
              <p className="hero-wrap__lede">{copy.lede}</p>

              <div className="hero-a__phone-block">
                <div>
                  <div className="hero-a__phone-block-meta" style={{
                    fontFamily: 'var(--font-sans)', fontSize: 11, textTransform: 'uppercase',
                    letterSpacing: '0.2em', color: 'var(--fg-on-dark-2)'
                  }}>Appeler l'atelier</div>
                  <a href={TEL_HREF} className="hero-a__phone-block-num">{TEL_DISPLAY}</a>
                </div>
                <div className="hero-a__phone-divider"></div>
                <p className="hero-a__urgency">{copy.urgency}</p>
              </div>

              <div className="hero-a__badges">
                <div className="hero-a__badge">
                  <div className="hero-a__badge-label">Métré</div>
                  <div className="hero-a__badge-val">Offert à Paris &amp; région</div>
                </div>
                <div className="hero-a__badge">
                  <div className="hero-a__badge-label">Façon</div>
                  <div className="hero-a__badge-val">Plis tenus à la main</div>
                </div>
                <div className="hero-a__badge">
                  <div className="hero-a__badge-label">Délais</div>
                  <div className="hero-a__badge-val">4 à 6 semaines</div>
                </div>
                <div className="hero-a__badge">
                  <div className="hero-a__badge-label">Pose</div>
                  <div className="hero-a__badge-val">Comprise dans le devis</div>
                </div>
              </div>
            </div>

            {/* Form in hero — that's the whole A play */}
            <div>
              <FormCard
                eyebrow="01 — Devis gratuit, sous 48h"
                title={<React.Fragment>Votre projet,<br /><em>en quelques lignes.</em></React.Fragment>}
                lede="Décrivez la pièce. L'atelier vous rappelle pour un métré, et établit le devis chiffré sous 48 heures."
                submitLabel="Recevoir mon devis"
                withPhoto={true}
              />
            </div>
          </div>
        </div>
      </section>

      {showPress && <PressBar />}

      <Chiffres />

      <TetesSection />

      {showTesti && <Temoignages />}

      <Realisations />

      {showFAQ && <FAQ dark={false} />}

      <CtaBanner
        title={<React.Fragment>Un projet de rideaux ?<br /><em>Parlons-en de vive voix.</em></React.Fragment>}
        lede="Quelques minutes au téléphone suffisent pour comprendre votre pièce, vos contraintes et le calendrier — avant tout métré." />
      

      <LpFooter />

      <PhoneFloat />
    </div>);

}

window.VariantA = VariantA;