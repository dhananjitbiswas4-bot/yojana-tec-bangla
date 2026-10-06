const navBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('#mainNav');
navBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');navBtn.setAttribute('aria-expanded',open)});
document.querySelectorAll('#mainNav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const input=document.querySelector('#searchInput');
const posts=[...document.querySelectorAll('.post-card')];
const empty=document.querySelector('#emptyState');
function filterPosts(){
  const q=(input?.value||'').trim().toLowerCase();
  let shown=0;
  posts.forEach(p=>{
    const text=(p.dataset.title+' '+p.dataset.category).toLowerCase();
    const ok=text.includes(q);
    p.style.display=ok?'block':'none';
    if(ok) shown++;
  });
  if(empty) empty.hidden=shown!==0;
}
input?.addEventListener('input',filterPosts);
document.querySelector('#searchBtn')?.addEventListener('click',filterPosts);

document.querySelectorAll('#categoryList button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#categoryList button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter=btn.dataset.filter;
    let shown=0;
    posts.forEach(p=>{
      const ok=filter==='all'||p.dataset.category===filter;
      p.style.display=ok?'block':'none'; if(ok) shown++;
    });
    if(input) input.value='';
    if(empty) empty.hidden=shown!==0;
    document.querySelector('#latest').scrollIntoView({behavior:'smooth'});
  });
});

const modal=document.querySelector('#postModal');
const title=document.querySelector('#modalTitle');
const text=document.querySelector('#modalText');
const postCopy={
  ration:['রেশন কার্ডের নতুন নিয়ম ২০২৬','রেশন কার্ড সংক্রান্ত নতুন আপডেট, যোগ্যতা, সংশোধন এবং অনলাইন পরিষেবা নিয়ে বিস্তারিত article এখানে যোগ করা যাবে।'],
  aadhaar:['Aadhaar-এর তথ্য আপডেট করার সহজ পদ্ধতি','নাম, জন্মতারিখ, ঠিকানা বা মোবাইল সংক্রান্ত Aadhaar update-এর জন্য প্রয়োজনীয় ধাপ ও সতর্কতা এখানে যোগ করা যাবে।'],
  voter:['ভোটার লিস্টে আপনার নাম আছে কি না কীভাবে দেখবেন?','ভোটার তথ্য খোঁজা, নাম যাচাই এবং সংশোধনের সাধারণ ধাপ এখানে যোগ করা যাবে।'],
  dbt:['DBT-এর জন্য ব্যাংক অ্যাকাউন্ট প্রস্তুত করার গাইড','সরকারি সুবিধার টাকা পাওয়ার আগে ব্যাংক ও DBT সংক্রান্ত তথ্য যাচাই করার checklist এখানে যোগ করা যাবে।'],
  pan:['PAN Card-এর অনলাইন আবেদন','PAN আবেদন করার আগে প্রয়োজনীয় নথি, তথ্য এবং official portal-এর নির্দেশিকা এখানে যোগ করা যাবে।'],
  form:['অনলাইন ফর্ম ফিলাপের সময় ভুল এড়ানোর টিপস','ফর্ম submit করার আগে নাম, DOB, mobile, document এবং spelling যাচাই করার checklist এখানে যোগ করা যাবে।']
};
document.querySelectorAll('.read-btn').forEach(btn=>btn.addEventListener('click',()=>{
  const data=postCopy[btn.dataset.post]||['Post','Article content will be added here.'];
  title.textContent=data[0]; text.textContent=data[1]; modal.classList.add('show'); modal.setAttribute('aria-hidden','false');
}));
function closeModal(){modal.classList.remove('show');modal.setAttribute('aria-hidden','true')}
document.querySelector('.modal-close')?.addEventListener('click',closeModal);
modal?.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

const toast=document.querySelector('#toast');
function showToast(msg){toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2500)}
document.querySelector('#subscribeForm')?.addEventListener('submit',e=>{e.preventDefault();showToast('ধন্যবাদ! Newsletter system পরে যুক্ত করা যাবে।');e.target.reset()});
document.querySelectorAll('.tool-demo').forEach(b=>b.addEventListener('click',()=>showToast('এই toolটি পরের ধাপে live করা যাবে।')));
document.querySelector('#year').textContent=new Date().getFullYear();
