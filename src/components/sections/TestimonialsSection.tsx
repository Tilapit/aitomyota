import React, { useEffect, useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";

const TestimonialsSection: React.FC = () => {
  const { t } = useLanguage();
  const { testimonials: tm } = t;
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animation = "fadeUp 0.6s ease forwards";
            (entry.target as HTMLElement).style.opacity = "1";
          }
        });
      },
      { threshold: 0.15 },
    );

    cardRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stories" className="profiles-sec">
      <div className="page-shell">
        <div className="testimonial-heading">
          <div>
            <div className="s-label">{tm.eyebrow}</div>
            <h2>{tm.title}</h2>
          </div>
          <p className="s-sub testimonial-intro">{tm.subtitle}</p>
        </div>

        <div className="testimonial-layout">
          {tm.items.map((item, index) => (
            <article
              key={item.name}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={`testimonial-entry${index === 0 ? " is-featured" : ""}`}
              style={{ opacity: 0, transitionDelay: `${index * 0.15}s` }}
            >
              {index === 0 && <div className="feat-badge">{tm.featuredBadge}</div>}
              <div className="testimonial-mark">"</div>
              <div className="testimonial-quote">{item.quote}</div>
              <div className="testimonial-meta">
                <div className="testimonial-name">{item.name}</div>
                <div className="testimonial-context">{item.context}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;