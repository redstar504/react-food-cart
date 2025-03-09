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
        quantity: 2,
    },
    {
        productId: 2,
        quantity: 1,
    }
]

function App() {
    const [cart, setCart] = useState<CartProduct[]>(initialCart)
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(true)

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
                                    <source srcSet={`images/image-${product.imageName}-desktop.jpg`}
                                            media="(min-width: 768px)"/>
                                    <source srcSet={`images/image-${product.imageName}-tablet.jpg`}
                                            media="(min-width: 480px)"/>
                                    <img src={`images/image-${product.imageName}-mobile.jpg`} alt="Waffle"/>
                                </picture>
                            </a>
                            {isProductInCart(product.id) ? (
                                <div className="cartControlButton">
                                    <button
                                        className="decreaseQuantity"
                                        onClick={() => {
                                            console.log("foo")
                                        }}
                                    ></button>
                                    {numProductsInCart(product.id)}
                                    <button
                                        className="increaseQuantity"
                                        onClick={() => {
                                            console.log("bar")
                                        }}
                                    ></button>
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

                {cart.length > 0 ? (
                    <div id="cart">
                        <h2 className="text-2">Your Cart ({cart.length})</h2>
                        <ul>
                            {cart.map(cartProduct => (
                                <CartProduct productId={cartProduct.productId} quantity={cartProduct.quantity} />
                            ))}
                        </ul>

                        <div id="cartTotal">
                            <p className="text-4">Order Total</p>
                            <strong className="text-2">$46.50</strong>
                        </div>

                        <div id="cartFootnote">
                            <img src="/images/icon-carbon-neutral.svg" alt="Carbon Neutral" />
                            This is a <strong className="text-4-bold ">carbon-neutral</strong> delivery
                        </div>

                        <button
                            id="confirmOrder"
                            className="text-3"
                            onClick={() => setIsOrderConfirmed(v => !v)}
                        >
                            Confirm Order
                        </button>
                    </div>
                ) : (
                    <div id="cart">
                        <h2 className="text-2">Your Cart ({cart.length})</h2>
                        <img id="emptyImg" src="/images/illustration-empty-cart.svg" alt="Empty cart"/>
                        <p className="text-4-bold">Your added items will appear here.</p>
                    </div>
                )}

                { isOrderConfirmed && (
                    <>
                        <div id="overlay" onClick={() => setIsOrderConfirmed(false)}></div>
                        <div className="modal">
                            <p>Hello worlds</p>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default App

function CartProduct({productId, quantity}: { productId: number, quantity: number}) {
    const product = products.find(p => p.id == productId)
    const subtotal = product ? product.price * quantity : 0

    return product ? (
        <li key={productId}>
            <div className="cartLineItem">
                <h3 className="text-4-bold">{product.longName}</h3>
                <span className="cartQuantity text-4-bold">{quantity}x</span>
                @ ${product.price.toFixed(2)}
                <strong className="text-4-bold">${subtotal.toFixed(2)}</strong>
            </div>
            <button>
                <img src="/images/icon-remove-item.svg"/>
            </button>
        </li>
    ) : undefined
}