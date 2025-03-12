import './screen.css'
import {useEffect, useRef, useState} from "react";
import * as React from "react";

type Product = {
    id: number
    shortName: string
    longName: string
    price: number
    imageName: string
    quantityAvailable: number
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
        quantityAvailable: 10
    },
    {
        id: 2,
        shortName: 'Créme Brûlée',
        longName: 'Vanilla Bean Créme Brûlée',
        price: 7.00,
        imageName: 'creme-brulee',
        quantityAvailable: 10
    },
    {
        id: 3,
        shortName: 'Macaron',
        longName: 'Macaron Mix of Five',
        price: 8.00,
        imageName: 'macaron',
        quantityAvailable: 10
    },
    {
        id: 4,
        shortName: 'Tiramisu',
        longName: 'Classic Tiramisu',
        price: 5.50,
        imageName: 'tiramisu',
        quantityAvailable: 10
    },
    {
        id: 5,
        shortName: 'Baklava',
        longName: 'Pistachio Baklava',
        price: 4.00,
        imageName: 'baklava',
        quantityAvailable: 10
    },
    {
        id: 6,
        shortName: 'Pie',
        longName: 'Lemon Meringue Pie',
        price: 5.00,
        imageName: 'meringue',
        quantityAvailable: 10
    },
    {
        id: 7,
        shortName: 'Cake',
        longName: 'Red Velvet Cake',
        price: 4.50,
        imageName: 'cake',
        quantityAvailable: 10
    },
    {
        id: 8,
        shortName: 'Brownie',
        longName: 'Salted Caramel Brownie',
        price: 5.50,
        imageName: 'brownie',
        quantityAvailable: 10
    },
    {
        id: 9,
        shortName: 'Panna Cotta',
        longName: 'Vanilla Panna Cotta',
        price: 6.50,
        imageName: 'panna-cotta',
        quantityAvailable: 10
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
    const modalRef = useRef<HTMLDivElement>(null);

    const isProductInCart = (productId: number) => !!cart.find(ci => ci.productId === productId)
    const numProductsInCart = (productId: number) => cart.find(ci => ci.productId === productId)?.quantity ?? 0
    const cartTotal = cart.reduce((a, c) => {
        const product = products.find(p => p.id === c.productId)
        if (undefined === product) return a
        return a + product.price * c.quantity
    }, 0)

    useEffect(() => {
        const currentModalRef = modalRef.current

        if (isOrderConfirmed) {
            document.body.classList.add('lock')
            if (currentModalRef) currentModalRef.classList.add('open')
        } else {
            if (currentModalRef) currentModalRef.classList.remove('open')
            document.body.classList.remove('lock')
        }
    }, [isOrderConfirmed])

    return (
        <>
            <div id="container" className={isOrderConfirmed ? 'confirming' : ''}>
                <div id="productsWrapper">
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
                                                    const quantityAvailable = products.find(p => p.id === product.id)?.quantityAvailable
                                                    if (!currentItem || !quantityAvailable) return cart

                                                    const newQuantity = currentItem.quantity + 1
                                                    if (newQuantity > quantityAvailable) return cart

                                                    return [
                                                        ...cart.filter(c => c.productId !== product.id),
                                                        {...currentItem, quantity: newQuantity}
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
                </div>


                {cart.length > 0 ? (
                    <div id="cart">
                        <h2 className="text-2">Your Cart ({cart.length})</h2>
                        <ul>
                            {cart.map(cartProduct => (
                                <CartProduct
                                    key={cartProduct.productId}
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
                            <strong
                                className="text-2">${Number.isInteger(cartTotal) ? cartTotal : cartTotal.toFixed(2)}</strong>
                        </div>

                        <div id="cartFootnote">
                            <img src="/images/icon-carbon-neutral.svg" alt="Carbon Neutral"/>
                            <p>This is a <strong className="text-4-bold ">carbon-neutral</strong> delivery.</p>
                        </div>

                        <button
                            id="confirmOrder"
                            className="text-3"
                            onClick={() => setIsOrderConfirmed(true)}
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

                {isOrderConfirmed && (
                    <Modal
                        cart={cart}
                        setCart={setCart}
                        setIsOrderConfirmed={setIsOrderConfirmed}
                        modalRef={modalRef}
                    />
                )}
            </div>
        </>
    )
}

export default App

type ModalPropsType = {
    cart: CartProduct[],
    setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>,
    setIsOrderConfirmed: React.Dispatch<React.SetStateAction<boolean>>,
    modalRef: React.RefObject<HTMLDivElement | null>
}

function Modal({cart, setCart, setIsOrderConfirmed, modalRef}: ModalPropsType) {
    const [isConfirmed, setIsConfirmed] = useState(false)

    const handleClose = () => {
        const currentRef = modalRef.current
        if (!currentRef) return
        currentRef.classList.remove('open')
        currentRef.classList.add('closing')
        setTimeout(() => {
            setIsOrderConfirmed(false)
        }, 200)
    }

    useEffect(() => {
        setTimeout(() => {
            setIsConfirmed(true)
        }, 50000)
    }, [])

    return (
        <>
            <div id="overlay" onClick={handleClose}></div>
            <div className="modal" ref={modalRef}>
                {isConfirmed ? (
                    <>
                        <img src="/images/icon-order-confirmed.svg" alt="Order confirmed"/>
                        <h2 className="text-1">Order<br/>Confirmed</h2>
                        <p>We hope you enjoy your food!</p>
                        {isConfirmed ? <p>Confirmed</p> : <p>Not confirmed</p>}
                        <div id="summaryWrapper">
                            <ul className="orderSummary">
                                {cart.map(cartProduct => {
                                    const product = products.find(p => p.id === cartProduct.productId)
                                    if (!product) return
                                    const subtotal = product.price * cartProduct.quantity

                                    return (
                                        <li key={cartProduct.productId}>
                                            <img src="/images/image-meringue-thumbnail.jpg" alt="Thumbnail"/>
                                            <div>
                                                <h3 className="text-4-bold">{product.longName}</h3>
                                                <span className="text-4-bold">{cartProduct.quantity}x</span> @
                                                ${product.price.toFixed(2)}
                                            </div>
                                            <strong className="text-3">${subtotal.toFixed(2)}</strong>
                                        </li>
                                    )
                                })}
                            </ul>
                            <div id="summaryTotal">
                                <p className="text-4">Order Total</p>
                                <strong className="text-2">$46.50</strong>
                            </div>
                        </div>
                        <button
                            id="restartOrder"
                            className="text-3"
                            onClick={() => {
                                setCart([])
                                handleClose()
                            }}
                        >Start New Order
                        </button>
                    </>
                ) : (
                    <>
                        <img src="/images/icon-order-confirmed.svg" alt="Order confirmed"/>
                        <h2 className="text-1">Confirming<br/> Your Order</h2>

                        <p>Please wait, this may take a moment...</p>
                    </>
                )}

            </div>
        </>
    )
}

function CartProduct({productId, quantity, onDelete}: { productId: number, quantity: number, onDelete: () => void }) {
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
                <img src="/images/icon-remove-item.svg" alt="Remove item"/>
            </button>
        </li>
    ) : undefined
}