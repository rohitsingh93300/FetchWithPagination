import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5"

const Products = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const getAllProducts = async () => {
        const url = "https://fakestoreapi.com/products"
        try {
            const res = await axios.get(url)
            const data = res.data
            setData(data)

        } catch (error) {
            console.log(error);

        }

    }
    useEffect(() => {
        getAllProducts()
        console.log("component did mount");
        
    },[page])

    const StarRating = ({ rate }) => {
        const fullStars = Math.floor(rate);
        const halfStar = rate % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <div className="flex text-2xl items-center">
                {"★".repeat(fullStars)}
                {halfStar && "⯪"}
                {"☆".repeat(emptyStars)}
            </div>
        );
    };

    const pageHandler = (selectedPage) => {
        setPage(selectedPage)
    }

    return (
        <div>
            <div className='grid grid-cols-2 lg:grid-cols-4 place-items-center gap-7 mt-10 '>
                {
                    data.slice(page * 4 - 4, page * 4).map((item) => {
                        return <div key={item.id} className='border w-[190px] md:w-[265px]  border-gray-200 p-5 rounded-md hover:shadow-2xl relative h-max bg-gray-100 transition-all hover:scale-105'>
                            <img src={item.image} alt="" className='aspect-square ' />
                            <span className='bg-gray-700 px-3 py-1 rounded-full text-sm text-white absolute top-2 left-2'>{item.category}</span>
                            <h1 className='mt-1 line-clamp-2 md:line-clamp-none'>{item.title}</h1>
                            <p className='text-sm text-gray-500 line-clamp-2 mt-1'>{item.description}</p>
                            {/* <div className='flex justify-between items-center'> */}

                            <div className='flex gap-2 items-center'>
                                <StarRating rate={item.rating.rate} />
                                <p>({item.rating.count})</p>
                            </div>
                            <p className='mt-1 font-semibold'>${item.price}</p>
                            {/* </div> */}
                            <div className=''>
                                <button className='bg-gray-800 cursor-pointer text-white px-3 py-1 rounded-md mt-2 flex gap-2 items-center'><IoCartOutline /> Add To Cart</button>

                            </div>
                        </div>
                    })
                }
            </div>
            {
                data.length > 0 && <div className='flex gap-3 mt-10 justify-center items-center mb-7'>
                    <button disabled={page===1} className={`${page===1?"bg-gray-600":"bg-gray-800"} text-white px-3 py-1 rounded-md cursor-pointer`} onClick={()=>pageHandler(page-1)}>Prev</button>
                    {
                        [...Array(data.length / 4)].map((_, i) => {
                            return <span key={i} onClick={() => pageHandler(i + 1)} className={`${page === i+1 ? "font-bold":""} cursor-pointer`}>{i + 1}</span>
                        })
                    }
                    <button disabled={page===5} className={`${page===5?"bg-gray-600":"bg-gray-800"} text-white px-3 py-1 rounded-md cursor-pointer`} onClick={()=>pageHandler(page+1)}>Next</button>
                </div>
            }
        </div>
    )
}

export default Products
