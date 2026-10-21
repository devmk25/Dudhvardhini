export const support={number:'9063639070',phone:'+919063639070',whatsapp:'919063639070'};
export const contactLabels={
  mr:{eyebrow:'संपर्क व सहाय्य',title:'आपल्या प्रश्नांसाठी,\nआम्ही सोबत आहोत.',description:'उत्पादनाची माहिती, उपलब्धता किंवा व्यवसाय चौकशीसाठी थेट आमच्याशी संपर्क साधा.',call:'फोन करा',whatsapp:'व्हॉट्सॲपवर बोला',shortWhatsapp:'व्हॉट्सॲप',support:'ग्राहक सहाय्य',message:'नमस्कार, मला दूधवर्धिनी उत्पादनाबद्दल अधिक माहिती हवी आहे.'},
  hi:{eyebrow:'संपर्क और सहायता',title:'आपके सवालों के लिए,\nहम आपके साथ हैं।',description:'उत्पाद की जानकारी, उपलब्धता या व्यापार संबंधी पूछताछ के लिए हमसे सीधे संपर्क करें।',call:'कॉल करें',whatsapp:'व्हाट्सऐप पर बात करें',shortWhatsapp:'व्हाट्सऐप',support:'ग्राहक सहायता',message:'नमस्ते, मुझे दूधवर्धिनी उत्पाद के बारे में अधिक जानकारी चाहिए।'},
  en:{eyebrow:'CONTACT & SUPPORT',title:'A conversation away.\nHere to help you.',description:'Speak to us directly about product information, availability or business enquiries.',call:'Call us',whatsapp:'Chat on WhatsApp',shortWhatsapp:'WhatsApp',support:'Customer support',message:'Hello, I would like more information about Dudhvardhini.'}
};
export const whatsappHref=lang=>`https://wa.me/${support.whatsapp}?text=${encodeURIComponent(contactLabels[lang].message)}`;
