import React from "react";
import { cartList } from "../components/Data";
import CabinetTabs from "../components/CabinetTabs";
import Layout from "../Layouts/Layout";
import { Link, usePage } from "@inertiajs/inertia-react";
//import { Link, usePage } from "@inertiajs/inertia-react";
import Moment from "moment";
import { BsThreeDotsVertical } from "react-icons/bs";

const OrderHistory = ({ seo }) => {
    const { user, orders, localizations } = usePage().props;

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
                <div className="wrapper h-full flex items-center justify-between flex-col lg:flex-row">
                    <CabinetTabs />
                    <div className=" lg:pt-52 pb-32  mx-auto">
                        <div className=" mx-auto">
                            <div className="text-3xl bold mb-12  text-center">
                                {__("client.order_history", localizations)}
                            </div>
                            <div className=" pb-20">
                                <div className="">
                                    <div className="flex justify-between mb-5 text-sm    ">
                                        <div className="opacity-50 ">
                                            {/* {__(
                                                "client.orders_product",
                                                localizations
                                            )} */}
                                            ID
                                        </div>
                                        <div className="opacity-50 mx-8  pl-40">
                                            {__(
                                                "client.orders_product",
                                                localizations
                                            )}
                                        </div>
                                        <div className="opacity-50 ">
                                            {__(
                                                "client.orders_price",
                                                localizations
                                            )}
                                        </div>
                                    </div>
                                    {orders.data.map((item, index) => {
                                        let date = new Date(
                                            item.created_at
                                        ).toUTCString();
                                        return (
                                            <div
                                                key={index}
                                                className={`flex justify-between items-center border-b border-zinc-200 pb-5 mb-5 md:w-auto sm:w-96 w-80 md:overflow-x-hidden  overflow-x-scroll scrollbar whitespace-nowrap ${
                                                    orders.data.length ===
                                                    index + 1
                                                        ? "border-none mb-10"
                                                        : ""
                                                }`}
                                            >
                                                <div className="shrink-0  flex items-center">
                                                    orderID
                                                </div>
                                                <div className="opacity-50 mx-8">
                                                    {date}
                                                </div>
                                                <div className=" bold whitespace-nowrap  ">
                                                    ₾ {item.grand_total}
                                                </div>
                                                <button className="ml-5">
                                                    <BsThreeDotsVertical />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="flex items-center justify-center text-lg mt-10">
                                    {/*<button className="bold mx-2 underline">1</button>
                                  <button className="bold mx-2 ">2</button>
                                  <button className="bold mx-2 ">3</button>*/}

                                    {links(orders.links)}
                                </div>
                            </div>{" "}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OrderHistory;
