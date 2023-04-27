
import Form from '@/components/form/Form'
import firebase, { initializeApp } from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
  databaseURL: "https://playground-f55ae-default-rtdb.firebaseio.com/"
}


const app = initializeApp(firebaseConfig)


export default function Home() {
  console.log('app', app)
  return (
    <div > 
      hello
      <div className='flex py-10 '>
        <Form />

      </div>


    </div>
  )
}
