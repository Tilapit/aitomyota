import React, { useEffect, useRef } from "react";

type Testimonial = {
  quote: string;
  name: string;
  context: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "I expected another long directory and more uncertainty. Instead, I got three thoughtful recommendations and understood why each one could work for me.",
    name: "Emilia, 31",
    context: "Started with the shorter quiz",
  },
  {
    quote:
      "The deeper version helped me notice what kind of therapist I actually needed, not just what topic I wanted to talk about. That changed everything.",
    name: "Jonas, 42",
    context: "Chose the deeper quiz",
  },
  {
    quote:
      "What I appreciated most was that the first step felt gentle. I did not need perfect words, and I still felt understood.",
    name: "Mira, 27",
    context: "Booked after her first recommendation",
  },
];

const TestimonialsSection: React.FC = () => {
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
      <div className="s-label">Testimonials</div>
      <h2>What people say about starting here</h2>
      <p className="s-sub">
        The first step matters. These are the kinds of things people tell us after
        they have moved from uncertainty into a match that actually felt right.
      </p>

      <div className="profiles-grid">
        {testimonials.map((item, index) => (
          <article
            key={item.name}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className={`p-card${index === 0 ? " featured" : ""}`}
            style={{ opacity: 0, transitionDelay: `${index * 0.15}s` }}
          >
            {index === 0 && <div className="feat-badge">Most loved</div>}
            <div className="testimonial-mark">“</div>
            <div className="testimonial-quote">{item.quote}</div>
            <div className="testimonial-meta">
              <div className="testimonial-name">{item.name}</div>
              <div className="testimonial-context">{item.context}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
