// main.js
function createFireflies(count=20) {
  for(let i=0;i<count;i++){
    const f = document.createElement('div');
    f.className = 'firefly';
    f.style.top = Math.random()*window.innerHeight+'px';
    f.style.left = Math.random()*window.innerWidth+'px';
    document.body.appendChild(f);
  }
}
createFireflies();
