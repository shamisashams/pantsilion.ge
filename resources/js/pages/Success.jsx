import React, { useState } from "react";
//import { Link } from 'react-router-dom'
//import Goal from '../assets/images/icons/goal.png'
import MainButton from '../components/MainButton'
import Layout from "../Layouts/Layout";
import { Link, usePage } from "@inertiajs/inertia-react";

const Success = ({seo}) => {
    const {localizations} = usePage().props;
    return <Layout seo={seo}><div className="bg-zinc-100 ">
        <div className="wrapper max-w-md mx-auto text-center  py-60">
            <img className='mx-auto' src="/client/assets/images/icons/goal.png" alt="" />
            <div className="text-4xl my-5 bold">{__("client.order_success_h", localizations)}</div>
            <p className='mb-5'>{__("client.order_success_t", localizations)}</p>
            <Link href={route('client.home.index')}>
                <MainButton>{__("client.to_homepage", localizations)}</MainButton>
            </Link>
        </div>

    </div></Layout>

}

export default Success
