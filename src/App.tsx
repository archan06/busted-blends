import { useState, type CSSProperties } from "react";
import PerspectiveTunnelHero from "./components/ui/perspective-tunnel-hero";

const PHONE = "+12488023662", PHONE_LABEL = "(248) 802-3662";
const EMAIL = "bustedblends@gmail.com";
const IG = "alexbusted";

const CUTS = [
  { src: "/cuts/8.jpg", alt: "Side profile of a textured crop with a mid drop fade", pos: "50% 30%" },
  { src: "/cuts/2.jpg", alt: "Side profile of a messy textured crop with a low taper", pos: "50% 45%" },
  { src: "/cuts/5.jpg", alt: "Side profile of a short spiky crop with a temple taper", pos: "40% 45%" },
  { src: "/cuts/7.jpg", alt: "Side profile of a textured fringe with a taper behind the ear", pos: "50% 45%" },
  { src: "/cuts/4.jpg", alt: "Side profile of a wavy fringe with a burst taper and length kept at the back", pos: "50% 40%" },
  { src: "/cuts/3.jpg", alt: "Two-block cut with a low taper, top hair lifted to show the undercut", pos: "50% 45%" },
  { src: "/cuts/6.jpg", alt: "Side profile of a layered wolf cut with curls on top", pos: "40% 40%" },
];

const Icon = ({ id }: { id: string }) => <svg className="icon" aria-hidden="true"><use href={`#${id}`} /></svg>;

// Chromium can refract the backdrop through the SVG filter; others keep the frost
const refract = ((navigator as any).userAgentData?.brands ?? []).some((b: { brand: string }) => /Chromium/.test(b.brand));

// Hover Expand gallery, modeled on 21st.dev "Hover Expand Gallery" (kedhareswer): rails that open on hover/tap
function Cuts() {
  const [open, setOpen] = useState(0);
  // Mouse only: on touch, pointerenter fires as a scroll starts and would jump the layout
  const hover = (i: number) => (e: React.PointerEvent) => { if (e.pointerType === "mouse") setOpen(i); };
  return (
    <ul className="hx">
      {CUTS.map((c, i) => (
        <li key={c.src} className={`hx-panel${i === open ? " is-open" : ""}`} onPointerEnter={hover(i)}>
          <button type="button" aria-expanded={i === open} aria-label={c.alt} onClick={() => setOpen(i)} onFocus={() => setOpen(i)}>
            <img src={c.src} alt="" width={790} height={1000} loading="lazy" style={{ objectPosition: c.pos }} />
          </button>
        </li>
      ))}
      <li className={`hx-panel hx-book${open === CUTS.length ? " is-open" : ""}`} onPointerEnter={hover(CUTS.length)}>
        <a href="#book" onFocus={() => setOpen(CUTS.length)}>
          <span className="hx-rail" aria-hidden="true">Book</span>
          <span className="hx-big"><span className="big">Your cut<br />goes here</span><span className="go">Book a cut <Icon id="i-down" /></span></span>
        </a>
      </li>
    </ul>
  );
}

function Nav() {
  const [pill, setPill] = useState<CSSProperties>({ opacity: 0 });
  const show = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const a = e.currentTarget;
    setPill({ opacity: 1, width: a.offsetWidth, transform: `translateX(${a.offsetLeft}px)` });
  };
  return (
    <nav className={`nav${refract ? " refract-nav" : ""}`} aria-label="Main" onPointerLeave={() => setPill(p => ({ ...p, opacity: 0 }))}>
      <span className="nav-pill" aria-hidden="true" style={pill} />
      <a className="mark" href="#top" aria-label="Busted Blends home" onPointerEnter={show}>B<span>B</span></a>
      <a href="#cuts" onPointerEnter={show}>Cuts</a>
      <a href={`https://instagram.com/${IG}`} target="_blank" rel="noopener" aria-label="Instagram (opens Instagram)" onPointerEnter={show}><Icon id="i-ig" /></a>
      <a className="nav-book" href="#book">Book</a>
    </nav>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <header id="top">
        <PerspectiveTunnelHero>
          <h1 className="title">Busted<br /><span>Blends</span></h1>
          <p className="lede">Stony Brook University student barber. Fades, tapers and textured crops, cut right on campus.</p>
          <div className="actions pointer-events-auto">
            <a className="btn" href="#book">Book a cut <Icon id="i-down" /></a>
            <a className="link" href="#cuts">See the cuts</a>
          </div>
        </PerspectiveTunnelHero>
      </header>

      <main>
        <section className="section" id="cuts" aria-labelledby="cuts-title">
          <div className="section-head">
            <h2 className="h2" id="cuts-title">Fresh out<br />the chair</h2>
            <p>Real cuts on real Stony Brook students, shot right after. No filters, no stock photos.</p>
          </div>
          <Cuts />
        </section>

        <section className="section" id="book" aria-labelledby="book-title">
          <div className="book-wrap">
            <div className="book-copy">
              <h2 className="h2" id="book-title">Book a cut</h2>
              <p>Text, call, email or DM to set up a time. I cut on campus at Stony Brook University.</p>
            </div>
            <div className="book">
              <p className="book-head">Busted Blends</p>
              <ul className="ways">
                <li><a href={`sms:${PHONE}`}><Icon id="i-text" /><span>Text<small>{PHONE_LABEL}</small></span></a></li>
                <li><a href={`tel:${PHONE}`}><Icon id="i-phone" /><span>Call<small>{PHONE_LABEL}</small></span></a></li>
                <li><a href={`mailto:${EMAIL}`}><Icon id="i-mail" /><span>Email<small>{EMAIL}</small></span></a></li>
                <li><a href={`https://instagram.com/${IG}`} target="_blank" rel="noopener"><Icon id="i-ig" /><span>Instagram<small>@{IG}</small></span></a></li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <span>© Busted Blends · Stony Brook, NY</span>
        <a href={`https://instagram.com/${IG}`} target="_blank" rel="noopener">@{IG}</a>
      </footer>
    </>
  );
}
