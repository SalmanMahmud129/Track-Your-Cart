import React, { useState } from 'react'

function form() {

    const [formData, setFormData] = useState({
        item: ''
    })

    console.log('formData.item', formData.item)

    const handleChange = (e) =>{
        const {name, value} = e.target

        setFormData({...formData, [name]: value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        console.log(formData.item)
    }
  return (
    <form onSubmit={handleSubmit}>
        <input className=' border-slate-800 border-solid' type='text' name='item' onChange={handleChange} value={formData.item} placeholder='Enter Item'/>

        <button type='submit' >Add to cart</button>
    </form>
  )
}

export default form