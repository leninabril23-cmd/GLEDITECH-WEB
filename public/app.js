const config=window.GLEDITECH_CONFIG||{};
const $=id=>document.getElementById(id);
const menu=$('menuBtn'),nav=$('nav');
menu?.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));menu.setAttribute('aria-label',opened?'Cerrar menú':'Abrir menú')});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
$('year').textContent=String(new Date().getFullYear());
$('locationText').textContent=[config.address,config.city].filter(Boolean).join(' · ')||'Ecuador';
$('emailText').textContent='';if(config.email){const a=document.createElement('a');a.href='mailto:'+config.email;a.textContent=config.email;$('emailText').appendChild(a)}
$('phoneText').textContent='';for(const [i,phone] of (config.phones||[]).entries()){if(i)$('phoneText').append(' · ');const a=document.createElement('a');a.href='tel:+593'+phone.replace(/\D/g,'').replace(/^0/,'');a.textContent=phone;$('phoneText').appendChild(a)}
const links=$('contactLinks'),social=$('socials');
function addLink(node,url,label){const a=document.createElement('a');a.href=url;a.textContent=label;a.target='_blank';a.rel='noopener noreferrer';node.appendChild(a)}
const mail=typeof config.email==='string'&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)?config.email.trim():'';
const wa=String(config.whatsapp||'').replace(/\D/g,'');
if(wa.length>=10&&wa.length<=15)addLink(links,`https://wa.me/${wa}?text=${encodeURIComponent('Hola, quisiera información sobre los servicios de GLEDITECH.')}`,'Escribir por WhatsApp ↗');
if(mail)addLink(links,`mailto:${mail}?subject=${encodeURIComponent('Consulta de proyecto - GLEDITECH')}`,'Enviar correo ↗');
for(const phone of (config.phones||[])){addLink(links,`tel:+593${phone.replace(/\D/g,'').replace(/^0/,'')}`,`Llamar al ${phone} ↗`)}
if(!links.children.length){const p=document.createElement('p');p.textContent='Los botones de contacto se activarán cuando agregues los datos oficiales en public/config.js.';links.appendChild(p)}
for(const [key,name] of [['instagram','Instagram'],['facebook','Facebook']]){try{const url=new URL(config[key]);if(['https:','http:'].includes(url.protocol))addLink(social,url.href,name)}catch{}}

// Galería de proyectos ampliable, sin dependencias externas
const galleryDialog = document.querySelector('#lightbox');
if (galleryDialog) {
  const image = galleryDialog.querySelector('img');
  const caption = galleryDialog.querySelector('p');
  document.querySelectorAll('.portfolio-photo').forEach(btn => btn.addEventListener('click', () => {
    image.src = btn.dataset.full;
    image.alt = btn.dataset.caption || '';
    caption.textContent = btn.dataset.caption || '';
    galleryDialog.showModal();
  }));
  galleryDialog.querySelector('.lightbox-close').addEventListener('click', () => galleryDialog.close());
  galleryDialog.addEventListener('click', e => { if (e.target === galleryDialog) galleryDialog.close(); });
  galleryDialog.addEventListener('close', () => image.removeAttribute('src'));
}
