import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
//import { Link } from "react-router-dom"
import { Link, usePage } from "@inertiajs/inertia-react";
import MainButton from "../components/MainButton";
//import Fb from '../assets/images/icons/facebook.png'
//import Google from '../assets/images/icons/google.png'
import Layout from "../Layouts/Layout";

const Signin = ({ seo }) => {
    const { errors, localizations } = usePage().props;
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("client.login"), values);
    }

    return (
        <Layout seo={seo}>
            <div className="bg-zinc-100">
                <div className="wrapper max-w-md py-52 text-center">
                    <div className="sm:text-4xl text-3xl bold mb-10">
                        {__("client.login", localizations)}
                    </div>
                    {errors.email && <div>{errors.email}</div>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="email"
                            placeholder={__("client.form_email", localizations)}
                            className="mb-3 border border-zinc-200 pl-4 border-solid w-full block bg-transparent h-12 placeholder:text-custom-dark"
                        />
                        <input
                            type="password"
                            onChange={handleChange}
                            name="password"
                            placeholder={__(
                                "client.form_password",
                                localizations
                            )}
                            className="mb-7 border border-zinc-200 pl-4 border-solid w-full block bg-transparent h-12 placeholder:text-custom-dark"
                        />

                        <MainButton type>
                            {__("client.sign_in_btn", localizations)}
                        </MainButton>
                    </form>

                    <div className="relative my-7 text-center after:h-px after:w-full after:top-1/2 after:-translate-y-1/2 after:left-0 after:bg-zinc-300">
                        <p className="w-fit mx-auto bg-zinc-100 px-4 relative z-10">
                            {__("client.or", localizations)}
                        </p>
                    </div>
                    <a
                        href={route("google-redirect")}
                        className="flex justify-center items-center border border-sky-600 w-full h-12 mb-3 text-sky-600"
                    >
                        <img
                            className="mr-3"
                            src="/client/assets/images/icons/google.png"
                            alt=""
                        />
                        <div>Sing in with Google</div>
                    </a>
                    <a
                        href={route("fb-redirect")}
                        className="flex justify-center items-center border border-sky-600 w-full h-12 mb-3 text-sky-600"
                    >
                        <img
                            className="mr-3"
                            src="/client/assets/images/icons/facebook.png"
                            alt=""
                        />
                        <div>Sing in with Facebook</div>
                    </a>
                    <p className="my-6">
                        {__("client.login_not_account", localizations)}{" "}
                        <Link
                            href={route("client.registration.index")}
                            className="text-sky-600 underline"
                        >
                            {" "}
                            {__("client.login_signup", localizations)}
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Signin;
