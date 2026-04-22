import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { getHomeContent } from "../../content/homeContent";
import { useCurrentLocale } from "../../hooks/useCurrentLocale";

const TestimonialsSection: React.FC = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation("landing-client");
  const { testimonials } = getHomeContent(locale);
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
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stories" className="profiles-sec">
      <div className="page-shell">
        <div className="testimonial-heading">
          <div>
            <div className="s-label">{t("testimonials.eyebrow")}</div>
            <h2>{t("testimonials.title")}</h2>
          </div>
          <p className="s-sub testimonial-intro">
            {t("testimonials.description")}
          </p>
        </div>

        <div className="testimonial-layout">
          {testimonials.map((item, index) => (
            <article
              key={item.name}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className={`testimonial-entry${index === 0 ? " is-featured" : ""}`}
              style={{ opacity: 0, transitionDelay: `${index * 0.15}s` }}
            >
              {index === 0 && <div className="feat-badge">{t("testimonials.featuredBadge")}</div>}
              <div
                className="testimonial-image"
                style={{ backgroundImage: `url(${item.image})` }}
                aria-hidden="true"
              />
              <div className="testimonial-mark">“</div>
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
