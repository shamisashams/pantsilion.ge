import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import MainButton from "../components/MainButton";
import Layout from "../Layouts/Layout";

const RecoverPassword = ({ seo }) => {
    return (
        <Layout seo={seo}>
            <div className="bg-zinc-100 py-40">
                <div className="wrapper max-w-2xl text-center">
                    <div className="bold text-2xl lg:text-4xl mb-10">
                        Terms and conditions
                    </div>
                    <div className="text-justify mb-10">
                        <p className="mb-6">
                            What Is a Terms and Conditions Agreement? <br /> A
                            terms and conditions agreement outlines the website
                            administrator’s rules regarding user behavior and
                            provides information about the actions the website
                            administrator can and will perform.{" "}
                        </p>
                        <p className="mb-6">
                            Essentially, your terms and conditions text is a
                            contract between your website and its users. In the
                            event of a legal dispute, arbitrators will look at
                            it to determine whether each party acted within
                            their rights.
                        </p>
                        <p className="mb-6">
                            Creating the best terms and conditions page possible
                            will protect your business from the following:
                        </p>
                        <p className="mb-6">
                            Abusive users: Terms and Conditions agreements allow
                            you to establish what constitutes appropriate
                            activity on your site or app, empowering you to
                            remove abusive users and content that violates your
                            guidelines.
                        </p>
                        <p className="mb-6">
                            Intellectual property theft: Asserting your claim to
                            the creative assets of your site in your terms and
                            conditions will prevent ownership disputes and
                            copyright infringement.
                        </p>
                        <p className="mb-6">
                            Potential litigation: If a user lodges a legal
                            complaint against your business, showing that they
                            were presented with clear terms and conditions
                            before they used your site will help you immensely
                            in court.
                        </p>
                        <p className="mb-6">
                            In short, terms and conditions give you control over
                            your site and legal enforcement if users try to take
                            advantage of your operations.
                        </p>
                        <p className="mb-6">
                            Is a Terms and Conditions Legally Required on My
                            Website? <br />
                            Technically, no. You aren’t legally required to have
                            a terms and conditions agreement.
                        </p>
                    </div>
                    <label htmlFor="checkbox">
                        <input
                            className="inline-block mr-2"
                            type="checkbox"
                            name=""
                            id="checkbox"
                        />
                        <span>I accept terms and conditions</span>
                    </label>
                    <div className="max-w-md mx-auto mt-10">
                        <MainButton type>Continue shopping</MainButton>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RecoverPassword;
