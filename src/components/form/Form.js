import React, { useState } from 'react'
import { ShoppingCart } from '@/icons/ShoppingCart'

function form({database, itemsInDB, push}) {

    const [formData, setFormData] = useState({
        item: ''
    })

    

    const handleChange = (e) =>{
        const {name, value} = e.target

        setFormData({...formData, [name]: value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        const cappedItem = capitalizeFirstLetter(formData.item)

        push(itemsInDB, cappedItem)
        console.log(`${formData.item} has been pushed to the database`)
        e.target.reset()
        
    }
    console.log('formData.item', formData.item)

  return (
    <form className='flex border-2 border-black flex-col mx-auto p-10 rounded-md items-center max-w-xs'  onSubmit={handleSubmit}>
        <ShoppingCart/>
        <input className='bg-gray-200 focus:bg-white border border-solid border-violet-600 focus:border-blue-400 rounded-md p-2 m-2 transition duration-300 text-center' type='text' name='item' placeholder='Enter text' onChange={handleChange}/>
        
        <button className=' mx-auto px-14 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 py-2 rounded-md hover:scale-110 hover:from-blue-400 hover:to-blue-400 text-white transition' type='submit' >Add to cart</button>
    </form>
  )
}

function capitalizeFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export default form