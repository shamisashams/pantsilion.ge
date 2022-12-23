import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Inertia } from "@inertiajs/inertia";

const Quantity = ({ item, cart, collection }) => {
    const [number, setNumber] = useState(
        parseInt(item.quantity > 0 ? item.quantity : 1)
    );

    const decrease = () => {
        if (number > 1) {
            setNumber(number - 1);
        } else {
            setNumber(1);
        }

        if (cart)
            Inertia.get(route("update_cart"), {
                id: item.product.id,
                qty: number > 1 ? number - 1 : 1,
            });

        if (collection)
            Inertia.get(route("update_cart_collection"), {
                id: item.collection.id,
                qty: number > 1 ? number - 1 : 1,
            });
    };
    const increase = () => {
        setNumber(number + 1);
        if (cart)
            Inertia.get(route("update_cart"), {
                id: item.product.id,
                qty: number + 1,
            });

        if (collection)
            Inertia.get(route("update_cart_collection"), {
                id: item.collection.id,
                qty: number + 1,
            });
    };

    return (
        <div className="flex items-center justify-between bg-zinc-200 w-32 py-2 px-4 rounded sm:mx-5 shrink-0">
            <button onClick={decrease}>
                <FiMinus />
            </button>
            <input type="hidden" id={"qty_" + item.id} value={number} />
            <div className="text-lg text-center">{number}</div>
            <button onClick={increase}>
                <FiPlus />
            </button>
        </div>
    );
};

export default Quantity;
