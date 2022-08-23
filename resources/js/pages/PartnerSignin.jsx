import React, {useState} from "react";
import MainButton from "../components/MainButton";
//import handshake from "../assets/images/other/handshake.png";
import Layout from "../Layouts/Layout";
import {usePage} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";

const PartnerSignin = ({seo}) => {

    const {errors} = usePage().props
    const [values, setValues] = useState({
        username: "",
        password: "",
    })

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('partner.login'), values)
    }

  return (
      <Layout seo={seo}>
          <div className="bg-zinc-100">
              <div className="wrapper max-w-md py-52 text-center">
                  <img src="/client/assets/images/other/handshake.png" className="mx-auto mb-8" alt="" />
                  <div className="sm:text-5xl text-3xl bold mb-5">Sign in as partner</div>
                  <p className=" mb-10">
                      This is a page for our partners, To access personal cabinet use
                      username and password which we provide to you.
                  </p>
                  {errors.username && <div>{errors.username}</div>}
                  <form onSubmit={handleSubmit}>
                      <input
                          type="text"
                          placeholder="Username"
                          className="mb-3 border border-zinc-200 pl-4 w-full block bg-transparent h-12 placeholder:text-custom-dark"
                          onChange={handleChange}
                          name="username"
                      />
                      {errors.password && <div>{errors.password}</div>}
                      <input
                          type="password"
                          placeholder="Password"
                          className="mb-7 border border-zinc-200 pl-4 w-full block bg-transparent h-12 placeholder:text-custom-dark"
                          onChange={handleChange}
                          name="password"
                      />

                      <MainButton>Sign in</MainButton>
                  </form>



              </div>
          </div>
      </Layout>

  );
};

export default PartnerSignin;
