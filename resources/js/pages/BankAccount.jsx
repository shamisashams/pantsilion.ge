import React, { useState } from "react";
import EditInput from "../components/EditInput";
import MainButton from "../components/MainButton";
import CabinetTabs from "../components/CabinetTabs";
import Layout from "../Layouts/Layout";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";

const BankAccount = ({ seo, user, bank_account }) => {
    const { errors, localizations } = usePage().props;

    const [values, setValues] = useState({
        bank_id: bank_account ? bank_account.bank_id : null,
        account_number: bank_account ? bank_account.account_number : null,
    });

    function handleChange(e) {
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("partner.save-bank-account"), values);
    }

    return (
        <Layout seo={seo}>
            <div className="overflow-hidden bg-zinc-100">
                <div className="wrapper h-full flex items-center justify-between flex-col md:flex-row">
                    <CabinetTabs />
                    <div className="text-center md:pt-52 pb-32  mx-auto">
                        <div className="sm:w-96 pr-5 max-w-md mx-auto">
                            <div className="text-3xl bold mb-12">
                                {__("client.bank_account", localizations)}
                            </div>

                            <div className="relative flex justify-between items-center w-full bg-white h-12 mb-4 text-sm">
                                <label className="opacity-50 absolute left-3 top-1/2 -translate-y-1/2">
                                    {__("client.form_bank_id", localizations)}
                                </label>
                                <input
                                    type="text "
                                    name="bank_id"
                                    value={values.bank_id}
                                    className="text-right w-full h-full relative z-20  px-4 w-full h-full relative z-20"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="relative flex justify-between items-center w-full bg-white h-12 mb-4 text-sm">
                                <label className="opacity-50 absolute left-3 top-1/2 -translate-y-1/2">
                                    {__(
                                        "client.form_account_number",
                                        localizations
                                    )}
                                </label>
                                <input
                                    type="text "
                                    name="account_number"
                                    value={values.account_number}
                                    className="text-right w-full h-full relative z-20  px-4 w-full h-full relative z-20"
                                    onChange={handleChange}
                                />
                            </div>

                            {/*<EditInput label={__('client.form_bank_id', localizations)} value={values.bank_id} onChange={handleChange} id={'bank_id'} />
                          <EditInput label={__('client.form_account_number', localizations)} value={values.account_number} onChange={handleChange} id={'account_number'} />*/}
                            <div className="grid grid-cols-2 gap-3 pt-5">
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

export default BankAccount;
