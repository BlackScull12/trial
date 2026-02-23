async function loadItems(){
  const res=await fetch('/api/store');
  const data=await res.json();
  const list=document.getElementById('itemsList');
  list.innerHTML='';
  data.items.forEach((item,i)=>{
    const div=document.createElement('div');
    div.innerHTML=`${item.name} 
      <button onclick="toggle(${i})">${item.show?'ON':'OFF'}</button>
      <button onclick="del(${i})">X</button>`;
    list.appendChild(div);
  });
}
async function toggle(index){
  await fetch('/api/admin/toggle',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({index})
  });
  loadItems();
}
async function del(index){
  await fetch('/api/admin/delete',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({index})
  });
  loadItems();
}
async function addItem(){
  const name=document.getElementById('name').value;
  const description=document.getElementById('description').value;
  const price=parseFloat(document.getElementById('price').value);
  const image=document.getElementById('image').value;
  if(!name||!description||!price||!image){alert("Fill all fields"); return;}
  await fetch('/api/admin/add',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({name,description,price,image,show:true})
  });
  loadItems();
}
async function setDropDate(){
  const date=prompt("Enter Drop Date (YYYY-MM-DDTHH:MM:SS)");
  await fetch('/api/admin/dropdate',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({dropDate:date})
  });
  alert("Drop date updated!");
}
loadItems();
