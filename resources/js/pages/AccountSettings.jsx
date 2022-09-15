import React, { useRef } from "react";
import { MdContentCopy } from "react-icons/md";
import { GoCreditCard } from "react-icons/go";
import { RiSettings3Line, RiBankLine, RiLogoutBoxLine } from "react-icons/ri";
import CabinetTabs from "../components/CabinetTabs";
//import { Link } from "react-router-dom";
import { Link, usePage, useForm } from "@inertiajs/inertia-react";
//import File from "../assets/images/icons/file.png";
import EditInput from "../components/EditInput";
import MainButton from "../components/MainButton";
import Layout from "../Layouts/Layout";

const AccountSettings = ({seo , user}) => {
  const affiliationLink = useRef();

  const {errors,localizations} = usePage().props;

  console.log(errors);

  console.log(user)
  const copyText = () => {
    navigator.clipboard.writeText(affiliationLink.current.value);
  };

    const { data, setData, post, progress } = useForm({
        name: user.name ?? null,
        avatar: null,
        surname: user.surname ?? null,
        id_number: user.id_number ?? null,
        phone: user.phone ?? null,
        address: user.address ?? null,
        email: user.email ?? null,
    })

    function submit(e) {
        e.preventDefault()
        post(route('partner.update-info'))
    }

  return (
      <Layout seo={seo}>
          <div className="overflow-hidden bg-zinc-100">
              <div className="wrapper h-full flex items-center justify-between flex-col md:flex-row">
                  <CabinetTabs />
                  <div className="text-center md:pt-52 pb-32  mx-auto">
                      <div className="sm:w-96 pr-5 max-w-md mx-auto">
                          <form onSubmit={submit}>
                              <div className="text-3xl bold mb-7">{__('client.personal_info',localizations)}</div>
                              <div className="w-full text-center p-5 bg-white mb-4 border-dashed border-2 rounded border-zinc-300">
                                  <img src="/client/assets/images/icons/file.png" className="mx-auto" alt="" />
                                  <div className="my-3">Upload your ID photo both sides</div>
                                  <div className="text-sm opacity-50">or drag and drop it here</div>
                                  <input multiple type="file" onChange={e => setData('avatar', e.target.files)} />
                              </div>
                              {errors.avatar && <div>{errors.avatar}</div>}
                              <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                                  <label className="opacity-50">{__('client.form_name', localizations)}</label>
                                  <input type="text " value={data.name} className="text-right " onChange={e => setData('name', e.target.value)} />
                              </div>
                              {errors.name && <div>{errors.name}</div>}
                              <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                                  <label className="opacity-50">{__('client.form_surname', localizations)}</label>
                                  <input type="text " value={data.surname} className="text-right " onChange={e => setData('surname', e.target.value)} />
                              </div>
                              {errors.surname && <div>{errors.surname}</div>}
                              <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                                  <label className="opacity-50">{__('client.form_id_number', localizations)}</label>
                                  <input type="text " value={data.id_number} className="text-right " onChange={e => setData('id_number', e.target.value)} />
                              </div>
                              <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                                  <label className="opacity-50">{__('client.form_address', localizations)}</label>
                                  <input type="text " value={data.address} className="text-right " onChange={e => setData('address', e.target.value)} />
                              </div>
                              {/*<EditInput
                                  label={__('client.form_address', localizations)}
                                  value={data.address}
                                  onChange={e => setData('address', e.target.innerText)}
                              />*/}
                              {errors.address && <div>{errors.address}</div>}
                              <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                                  <label className="opacity-50">{__('client.form_phone', localizations)}</label>
                                  <input type="text " value={data.phone} className="text-right " onChange={e => setData('phone', e.target.value)} />
                              </div>
                              {/*<EditInput label={__('client.form_phone', localizations)} value={data.phone} onChange={e => setData('phone', e.target.innerText)} />*/}
                              {errors.phone && <div>{errors.phone}</div>}
                              <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                                  <label className="opacity-50">{__('client.form_email', localizations)}</label>
                                  <input type="text " value={data.email} className="text-right " onChange={e => setData('email', e.target.value)} />
                              </div>
                              {/*<EditInput label={__('client.form_email', localizations)} value={data.email} onChange={e => setData('email', e.target.innerText)} />*/}
                              {errors.email && <div>{errors.email}</div>}
                              <div className="grid grid-cols-2 gap-3 pt-3">
                                  <MainButton reverse>{__('client.cancel',localizations)}</MainButton>
                                  <MainButton type>{__('client.save_changes',localizations)}</MainButton>
                              </div>
                          </form>

                      </div>
                  </div>
              </div>
          </div>
      </Layout>

  );
};

export default AccountSettings;
