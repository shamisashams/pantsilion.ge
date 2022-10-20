import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import MainButton from "../components/MainButton";
import Layout from "../Layouts/Layout";
import axios from "axios";


const RecoverPasswordReset = ({ seo }) => {
    const { errors, localizations, email, token } = usePage().props;
    const [linkSent, setLinkSent] = useState(false);

    function handleClick(e) {

        e.preventDefault();

        let password_confirmation = document.getElementById('password_confirmation').value;
        let password = document.getElementById('password').value;
        console.log(email);
        axios
            .post(route("password.update"), { email: email, password: password, password_confirmation: password_confirmation, token: token })
            .then(function (response) {
                console.log(response);
                setLinkSent(true);
            }).catch((error) => {
                alert(error.response.data.errors.password)
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        });

    }


    return (
        <Layout seo={seo}>
            <div className="bg-zinc-100 py-60">
                <div className="wrapper max-w-md text-center relative p-5">
                    <div className="sm:text-4xl text-3xl bold ">
                        Recover password
                    </div>
                    <p className="my-5">
                        Enter new password
                    </p>

                    <form>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder={__("client.form_password", localizations)}
                            className="mb-6 border border-zinc-200 pl-4 border-solid w-full block bg-transparent h-12 placeholder:text-custom-dark"
                        />

                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            placeholder={__("client.form_repeat_password", localizations)}
                            className="mb-6 border border-zinc-200 pl-4 border-solid w-full block bg-transparent h-12 placeholder:text-custom-dark"
                        />

                        <MainButton onclick={(e) => {
                            handleClick(e)
                            //setLinkSent(true)
                        }}>
                            Change
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
                            you have successfully updated password
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

export default RecoverPasswordReset;
