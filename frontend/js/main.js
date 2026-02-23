// Fireflies
function createFireflies(count=20){
  for(let i=0;i<count;i++){
    const f=document.createElement('div');
    f.className='firefly';
    f.style.top=Math.random()*window.innerHeight+'px';
    f.style.left=Math.random()*window.innerWidth+'px';
    document.body.appendChild(f);
  }
}
createFireflies();

// Countdown timer
async function getDropDate(){
  const res = await fetch('/api/store');
  const data = await res.json();
  return new Date(data.dropDate);
}
function startCountdown(dropDate){
  const timerEl = document.getElementById('countdown');
  function update(){
    const now = new Date();
    const diff = dropDate - now;
    if(diff<=0){timerEl.innerText="Drop is LIVE!";}
    else{
      const h=Math.floor(diff/1000/60/60);
      const m=Math.floor((diff/1000/60)%60);
      const s=Math.floor((diff/1000)%60);
      timerEl.innerText=`${h}h ${m}m ${s}s`;
      setTimeout(update,1000);
    }
  }
  update();
}
(async()=>{startCountdown(await getDropDate());})();

// Admin bubble
document.getElementById('adminBubble').onclick=async()=>{
  const password=prompt("Enter Admin Password");
  const res=await fetch('/api/admin/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({password})
  });
  const data=await res.json();
  if(data.success) window.location.href='/admin.html';
  else alert("Wrong password");
};
