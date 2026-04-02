import React, { useEffect, useRef } from 'react';

const ProfilesSection: React.FC = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animation = 'fadeUp 0.6s ease forwards';
            (entry.target as HTMLElement).style.opacity = '1';
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const WaveSVG = () => (
    <svg
      style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.08, pointerEvents: 'none' }}
      width="72" height="36" viewBox="0 0 72 36" fill="none"
    >
      <path d="M2 28 C9 22,14 19,20 24 C26 30,31 31,37 26 C42 21,47 19,53 23 C57 26,60 27,64 26" stroke="#C4674A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="67" cy="26" r="2.5" fill="#C4674A"/>
    </svg>
  );

  return (
    <section
      id="terapeutit"
      className="profiles-sec"
    >
      <div className="s-label">Terapeutit</div>
      <h2>Esimerkkejä suosituksistamme</h2>
      <p className="s-sub">Jokainen suositus on valittu sinua varten. Näet myös, miksi terapeutti sopii juuri sinulle.</p>

      <div className="profiles-grid">

        {/* Card 1 — Featured / Paras match */}
        <div
          ref={(el) => { cardRefs.current[0] = el; }}
          className="p-card featured"
          style={{ opacity: 0 }}
        >
          <WaveSVG />
          <div className="feat-badge">Paras match</div>
          <div className="p-top">
            <div className="p-av" style={{ background: 'var(--terra-pale)', color: 'var(--terra)' }}>AM</div>
            <div>
              <div className="p-name">Anna Mäkinen</div>
              <div className="p-role">Kognitiivinen psykoterapeutti</div>
              <div className="m-pill">✦ Erikoistunut ahdistukseen</div>
            </div>
          </div>
          <div className="p-why">
            <div className="p-why-lbl">Miksi juuri sinulle</div>
            <div className="p-why-txt">Anna on erikoistunut ahdistukseen ja käyttänyt KBT-menetelmää kahdeksan vuotta. Hänen lähestymistapansa on käytännönläheinen ja ratkaisukeskeinen, juuri niin kuin toivoit.</div>
          </div>
          <div className="p-tags">
            <span className="p-tag">Ahdistus</span>
            <span className="p-tag">KBT</span>
            <span className="p-tag">Etä</span>
            <span className="p-tag">Suomi / Englanti</span>
          </div>
          <button className="bk-btn fill">Varaa aika →</button>
        </div>

        {/* Card 2 */}
        <div
          ref={(el) => { cardRefs.current[1] = el; }}
          className="p-card"
          style={{ opacity: 0, transitionDelay: '0.15s' }}
        >
          <WaveSVG />
          <div className="p-top">
            <div className="p-av" style={{ background: 'var(--cream-dark)', color: 'var(--ink-mid)' }}>JL</div>
            <div>
              <div className="p-name">Juhani Leppänen</div>
              <div className="p-role">Psykodynaaminen terapeutti</div>
              <div className="m-pill">✦ Pitkäaikainen terapia</div>
            </div>
          </div>
          <div className="p-why">
            <div className="p-why-lbl">Miksi juuri sinulle</div>
            <div className="p-why-txt">Juhanilla on kokemusta pitkäaikaisesta työskentelystä, mikä sopii tilanteesi syvyyteen. Lämmin ja empaattinen tyyli.</div>
          </div>
          <div className="p-tags">
            <span className="p-tag">Masennus</span>
            <span className="p-tag">Psykodynamiikka</span>
            <span className="p-tag">Lähi & Etä</span>
          </div>
          <button className="bk-btn outline">Varaa aika →</button>
        </div>

        {/* Card 3 */}
        <div
          ref={(el) => { cardRefs.current[2] = el; }}
          className="p-card"
          style={{ opacity: 0, transitionDelay: '0.3s' }}
        >
          <WaveSVG />
          <div className="p-top">
            <div className="p-av" style={{ background: 'var(--terra-wash)', color: 'var(--ink-light)' }}>SR</div>
            <div>
              <div className="p-name">Sari Rantanen</div>
              <div className="p-role">Hyväksymis- ja omistautumisterapia</div>
              <div className="m-pill">✦ Käytännön työkalut</div>
            </div>
          </div>
          <div className="p-why">
            <div className="p-why-lbl">Miksi juuri sinulle</div>
            <div className="p-why-txt">ACT-lähestymistapa sopii erityisesti jos haluat käytännön työkaluja arjen hallintaan terapiatuntien välille.</div>
          </div>
          <div className="p-tags">
            <span className="p-tag">ACT</span>
            <span className="p-tag">Burnout</span>
            <span className="p-tag">Etä</span>
          </div>
          <button className="bk-btn outline">Varaa aika →</button>
        </div>

      </div>
    </section>
  );
};

export default ProfilesSection;
