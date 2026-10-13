import React,{useContext, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import star from "../assets/star.png"
import cycle from "../assets/bicycle.png"
import leftArrow from "../assets/arrow.png"
import rightArrow from "../assets/right-arrow.png"
import discount from "../assets/discount.png"
import search from "../assets/search-interface-symbol.png"
import downArrow from "../assets/down.png"
import upArrow from "../assets/upload.png"
import crispyBurger from "../assets/Burger.png"
import veg from "../assets/veg.jpeg"
import nonVeg from "../assets/nonVeg.jpeg"
import whooper from "../assets/whooper.jpeg"
import { cartContext } from '../context/contextApi'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../utilis/cartSlice'
import toast from 'react-hot-toast'
import burgerKing from "../assets/BurgerKing.avif";
import belgianWaffle from "../assets/BelgianWaffle.avif";
import baskinRobbin from "../assets/BaskinRobbin.avif";
import kalraSweet from "../assets/KalraSweetShop.avif";
import kfc from "../assets/Kfc.avif";
import Dhaba90s from "../assets/Dhaba90s.avif";
import punjabhiChaap from "../assets/PunjabhiChaap.avif";
import subway from "../assets/Subway.avif";
import cofee from "../assets/CafeCofeeDay.avif";

const restaurants = {
    1: {
        name: "Burger King",
        price: "₹99",
        description: "one burger, medium fries, cold drink",
        rating: 4.1,
        totalRating: "500+ rating",
        combo: "₹100 for three",
        special: "veg whopper",
        place: "shivalik nagar",
        offer: "20% OFF",
        img: burgerKing
    },

    2: {
        name: "Belgian Waffle",
        price: "₹149",
        description: "one waffle + chocolate",
        rating: 3.9,
        totalRating: "400+ rating",
        combo: "₹450 for two",
        special: "choclate waffle",
        place: "Ranipur more",
        img: belgianWaffle

    },

    3: {
        name: "BaskinRobbin",
        price: "₹250",
        description: "Shahi kulfi and pista ice cream combo",
        rating: 3.8,
        totalRating: "350+ rating",
        combo: "₹300 for two",
        special:"pista ice-cream",
        place: "Har ki pauri",
        img: baskinRobbin

    },

    4: {
        name: "KalraSweet",
        price: "₹500",
        description: "milk-cake",
        rating: 4.2,
        totalRating: "300+ rating",
        combo: "₹450 for 1kg",
        special: "kaju katli",
        place: "Moti bazar",
        img: kalraSweet

    },

    5: {
        name: "Kfc",
        price: "₹180",
        description: "non-veg combo",
        rating: 4.4,
        totalRating: "450+ rating",
        combo: "₹150 for meal",
        special: "crispy chicken wings",
        place: "jwalapur",
        img:kfc

    },

    6: {
        name: "Dhaba90s",
        price: "₹150",
        description: "kadai paneer, dal makhni,garlic naan",
        rating: 4,
        totalRating: "250+ rating",
        combo: "₹200 for thali",
        special: "special paneer thali",
        place: "sector-1",
        img:Dhaba90s
        
    },

    7: {
        name: "PunjabhiChaap",
        price: "₹180",
        description: "malai chaap and afghani chaap combo",
        rating: 3.7,
        totalRating: "200+ rating",
        combo: "₹200 for two",
        special: "afghani chaap",
        place: "Roshnabad",
        img: punjabhiChaap

    },

    8: {
        name: "Subway",
        price: "₹250",
        description: "loaded cheesy vegetable taco",
        rating: 4.1,
        totalRating: "150+ rating",
        combo: "₹250 for two",
        special: "subway veggie delite",
        place: "Arya nagar chowk",
        img: subway

    },

    9: {
        name: "Cafe Coffee Day",
        price: "₹90",
        description: "cold coffee",
        rating: 4.5,
        totalRating:"280+ rating",
        combo: "₹180 for two",
        special:"cold cofee",
        place: "Sidcul",
        img: cofee

    },
};

const discountData = [
    {
        info: "₹125 OFF ABOVE ₹399",
        couponCode:"FLAT125"
    },
    {
        info: "₹100 OFF ABOVE ₹499",
        couponCode: "FLAT100"
    },
    {
        info: "20% OFF UP TO ₹150",
        couponCode: "FLAT20"
    },
    {
        info: "₹50 OFF UP TO ₹249",
        couponCode: "FLAT50"
    },
    {
        info: "₹30% OFF UP TO ₹250",
        couponCode:"FLAT30"
    }
];

const menuData = {
    1: [ // Burger King
        {
            title: "Recommended",
            items: [
                {
                    name: "Crispy Veg Burger",
                    price: "₹139",
                    description: "Crispy veg patty burger",
                    image: crispyBurger,
                    type: "veg"
                },
                {
                    name: "Whopper",
                    price: "₹199",
                    description: "Classic Whopper burger",
                    image: whooper,
                    type: "veg"
                }
            ]
        },
        {
            title: "Rs 139 Deal Of The Day",
            items: [
                {
                    name: "Chicken Burger",
                    price: "₹139",
                    description: "Chicken burger with fries",
                    image: crispyBurger,
                    type: "non-veg"
                },
                {
                    name: "Veg Burger Combo",
                    price: "₹139",
                    description: "Burger + fries",
                    image: crispyBurger,
                    type: "veg"
                }
            ]
        },
        {
            title: "Rs 169 Deal Of The Day",
            items: [
                {
                    name: "Classic Chicken Burger",
                    price: "₹169",
                    description: "Classic burger meal",
                    image: crispyBurger,
                    type: "non-veg"
                }
            ]
        }
    ],

    2: [ // Belgian Waffle
        {
            title: "Recommended",
            items: [
                {
                    name: "Chocolate Waffle",
                    price: "₹149",
                    description: "Crispy waffle with chocolate",
                    image: crispyBurger,
                    type: "veg"
                },
                {
                    name: "Belgian Chocolate Waffle",
                    price: "₹179",
                    description: "Belgian waffle with rich chocolate",
                    image: crispyBurger,
                    type: "veg"
                }
            ]
        },
        {
            title: "Waffle Combos",
            items: [
                {
                    name: "Waffle + Chocolate",
                    price: "₹199",
                    description: "Waffle served with chocolate sauce",
                    image: crispyBurger,
                    type: "veg"
                }
            ]
        }
    ],

    3: [ // BaskinRobbin
        {
            title: "Recommended",
            items: [
                {
                    name: "Pista Ice Cream",
                    price: "₹120",
                    description: "Creamy pista ice cream",
                    image: crispyBurger,
                    type: "veg"
                },
                {
                    name: "Shahi Kulfi",
                    price: "₹130",
                    description: "Traditional shahi kulfi",
                    image: crispyBurger,
                    type: "veg"
                }
            ]
        }
    ],

    4: [ // KalraSweet
        {
            title: "Recommended",
            items: [
                {
                    name: "Kaju Katli",
                    price: "₹500",
                    description: "Premium kaju katli",
                    image: crispyBurger,
                    type: "veg"
                },
                {
                    name: "Milk Cake",
                    price: "₹400",
                    description: "Fresh and delicious milk cake",
                    image: crispyBurger,
                    type: "veg"
                }
            ]
        }
    ],

    5: [ // KFC
        {
            title: "Recommended",
            items: [
                {
                    name: "Crispy Chicken Burger",
                    price: "₹180",
                    description: "Crispy chicken burger",
                    image: crispyBurger,
                    type: "non-veg"
                },
                {
                    name: "Chicken Wings",
                    price: "₹199",
                    description: "Crispy spicy chicken wings",
                    image: crispyBurger,
                    type: "non-veg"
                }
            ]
        },
        {
            title: "Chicken Combos",
            items: [
                {
                    name: "Chicken Burger Meal",
                    price: "₹249",
                    description: "Burger, fries and cold drink",
                    image: crispyBurger,
                    type: "non-veg"
                }
            ]
        }
    ],

    6: [ // Dhaba90s
        {
            title: "Recommended",
            items: [
                {
                    name: "Kadai Paneer",
                    price: "₹180",
                    description: "Spicy kadai paneer",
                    image: crispyBurger,
                    type: "veg"
                },
                {
                    name: "Dal Makhni",
                    price: "₹150",
                    description: "Creamy dal makhni",
                    image: crispyBurger,
                    type: "veg"
                },
                {
                    name: "Garlic Naan",
                    price: "₹60",
                    description: "Soft garlic naan",
                    image: crispyBurger,
                    type: "veg"
                }
            ]
        }
    ],

    7: [ // PunjabhiChaap
        {
            title: "Recommended",
            items: [
                {
                    name: "Afghani Chaap",
                    price: "₹180",
                    description: "Creamy afghani soya chaap",
                    image: crispyBurger,
                    type: "veg"
                },
                {
                    name: "Malai Chaap",
                    price: "₹170",
                    description: "Soft and creamy malai chaap",
                    image: crispyBurger,
                    type: "veg"
                }
            ]
        }
    ],

    8: [ // Subway
        {
            title: "Recommended",
            items: [
                {
                    name: "Veggie Delite",
                    price: "₹199",
                    description: "Fresh vegetables with sauces",
                    image: crispyBurger,
                    type: "veg"
                },
                {
                    name: "Paneer Tikka Sub",
                    price: "₹229",
                    description: "Paneer tikka with fresh veggies",
                    image: crispyBurger,
                    type: "veg"
                }
            ]
        }
    ],

    9: [ // Cafe Coffee Day
        {
            title: "Recommended",
            items: [
                {
                    name: "Cold Coffee",
                    price: "₹90",
                    description: "Chilled creamy cold coffee",
                    image: crispyBurger,
                    type: "veg"
                },
                {
                    name: "Cappuccino",
                    price: "₹120",
                    description: "Hot creamy cappuccino",
                    image: crispyBurger,
                    type: "veg"
                }
            ]
        }
    ]
};

function RestaurantMenu() {
    const {id} = useParams();
    console.log(id);
    const restaurant = restaurants[id];
    const menu = menuData[id];
    const [value,setValue] = useState(0);
    const [currIndex, setCurrIndex] = useState(0 );

    function handlePrev(){
    value<=0 ? "" : setValue((prev) => prev-25)
    }

    function handleNext(){
        value>=50 ? "" : setValue((prev) => prev+25)
    }

    function toogleFun(index){
        setCurrIndex(index===currIndex ? null: index)
    }

    //  const {cartData, setCartData} = useContext(cartContext);
    const cartData = useSelector((state) => state.cartSlice.cartItems);
    const dispatch = useDispatch();
    function handleAddToCart(item) {

    // Agar cart empty hai to direct item add karo
    if (cartData.length === 0) {
        const newItem = {
            ...item,
            restaurantId: id,
            restaurantName: restaurant.name,
            restaurantImage: restaurant.img
        };

        dispatch(addToCart({newItem}));
        toast.success("food added to the cart");
        // localStorage.setItem("cartData", JSON.stringify([newItem]));
        return;
    }

    // Check karo cart kis restaurant ka hai
    const differentRestaurant = cartData.some(
        (data) => data.restaurantId !== id
    );
    if (differentRestaurant) {
        toast.error("Cannot add items from multiple restaurants at the same time");
        return;
    }

    // Same item already added hai ya nahi
    const isAdded = cartData.find(
        (data) => data.name === item.name
    );

    if (isAdded) {
        toast.error("Already added");
        return;
    }

    const newItem = {
        ...item,
        restaurantId: id,
        restaurantName: restaurant.name,
        restaurantImage: restaurant.img
    };
    
    dispatch(addToCart({newItem}))
    toast.success("food added to the cart");
}

  return (
    <div className='w-full'>
    <div className='w-[800px] mx-auto pt-8'>
    <p className='text-[12px] text-slate-500'> <Link to={"/"}><span className='hover:text-slate-700 hover:cursor-pointer'>Home</span> </Link> / <span className='hover:text-slate-700 hover:cursor-pointer'>Haridwar</span> / <span className='text-slate-700'>{restaurant.name}</span> </p>
    <h1 className='font-bold pt-6 text-2xl'>{restaurant.name}</h1>
    <div className='w-full h-[206px] bg-gradient-to-t px-4 pb-4 from-slate-200/70  mt-3 rounded-[30px]'>
    <div className='w-full border border-slate-200/70 rounded-[30px] h-full bg-white'>
    <div className='p-4 w-full'>
    <div className='flex items-center gap-1 font-semibold'>
    <img className='w-4' src={star} alt="" />
    <span>{restaurant.rating}</span>
    <span>({restaurant.totalRating})</span>
    .
    <span>{restaurant.combo}</span>
    </div>
    <p className='underline font-semibold text-orange-600 hover:cursor-pointer'>{restaurant.special}</p>
    <div className='flex gap-2 mt-2'>
        <div className='w-[9px] flex flex-col justify-center items-center'>
            <div className='w-[7px] h-[7px] bg-gray-500 rounded-full'></div>
            <div className='w-[1px] h-[25px] bg-gray-500'></div>
            <div className='w-[7px] h-[7px] bg-gray-500 rounded-full'></div>
        </div>
        <div className='flex flex-col text-sm gap-2 font-semibold'>
        <p>Outlet <span className='text-gray-400'>{restaurant.place}</span></p>
        <p>40-45min</p> 
        </div>
    </div>
    </div>
    <hr />

    <div className=' w-full'>
    <div  className='flex items-center p-4'>
        <img className='w-6' src={cycle} alt="" />
        <span className='pl-2'>4.7 km | Delivery fees applicable. Delivered & charged by restaurant.</span>
    </div>
    </div>

    </div>
    </div>

    <div className='w-full overflow-hidden'>
    <div className="flex justify-between mt-8 pr-25">
                       <h1 className="pl-20 text-xl font-bold">Deals for you</h1>
                       <div className="flex mt-2 gap-3">
                           <div onClick={handlePrev} className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
                           <img className='w-4 h-4' src={leftArrow} alt="" />
                           </div>
                           <div onClick={handleNext} className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
                           <img className='w-4 h-4' src={rightArrow} alt="" />
                           </div>
                       </div>
                   </div>
                   <div className='flex gap-4 mt-5'>
                    {
                    discountData.map((data,index)=>(
                       <Discount key={index} data={data}/> 
                    ))
                   }
                   </div>

    </div>

    <h2 className='text-center mt-5'>MENU</h2>

    <div className='w-full mt-5 relative cursor-pointer'>
        <div className='w-full p-3 rounded-xl font-semibold bg-slate-200 text-lg text-center'>Search for dishes</div>
        <img className='w-4 absolute top-4 right-4' src={search} alt="" />
    </div>

{
    menu.map((category, index) => (
        <div key={index}>

            <div className='flex justify-between'>
                <h2 className="text-xl font-bold mt-6">
                    {category.title} ({category.items.length})
                </h2>

                <img
                    className='w-6'
                    onClick={() => toogleFun(index)}
                    src={currIndex === index ? upArrow : downArrow}
                    alt=""
                />
            </div>
            <hr className='my-5  border-[10px] border-gray-300' />

            { //hide karne ke liye
                currIndex === index && (
                    <div>
                        {
                            category.items.map((item, itemIndex) => (
                                <div key={itemIndex}>
                                {/* item card */}
                                <div className='flex justify-between py-5'>

                                {/* left side */}
                                <div className='w-[65%]'>
                                {/* Veg/Non-veg sticker*/}
                                <img className='w-6 h-6 mb-2' src={item.type === "veg" ? veg : nonVeg} alt={item.type} />
                                    <h3 className='font-bold text-lg'>{item.name}</h3>
                                    <p className='font-semibold mt-1'>{item.price}</p>
                                    <p className='text-gray-500 text-sm mt-2'>{item.description}</p>
                                    </div>

                                    {/* right side */} 
                                    <div className=' relative w-[30%] h-[110px] bg-gray-200 rounded-xl overflow-hidden shadow-sm shrink-0'>
                                        <img className='w-full h-full object-contain rounded-xl scale-150 ' src={item.image} alt="" />
                                        <button onClick={()=> handleAddToCart(item)} className='absolute bottom-[2px] ml-19 bg-white  text-green-400 w-20 rounded-md cursor-pointer'>Add</button>
                                    </div>
                                    </div>

                                    {/* hr between items */}
                                    {/* Kya current item last item nahi hai? agar nahi hai matlab current item last item nahi hai */}
                                    {itemIndex!== category.items.length-1 && (
                                        <hr className='my-4 border-gray-300' />
                                    )}
                                </div>
                            ))
                        }
                    </div>
                )
            }

        </div>
    ))
}
    
    </div>
    </div>
  )
}

function Discount({data: {info,couponCode}}){
    console.log();
    return(
        <div className='flex gap-2 min-w-[328px] border p-3 h-[76px] rounded-2xl '>
            <img className='w-10 ' src={discount} alt="" />
            <div>
                <h2 className='font-bold text-xl'>{info}</h2>
                <p className='text-gray-500'>{couponCode}</p>
            </div>
        </div>
    )
}

export default RestaurantMenu