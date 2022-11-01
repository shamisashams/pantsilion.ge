import React, { useState } from "react";
//import { Link } from 'react-router-dom'
//import Goal from '../assets/images/icons/goal.png'
import MainButton from '../components/MainButton'
import Layout from "../Layouts/Layout";
import { Link, usePage } from "@inertiajs/inertia-react";

const Success = ({seo}) => {
    return <Layout seo={seo}><div className="bg-zinc-100 ">
        <div className="wrapper max-w-md mx-auto text-center  py-60">
            {/*<img className='mx-auto' src="" alt="" />*/}
            <div className="text-4xl my-5 bold">Failure</div>
            <p className='mb-5'>Try another one</p>
            <Link href={route('client.payment.index')}>
                <MainButton>To Payment</MainButton>
            </Link>
        </div>

    </div></Layout>

}

export default Success
