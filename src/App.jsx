
import React, {useEffect, useState} from 'react'
export default function App(){
 const [records,setRecords]=useState([]);
 const [search,setSearch]=useState('');
 const [form,setForm]=useState({name:'',date:'',hymns:'',status:'Está bom',notes:''});
 useEffect(()=>{const s=localStorage.getItem('violin_records'); if(s) setRecords(JSON.parse(s));},[]);
 useEffect(()=>{localStorage.setItem('violin_records',JSON.stringify(records));},[records]);
 const save=()=>{ if(!form.name) return; setRecords([{...form,id:Date.now()},...records]); setForm({name:'',date:'',hymns:'',status:'Está bom',notes:''});}
 const remove=(id)=>setRecords(records.filter(r=>r.id!==id));
 const filtered=records.filter(r=>r.name.toLowerCase().includes(search.toLowerCase()));
 return <div style={{fontFamily:'Arial',padding:20,maxWidth:900,margin:'auto'}}>
 <h1>Controle de Aulas de Violino 🎻</h1>
 <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
 <div>
 <input placeholder='Aluno' value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><br/><br/>
 <input type='date' value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/><br/><br/>
 <textarea placeholder='Hinos' value={form.hymns} onChange={e=>setForm({...form,hymns:e.target.value})}></textarea><br/><br/>
 <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
 <option>Está bom</option><option>Precisa estudar mais</option><option>Não está bom</option></select><br/><br/>
 <textarea placeholder='Observações' value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}></textarea><br/><br/>
 <button onClick={save}>Salvar Aula</button>
 </div>
 <div>
 <input placeholder='Buscar aluno' value={search} onChange={e=>setSearch(e.target.value)}/><hr/>
 {filtered.map(r=><div key={r.id} style={{border:'1px solid #ccc',padding:10,margin:'10px 0'}}>
 <b>{r.name}</b> ({r.date})<br/>
 Hinos: {r.hymns}<br/>Status: {r.status}<br/>Obs: {r.notes}<br/>
 <button onClick={()=>remove(r.id)}>Excluir</button>
 </div>)}
 </div></div></div>
}
