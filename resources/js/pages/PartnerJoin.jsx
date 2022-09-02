import React, {useState} from "react";
import MainButton from "../components/MainButton";
import { AiOutlineFileText } from "react-icons/ai";
import Layout from "../Layouts/Layout";
import { useForm, usePage } from '@inertiajs/inertia-react'

const PartnerJoin = ({seo}) => {

    const { errors } = usePage().props

    const { data, setData, post, progress } = useForm({
        name: null,
        surname: null,
        email: null,
        phone: null,
        cv: null,
    })

    function submit(e) {
        e.preventDefault()
        post(route('partner.store'))
    }

  return (
      <Layout seo={seo}>
          <div className="bg-zinc-100">
              <div className="wrapper max-w-md py-52 text-center">
                  <form onSubmit={submit}>
                      <div className="sm:text-5xl text-3xl bold mb-5">Join our team</div>
                      <p className=" mb-10">
                          This is a page for our partners, To access personal cabinet use
                          username and password which we provide to you.
                      </p>
                      <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                          <label className="opacity-50">Name</label>
                          <input type="text " onChange={e => setData('name', e.target.value)} value={data.name} className="text-right " />
                      </div>
                      <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                          <label className="opacity-50">Surname</label>
                          <input type="text " onChange={e => setData('surname', e.target.value)} value={data.surname} className="text-right " />
                      </div>
                      {errors.email && <div>{errors.email}</div>}
                      <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                          <label className="opacity-50">Email address</label>
                          <input
                              type="text "
                              onChange={e => setData('email', e.target.value)} value={data.email}
                              className="text-right "
                          />
                      </div>
                      <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                          <label className="opacity-50">Phone number</label>
                          <input
                              type="text "
                              onChange={e => setData('phone', e.target.value)} value={data.phone}
                              className="text-right "
                          />
                      </div>
                      {errors.cv && <div>{errors.cv}</div>}
                      <div className="flex justify-between items-center w-full bg-white h-12 pl-4 pr-px mb-4 text-sm relative">
                          <label
                              htmlFor="uploadCv"
                              className="opacity-50 w-full h-full flex justify-start items-center"
                          >
                              Upload CV
                          </label>
                          <input id="uploadCv" onChange={e => setData('cv', e.target.files[0])} type="file" className="opacity-0" />
                          <div className="bg-zinc-200 whitespace-nowrap text-sm p-3">
                              <AiOutlineFileText className="inline-block mr-1 w-4 h-4" />
                              attach file
                          </div>
                      </div>
                      <MainButton type>Sign in</MainButton>
                  </form>

              </div>
          </div>
      </Layout>

  );
};

export default PartnerJoin;
