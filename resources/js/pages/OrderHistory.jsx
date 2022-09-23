import React from "react";
import { cartList } from "../components/Data";
import CabinetTabs from "../components/CabinetTabs";
import Layout from "../Layouts/Layout";
import { Link, usePage } from "@inertiajs/inertia-react";
//import { Link, usePage } from "@inertiajs/inertia-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Moment from "moment";

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
                    <div className="md:pt-10 lg:pt-52 pb-32  mx-auto md:w-auto w-full">
                        <div className=" mx-auto">
                            <div className="text-3xl bold mb-12 ">
                                {__("client.order_history", localizations)}
                            </div>
                            <div className="md:overflow-hidden overflow-x-scroll  w-full">
                                <div className=" pb-20">
                                    <table className=" orderHistoryTable text-sm whitespace-nowrap  ">
                                        <tr>
                                            <td className="opacity-50 ">
                                                {__('client.order_id', localizations)}
                                            </td>
                                            <td className="opacity-50 ">
                                                {__('client.order_date', localizations)}
                                            </td>
                                            <td className="opacity-50 ">
                                                {__("client.orders_price", localizations)}
                                            </td>
                                            <td className="opacity-50 ">
                                                {__('client.order_details', localizations)}
                                            </td>
                                        </tr>

                                        {orders.data.map((item, index) => {
                                            let date = Moment(
                                                item.created_at
                                            ).format("DD.MM.YYYY");
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <strong>
                                                            {item.id}
                                                        </strong>
                                                    </td>
                                                    <td> {date}</td>
                                                    <td>
                                                        {" "}
                                                        ₾ {item.grand_total}
                                                    </td>
                                                    <td>
                                                        <Link
                                                            href={route(
                                                                "partner.order-details",
                                                                item.id
                                                            )}
                                                        >
                                                            <BsThreeDotsVertical className="w-5 h-5" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </table>

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
            </div>
        </Layout>
    );
};

export default OrderHistory;
