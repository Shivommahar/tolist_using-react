//import React, {useState} from "react";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {v4 as uuid} from "uuid";
import './index.css';

function App(){
  const [todo, setTodo]=useState("");
  const [todoList, setTodoList]=useState([]);
  const [cat, setCat]=useState([]);
  const [date, setDate]=useState([]);
  const [search, setSearch]=useState([]);
  const [catSearch, setcatSearch]=useState([]);
  const [searchDate, setDateSearch]=useState([]);
  useEffect(()=>{
    const items=JSON.parse(localStorage.getItem('store'));
    if(items){
        setTodoList(items);
    }
},[]);
useEffect(()=>{
  localStorage.setItem("store",JSON.stringify(todoList))
},[todoList])
   const onAdd=()=>{
    const id=uuid()
        setTodoList([...todoList,{id:id,task:todo,cat:cat,time:date}]);
        
   };

   const onTodoChange=(e)=>{
    setTodo(e.target.value);
   };

   const onCatChange=(e)=>{
    setCat(e.target.value);
   }
   const onDateChange=(e)=>{
    setDate(e.target.value);
   }
   const onSearch=(e)=>{
    setSearch(e.target.value);
   }
   const onCatSearch=(e)=>{
    setcatSearch(e.target.value);
   }
   const filterDate=(e)=>{
    setDateSearch(e.target.value);
   }
   const markdown=(id)=>setTodo(todoList.map((t)=>{ 
    if(t.id===id) {
        t.status=!t.status
    }
    return t
 }))
 const Delete=(id)=>{
  setTodo(todoList.filter((t)=>t.id!==id))
}

  return <>
  <div className="container">
  <input placeholder="add your task" id='t1' value={todo} onChange={onTodoChange} type="text" ></input>{" "}
  <input placeholder="add your category" id="t2" value={cat} onChange={onCatChange} type='text'></input>{" "}
  <input id="t3" value={date} onChange={onDateChange} type="date"></input>
  <button onClick={onAdd} id="t4"><i>Add</i></button>{" "}
  <input id="t5" placeholder="task filter" value={search} onChange={onSearch}></input>
  <input id='t6' placeholder="Category filter" value={catSearch} onChange={onCatSearch}></input>
  <input id="t7" placeholder="date filter" value={searchDate} onChange={filterDate}></input>
  <ol>
    {
      searchDate.length==0  &&  catSearch.length==0 && search.length==0&&todoList.map((i)=>{
        return <li>
            <input type="checkbox" onClick={()=>markdown(i.id)}/>
            {""}<h4>Task:{i.status===true?<s>{i.task} {""} </s>:i.task}</h4><b>Date:</b> {i.status===true?<s>{i.time} 
            {""} </s>:i.time}  <br/><b>Category:</b> {i.status===true?<s>{i.cat} {""}</s>:i.cat}  
            {""}<button onClick={()=>Delete(i.id)}>Delete</button> 
            </li>
      })
    }
  </ol>
  <ol>
        { 
       
            
          
       searchDate.length==0  && catSearch.length==0&& search.length>0&&todoList.map((t)=>{
            return(<>
                {
                    t.task.includes(search)?
                    <li>{t.task} {t.cat} {t.time}</li>:''
                }</>
            )
        }
        )
    
    }
    </ol>
  <ol>
        { searchDate.length==0 &&search.length==0 && catSearch.length>0 && todoList.map((t)=>{
            return(<>
                {
                    t.cat.includes(catSearch)?
                    <li>{t.task} {t.cat} {t.time}</li>:''
                }</>
            )
        }
        )
    
    }
    </ol>
    <ol>
        { 
       
            
          
       searchDate.length>0 &&  search.length==0 && catSearch.length==0 && todoList.map((t)=>{
            return(<>
                {
                    t.time.includes(searchDate)?
                    <li>{t.task} {t.cat} {t.time}</li>:''
                }</>
            )
        }
        )
    
    }
    </ol></div>
  </>
}
ReactDOM.render(<App/>, document.getElementById('root'));


