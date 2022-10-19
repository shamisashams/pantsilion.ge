import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import MainButton from "../components/MainButton";
import Layout from "../Layouts/Layout";

const RecoverPassword = ({ seo }) => {
    const { errors, localizations } = usePage().props;
    const [linkSent, setLinkSent] = useState(false);

    return (
        <Layout seo={seo}>
            <div className="bg-zinc-100 py-60">
                <div className="wrapper max-w-md text-center relative p-5">
                    <div className="sm:text-4xl text-3xl bold ">
                        Recover password
                    </div>
                    <p className="my-5">
                        Enter email address you have registered an account
                    </p>

                    <form>
                        <input
                            type="text"
                            name="email"
                            placeholder={__("client.form_email", localizations)}
                            className="mb-6 border border-zinc-200 pl-4 border-solid w-full block bg-transparent h-12 placeholder:text-custom-dark"
                        />

                        <MainButton onclick={() => setLinkSent(true)} type>
                            Send recovery link
                        </MainButton>
                    </form>
                    <div
                        className={`absolute left-0 top-0 w-full h-full p-5 text-center bg-zinc-100 transition-all duration-300  ${
                            linkSent
                                ? "opacity-100 visible "
                                : "opacity-0 invisible "
                        }`}
                    >
                        <img
                            className="mx-auto"
                            src="/client/assets/images/other/password.png"
                            alt=""
                        />
                        <p className="my-6">
                            We have sent password recovery link to your email
                        </p>
                        <Link
                            href={route("client.login.index")}
                            className="text-sky-500 underline"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RecoverPassword;
