import './screen.css'
import {useState} from "react";

type Product = {
    shortName: string
    longName: string
    price: number
    image: string
}

const products: Product[] = [
    {
        shortName: 'Waffle',
        longName: 'Waffle with Berries',
        price: 6.50,
        image: 'image-waffle-mobile.jpg',
    },
    {
        shortName: 'Créme Brûlée',
        longName: 'Vanilla Bean Créme Brûlée',
        price: 7.00,
        image: 'image-creme-brulee-mobile.jpg'
    }
]

function App() {
    const [cart, setCart] = useState<Product[]>([])

    return (
        <>
            <div id="container">
                <h1 className="text-1">
                    Desserts
                </h1>

                <ul id="productList">
                    {products.map(product => (
                        <li>
                            <a href="#">
                                <img src={`images/${product.image}`} alt="Waffle"/>
                            </a>
                            <button>
                                <span></span>
                                Add to Cart
                            </button>
                            <small className="text-4">{product.shortName}</small>
                            <h2 className="text-3">{product.longName}</h2>
                            <p className="text-3 price">${product.price.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>

                <div id="cart">
                    <h2 className="text-2">Your Cart (0)</h2>
                    <img id="emptyImg" src="/images/illustration-empty-cart.svg" alt="Empty cart"/>
                    <p className="text-4-bold">Your added items will appear here.</p>
                </div>
            </div>
        </>
    )
}

export default App
