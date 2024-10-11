import './App.css';
import Category from './Category.jsx';
import axios from 'axios';
import { useEffect, useState } from'react';

function App() {
  let[finalCategory, setFinalCategory] =useState([]);
  let[finalPro, setfinalPro] =useState([]);
  let[catName, setCatname] =useState('');
  
  let getCategory=()=>{
    axios.get('https://dummyjson.com/products/categories')
    .then((response)=>response.data)
    .then((finalResponse)=>{
      setFinalCategory(finalResponse);
    })

  }

  let getProducts=()=>{
    axios.get('https://dummyjson.com/products')
    .then((Proresponse)=>Proresponse.data)
    .then((finalResponse)=>{
      setfinalPro(finalResponse.products);
    })
  }

  useEffect(()=>{
    getCategory();
    getProducts();
  },[])

  useEffect(() => {
    if (catName !== '') {
      console.log('Selected Category:', catName); // Check the selected category
      axios.get(`https://dummyjson.com/products/category/${catName.slug}`)
        .then((Proresponse) => Proresponse.data)
        .then((finalResponse) => {
          console.log('Category Products:', finalResponse.products); // Check the products returned
          setfinalPro(finalResponse.products);
        })
        .catch((error) => {
          console.error('Error fetching category products:', error);
        });
    }
  }, [catName]);
  

  let pItems=finalPro.map((products,index)=>{
    return(
      <ProductItems key={index} pdata={products}/> 
    )
  })

  return (
    <>
    <div className='py-[40px]'>
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-center text-[40px] font-bold mb-[30px]'>Our Products</h1>
      <div className='grid grid-cols-[30%_auto] gap-[20px]'>
        <div>
           <Category finalCategory={finalCategory} setCatname={setCatname}/>
        </div>

        <div>
          <div className='grid grid-cols-3 gap-5 mt-8'>
             { finalPro.length>=1
              ?
             pItems
             :
             <h2 className='text-center font-bold col-span-3 mt-40'>No Product Found</h2>
             }
          </div>
        </div>
      </div>
      </div>
    </div>
    </> 
  );
}

export default App;

function ProductItems({pdata}){
   return(
    <div className='shadow-lg text-center pb-4'>
    <img src={pdata.thumbnail} className='w-[100%] h-[220px]'/>
    <h4>{pdata.title}</h4>
    <b>{pdata.price}</b>
 </div>
   )
}
