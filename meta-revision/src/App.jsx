import { useEffect, useMemo, useState } from "react";
import { allConcepts, modules } from "./courseData.js";

const STORAGE_KEY = "levelled-news-react-revision-v1";

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? { complete: [], answers: {} };
  } catch {
    return { complete: [], answers: {} };
  }
}

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.3-4.3m2.3-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" /></svg>;
}

function Sidebar({ activeModule, setActiveModule, progress, onShowAll, mobileOpen, closeMobile }) {
  return (
    <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
      <div className="brand">
        <div className="brand-mark">R</div>
        <div><strong>React Revision</strong><span>for Levelled News</span></div>
      </div>
      <button className="close-nav" onClick={closeMobile} aria-label="Close navigation">×</button>
      <nav aria-label="Course modules">
        <button className={`module-link ${activeModule === "all" ? "active" : ""}`} onClick={() => { onShowAll(); closeMobile(); }}>
          <span className="module-number">00</span><span><strong>All concepts</strong><small>{allConcepts.length} notes</small></span>
        </button>
        {modules.map((module) => {
          const done = module.concepts.filter((concept) => progress.complete.includes(concept.id)).length;
          return (
            <button key={module.id} className={`module-link ${activeModule === module.id ? "active" : ""}`} onClick={() => { setActiveModule(module.id); closeMobile(); }}>
              <span className="module-number">{module.number}</span>
              <span><strong>{module.title}</strong><small>{done}/{module.concepts.length} reviewed</small></span>
            </button>
          );
        })}
      </nav>
      <div className="privacy-note"><span>●</span><p><strong>Private by default</strong>Your progress stays in this browser.</p></div>
    </aside>
  );
}

function ConceptCard({ concept, isComplete, onToggleComplete, answerOpen, onToggleAnswer }) {
  const [exampleOpen, setExampleOpen] = useState(false);
  return (
    <article className={`concept-card ${isComplete ? "complete" : ""}`} id={concept.id}>
      <div className="concept-heading">
        <div><span className="eyebrow">{concept.moduleTitle}</span><h2>{concept.title}</h2></div>
        <button className="complete-button" onClick={onToggleComplete} aria-pressed={isComplete}>{isComplete ? "✓ Reviewed" : "Mark reviewed"}</button>
      </div>
      <p className="summary">{concept.summary}</p>
      <ul className="key-points">{concept.points.map((point) => <li key={point}>{point}</li>)}</ul>
      <details open={exampleOpen} onToggle={(event) => setExampleOpen(event.currentTarget.open)}>
        <summary><span>Code example</span><span className="chevron">⌄</span></summary>
        <div className="example-body"><pre><code>{concept.code}</code></pre></div>
      </details>
      <div className="project-link">
        <div className="project-icon">LN</div>
        <div><span>LEVELLED NEWS CONNECTION</span><p>{concept.connection}</p></div>
      </div>
      <div className="question-box">
        <span className="question-label">CHECK YOUR UNDERSTANDING</span>
        <p>{concept.question}</p>
        <button onClick={onToggleAnswer}>{answerOpen ? "Hide answer" : "Reveal answer"}</button>
        {answerOpen && <div className="answer"><strong>Answer</strong>{concept.answer}</div>}
      </div>
    </article>
  );
}

function App() {
  const [activeModule, setActiveModule] = useState("all");
  const [query, setQuery] = useState("");
  const [progress, setProgress] = useState(loadProgress);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)), [progress]);

  const visibleConcepts = useMemo(() => {
    const normalised = query.trim().toLowerCase();
    return allConcepts.filter((concept) => {
      const inModule = activeModule === "all" || concept.moduleId === activeModule;
      const text = [concept.title, concept.summary, concept.connection, concept.moduleTitle, ...concept.points, ...concept.tags].join(" ").toLowerCase();
      return inModule && (!normalised || text.includes(normalised));
    });
  }, [activeModule, query]);

  const currentModule = modules.find((module) => module.id === activeModule);
  const percent = Math.round((progress.complete.length / allConcepts.length) * 100);

  function toggleComplete(id) {
    setProgress((current) => ({ ...current, complete: current.complete.includes(id) ? current.complete.filter((item) => item !== id) : [...current.complete, id] }));
  }

  function toggleAnswer(id) {
    setProgress((current) => ({ ...current, answers: { ...current.answers, [id]: !current.answers[id] } }));
  }

  return (
    <div className="app-shell">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} progress={progress} onShowAll={() => setActiveModule("all")} mobileOpen={mobileOpen} closeMobile={() => setMobileOpen(false)} />
      <main className="main-content">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation">☰</button>
          <label className="search"><SearchIcon /><span className="sr-only">Search notes</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search hooks, state, forms…" /><kbd>/</kbd></label>
          <div className="progress-summary"><span>{progress.complete.length} of {allConcepts.length}</span><div className="progress-track"><i style={{ width: `${percent}%` }} /></div><strong>{percent}%</strong></div>
        </header>
        <div className="content-wrap">
          <section className="hero">
            <span className="hero-kicker">META PROFESSIONAL REACT DEVELOPMENT</span>
            <h1>{currentModule ? currentModule.title : "Your React knowledge, connected."}</h1>
            <p>{currentModule ? currentModule.subtitle : "Search your course concepts, test your understanding, and see exactly where each idea belongs in Levelled News."}</p>
          </section>
          <div className="results-bar"><span>{visibleConcepts.length} {visibleConcepts.length === 1 ? "concept" : "concepts"}{query && ` matching “${query}”`}</span>{(query || activeModule !== "all") && <button onClick={() => { setQuery(""); setActiveModule("all"); }}>Clear filters</button>}</div>
          <section className="concept-list" aria-live="polite">
            {visibleConcepts.map((concept) => <ConceptCard key={concept.id} concept={concept} isComplete={progress.complete.includes(concept.id)} onToggleComplete={() => toggleComplete(concept.id)} answerOpen={Boolean(progress.answers[concept.id])} onToggleAnswer={() => toggleAnswer(concept.id)} />)}
            {!visibleConcepts.length && <div className="empty-state"><strong>No matching notes</strong><p>Try a broader term such as “state”, “API” or “forms”.</p></div>}
          </section>
        </div>
      </main>
      {mobileOpen && <button className="scrim" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}
    </div>
  );
}

export default App;
