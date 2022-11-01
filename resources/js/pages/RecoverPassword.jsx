import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import MainButton from "../components/MainButton";
import Layout from "../Layouts/Layout";
import axios from "axios";


const RecoverPassword = ({ seo }) => {
    const { errors, localizations } = usePage().props;
    const [linkSent, setLinkSent] = useState(false);

    function handleClick(e) {

        e.preventDefault();
        let email = document.getElementById('input_email').value;
        console.log(email);
        axios
            .post(route("password.email"), { email: email })
            .then(function (response) {
                console.log(response);
                if(response.data == 'passwords.sent'){
                    setLinkSent(true);
                } else {
                    alert('error');
                }

            }).catch((error) => {
                alert(error.response.data.errors.email)
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
                        {__("client.recover_password_h", localizations)}
                    </div>
                    <p className="my-5">
                        {__("client.recover_password_t", localizations)}
                    </p>

                    <form>
                        <input
                            id="input_email"
                            type="text"
                            name="email"
                            placeholder={__("client.form_email", localizations)}
                            className="mb-6 border border-zinc-200 pl-4 border-solid w-full block bg-transparent h-12 placeholder:text-custom-dark"
                        />

                        <MainButton onclick={(e) => {
                            handleClick(e)
                            //setLinkSent(true)
                        }}>
                            {__("client.send_recover_link", localizations)}
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
                            {__("client.send_recover_link_success", localizations)}
                        </p>
                        <Link
                            href={route("client.login.index")}
                            className="text-sky-500 underline"
                        >
                            {__("client.sign_in_btn", localizations)}
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RecoverPassword;
