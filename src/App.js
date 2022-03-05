import './App.css';
import Grocery from './Grocery';
import ClearBtn from './clearBtn';
import Message from './Message';
import { useEffect, useState,useRef } from 'react';

function App() {
  const [groceryItems, setGroceryItems] = useState([])
  const [item,setItem] = useState("")
  const [alert, setAlert] = useState(false)
  const [message,setMessage] = useState([])
  const [showClear, setShowClear] = useState(false)
  const [btn, setBtn] = useState("submit")
  const [edited, setEdited] = useState()

  const focusInput = useRef(null)
  
  const handleInput = (e) => {
    setItem(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.lastChild.textContent === "submit") {
      if (item) {
        item && setGroceryItems([...groceryItems, item])
        setItem("")
        setMessage([true, "item add to the list"])
        setAlert(true)
        saveLocal([...groceryItems,item])
      }
    } else {
      let newGrocery = groceryItems
      newGrocery.splice(edited, 1, item)
      setGroceryItems(newGrocery)
      setMessage([true, "item value changed"])
      setAlert(true)
      setItem("")
      setBtn("submit")
      saveLocal(newGrocery)
    }

  }

  const handleDelete = (key) => {
    const newList = groceryItems.filter((item,index) => index !== key)
    setMessage([false, "item removed"])
    setAlert(true)
    setGroceryItems(newList)
    saveLocal(newList)
  }

  const handleEdit = (key) => {
    let edit = groceryItems.filter((item,index) => index === key)
    setBtn("edit")
    setItem(edit[0])
    setEdited(key)
  }

  const clearItems = () => {
    setGroceryItems([])
    setMessage([false, "list empty"])
    setAlert(true)
    window.localStorage.clear()
  }

  const saveLocal = (data) => {
    window.localStorage.setItem("items", JSON.stringify(data))
  }

  useEffect(() => {
    groceryItems.length > 0 ? setShowClear(true) : setShowClear(false)
    setTimeout(() => {
      setAlert(false)
    }, 2500)

    focusInput.current.focus()
  })

  useEffect(() => {
    if (window.localStorage.length === 0) {
      window.localStorage.setItem("items", JSON.stringify(groceryItems))
    }

    let data = window.localStorage.getItem("items")
    setGroceryItems(JSON.parse(data))
  },[])

  return (
    <main className="mt-20 bg-white max-w-lg w rounded-md p-7 shadow-lg">
      {alert && <Message message={message} />}
      <header className="header">
        <h1 className='text-3xl font-bold tracking-wider capitalize text-center'>grocery bud</h1>
        <form className='flex gap-1 mt-4 justify-center'>
          <input type="text" value={item} ref={focusInput} placeholder='e.g eggs' className='bg-gray-100 px-4 rounded-md  py-1 w-full' onChange={handleInput} />
          <button type='submit' className='rounded-md bg-cyan-200 px-5 capitalize tracking-wider transition delay-300 ease-in-out hover:bg-cyan-500 hover:text-white' onClick={handleSubmit}>{btn}</button>
        </form>
      </header>
      <div className="mt-5 flex flex-col">
        {
          groceryItems.map((item, index) => {
            return <Grocery key={index} item={item} deleteBtn={() => handleDelete(index)} editBtn={() => handleEdit(index)} />
          })
        }
      </div>
      {showClear && <ClearBtn clearCart={clearItems} />}
    </main>
  );
}

export default App;
