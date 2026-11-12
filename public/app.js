const config=window.GLEDITECH_CONFIG||{};
const $=id=>document.getElementById(id);
const menu=$('menuBtn'),nav=$('nav');
menu?.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));menu.setAttribute('aria-label',opened?'Cerrar menú':'Abrir menú')});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
$('year').textContent=String(new Date().getFullYear());
$('locationText').textContent=[config.address,config.city].filter(Boolean).join(' · ')||'Ecuador';
$('emailText').textContent=config.email||'Por configurar';
$('phoneText').textContent=config.phoneDisplay||'Por configurar';
const links=$('contactLinks'),social=$('socials');
function addLink(node,url,label){const a=document.createElement('a');a.href=url;a.textContent=label;a.target='_blank';a.rel='noopener noreferrer';node.appendChild(a)}
const mail=typeof config.email==='string'&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)?config.email.trim():'';
const wa=String(config.whatsapp||'').replace(/\D/g,'');
if(wa.length>=10&&wa.length<=15)addLink(links,`https://wa.me/${wa}?text=${encodeURIComponent('Hola, quisiera información sobre los servicios de GLEDITECH.')}`,'Escribir por WhatsApp ↗');
if(mail)addLink(links,`mailto:${mail}?subject=${encodeURIComponent('Consulta de proyecto - GLEDITECH')}`,'Enviar correo ↗');
if(!links.children.length){const p=document.createElement('p');p.textContent='Los botones de contacto se activarán cuando agregues los datos oficiales en public/config.js.';links.appendChild(p)}
for(const [key,name] of [['instagram','Instagram'],['facebook','Facebook']]){try{const url=new URL(config[key]);if(['https:','http:'].includes(url.protocol))addLink(social,url.href,name)}catch{}}
