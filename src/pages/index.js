
import Form from '@/components/form/Form'
import firebase, { initializeApp } from 'firebase/app'
import { getDatabase , ref, push } from 'firebase/database'
import 'firebase/database'

const firebaseConfig = {
  databaseURL: "https://playground-f55ae-default-rtdb.firebaseio.com/"
}


const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const itemsInDB = ref(database, "items")


export default function Home() {
  console.log('app', app)
  return (
    <div > 
      hello
      <div className='flex py-10 '>
        <Form database={database} itemsInDB={itemsInDB} push={push} />

      </div>


    </div>
  )
}
