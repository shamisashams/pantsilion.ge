import React, { useRef } from "react";
import { MdContentCopy } from "react-icons/md";
import { GoCreditCard } from "react-icons/go";
import { MdHistory } from "react-icons/md";
import {
    RiSettings3Line,
    RiBankLine,
    RiLogoutBoxLine,
    RiListUnordered,
} from "react-icons/ri";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import { IoTrashOutline } from "react-icons/io5";
import { cartList } from "../components/Data";
import Layout from "../Layouts/Layout";
import { BsThreeDotsVertical } from "react-icons/bs";
import Moment from "moment";

const RegularOrderDetails = ({ seo }) => {
    const { user, order, localizations } = usePage().props;

    const affiliationLink = useRef();

    console.log(order);

    const copyText = () => {
        navigator.clipboard.writeText(affiliationLink.current.value);
    };

    let links = function (links) {
        let rows = [];
        //links.shift();
        //links.splice(-1);
        {
            links.map(function (item, index) {
                if (index > 0 && index < links.length - 1) {
                    rows.push(
                        <Link
                            href={item.url}
                            className={
                                item.active
                                    ? "bold mx-2 underline"
                                    : "bold mx-2"
                            }
                        >
                            {item.label}
                        </Link>
                    );
                }
            });
        }
        return <div className="nums"> {rows.length > 1 ? rows : null} </div>;
    };

    let linksPrev = function (links) {
        let rowCount = 0;
        links.map(function (item, index) {
            if (index > 0 && index < links.length - 1) {
                rowCount++;
            }
        });
        return rowCount > 1 ? (
            <Link href={links[0].url}>
                <Arrow color="#2F3E51" rotate="90" />
                <Arrow color="#2F3E51" rotate="90" />
            </Link>
        ) : null;
    };
    let linksNext = function (links) {
        let rowCount = 0;
        links.map(function (item, index) {
            if (index > 0 && index < links.length - 1) {
                rowCount++;
            }
        });
        return rowCount > 1 ? (
            <Link href={links[links.length - 1].url}>
                <Arrow color="#2F3E51" rotate="-90" />
                <Arrow color="#2F3E51" rotate="-90" />
            </Link>
        ) : null;
    };

    return (
        <Layout seo={seo}>
            <div className="overflow-hidden bg-zinc-100">
                <div className="wrapper h-full flex items-center justify-between flex-col xl:flex-row">
                    <div className="xl:bg-white md:pt-60 pt-32 w-full xl:w-auto relative md:pb-32 pb-10 pr-0 h-auto md:self-stretch md:pr-20">
                        <div
                            className="hidden xl:block absolute right-full top-0 h-full bg-white "
                            style={{ width: "500px" }}
                        ></div>
                        <div>{__("client.client_cabinet", localizations)}</div>
                        <div className="bold text-2xl mb-5 mt-1">
                            {user.name} {user.surname}
                        </div>

                        <Link
                            href={route("client.orders")}
                            className="flex xl:text-xl items-center  justify-start px-5 py-3 transition-all duration-300 bg-custom-dark text-white "
                        >
                            <MdHistory className="w-6 h-6 mr-6" />
                            <div>
                                {__("client.order_history", localizations)}
                            </div>
                        </Link>
                        <Link
                            href={route("logout")}
                            className="flex md:text-lg items-center  justify-start px-5 py-3 transition-all duration-300 hover:bg-zinc-100  "
                        >
                            <RiLogoutBoxLine className="w-6 h-6 mr-6" />
                            <div>{__("client.sign_out", localizations)}</div>
                        </Link>
                    </div>
                    <div className="md:pt-10 xl:pt-52 pb-32  mx-auto md:w-auto w-full">
                        <div className=" mx-auto">
                            <div className="mb-12">
                                <div className="text-3xl bold mb-4 ">
                                    Order ID
                                </div>
                                <div className="mb-4">
                                    Data:{" "}
                                    <span className="opacity-50">
                                        {Moment(
                                            order.created_at
                                        ).format("DD.MM.YYYY")}
                                    </span>
                                </div>
                                <div className="mb-4">
                                    Total price:{" "}
                                    <span className="opacity-50">{order.grand_total} ₾</span>
                                </div>
                                {order.collections.length > 0 ?

                                    order.collections.map((collection,i) => {
                                        return (
                                            <div>
                                                Furniture set:{" "}
                                                <span className="opacity-50">{order.collections[0].title}</span>
                                            </div>
                                        )
                                        })
                                    :null}
                            </div>
                            <div className="md:overflow-hidden overflow-x-scroll  w-full">
                                <div className=" pb-20">
                                    <table className=" orderHistoryTable details text-sm whitespace-nowrap  text-center ">
                                        <tr>
                                            <td className="opacity-50 ">
                                                {__('client.order_product_name',localizations)}
                                            </td>
                                            <td className="opacity-50 ">
                                                {__('client.order_product_qty',localizations)}
                                            </td>
                                            <td className="opacity-50 ">
                                                {__('client.order_product_price',localizations)}
                                            </td>
                                            <td className="opacity-50 ">
                                                {__('client.order_product_total',localizations)}
                                            </td>
                                            <td className="opacity-50 ">
                                                {__('client.order_product_color',localizations)}
                                            </td>
                                            <td className="opacity-50 ">
                                                {__('client.order_product_size',localizations)}
                                            </td>
                                            <td className="opacity-50 ">
                                                {__('client.order_product_material',localizations)}
                                            </td>
                                        </tr>
                                        {order.items.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td className="bold">
                                                        {item.name}
                                                    </td>
                                                    <td>{item.qty_ordered}</td>
                                                    <td>₾ {item.price}</td>
                                                    <td>₾ {item.total}</td>
                                                    <td>
                                                        <div
                                                            className="w-5 h-5 rounded-full mx-auto"
                                                            style={{
                                                                backgroundColor:
                                                                    item.attributes ? item.attributes.color:null,
                                                            }}
                                                        ></div>
                                                    </td>
                                                    <td>{item.attributes ? item.attributes.size:null}cm</td>
                                                    <td>{item.attributes ? item.attributes.material :null}</td>
                                                </tr>
                                            )
                                        })}

                                        {order.collections.map((item, index) => {


                                            return (
                                                item.items.map((product,index_) => {
                                                    return (
                                                        <tr>
                                                            <td className="bold">
                                                                {product.title}
                                                            </td>
                                                            <td>{1}</td>
                                                            <td>₾ {product.price}</td>
                                                            <td>₾ {product.price}</td>
                                                            <td>
                                                                <div
                                                                    className="w-5 h-5 rounded-full mx-auto"
                                                                    style={{
                                                                        backgroundColor:
                                                                            product.attributes ? product.attributes.color:null,
                                                                    }}
                                                                ></div>
                                                            </td>
                                                            <td>{product.attributes ? product.attributes.size:null}cm</td>
                                                            <td>{product.attributes ? product.attributes.material :null}</td>
                                                        </tr>
                                                    )
                                                })
                                            )


                                        })}
                                        {/*<tr>
                                            <td className="bold">
                                                Product name
                                            </td>
                                            <td>₾ 95.55</td>
                                            <td>
                                                <div
                                                    className="w-5 h-5 rounded-full mx-auto"
                                                    style={{
                                                        backgroundColor:
                                                            "#DF7F7F",
                                                    }}
                                                ></div>
                                            </td>
                                            <td>155x25x225x112 cm</td>
                                            <td>leather</td>
                                        </tr>
                                        <tr>
                                            <td className="bold">
                                                Product name
                                            </td>
                                            <td>₾ 95.55</td>
                                            <td>
                                                <div
                                                    className="w-5 h-5 rounded-full mx-auto"
                                                    style={{
                                                        backgroundColor:
                                                            "#7F89DF",
                                                    }}
                                                ></div>
                                            </td>
                                            <td>-</td>
                                            <td>Wood</td>
                                        </tr>
                                        <tr>
                                            <td className="bold">
                                                Product name
                                            </td>
                                            <td>₾ 95.55</td>
                                            <td>
                                                <div
                                                    className="w-5 h-5 rounded-full mx-auto"
                                                    style={{
                                                        backgroundColor:
                                                            "#DFC77F",
                                                    }}
                                                ></div>
                                            </td>
                                            <td>155x25x225x112 cm</td>
                                            <td>leather</td>
                                        </tr>*/}
                                    </table>

                                    <div className="flex items-center justify-center text-lg mt-10">
                                        {/*<button className="bold mx-2 underline">1</button>
                                  <button className="bold mx-2 ">2</button>
                                  <button className="bold mx-2 ">3</button>*/}

                                        <Link href={route('client.invoice',order.id)}>{__('client.order_invoice',localizations)}</Link>

                                    </div>
                                </div>{" "}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RegularOrderDetails;
