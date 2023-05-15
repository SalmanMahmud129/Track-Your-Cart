

import Form from '@/components/form/Form'
import firebase, { initializeApp } from 'firebase/app'
import { getDatabase , ref, push, remove } from 'firebase/database'
import { onValue, off } from 'firebase/database'
import 'firebase/database'
import { useEffect, useState } from 'react'

const firebaseConfig = {
  databaseURL: "https://playground-f55ae-default-rtdb.firebaseio.com/"
}


const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const itemsInDB = ref(database, "items")


export default function Home() {
  // console.log('app', app)
  // console.log('itemsInDB', itemsInDB)

  const [items, setItems] = useState([])

  useEffect(() => {

    //onValue listens for changes to the data at the itemsInDB reference
    //when it changes it obtains a snapshot of the updated data
    //snapshot comes in the form of an object with database(long string in firebase) key is the key and the value is the item at that key
    //we then use Object.entries on the data which returns an array of subarrays which contain the key value pairs
    //then we map through the subarrays where the first element is the id and second is the singleItem (through destructuring)
    //the map then returns an array of objects where each object has the id and singleItem
    
    onValue(itemsInDB, (snapshot) =>{
      const data = snapshot.val()
      console.log('data', data)

      if(data){
        console.log('Object.entries(data)', Object.entries(data))
        const itemsArray = Object.entries(data).map(([id, singleItem]) =>({
          id,
          singleItem,
        }))
        console.log('itemsArray', itemsArray)
        setItems(itemsArray)
      }
    })

  
  }, [itemsInDB])

  console.log('items', items)
  return (
    <div > 
      hello
      <div className=' flex mx-auto justify-center'>
      <div>
        <Form database={database} itemsInDB={itemsInDB} push={push} />
        
      
      <ul className='bg-gray-200 flex flex-wrap flex-grow rounded-md mt-6 border-t-2 border-black p-4 text-center text-xl justify-center max-w-sm'>
        {items.map((item) => {
          return <li onClick={() => removeFromDb(item)} className='rounded-md bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 m-2 py-2 px-4 hover:scale-110 transition duration-300' key={item.id}>{item.singleItem}</li>
        })}

      </ul>

      </div>

      </div>

    </div>
  )
}


function removeFromDb(item){
  console.log('deleted')
  console.log('item in function', item)
  const itemToDelete = ref(database, `items/${item.id}`)
  remove(itemToDelete)
  console.log('itemToDelete', itemToDelete)
}
