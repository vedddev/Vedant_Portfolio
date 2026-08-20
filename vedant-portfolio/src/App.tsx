import { useEffect, useState } from "react";
import Lenis from "lenis";
import profile from "./assets/profile.jpg";

type Theme = "light" | "dark";

const readTheme = (): Theme =>
  (document.documentElement.getAttribute("data-theme") as Theme) || "light";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  return (
    <button
      type="button"
      className="toggle"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
        </svg>
      )}
    </button>
  );
};

const Kaizen = () => (
  <section className="kaizen">
    <div className="kaizen-word" tabIndex={0} aria-describedby="kaizen-def">
      改善
      <div className="kaizen-card" id="kaizen-def" role="note">
        <div className="kaizen-head">
          <span className="jp">改善</span>
          <span className="dash" />
          <span className="romaji">/kaizen/</span>
        </div>
        <div className="kaizen-pos">NOUN</div>
        <p className="kaizen-def">
          Continuous improvement; changing for the better.
        </p>
      </div>
    </div>
  </section>
);

// abstract bar glyphs — same family, one per entry
const ICONS = {
  bars: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <rect x="5" y="6.5" width="14" height="3" rx="1.5" />
      <rect x="5" y="12" width="9" height="3" rx="1.5" />
      <rect x="5" y="17.5" width="12" height="3" rx="1.5" />
    </svg>
  ),
  steps: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="14" width="4" height="6" rx="1.6" />
      <rect x="10" y="9.5" width="4" height="10.5" rx="1.6" />
      <rect x="16" y="5" width="4" height="15" rx="1.6" />
    </svg>
  ),
  split: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="5" width="6.5" height="6.5" rx="2" />
      <rect x="13.5" y="5" width="6.5" height="6.5" rx="2" />
      <rect x="4" y="14.5" width="16" height="4.5" rx="2.2" />
    </svg>
  ),
} as const;

type IconName = keyof typeof ICONS;

type ExpProps = {
  company: string;
  role: string;
  icon: IconName;
  via?: { label: string; href?: string };
  period: string;
  children: React.ReactNode;
};

const Experience = ({ company, role, icon, via, period, children }: ExpProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`exp${open ? " open" : ""}`}>
      <button
        type="button"
        className="exp-head"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="exp-mark" aria-hidden="true">
          {ICONS[icon]}
        </span>
        <span className="exp-id">
          <span className="exp-company">
            {company}
            <svg className="exp-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 15 6-6 6 6" />
            </svg>
          </span>
          <span className="exp-role">{role}</span>
          {via && (
            <span className="exp-via">
              via{" "}
              {via.href ? (
                <a
                  href={via.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {via.label}
                </a>
              ) : (
                <span className="u">{via.label}</span>
              )}
            </span>
          )}
        </span>
        <span className="exp-period">{period}</span>
      </button>
      <div className="exp-body">
        <div className="exp-body-inner">
          <p className="exp-text">{children}</p>
        </div>
      </div>
    </div>
  );
};

const EMAIL = "vedantshelake28@gmail.com";

const LINKS = {
  linkedin: "https://www.linkedin.com/in/veddev/",
  twitter: "https://x.com/Vedant_ios",
  github: "https://github.com/vedddev",
  kaggle: "https://www.kaggle.com/",
  resume: "/Vedant_Resume.pdf",
};

type Route = "home" | "writing" | "about";

const routeFromHash = (): Route => {
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (hash === "writing") return "writing";
  if (hash === "about") return "about";
  return "home";
};

const Nav = ({ route }: { route: Route }) => {
  const items: { id: Route; label: string; href: string }[] = [
    { id: "home", label: "Work", href: "#/" },
    { id: "writing", label: "Writing", href: "#/writing" },
    { id: "about", label: "About", href: "#/about" },
  ];

  return (
    <nav className="nav">
      <a href="#/" className="brand">
        VED
      </a>
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className={route === item.id ? "active" : undefined}
        >
          {item.label}
        </a>
      ))}
      <ThemeToggle />
    </nav>
  );
};

const Home = () => (
  <>
    <h1>Vedant Shelake</h1>
    <p className="sub">Machine learning developer. Applied ML, computer vision, NLP.</p>

    <p>
      I build ML systems the way the word above is meant: small, honest
      increments. Ship a model, watch it fail on real data, fix the one thing
      that broke it, repeat. Right now that loop is pointed at generative AI,
      LLMs, embeddings, and retrieval-augmented generation.
    </p>

    <p className="links">
      <a href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      <a href={LINKS.twitter} target="_blank" rel="noreferrer">X</a>
      <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
      <a href={LINKS.kaggle} target="_blank" rel="noreferrer">Kaggle</a>
      <a href={LINKS.resume} target="_blank" rel="noreferrer">Résumé</a>
    </p>

    <img className="portrait" src={} alt="Vedant Shelake" />

    <h2>Current Focus</h2>

    <p>
      I'm deeply interested in <strong>applied machine learning</strong>: models
      that leave the notebook and end up in something people actually use. Most of
      my work so far sits in computer vision and NLP: detecting and counting
      vehicles from live video, classifying the credibility of news text,
      predicting when a field needs water.
    </p>

    <p>
      Lately that interest has moved toward generative AI. I'm working through
      LLMs, embeddings, vector retrieval, and prompt design, not as a reading
      list, but by building small systems end to end and seeing where they break.
      I also use AI tooling in my day-to-day workflow: to move faster through
      boilerplate, debug pipelines, and keep project architecture clean.
    </p>

    <blockquote>
      "The best way to learn a model is to ship one, watch it fail on real data,
      and go back and find out why."
      <span className="attrib">a lesson every project has taught me twice</span>
    </blockquote>

    <pre>
      <code>{`What I'm optimizing for:

  clarity     : a model I can explain beats one I can't
  utility     : solves a problem someone actually has
  iteration   : ship, measure, fix, repeat
  depth       : understand the maths under the library call`}</code>
    </pre>

    <h2>Projects</h2>

    <div className="entry">
      <h3>Clear Path</h3>
      <p>
        A real-time computer vision system that monitors traffic flow: it counts
        vehicles, estimates congestion, and dynamically calculates signal
        durations using custom YOLO models and OpenCV pipelines. The interesting
        part wasn't detection; it was turning noisy per-frame counts into a
        stable queue estimate worth acting on.
      </p>
      <p className="tags">
        Python · YOLO · OpenCV · Flask ·{" "}
        <a href="https://github.com/vedddev/Clear_Path" target="_blank" rel="noreferrer">
          source
        </a>
      </p>
    </div>

    <div className="entry">
      <h3>Fake News Detection</h3>
      <p>
        An end-to-end NLP pipeline that cleans, tokenizes, and classifies news
        articles to flag likely misinformation, returning a probability rather
        than a verdict. Most of the work went into the text preprocessing and
        feature choices; the classifier was the easy half.
      </p>
      <p className="tags">
        Python · NLP · Scikit-Learn · EDA ·{" "}
        <a
          href="https://github.com/vedddev/Fake_News_Detection"
          target="_blank"
          rel="noreferrer"
        >
          source
        </a>
      </p>
    </div>

    <div className="entry">
      <h3>Irrigation Need Prediction</h3>
      <p>
        A predictive model that uses soil moisture, temperature, humidity, and
        weather forecasts to estimate how much water a crop actually needs. Built
        around careful feature engineering; the domain signal mattered far more
        than the choice of algorithm.
      </p>
      <p className="tags">
        Python · Machine Learning · Feature Engineering ·{" "}
        <a
          href="https://github.com/vedddev/Irrigation_Need"
          target="_blank"
          rel="noreferrer"
        >
          source
        </a>{" "}
        ·{" "}
        <a
          href="https://irrigation-need.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          live demo
        </a>
      </p>
    </div>

    <h2>Experience</h2>

    <Experience
      company="Independent"
      role="Machine Learning Developer"
      icon="bars"
      via={{ label: "self-directed projects" }}
      period="2025 to present"
    >
      Architected and deployed applied ML systems end to end: real-time vehicle
      monitoring with YOLO, an NLP veracity classifier, and agricultural
      predictive analytics. Covers data collection and cleaning, feature
      engineering, model training and evaluation, and deployment behind a Flask
      service.
    </Experience>

    <Experience
      company="Kaggle"
      role="Contributor"
      icon="bars"
      via={{ label: "Kaggle", href: LINKS.kaggle }}
      period="2025 to present"
    >
      Exploring public datasets, writing benchmark notebooks, and entering
      predictive modeling challenges, mostly as a way to keep sharpening EDA,
      model selection, and evaluation instincts against other people's work.
    </Experience>

    <h2>Toolkit</h2>

    <p>
      <strong>Core:</strong> Python, Machine Learning, Deep Learning
      <br />
      <strong>Specialization:</strong> NLP, Computer Vision (YOLO, OpenCV)
      <br />
      <strong>Data:</strong> EDA, Feature Engineering, Scikit-Learn
      <br />
      <strong>Deployment:</strong> Flask
      <br />
      <strong>Currently learning:</strong> Generative AI, LLMs, RAG architecture,
      prompt engineering
    </p>

    <h2>Roadmap</h2>

    <ul>
      <li>
        <strong>Python</strong>: proficient. Core foundation for everything else.
      </li>
      <li>
        <strong>Machine Learning</strong>: proficient. Classical algorithmic
        modeling.
      </li>
      <li>
        <strong>Deep Learning</strong>: intermediate. Neural networks, PyTorch.
      </li>
      <li>
        <strong>NLP</strong>: intermediate. Text processing and classification.
      </li>
      <li>
        <strong>LLMs</strong>: actively learning. Prompting, fine-tuning
        concepts.
      </li>
      <li>
        <strong>RAG architecture</strong>: actively learning. Vector DBs,
        embeddings, retrieval.
      </li>
    </ul>

    <h2>Get in touch</h2>

    <p>
      My inbox is open, whether it's collaborating on an AI project, talking
      through an ML pipeline, or just saying hello.
    </p>

    <p>
      Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      <br />
      Elsewhere:{" "}
      <a href={LINKS.github} target="_blank" rel="noreferrer">
        GitHub
      </a>
      ,{" "}
      <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
        LinkedIn
      </a>
      ,{" "}
      <a href={LINKS.twitter} target="_blank" rel="noreferrer">
        X
      </a>
      ,{" "}
      <a href={LINKS.kaggle} target="_blank" rel="noreferrer">
        Kaggle
      </a>
    </p>
  </>
);

const Writing = () => (
  <>
    <h1>Writing</h1>
    <p className="sub">Notes on what I'm building and what I got wrong.</p>

    <p>
      I'm starting to write up the things I learn while building. Nothing
      published yet. These are the pieces currently in draft:
    </p>

    <div className="entry">
      <h3>Counting cars is easy. Counting a queue is not.</h3>
      <p className="meta">Draft</p>
      <p>
        What broke when I moved vehicle detection from clean test footage to a
        live traffic feed, and why per-frame counts are the wrong unit for
        deciding a signal duration.
      </p>
    </div>

    <div className="entry">
      <h3>The preprocessing did most of the work</h3>
      <p className="meta">Draft</p>
      <p>
        Notes from the fake news classifier: how much accuracy came from text
        cleaning and feature choices versus the model, and what that says about
        where to spend time on an NLP problem.
      </p>
    </div>

    <div className="entry">
      <h3>Reading the RAG stack from the bottom up</h3>
      <p className="meta">Draft</p>
      <p>
        Embeddings, vector stores, chunking, retrieval quality, working through
        each layer by building a small system instead of reading about a big one.
      </p>
    </div>

    <p className="muted">
      Until these land, my projects are on{" "}
      <a href={LINKS.github} target="_blank" rel="noreferrer">
        GitHub
      </a>{" "}
      and shorter thoughts go on{" "}
      <a href={LINKS.twitter} target="_blank" rel="noreferrer">
        X
      </a>
      .
    </p>
  </>
);

const About = () => (
  <>
    <h1>About</h1>
    <p className="sub">The longer version.</p>

    <p>
      I'm Vedant, an AI developer who got into this because I wanted to build
      things that work, not just things that score well. My focus is applied
      machine learning: taking a real problem, finding the data that describes
      it, and shipping a model that does something useful with it.
    </p>

    <h2>How I work</h2>

    <p>
      I care about clarity over cleverness. A model I can explain to someone
      else is worth more than one that edges out a slightly better metric and
      nobody understands. Most of my time on a project goes into the parts
      before the model: understanding the data, engineering features, figuring
      out what "good" even means for this problem.
    </p>

    <p>
      I also lean on modern AI tooling as part of my everyday workflow rather
      than iterating everything by hand: speeding up development, debugging
      complex pipelines, generating cleaner code, and keeping project
      architecture tidy. It's a multiplier, not a substitute for knowing what
      the code does.
    </p>

    <h2>What I'm learning</h2>

    <p>
      Currently going deep on generative AI: large language models, retrieval-
      augmented generation, vector databases and embeddings, and advanced prompt
      engineering. My method is the same as always. Build something small, see
      where it fails, then go read the thing that explains why.
    </p>

    <h2>Background</h2>

    <p>
      So far my experience comes from self-directed work: three end-to-end ML
      projects across computer vision, NLP, and predictive analytics, plus
      ongoing contributions on Kaggle where I write benchmark notebooks and take
      on modeling challenges. I'm open to AI collaborations and to work where I
      can keep building in public.
    </p>

    <h2>Elsewhere</h2>

    <p>
      <a href={LINKS.github} target="_blank" rel="noreferrer">
        GitHub
      </a>{" "}
      ·{" "}
      <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
        LinkedIn
      </a>{" "}
      ·{" "}
      <a href={LINKS.twitter} target="_blank" rel="noreferrer">
        X
      </a>{" "}
      ·{" "}
      <a href={LINKS.kaggle} target="_blank" rel="noreferrer">
        Kaggle
      </a>{" "}
      ·{" "}
      <a href={LINKS.resume} target="_blank" rel="noreferrer">
        Resume
      </a>{" "}
      · <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
    </p>
  </>
);

export default function App() {
  const [route, setRoute] = useState<Route>(routeFromHash);

  // smooth scrolling (skipped when the OS asks for reduced motion)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, wheelMultiplier: 0.9 });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(routeFromHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.title =
      route === "home"
        ? "Vedant Shelake"
        : route === "writing"
          ? "Writing · Vedant Shelake"
          : "About · Vedant Shelake";
  }, [route]);

  return (
    <div className="page">
      <div className="edge edge-top" aria-hidden="true" />
      <div className="edge edge-bottom" aria-hidden="true" />
      <Nav route={route} />
      <Kaizen />
      <main>
        {route === "home" && <Home />}
        {route === "writing" && <Writing />}
        {route === "about" && <About />}
      </main>
      <footer className="foot">
        <span className="sig">VEDANT SHELAKE</span>
        <span>built by vedant</span>
      </footer>
    </div>
  );
}
