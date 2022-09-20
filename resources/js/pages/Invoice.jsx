import { ImFilePdf } from "react-icons/im";
import React, { useRef } from "react";
import Layout from "../Layouts/Layout";
import { Link, usePage } from "@inertiajs/inertia-react";

const Invoice = () => {
    const {order} = usePage().props;
    return (
        <div className="bg-zinc-100 min-h-screen pt-52">
            <div className="wrapper">
                <div className="flex justify-between items-start pb-20 flex-col lg:flex-row">
                    <table className="lg:w-2/3 w-full">
                        <tr>
                            <th className="text-left font-normal border-b pb-5">
                                Product
                            </th>
                            <th className="text-left font-normal border-b pb-5">
                                quantity
                            </th>
                            <th className="text-left font-normal border-b pb-5">
                                Price
                            </th>
                        </tr>
                        {order.items.map((item,index) => {
                            return (
                                <tr>
                                    <td className="py-3 border-b pt-6">
                                        <div className="bold text-lg">{item.name}</div>
                                        <p>Color: {item.attributes.color}</p>
                                        <p>Size: {item.attributes.size} cm</p>
                                    </td>
                                    <td className="py-3 border-b">{item.qty_ordered}</td>
                                    <td className="py-3 border-b">₾ {item.price}</td>
                                </tr>
                            )
                        })}
                        {/*<tr>
                            <td className="py-3 border-b pt-6">
                                <div className="bold text-lg">Small Chair</div>
                                <p>Color: gray</p>
                                <p>Size: 155x25x225 cm</p>
                            </td>
                            <td className="py-3 border-b">2</td>
                            <td className="py-3 border-b">₾ 299.55</td>
                        </tr>
                        <tr>
                            <td className="py-3 border-b">
                                <div className="bold text-lg">Small Chair</div>
                                <p>Color: gray</p>
                                <p>Size: 155x25x225 cm</p>
                            </td>
                            <td className="py-3 border-b">1</td>
                            <td className="py-3 border-b">₾ 299.55</td>
                        </tr>
                        <tr>
                            <td className="py-3 border-b">
                                <div className="bold text-lg">Small Chair</div>
                                <p>Color: gray</p>
                                <p>Size: 155x25x225 cm</p>
                            </td>
                            <td className="py-3 border-b">3</td>
                            <td className="py-3 border-b">₾ 299.55</td>
                        </tr>*/}
                    </table>
                    <div className=" lg:w-1/3 w-full lg:pt-0 pt-10">
                        <div
                            className="sm:text-right bold text-4xl border-b"
                            style={{ paddingBottom: "5px" }}
                        >
                            Invoice
                        </div>
                        <div className="lg:border-l ">
                            <div className="sm:text-right sm:pl-10 max-w-md mx-auto mr-0">
                                <div className=" bold text-2xl pt-5 mb-3">
                                    Summary
                                </div>
                                <div className="opacity-50 mb-4">
                                    ({order.items.length} items)
                                </div>
                                <div className="flex justify-between items-center border-t py-3">
                                    <div>Subtotal</div>
                                    <div>₾ {order.grand_total}</div>
                                </div>
                                <div className="flex justify-between items-center border-t py-3">
                                    <div>Shipping</div>
                                    <div>₾ {parseFloat(order.ship_price ?? 0)}</div>
                                </div>
                                <div className="flex justify-between items-center text-3xl py-6 bold">
                                    <span>Total</span>
                                    <span>₾ {parseFloat(order.grand_total) + parseFloat(order.ship_price ?? 0)}</span>
                                </div>

                                    <button onClick={window.print} className="bg-custom-dark text-white text-xl bold w-full py-3 mt-5 relative rounded">
                                        <ImFilePdf className="absolute top-1/2 -translate-y-1/2  left-4  w-6 h-6" />
                                        Download PDF
                                    </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
