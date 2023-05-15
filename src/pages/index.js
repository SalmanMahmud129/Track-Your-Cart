

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
      
      // deleting the last item will delete the reference to items in the database,
      // when the reference no longer exists, the onvalue function fails which means we 
      // dont get back a snapshot, if we dont get back a snapshot it means we deleted the last item and should set the items state to empty
      if(!snapshot.exists()){
        setItems([])
      }

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
    <div className='flex min-h-screen'> 
      <div className='flex flex-col m-auto items-center min-w-full'>
      
        <Form database={database} itemsInDB={itemsInDB} push={push} />
        
      {items.length > 0 ? <ul className='bg-gray-200 overflow-y-scroll md:h-60 flex flex-wrap rounded-md mt-6 border-t-2 border-black p-4 text-center text-xl max-w-xs min-w-[20rem]'>
        {items.map((item) => {
          return <li onClick={() => removeFromDb(item)} className='text-white rounded-md bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 mx-auto my-1 p-2 hover:scale-110 hover:from-red-500 hover:to-red-500 hover:text-black hover:cursor-pointer transition duration-300' key={item.id}>{item.singleItem}</li>
        })}

      </ul> : null }
    
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
