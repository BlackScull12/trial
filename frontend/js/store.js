async function loadStore(){
  const res = await fetch('/api/store');
  const data = await res.json();
  const container = document.getElementById('storeItems');
  if(!data.storeOpen){container.innerHTML="Store will open on drop date!"; return;}
  container.innerHTML='';
  data.items.forEach(item=>{
    const div=document.createElement('div');
    div.style.margin='10px';
    div.innerHTML=`
      <img src="${item.image}" width="150"><br>
      <b>${item.name}</b><br>
      ${item.description}<br>
      Price: ${item.price} USD<br>
      <button onclick="addToCart('${item.name}',${item.price})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}
loadStore();

// Simple Cart
function addToCart(name,price){
  alert(`${name} added to cart for $${price}`);
}
