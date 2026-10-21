import React, {useState,useEffect,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowUpRight, ArrowDown, ArrowRight, ArrowUp, Leaf, Sprout, Milk, Wheat, HeartPulse, Droplets, Menu, X, Download, Plus, Minus, Check, Tractor, Store, Globe2, MessageCircle} from 'lucide-react';
import {content,languages} from './content';
import './premium.css';
import ContactActions from './ContactActions';
import {support,contactLabels,whatsappHref} from './contact';

const brochure='/assets/dudhvardhini-brochure-marathi.pdf';
const ids=['story','benefits','ingredients','guide'];
const benefitIcons=[Milk,Droplets,Wheat,HeartPulse];
const herbAssets=['shatavari','ashwagandha','fenugreek','turmeric','amla','harad-ajwain'];

function HeroVideo({lang}) {
  const videoRef=useRef(null);
  const [motion,setMotion]=useState(()=>!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [playing,setPlaying]=useState(false);
  const [failed,setFailed]=useState(false);
  const [videoSrc,setVideoSrc]=useState(()=>window.matchMedia('(min-width: 1921px)').matches?'/assets/cattle-hero-4k.mp4':window.matchMedia('(max-width: 700px)').matches?'/assets/cattle-hero.mp4':'/assets/cattle-hero-1080.mp4');
  useEffect(()=>{
    const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
    const update=()=>setMotion(!preference.matches);
    preference.addEventListener('change',update);
    return()=>preference.removeEventListener('change',update);
  },[]);
  useEffect(()=>{
    if(motion) videoRef.current?.play().catch(()=>setPlaying(false));
    else videoRef.current?.pause();
  },[motion,videoSrc]);
  const label=playing
    ? {mr:'व्हिडिओ थांबवा',hi:'वीडियो रोकें',en:'Pause video'}[lang]
    : {mr:'व्हिडिओ सुरू करा',hi:'वीडियो चलाएँ',en:'Play video'}[lang];
  return <>
    <div className="hero-media" aria-hidden="true">
      {!failed&&<video ref={videoRef} src={videoSrc} autoPlay={motion} muted loop playsInline preload={motion?'auto':'none'} poster="/assets/cattle-hero-poster-hd.jpg" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>{if(videoSrc.includes('-4k'))setVideoSrc('/assets/cattle-hero-1080.mp4');else if(videoSrc.includes('-1080'))setVideoSrc('/assets/cattle-hero.mp4');else setFailed(true);}}/>}
    </div>
    {!failed&&<button className="video-toggle" aria-label={label} onClick={()=>{if(!playing&&motion)videoRef.current?.play().catch(()=>{});else setMotion(!motion);}}><span aria-hidden="true">{playing?'Ⅱ':'▶'}</span>{label}</button>}
  </>;
}

function App(){
  const [lang,setLang]=useState(()=>{try{const l=localStorage.getItem('dudhvardhini-language');return content[l]?l:'mr';}catch{return 'mr';}});
  const [menu,setMenu]=useState(false);
  const [openFaq,setOpenFaq]=useState(0);
  const t=content[lang];
  const c=contactLabels[lang];
  const number=(value,min=1)=>new Intl.NumberFormat(lang==='en'?'en-IN':'mr-IN',{numberingSystem:lang==='en'?'latn':'deva',minimumIntegerDigits:min,useGrouping:false}).format(value);
  useEffect(()=>{document.documentElement.lang=lang;document.title=t.title;document.querySelector('meta[name="description"]').content=t.description;try{localStorage.setItem('dudhvardhini-language',lang);}catch{}},[lang,t]);
  useEffect(()=>{if(!menu)return;const close=e=>{if(e.key==='Escape')setMenu(false);};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close);},[menu]);
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}),{threshold:0.08});
    document.querySelectorAll('.story,.benefits,.ingredients,.product-section,.guide,.partners,.faq').forEach(el=>observer.observe(el));
    return()=>observer.disconnect();
  },[]);
  const go=()=>setMenu(false);
  return <>
    <a className="skip" href="#main">{lang==='en'?'Skip to content':lang==='hi'?'मुख्य जानकारी पर जाएँ':'मुख्य माहितीकडे जा'}</a>
    <div className="announcement"><div className="wrap"><span><Sprout size={14}/>{t.strip}</span><a className="top-support" href={`tel:${support.phone}`}><span>{c.support}</span><bdi>{number(Number(support.number))}</bdi></a></div></div>
    <header className="header"><div className="wrap header-inner">
      <a href="#" className="brand" onClick={go} aria-label={t.brand}><img src="/assets/logo-hd.webp" alt=""/><span><strong>{t.brand}</strong><small>{t.tagline}</small></span></a>
      <nav className="desktop-nav" aria-label={lang==='en'?'Main navigation':lang==='hi'?'मुख्य नेविगेशन':'मुख्य नेव्हिगेशन'}>{t.nav.map((x,i)=><a key={ids[i]} href={'#'+ids[i]}>{x}</a>)}</nav>
      <div className="header-actions"><label className="language"><Globe2 size={15}/><select aria-label={t.language} value={lang} onChange={e=>setLang(e.target.value)}>{languages.map((l,i)=><option key={l.code} value={l.code}>{t.languageNames[i]}</option>)}</select></label><a className="business-link" href="#partners">{t.business}<ArrowUpRight size={16}/></a><button className="menu-button" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-controls="mobile-nav" aria-label={menu?t.close:t.menu}>{menu?<X/>:<Menu/>}</button></div>
    </div>{menu&&<nav id="mobile-nav" className="mobile-nav" aria-label={t.menu}>{t.nav.map((x,i)=><a onClick={go} key={ids[i]} href={'#'+ids[i]}>{x}<ArrowUpRight size={17}/></a>)}<a onClick={go} href="#partners">{t.business}<ArrowUpRight size={17}/></a></nav>}</header>
    <main id="main">
      <section className="hero"><HeroVideo lang={lang}/><div className="wrap hero-grid"><div className="hero-copy"><p className="eyebrow"><span/>{t.eyebrow}</p><h1>{t.hero[0]}<br/><span className="hero-accent">{t.hero[1]}</span><br/>{t.hero[2]}</h1><p className="hero-intro">{t.intro}</p><div className="hero-buttons"><a className="button dark" href="#product">{t.primary}<ArrowUpRight size={19}/></a><a className="text-link" href={brochure} target="_blank" rel="noreferrer">{t.secondary}<ArrowUpRight size={17}/></a></div><div className="hero-note"><span className="leaf-icon"><Leaf size={21}/></span><span>{t.heroNote}</span></div></div>
      <div className="product-stage"><img className="hero-product" src="/assets/product-original.webp" alt={lang==='en'?'Dudhvardhini 1 kg original product pack':lang==='hi'?'दूधवर्धिनी १ किलो उत्पाद पैक':'दूधवर्धिनी १ किलो उत्पादन पॅक'} fetchPriority="high"/><div className="product-caption"><Leaf size={17}/><span>{t.pack}</span><strong>{t.packWeight}</strong></div></div>
      </div><div className="wrap hero-bottom"><span className="tiny-rule"/><span>{t.scroll}</span><ArrowDown size={15}/></div></section>
      <div className="trust-band"><div className="wrap">{t.trust.map((x,i)=>{const Icon=[Milk,Leaf,Wheat,Tractor][i];return <div key={x}><Icon size={21}/><span>{x}</span></div>})}</div></div>
      <section id="story" className="story section wrap"><div className="story-copy"><p className="eyebrow">{t.aboutLabel}</p><h2>{t.aboutTitle}</h2><p className="body-large">{t.aboutBody}</p><p className="muted">{t.aboutBody2}</p><div className="signature"><Sprout size={31}/><span>{t.stripRight}<small>{t.brand}</small></span></div></div><figure className="story-photo"><img src="/assets/farm-1280.webp" srcSet="/assets/farm-640.webp 640w, /assets/farm-1280.webp 1280w, /assets/farm-1920.webp 1920w, /assets/farm-3840.webp 3840w" sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1400px) 45vw, 590px" width="3840" height="2160" decoding="async" alt={lang==='en'?'Dairy cattle eating fodder':lang==='hi'?'चारा खाते हुए डेयरी पशु':'चारा खाणारी दुभती जनावरे'} loading="lazy"/><figcaption><span className="caption-mark">“</span>{t.photoCaption}<span className="caption-line"/></figcaption></figure></section>
      <section id="benefits" className="benefits section"><div className="wrap"><div className="section-heading"><div><p className="eyebrow">{t.benefitsLabel}</p><h2>{t.benefitsTitle}</h2></div><p>{t.benefitsIntro}</p></div><div className="benefit-grid">{t.benefits.map(([title,body],i)=>{const Icon=benefitIcons[i];return <article key={i} className="benefit"><div className="benefit-top"><Icon size={29} strokeWidth={1.4}/><span>{number(i+1,2)}</span></div><h3>{title}</h3><p>{body}</p></article>})}</div><p className="fine-print">{t.benefitNote}</p></div></section>
      <section id="ingredients" className="ingredients section wrap"><div className="section-heading"><div><p className="eyebrow">{t.ingredientsLabel}</p><h2>{t.ingredientsTitle}</h2></div><p>{t.ingredientsIntro}</p></div><div className="ingredient-layout"><div className="ingredient-list">{t.ingredients.map(([name,desc],i)=><article key={i} className="herb-card"><div className="herb-image"><img src={`/assets/herb-${herbAssets[i]}.webp`} alt={name} width="320" height="240" loading="lazy" decoding="async"/></div><span className="ingredient-number">{number(i+1,2)}</span><div className="herb-copy"><h3>{name}</h3><p>{desc}</p></div></article>)}</div></div></section>
      <section id="product" className="product-section"><div className="wrap product-grid"><div className="product-detail-image"><p className="eyebrow">{t.brand}</p><img src="/assets/product-original.webp" alt={t.brand+' · '+t.packWeight} loading="lazy"/><span className="weight-label">{t.packWeight}<span>{t.netWeight}</span></span></div><div className="product-detail-copy"><p className="eyebrow">{t.productLabel}</p><h2>{t.productTitle}</h2><p className="body-large">{t.productBody}</p><dl>{t.specs.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><a href={brochure} className="text-link" download>{t.brochure}<Download size={17}/></a><ContactActions lang={lang} className="product-contact"/></div></div></section>
      <section id="guide" className="guide section wrap"><div className="guide-title"><p className="eyebrow">{t.nav[3]}</p><h2>{t.useTitle}</h2><p className="fine-print">{t.dosageNote}</p></div><div className="steps">{t.steps.map(([title,body],i)=><article key={i}><span className="step-number">{number(i+1,2)}</span><div><h3>{title}</h3><p>{body}</p></div>{i<2&&<ArrowDown className="step-arrow" size={15}/>}</article>)}</div></section>
      <section id="partners" className="partners"><div className="wrap partners-grid"><div><p className="eyebrow">{t.partnersLabel}</p><h2>{t.partnersTitle}</h2><p className="partner-intro">{t.partnersBody}</p><a className="button yellow" href={brochure} download>{t.partnerCta}<Download size={18}/></a><ContactActions lang={lang} className="partner-contact"/></div><div className="audiences">{t.audiences.map(([title,body],i)=>{const Icon=i===0?Tractor:Store;return <article key={i}><Icon size={32} strokeWidth={1.3}/><h3>{title}</h3><p>{body}</p><span className="audience-index">{number(i+1,2)} /</span></article>})}</div></div><Sprout className="partner-decoration" strokeWidth={0.5}/></section>
      <section id="contact" className="contact-section section"><div className="wrap contact-grid"><div><p className="eyebrow">{c.eyebrow}</p><h2>{c.title}</h2><p className="contact-description">{c.description}</p></div><div className="support-panel"><span className="support-kicker">{c.support}</span><a className="support-number" href={`tel:${support.phone}`}><bdi>{number(Number(support.number))}</bdi></a><ContactActions lang={lang}/></div></div></section>
      <section className="faq section wrap"><div><p className="eyebrow">{t.faqLabel}</p><h2>{t.faqTitle}</h2></div><div className="faq-list">{t.faqs.map(([q,a],i)=><article className={openFaq===i?'faq-item open':'faq-item'} key={i}><h3><button onClick={()=>setOpenFaq(openFaq===i?null:i)} aria-expanded={openFaq===i} aria-controls={'faq-'+i}><span>{q}</span>{openFaq===i?<Minus size={19}/>:<Plus size={19}/>}</button></h3><div id={'faq-'+i} hidden={openFaq!==i}><p>{a}</p></div></article>)}</div></section>
    </main>
    <footer><div className="wrap"><div className="footer-top"><div><div className="footer-wordmark">{t.brand}<Sprout size={32}/></div><p>{t.footerBody}</p></div><h2>{t.footerTitle}</h2><a href="#" className="back-top" aria-label={t.top}><ArrowUp size={21}/></a></div><div className="footer-links"><span>{t.rights}</span><a className="footer-phone" href={`tel:${support.phone}`}>{c.support} · <bdi>{number(Number(support.number))}</bdi></a><a href={brochure} download>{t.brochure}<ArrowUpRight size={15}/></a><div className="footer-languages">{languages.map((l,i)=><button key={l.code} aria-pressed={l.code===lang} onClick={()=>setLang(l.code)}>{t.languageNames[i]}</button>)}</div></div><div className="footer-bottom"><span>© {number(new Date().getFullYear())} {t.brand}</span><p>{t.footerNote}</p></div></div></footer>
    <div className="mobile-contact-bar"><ContactActions lang={lang} compact/></div>
    <a className="floating-whatsapp" href={whatsappHref(lang)} target="_blank" rel="noopener noreferrer" aria-label={c.whatsapp}><MessageCircle size={21}/><span>{c.shortWhatsapp}</span></a>
  </>;
}
createRoot(document.getElementById('root')).render(<App/>);
