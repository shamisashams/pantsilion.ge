import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import MainButton from "../components/MainButton";
import Layout from "../Layouts/Layout";
import { Inertia } from "@inertiajs/inertia";
import { IoCloseOutline } from "react-icons/io5";

const Signup = ({ seo }) => {
    const [success, setSuccess] = useState(false);

    const { errors, localizations } = usePage().props;
    const [values, setValues] = useState({
        name: "",
        Surname: "",
        id: "",
        email: "",
        password: "",
        password_repeat: "",
        phone: "",
        agree: false,
    });

    function handleChange(e) {
        const key = e.target.name;
        let value = e.target.value;
        if (e.target.name === "agree") {
            value = e.target.checked ? true : false;
        }
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("client.register"), values);
    }

    return (
        <Layout seo={seo}>
            <div className="bg-zinc-100">
                <div className="wrapper max-w-md py-52 text-center">
                    <div className="sm:text-4xl text-3xl bold mb-10">
                        {__("client.signup_header", localizations)}
                    </div>
                    <form onSubmit={handleSubmit}>
                        {errors.name && (
                            <div className="text-left text-xs text-red-500">
                                {errors.name}
                            </div>
                        )}
                        <input
                            onChange={handleChange}
                            name="name"
                            type="text"
                            placeholder={__("client.form_name", localizations)}
                            className="mb-3 border border-zinc-200 pl-4 border-solid w-full block bg-transparent h-12 placeholder:text-custom-dark"
                            style={{ borderColor: errors.name ? "red" : "" }}
                        />
                        {errors.surname && (
                            <div className="text-left text-xs text-red-500">
                                {errors.surname}
                            </div>
                        )}
                        <input
                            onChange={handleChange}
                            name="surname"
                            type="text"
                            placeholder={__(
                                "client.form_surname",
                                localizations
                            )}
                            className="mb-3 border border-zinc-200 pl-4 border-solid w-full block bg-transparent h-12 placeholder:text-custom-dark"
                            style={{ borderColor: errors.surname ? "red" : "" }}
                        />
                        {errors.id && (
                            <div className="text-left text-xs text-red-500">
                                {errors.id}
                            </div>
                        )}
                        <input
                            onChange={handleChange}
                            name="id"
                            type="text"
                            placeholder={__(
                                "client.form_id_number",
                                localizations
                            )}
                            className="mb-3 border border-zinc-200 pl-4 border-solid w-full block bg-transparent h-12 placeholder:text-custom-dark"
                            style={{ borderColor: errors.id ? "red" : "" }}
                        />
                        {errors.email && (
                            <div className="text-left text-xs text-red-500">
                                {errors.email}
                            </div>
                        )}
                        <input
                            onChange={handleChange}
                            name="email"
                            type="text"
                            placeholder={__("client.form_email", localizations)}
                            className="mb-3 border border-zinc-200 pl-4 border-solid w-full block bg-transparent h-12 placeholder:text-custom-dark"
                            style={{ borderColor: errors.email ? "red" : "" }}
                        />
                        {errors.password && (
                            <div className="text-left text-xs text-red-500">
                                {errors.password}
                            </div>
                        )}
                        <input
                            onChange={handleChange}
                            name="password"
                            type="password"
                            placeholder={__(
                                "client.form_password",
                                localizations
                            )}
                            className="mb-3 border border-zinc-200 pl-4 border-solid w-full block bg-transparent h-12 placeholder:text-custom-dark"
                            style={{
                                borderColor: errors.password ? "red" : "",
                            }}
                        />
                        {errors.password_repeat && (
                            <div className="text-left text-xs text-red-500">
                                {errors.password_repeat}
                            </div>
                        )}
                        <input
                            onChange={handleChange}
                            name="password_repeat"
                            type="password"
                            placeholder={__(
                                "client.form_repeat_password",
                                localizations
                            )}
                            className="mb-3 border border-zinc-200 pl-4 border-solid w-full block bg-transparent h-12 placeholder:text-custom-dark"
                            style={{
                                borderColor: errors.password_repeat
                                    ? "red"
                                    : "",
                            }}
                        />
                        <input
                            onChange={handleChange}
                            name="phone"
                            type="text"
                            placeholder={__("client.form_phone", localizations)}
                            className="mb-3 border border-zinc-200 pl-4 border-solid w-full block bg-transparent h-12 placeholder:text-custom-dark"
                        />
                        {errors.agree && (
                            <div className="text-left text-xs text-red-500">
                                {errors.agree}
                            </div>
                        )}
                        <div className="text-sm flex mb-8 mt-5 justify-start">
                            <input
                                onChange={handleChange}
                                type="checkbox"
                                name="agree"
                                id="checkbox"
                            />
                            <label
                                htmlFor="checkbox"
                                className="inline-block ml-2 mb-px"
                            >
                                {__("client.signup_accept_term", localizations)}{" "}
                                <Link
                                    className="text-sky-500 underline"
                                    href={route("client.termsConditions")}
                                >
                                    terms and conditions.
                                </Link>
                            </label>
                        </div>
                        <MainButton type>Sign up</MainButton>
                    </form>

                    <p className="my-6">
                        {__("client.signup_have_account", localizations)}{" "}
                        <Link
                            href={route("client.login.index")}
                            className="text-sky-600 underline"
                        >
                            {" "}
                            {__("client.signup_btn", localizations)}
                        </Link>
                    </p>
                    <div className="relative text-center after:h-px after:w-full after:top-1/2 after:-translate-y-1/2 after:left-0 after:bg-zinc-300">
                        <p className="w-fit mx-auto bg-zinc-100 px-4 relative z-10">
                            {__("client.or", localizations)}
                        </p>
                    </div>
                    <div className="flex justify-center items-center mt-8">
                        <a
                            href={route("google-redirect")}
                            className="flex justify-center items-center border border-sky-600 w-16 h-16 mx-2"
                        >
                            <img
                                src="/client/assets/images/icons/google.png"
                                alt=""
                            />
                        </a>
                        <a
                            href={route("fb-redirect")}
                            className="flex justify-center items-center border border-sky-600 w-16 h-16 mx-2"
                        >
                            <img
                                src="/client/assets/images/icons/facebook.png"
                                alt=""
                            />
                        </a>
                    </div>
                </div>
                <div
                    className={`fixed left-0 top-0 w-screen h-screen bg-custom-dark/[0.7] flex items-center justify-center z-50 ${
                        success ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                >
                    <div className="wrapper h-fit max-w-lg mx-auto text-center p-10  bg-white">
                        <Link
                            onClick={() => setSuccess(false)}
                            href={route("client.login.index")}
                            className="absolute top-3 right-4 "
                        >
                            <IoCloseOutline className=" w-6 h-6" />
                        </Link>
                        <img
                            className="mx-auto"
                            src="/client/assets/images/icons/goal.png"
                            alt=""
                        />
                        <div className="text-4xl my-5 bold">Success</div>
                        <p className="mb-5">
                            You have successfully created a new account
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Signup;
