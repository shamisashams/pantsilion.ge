import React, {useState} from "react";
//import { Link } from "react-router-dom"
import { Link, usePage } from "@inertiajs/inertia-react";
import MainButton from "../components/MainButton"
//import Fb from '../assets/images/icons/facebook.png'
//import Google from '../assets/images/icons/google.png'
import Layout from "../Layouts/Layout";
import {Inertia} from "@inertiajs/inertia";

const Signup = ({seo}) => {

    const {errors,localizations} = usePage().props
    const [values, setValues] = useState({
        name: "",
        Surname: "",
        id: "",
        email: "",
        password: "",
        password_repeat: "",
        phone: "",
        agree: false
    })

    function handleChange(e) {
        const key = e.target.name;
        let value = e.target.value
        if(e.target.name === 'agree'){
            value = e.target.checked ? true : false
        }
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('client.register'), values)
    }

    return <Layout seo={seo}><div className="bg-zinc-100">
        <div className="wrapper max-w-md py-52 text-center">
            <div className="sm:text-5xl text-3xl bold mb-10">{__('client.signup_header', localizations)}</div>
            <form onSubmit={handleSubmit}>
                {errors.name && <div>{errors.name}</div>}
                <input onChange={handleChange} name="name" type="text" placeholder={__('client.form_name', localizations)} className="mb-3 border border-zinc-200 pl-4 w-full block bg-transparent h-12 placeholder:text-custom-dark" />
                {errors.surname && <div>{errors.surname}</div>}
                <input onChange={handleChange} name="surname" type="text" placeholder={__('client.form_surname', localizations)} className="mb-3 border border-zinc-200 pl-4 w-full block bg-transparent h-12 placeholder:text-custom-dark" />
                {errors.id && <div>{errors.id}</div>}
                <input onChange={handleChange} name="id" type="text" placeholder={__('client.form_id_number', localizations)} className="mb-3 border border-zinc-200 pl-4 w-full block bg-transparent h-12 placeholder:text-custom-dark" />
                {errors.email && <div>{errors.email}</div>}
                <input onChange={handleChange} name="email" type="text" placeholder={__('client.form_email', localizations)} className="mb-3 border border-zinc-200 pl-4 w-full block bg-transparent h-12 placeholder:text-custom-dark" />
                {errors.password && <div>{errors.password}</div>}
                <input onChange={handleChange} name="password" type="password" placeholder={__('client.form_password', localizations)} className="mb-3 border border-zinc-200 pl-4 w-full block bg-transparent h-12 placeholder:text-custom-dark" />
                {errors.password_repeat && <div>{errors.password_repeat}</div>}
                <input onChange={handleChange} name="password_repeat" type="password" placeholder={__('client.form_repeat_password', localizations)} className="mb-3 border border-zinc-200 pl-4 w-full block bg-transparent h-12 placeholder:text-custom-dark" />
                <input onChange={handleChange} name="phone" type="text" placeholder={__('client.form_phone', localizations)} className="mb-3 border border-zinc-200 pl-4 w-full block bg-transparent h-12 placeholder:text-custom-dark" />
                {errors.agree && <div>{errors.agree}</div>}
                <div className="flex mb-8 mt-5">
                    <input onChange={handleChange} type="checkbox" name="agree" id="checkbox" />
                    <label htmlFor="checkbox" className="inline-block ml-2 mb-px">{__('client.signup_accept_term', localizations)}</label>
                </div>
                <MainButton type>
                    Sign up
                </MainButton>
            </form>

            <p className="my-6">{__('client.signup_have_account', localizations)} <Link href={route('client.login.index')} className="text-sky-600 underline"> {__('client.signup_btn', localizations)}</Link></p>
            <div className="relative text-center after:h-px after:w-full after:top-1/2 after:-translate-y-1/2 after:left-0 after:bg-zinc-300">
                <p className="w-fit mx-auto bg-zinc-100 px-4 relative z-10">{__('client.or', localizations)}</p>
            </div>
            <div className="flex justify-center items-center mt-8">
                <a href="#" className="flex justify-center items-center border border-sky-600 w-16 h-16 mx-2">
                    <img src="/client/assets/images/icons/google.png" alt="" />
                </a>
                <a href="#" className="flex justify-center items-center border border-sky-600 w-16 h-16 mx-2">
                    <img src="/client/assets/images/icons/facebook.png" alt="" />
                </a>
            </div>
        </div>
    </div></Layout>
}


export default Signup
