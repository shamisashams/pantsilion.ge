import React, { useRef, useState } from "react";
import { MdHistory } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
//import File from "../assets/images/icons/file.png";
import EditInput from "../components/EditInput";
import MainButton from "../components/MainButton";
import Layout from "../Layouts/Layout";
import { Inertia } from "@inertiajs/inertia";

const RegularCabinet = ({ seo }) => {
    const { user, localizations } = usePage().props;

    const { errors } = usePage().props;

    const [values, setValues] = useState({
        name: user.name ?? "",
        surname: user.surname ?? "",
        email: user.email,
        id_number: user.id_number,
        address: user.address ?? "",
        phone: user.phone ?? "",
    });

    function handleChange(e) {
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("client.save-settings"), values);
    }

    return (
        <Layout seo={seo}>
            <div className="overflow-hidden bg-zinc-100">
                <div className="wrapper h-full flex items-center justify-between flex-col md:flex-row">
                    <div className="md:bg-white md:pt-60 pt-32 w-full md:w-auto relative md:pb-32 pb-10 pr-5 h-auto md:self-stretch md:pr-20">
                        <div
                            className="hidden md:block absolute right-full top-0 h-full bg-white "
                            style={{ width: "500px" }}
                        ></div>
                        <div>{__("client.client_cabinet", localizations)}</div>
                        <div className="bold text-2xl mb-5 mt-1">
                            {user.name} {user.surname}
                        </div>

                        <Link
                            href={route("client.orders")}
                            className="flex lg:text-lg items-center  justify-start px-5 py-3 transition-all duration-300 hover:bg-zinc-100 "
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
                    <div className="text-center md:pt-52 pb-32  mx-auto">
                        <div className="sm:w-96 pr-5 max-w-md mx-auto">
                            <div className="text-3xl bold mb-7">
                                {__("client.personal_info", localizations)}
                            </div>
                            {errors.name && <div>{errors.name}</div>}
                            <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                                <label className="opacity-50">
                                    {__("client.form_name", localizations)}
                                </label>
                                <input
                                    type="text "
                                    name="name"
                                    className="text-right "
                                    value={values.name}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.surname && <div>{errors.surname}</div>}
                            <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                                <label className="opacity-50">
                                    {__("client.form_surname", localizations)}
                                </label>
                                <input
                                    type="text "
                                    name="surname"
                                    className="text-right "
                                    value={values.surname}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.id_number && <div>{errors.id_number}</div>}
                            <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                                <label className="opacity-50">
                                    {__("client.form_id", localizations)}
                                </label>
                                <input
                                    type="text "
                                    name="id_number"
                                    className="text-right "
                                    value={values.id_number}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.address && <div>{errors.address}</div>}
                            <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                                <label className="opacity-50">
                                    {__("client.form_address", localizations)}
                                </label>
                                <input
                                    type="text "
                                    name="address"
                                    className="text-right "
                                    value={values.address}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.phone && <div>{errors.phone}</div>}
                            <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                                <label className="opacity-50">
                                    {__("client.form_phone", localizations)}
                                </label>
                                <input
                                    type="text "
                                    name="phone"
                                    className="text-right "
                                    value={values.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.email && <div>{errors.email}</div>}
                            <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                                <label className="opacity-50">
                                    {__("client.form_email", localizations)}
                                </label>
                                <input
                                    type="text "
                                    name="email"
                                    className="text-right "
                                    value={values.email}
                                    onChange={handleChange}
                                />
                            </div>
                            {/*<EditInput
                              label="Address "
                              value={values.address}
                              onChange={handleChange}
                              id={'address'}
                          />
                          <EditInput label="Phone number " value={values.phone} onChange={handleChange} id={'phone'} />
                          <EditInput label="Email address " value={values.email} onChange={handleChange} id={'email'} />*/}
                            <div className="grid grid-cols-2 gap-3 pt-3">
                                <MainButton reverse>
                                    {__("client.cancel", localizations)}
                                </MainButton>
                                <MainButton onclick={handleSubmit}>
                                    {__("client.save_changes", localizations)}
                                </MainButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RegularCabinet;
