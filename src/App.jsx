import { useEffect, useRef, useState } from 'react';
import {
  motion, AnimatePresence, useScroll, useSpring, useTransform, useInView, useMotionValue, animate,
} from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Youtube,
  Quote, Play, MessageCircle, ChevronUp,
} from 'lucide-react';
import Arcs from './components/Arcs.jsx';
import {
  contact, nav, pillars, services, stats, process, work, testimonials,
} from './data.js';

const LOGO = `${import.meta.env.BASE_URL}logo.webp`;
const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.08, ease } }),
};

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* ---------- Preloader ---------- */
function Preloader({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <Arcs className="preloader-arcs" stroke={22} />
          <motion.div
            className="preloader-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            NEXT<span>3</span> MEDIA
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Custom cursor (desktop only) ---------- */
function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => setHover(!!e.target.closest('a, button, .hoverable'));
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); };
  }, [x, y]);
  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div className={`cursor-ring ${hover ? 'is-hover' : ''}`} style={{ x: sx, y: sy }} />
    </>
  );
}

/* ---------- Magnetic button ---------- */
function Magnetic({ children, className = '', onClick, href }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const reset = () => { x.set(0); y.set(0); };
  const Tag = href ? motion.a : motion.button;
  return (
    <Tag
      ref={ref}
      href={href}
      target={href ? '_blank' : undefined}
      rel={href ? 'noreferrer' : undefined}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`btn ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ---------- Navbar ---------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let cur = '';
      nav.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id;
      });
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const go = (id) => { setOpen(false); scrollToId(id); };
  return (
    <motion.header
      className={`nav ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 2.4, ease }}
    >
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => go('home')} aria-label="NEXT3 Media home">
          <img src={LOGO} alt="NEXT3 Media" />
        </button>
        <nav className="nav-links">
          {nav.map((n) => (
            <button key={n.id} onClick={() => go(n.id)} className={active === n.id ? 'active' : ''}>
              {n.label}
              {active === n.id && <motion.span layoutId="nav-underline" className="nav-underline" />}
            </button>
          ))}
        </nav>
        <button className="btn btn-red nav-cta" onClick={() => go('contact')}>
          Let's Talk <ArrowUpRight size={16} />
        </button>
        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {nav.map((n, i) => (
              <motion.button
                key={n.id}
                onClick={() => go(n.id)}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
              >
                <span>0{i + 1}</span>{n.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------- Hero ---------- */
const heroWords = ['Innovate.', 'Automate.', 'Elevate.'];

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yArcs = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [word, setWord] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWord((w) => (w + 1) % heroWords.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="hero-grid-bg" />
      <div className="hero-glow" />
      <motion.div className="hero-arcs" style={{ y: yArcs, rotate: rot }}>
        <Arcs delay={2.2} stroke={22} />
      </motion.div>

      <motion.div className="hero-content container" style={{ y: yText, opacity }}>
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.5, duration: 0.8, ease }}
        >
          <span className="line" /> PR · Events · Media · Marketing
        </motion.div>

        <h1 className="hero-title">
          {['We Take', 'Your Brand', 'To The'].map((l, i) => (
            <span className="reveal-line" key={l}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 2.5 + i * 0.12, duration: 1, ease }}
              >
                {l}
              </motion.span>
            </span>
          ))}
          <span className="reveal-line">
            <motion.span
              className="red"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ delay: 2.86, duration: 1, ease }}
            >
              Next Level<span className="dot">.</span>
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="hero-rotator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
        >
          <span className="three">3</span>
          <div className="rotator-window">
            <AnimatePresence mode="wait">
              <motion.span
                key={word}
                initial={{ y: 40, opacity: 0, filter: 'blur(6px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -40, opacity: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease }}
              >
                {heroWords[word]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3, duration: 0.8 }}
        >
          A full-service media house for PR, corporate events, weddings, film production and
          digital marketing — creating moments people remember and brands people trust.
        </motion.p>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.45, duration: 0.8 }}
        >
          <Magnetic className="btn-red btn-lg" onClick={() => scrollToId('contact')}>
            Start a Project <ArrowRight size={18} />
          </Magnetic>
          <Magnetic className="btn-ghost btn-lg" onClick={() => scrollToId('work')}>
            <span className="play"><Play size={14} fill="currentColor" /></span> View Our Work
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.button
        className="scroll-hint"
        onClick={() => scrollToId('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8 }}
      >
        <span>Scroll</span>
        <div className="mouse"><motion.i animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} /></div>
      </motion.button>
    </section>
  );
}

/* ---------- Marquee ---------- */
function Marquee({ items, reverse = false, variant = 'red' }) {
  const list = [...items, ...items];
  return (
    <div className={`marquee marquee-${variant}`}>
      <div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
        {list.map((t, i) => (
          <span key={i} className="marquee-item">{t}<i>✦</i></span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Section heading ---------- */
function Heading({ kicker, title, light = false, center = false }) {
  return (
    <div className={`heading ${light ? 'light' : ''} ${center ? 'center' : ''}`}>
      <motion.span className="kicker" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <span className="line" /> {kicker}
      </motion.span>
      <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {title}
      </motion.h2>
    </div>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <div>
          <Heading kicker="Who We Are" title={<>One agency.<br />Three pillars.<br /><span className="red">Endless impact.</span></>} />
          <motion.p className="lead" variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={{ once: true }}>
            NEXT3 Media is a modern, technology-driven media and communications company. From the
            boardroom to the wedding mandapam, from the press release to the viral reel — we plan,
            produce and promote stories that move people.
          </motion.p>
          <motion.p className="body" variants={fadeUp} custom={3} initial="hidden" whileInView="show" viewport={{ once: true }}>
            Our team of PR strategists, event specialists, filmmakers, photographers and digital
            marketers work as one — so your brand gets a single, powerful voice across every channel.
          </motion.p>
        </div>
        <div className="pillars">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              className="pillar hoverable"
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              whileHover={{ x: 10 }}
            >
              <span className="pillar-no">{p.no}</span>
              <div>
                <h3>{p.title}<span className="red">.</span></h3>
                <p>{p.text}</p>
              </div>
              <ArrowUpRight className="pillar-arrow" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function ServiceCard({ s, i }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setPos({ x: px * 100, y: py * 100 });
    ry.set((px - 0.5) * 10);
    rx.set(-(py - 0.5) * 10);
  };
  const leave = () => { rx.set(0); ry.set(0); };
  const Icon = s.icon;
  return (
    <motion.article
      ref={ref}
      className="service-card hoverable"
      variants={fadeUp}
      custom={i % 3}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ rotateX: srx, rotateY: sry, '--mx': `${pos.x}%`, '--my': `${pos.y}%` }}
    >
      <div className="service-top">
        <div className="service-icon"><Icon size={26} strokeWidth={1.8} /></div>
        <span className="service-no">{String(i + 1).padStart(2, '0')}</span>
      </div>
      <h3>{s.title}</h3>
      <p>{s.text}</p>
      <button className="service-link" onClick={() => scrollToId('contact')}>
        Enquire <ArrowRight size={16} />
      </button>
    </motion.article>
  );
}

function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="services-head">
          <Heading kicker="What We Do" light title={<>Services under <span className="red">NEXT3</span> Media</>} />
          <motion.p className="services-intro" variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={{ once: true }}>
            Nine specialised services, one integrated team. Pick one, or let us run the whole show.
          </motion.p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2.2, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return <span ref={ref}>{n}<em>{suffix}</em></span>;
}

function Stats() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <motion.div key={s.label} className="stat" variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="stat-value"><Counter value={s.value} suffix={s.suffix} /></div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const width = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), { stiffness: 80, damping: 20 });
  return (
    <section id="process" className="section process" ref={ref}>
      <div className="container">
        <Heading kicker="How We Work" center title={<>From idea to <span className="red">impact</span></>} />
        <div className="process-track">
          <div className="process-line"><motion.div className="process-fill" style={{ width }} /></div>
          <div className="process-steps">
            {process.map((p, i) => (
              <motion.div key={p.title} className="process-step" variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div className="process-dot"><span>{i + 1}</span></div>
                <h4>{p.title}</h4>
                <p>{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Work / Portfolio ---------- */
function Work() {
  return (
    <section id="work" className="section work">
      <div className="container">
        <div className="services-head">
          <Heading kicker="Featured Work" light title={<>Stories we've <span className="red">brought to life</span></>} />
          <motion.p className="services-intro" variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={{ once: true }}>
            A glimpse of events, films and campaigns crafted by our team.
          </motion.p>
        </div>
        <div className="work-grid">
          {work.map((w, i) => (
            <motion.div
              key={w.title}
              className={`work-card ${w.size} hoverable`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              <motion.div
                className="work-curtain"
                variants={{ hidden: { scaleY: 1 }, show: { scaleY: 0 } }}
                transition={{ duration: 1.1, delay: (i % 3) * 0.12, ease: [0.76, 0, 0.24, 1] }}
              />
              <div className={`work-bg bg-${i % 6}`}>
                <Arcs className="work-arcs" stroke={14} />
              </div>
              <div className="work-overlay">
                <span className="work-tag">{w.tag}</span>
                <h3>{w.title}</h3>
                <span className="work-view">View Project <ArrowUpRight size={16} /></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];
  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <Heading kicker="Client Love" center title={<>What our clients <span className="red">say</span></>} />
        <div className="testi-box">
          <Quote className="testi-quote" size={64} />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="testi-text">“{t.quote}”</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.name.charAt(0)}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="testi-dots">
            {testimonials.map((_, k) => (
              <button key={k} onClick={() => setI(k)} className={k === i ? 'active' : ''} aria-label={`Testimonial ${k + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA band ---------- */
function CTA() {
  return (
    <section className="cta">
      <Arcs className="cta-arcs" stroke={18} />
      <div className="container cta-inner">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          Ready to make your<br />next move <span className="outline">unforgettable?</span>
        </motion.h2>
        <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Magnetic className="btn-white btn-lg" onClick={() => scrollToId('contact')}>
            Let's Talk <ArrowRight size={18} />
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const text = `Hi NEXT3 Media!\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${form.service}\n\n${form.message}`;
    window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
  };
  const info = [
    { icon: Phone, label: 'Call Us', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email Us', value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: 'Visit Us', value: contact.address },
  ];
  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid">
        <div>
          <Heading kicker="Get In Touch" title={<>Let's create something <span className="red">remarkable</span></>} />
          <motion.p className="lead" variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={{ once: true }}>
            Tell us about your event, brand or campaign. We'll get back within 24 hours.
          </motion.p>
          <div className="contact-info">
            {info.map((c, i) => {
              const Icon = c.icon;
              const Inner = (
                <>
                  <div className="ci-icon"><Icon size={20} /></div>
                  <div><span>{c.label}</span><strong>{c.value}</strong></div>
                </>
              );
              return (
                <motion.div key={c.label} variants={fadeUp} custom={i + 3} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  {c.href ? <a className="ci" href={c.href}>{Inner}</a> : <div className="ci">{Inner}</div>}
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.form
          className="contact-form"
          onSubmit={submit}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="row">
            <label><span>Your Name</span><input required value={form.name} onChange={update('name')} placeholder="John Doe" /></label>
            <label><span>Phone</span><input required value={form.phone} onChange={update('phone')} placeholder="+91" /></label>
          </div>
          <label><span>Email</span><input type="email" value={form.email} onChange={update('email')} placeholder="you@company.com" /></label>
          <label>
            <span>Service Needed</span>
            <select required value={form.service} onChange={update('service')}>
              <option value="" disabled>Select a service</option>
              {services.map((s) => <option key={s.title}>{s.title}</option>)}
            </select>
          </label>
          <label><span>Message</span><textarea rows={4} value={form.message} onChange={update('message')} placeholder="Tell us about your project..." /></label>
          <button type="submit" className="btn btn-red btn-lg btn-block">
            {sent ? 'Opening WhatsApp…' : <>Send Enquiry <ArrowRight size={18} /></>}
          </button>
          <small className="form-note">Your enquiry opens in WhatsApp so we can reply instantly.</small>
        </motion.form>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const socials = [
    { icon: Instagram, href: contact.instagram, label: 'Instagram' },
    { icon: Facebook, href: contact.facebook, label: 'Facebook' },
    { icon: Linkedin, href: contact.linkedin, label: 'LinkedIn' },
    { icon: Youtube, href: contact.youtube, label: 'YouTube' },
  ];
  return (
    <footer className="footer">
      <div className="footer-big" aria-hidden="true">NEXT<span>3</span></div>
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo"><img src={LOGO} alt="NEXT3 Media" /></div>
          <p>Innovate. Automate. Elevate.<br />Your partner for PR, events, media and marketing.</p>
          <div className="socials">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} whileHover={{ y: -4, rotate: -6 }}>
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
        <div>
          <h5>Quick Links</h5>
          {nav.map((n) => <button key={n.id} onClick={() => scrollToId(n.id)}>{n.label}</button>)}
        </div>
        <div>
          <h5>Services</h5>
          {services.slice(0, 6).map((s) => <button key={s.title} onClick={() => scrollToId('services')}>{s.title}</button>)}
        </div>
        <div>
          <h5>Contact</h5>
          <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <span>{contact.address}</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} NEXT3 Media. All rights reserved.</span>
        <span>Crafted with <b className="red">♥</b> in India</span>
      </div>
    </footer>
  );
}

/* ---------- Floating actions ---------- */
function Floating() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <>
      <motion.a
        className="fab-wa"
        href={`https://wa.me/${contact.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3.6, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
      >
        <MessageCircle size={26} />
      </motion.a>
      <AnimatePresence>
        {show && (
          <motion.button
            className="fab-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            aria-label="Back to top"
          >
            <ChevronUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- App ---------- */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2200);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    document.body.style.overflow = loaded ? '' : 'hidden';
  }, [loaded]);

  return (
    <>
      <Preloader done={loaded} />
      <Cursor />
      <motion.div className="progress" style={{ scaleX }} />
      <Navbar />
      <main>
        <Hero />
        <Marquee items={services.map((s) => s.title)} />
        <About />
        <Services />
        <Stats />
        <Process />
        <Marquee items={['Innovate', 'Automate', 'Elevate', 'NEXT3 Media']} reverse variant="dark" />
        <Work />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <Floating />
    </>
  );
}
