import './screen.css'
import {useState} from "react";

type Product = {
    id: number
    shortName: string
    longName: string
    price: number
    imageName: string
}

type CartProduct = {
    productId: number
    quantity: number
}

const products: Product[] = [
    {
        id: 1,
        shortName: 'Waffle',
        longName: 'Waffle with Berries',
        price: 6.50,
        imageName: 'waffle',
    },
    {
        id: 2,
        shortName: 'Créme Brûlée',
        longName: 'Vanilla Bean Créme Brûlée',
        price: 7.00,
        imageName: 'creme-brulee'
    }
]

const initialCart: CartProduct[] = [
    {
        productId: 1,
        quantity: 2
    }
]

function App() {
    const [cart, setCart] = useState<CartProduct[]>(initialCart)
    const isProductInCart = (productId: number) => !!cart.find(ci => ci.productId === productId)
    const numProductsInCart = (productId: number) => cart.find(ci => ci.productId === productId)?.quantity ?? 0

    return (
        <>
            <div id="container">
                <h1 className="text-1">
                    Desserts
                </h1>

                <ul id="productList">
                    {products.map(product => (
                        <li key={product.id} className={isProductInCart(product.id) ? 'selected' : ''}>
                            <a href="#">
                                <picture>
                                    <source srcSet={`images/image-${product.imageName}-desktop.jpg`} media="(min-width: 768px)" />
                                    <source srcSet={`images/image-${product.imageName}-tablet.jpg`} media="(min-width: 480px)" />
                                    <img src={`images/image-${product.imageName}-mobile.jpg`} alt="Waffle" />
                                </picture>
                            </a>
                            {isProductInCart(product.id) ? (
                                <div className="cartControlButton">
                                    <button className="decreaseQuantity"></button>
                                    {numProductsInCart(product.id)}
                                    <button className="increaseQuantity"></button>
                                </div>
                            ) : (
                                <button>
                                    <span></span>
                                    Add to Cart
                                </button>
                            )}
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
