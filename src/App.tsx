import './screen.css'
import {useEffect, useRef, useState} from "react";

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
    const cartTotal = cart.reduce((a, c) => {
        const product = products.find(p => p.id === c.productId)
        if (undefined === product) return a
        return a + product.price * c.quantity
    }, 0)

    useEffect(() => {
        if (isOrderConfirmed) {
            document.body.classList.add('lock')
            return
        }

        document.body.classList.remove('lock')
    }, [isOrderConfirmed])

    return (
        <>
            <div id="container" className={isOrderConfirmed ? 'confirming' : ''}>
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
                                            setCart(cart => {
                                                const currentItem = cart.find(c => c.productId === product.id)
                                                if (!currentItem) return cart

                                                const otherItems = cart.filter(c => c.productId !== product.id)
                                                if (currentItem.quantity === 1) return otherItems

                                                return [
                                                    ...cart.filter(c => c.productId !== product.id),
                                                    {
                                                        ...currentItem,
                                                        quantity: currentItem.quantity - 1
                                                    }
                                                ]
                                            })
                                        }}
                                    ></button>
                                    {numProductsInCart(product.id)}
                                    <button
                                        className="increaseQuantity"
                                        onClick={() => {
                                            setCart(cart => {
                                                const currentItem = cart.find(c => c.productId === product.id)
                                                if (!currentItem) return cart

                                                return [
                                                    ...cart.filter(c => c.productId !== product.id),
                                                    {
                                                        ...currentItem,
                                                        quantity: currentItem.quantity + 1
                                                    }
                                                ]
                                            })
                                        }}
                                    ></button>
                                </div>
                            ) : (
                                <button onClick={() => {
                                    setCart(cart => {
                                        return [
                                            ...cart,
                                            {productId: product.id, quantity: 1}
                                        ]
                                    })
                                }}>
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
                                <CartProduct
                                    productId={cartProduct.productId}
                                    quantity={cartProduct.quantity}
                                    onDelete={() => {
                                        setCart(cart => cart.filter(c => c.productId !== cartProduct.productId))
                                    }}
                                />
                            ))}
                        </ul>

                        <div id="cartTotal">
                            <p className="text-4">Order Total</p>
                            <strong className="text-2">${Number.isInteger(cartTotal) ? cartTotal : cartTotal.toFixed(2)}</strong>
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
                            <img src="/images/icon-order-confirmed.svg" />
                            <h2 className="text-1">Order<br />Confirmed</h2>
                            <p>We hope you enjoy your food!</p>
                            <ul className="orderSummary">
                                <li>
                                    <img src="/images/image-meringue-thumbnail.jpg" alt="Thumbnail" />
                                    <div>
                                        <h3 className="text-4-bold">Classic Tiramisu</h3>
                                        <span className="text-4-bold">1x</span> @ $5.50
                                    </div>
                                    <strong className="text-3">$5.50</strong>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default App

function CartProduct({productId, quantity, onDelete}: { productId: number, quantity: number, onDelete: () => void}) {
    const product = products.find(p => p.id == productId)
    const subtotal = product ? product.price * quantity : 0
    const rowRef = useRef<HTMLLIElement>(null);

    const handleDelete = () => {
        if (rowRef.current) {
            rowRef.current.classList.add('removing')

            setTimeout(() => {
                onDelete()
            }, 300)
        }
    }

    return product ? (
        <li key={productId} ref={rowRef}>
            <div className="cartLineItem">
                <h3 className="text-4-bold">{product.longName}</h3>
                <span className="cartQuantity text-4-bold">{quantity}x</span>
                @ ${product.price.toFixed(2)}
                <strong className="text-4-bold">${subtotal.toFixed(2)}</strong>
            </div>
            <button onClick={handleDelete}>
                <img src="/images/icon-remove-item.svg" alt="Remove item" />
            </button>
        </li>
    ) : undefined
}