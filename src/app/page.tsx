'use client'
import { useState, useRef } from 'react'

export default function Home() {
  const [legendInput, setLegendInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSend = async() =>{
    if(fileInputRef.current?.files && fileInputRef.current?.files?.length > 0){
      const fileItem = fileInputRef.current.files[0];
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if(allowedTypes.includes(fileItem.type)){
        const data = new FormData();
        data.append('image', fileItem);
        data.append('legend', legendInput);

        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers:{
            'content-type': 'multipart/form-data'
          },
          body: data
        })
        const json = await res.json();
        console.log(json)
      
      }else{
        alert('arquivo incompativel')
      }
    }else{
      alert('Selecione uma imagem')
    }
  }

  return (
   <div className="container mx-auto">
    <h1 className="text-3xl mt-4">Upload de Imagem</h1>

    <div className="max-w-md flex flex-col gap-3 border border-dotted border-white p-3 mt-4">
      <input
        ref={fileInputRef} 
        type="file" 
      />
      <input 
        type="text" 
        placeholder="Digite uma legenda..." 
        className="p-3 bg-white rounded-md text-black"
        value={legendInput}
        onChange={e => setLegendInput(e.target.value)}
        />
      <button onClick={handleFileSend}>Enviar Imagem</button> 
    </div>
   </div>
  )
}
