import React from 'react';

export default function Category({ finalCategory, setCatname }) {
  let cat = finalCategory.map((v, i) => {
    return (
      <li
      onClick={() => {
        console.log(v); 
        setCatname(v);  
      }}
        key={i}
        className='bg-[#ccc] p-[7px] cursor-pointer text-[20px] font-serif font-[500] mb-2'
      >
        {v.name} 
      </li>
    );
  });

  return (
    <div>
      <h1 className='text-[25px] font-[600] p-[10px]'>Product Category</h1>
      <ul>
        {cat}
      </ul>
    </div>
  );
}
