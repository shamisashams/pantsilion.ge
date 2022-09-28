import React, {useState} from "react";
import MainButton from "../components/MainButton";
import { AiOutlineFileText } from "react-icons/ai";
import Layout from "../Layouts/Layout";
import { useForm, usePage } from '@inertiajs/inertia-react'

const PartnerJoin = ({seo}) => {

    const { errors, localizations } = usePage().props

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
                      <div className="sm:text-5xl text-3xl bold mb-5">{__('client.partner_join_header', localizations)}</div>
                      <p className=" mb-10">
                          {__('client.partner_join_text', localizations)}
                      </p>
                      {errors.name && <div>{errors.name}</div>}
                      <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                          <label className="opacity-50">{__('client.form_name', localizations)}</label>
                          <input type="text " onChange={e => setData('name', e.target.value)} value={data.name} className="text-right " />
                      </div>
                      {errors.surname && <div>{errors.surname}</div>}
                      <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                          <label className="opacity-50">{__('client.form_surname', localizations)}</label>
                          <input type="text " onChange={e => setData('surname', e.target.value)} value={data.surname} className="text-right " />
                      </div>
                      {errors.email && <div>{errors.email}</div>}
                      <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                          <label className="opacity-50">{__('client.form_email', localizations)}</label>
                          <input
                              type="text "
                              onChange={e => setData('email', e.target.value)} value={data.email}
                              className="text-right "
                          />
                      </div>
                      {errors.phone && <div>{errors.phone}</div>}
                      <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                          <label className="opacity-50">{__('client.form_phone', localizations)}</label>
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
                              {__('client.form_upload_cv', localizations)}
                          </label>
                          <input id="uploadCv" onChange={e => setData('cv', e.target.files[0])} type="file" className="opacity-0" />
                          <div className="bg-zinc-200 whitespace-nowrap text-sm p-3">
                              <AiOutlineFileText className="inline-block mr-1 w-4 h-4" />
                              {__('client.attach_file', localizations)}
                          </div>
                      </div>
                      <MainButton type>{__('client.signup_btn', localizations)}</MainButton>
                  </form>

              </div>
          </div>
      </Layout>

  );
};

export default PartnerJoin;
