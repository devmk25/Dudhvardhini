import React from 'react';
import {Phone,MessageCircle,ArrowUpRight} from 'lucide-react';
import {support,contactLabels,whatsappHref} from './contact';

export default function ContactActions({lang,className='',compact=false}){
  const c=contactLabels[lang];
  return <div className={`contact-actions ${className}`}>
    <a className="contact-call" href={`tel:${support.phone}`}><Phone size={18}/><span>{c.call}</span></a>
    <a className="contact-whatsapp" href={whatsappHref(lang)} target="_blank" rel="noopener noreferrer"><MessageCircle size={19}/><span>{compact?c.shortWhatsapp:c.whatsapp}</span>{!compact&&<ArrowUpRight size={16}/>}</a>
  </div>;
}
