const PASS = "0510";
const FLY_IMAGES = [];
for(let i=1;i<=38;i++){FLY_IMAGES.push(`style/img/Anh (${i}).jpg`);}

function press(n){ const el=document.getElementById('pwd'); if(el.value.length<8) el.value+=n; }
function clearPwd(){ document.getElementById('pwd').value=""; }

function playGiftEffect(callback){
  const box=document.getElementById("giftEffect");
  const hop=document.getElementById("HopQua");
  const nap=document.getElementById("NapHop");
  const than=document.getElementById("ThanHop");
  box.style.display="block";
  setTimeout(()=>{hop.style.display="none";},1000);
  setTimeout(()=>{nap.style.animation="flyUpGift 2s forwards";},1000);
  setTimeout(()=>{than.style.animation="flyDownGift 2s forwards";},1000);
  setTimeout(()=>{
    box.style.display="none";
    nap.style.animation=""; than.style.animation="";
    hop.style.display="block";
    callback();
  },2300);
}

const messages=[
  "Chúc chị Nhung 20/10 vui vẻ và ăn khỏe nhiều hơn  ❤️",
  "Chúc chị Nhung nhận quà mỏi tay, hạnh phúc đong đầy💖",
  "Chúc chị Nhung làm ăn thuận lợi và giảm bớt muộn phiền ✨",
  "Cảm ơn chị Nhung vì đã là một người chị tuyệt vời của nhật💕",
  "Mong đám cưới của chị Nhung với a Đạt :> 🎁💞"
];

let msgIndex=0, charIndex=0;
const cardMess=document.getElementById("cardMess");
const typingSpeed=70;

function typeMessage(){
  const currentMsg=messages[msgIndex];
  if(charIndex<currentMsg.length){
    cardMess.textContent+=currentMsg.charAt(charIndex);
    charIndex++;
    setTimeout(typeMessage,typingSpeed);
  }else{
    setTimeout(()=>{
      charIndex=0;
      cardMess.textContent="";
      msgIndex=(msgIndex+1)%messages.length;
      typeMessage();
    },2000);
  }
}
function startTypingEffect(){ typeMessage(); }

function checkPwd(){
  const v=document.getElementById('pwd').value;
  if(v===PASS){
    document.getElementById('lockScreen').style.display='none';
    playMusic();
    playGiftEffect(()=>{
      const card=document.getElementById('cardScene');
      card.style.display='block';
      setTimeout(()=>{ card.style.opacity=1; },50);
      startTypingEffect();
    });
  }else{
    const msg=document.getElementById('msg');
    msg.textContent="Sai rồi...Sai rồi😑";
    setTimeout(()=>msg.textContent="",2000);
    clearPwd();
  }
}

function playMusic(){ 
  const music=document.getElementById('bgMusic'); 
  music.currentTime = 7;
  music.play().catch(()=>{}); 
}

document.getElementById('openGift').addEventListener('click',()=>{
  let count=0;
  const total=550;
  const timer=setInterval(()=>{
    spawnImg(); count++;
    if(count>=total) clearInterval(timer);
  },800);
});

function spawnImg(){
  const src=FLY_IMAGES[Math.floor(Math.random()*FLY_IMAGES.length)];
  const img=document.createElement('img');
  img.src=src;
  img.className='flyImg';
  img.style.height=(100+Math.random()*200)+'px';
  img.style.top=Math.random()*(window.innerHeight-150)+'px';
  const dur=6+Math.random()*3;
  img.style.animation=`moveLeftToRight ${dur}s linear forwards`;
  document.body.appendChild(img);
  setTimeout(()=>img.remove(),dur*1000);
}

function checkOrientation() {
  const warn = document.getElementById('rotateWarning');
  if (window.innerWidth <= 768 && window.innerHeight > window.innerWidth) {
    warn.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  } else {
    warn.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
checkOrientation();

function createHeart(){
  const emojis=['❤️','🌲','🎁','❄️', '🍧','☃️', '🎄'];
  const heart=document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML=emojis[Math.floor(Math.random()*emojis.length)];
  heart.style.left=Math.random()*window.innerWidth+'px';
  heart.style.fontSize=15+Math.random()*25+'px';
  document.body.appendChild(heart);
  setTimeout(()=>heart.remove(),6000);
}
setInterval(createHeart,400);
