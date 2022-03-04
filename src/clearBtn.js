const clearBtn = ({clearCart}) => {
    return <div className = "mt-3 flex justify-center">
            <button className="text-red-400 capitalize tracking-wider hover:text-red-600 transition" onClick={clearCart}>clear items</button>
        </div>
}

export default clearBtn