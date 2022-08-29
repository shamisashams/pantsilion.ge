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
                              <div className="text-3xl bold mb-7">Personal information</div>
                              <div className="w-full text-center p-5 bg-white mb-4 border-dashed border-2 rounded border-zinc-300">
                                  <img src="/client/assets/images/icons/file.png" className="mx-auto" alt="" />
                                  <div className="my-3">Upload your ID photo both sides</div>
                                  <div className="text-sm opacity-50">or drag and drop it here</div>
                                  <input type="file" onChange={e => setData('avatar', e.target.files[0])} />
                              </div>
                              <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                                  <label className="opacity-50">Name</label>
                                  <input type="text " value={data.name} className="text-right " onChange={e => setData('name', e.target.value)} />
                              </div>
                              <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                                  <label className="opacity-50">Surname</label>
                                  <input type="text " value={data.surname} className="text-right " onChange={e => setData('surname', e.target.value)} />
                              </div>
                              <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                                  <label className="opacity-50">ID</label>
                                  <input type="text " value={data.id_number} className="text-right " onChange={e => setData('id_number', e.target.value)} />
                              </div>
                              <EditInput
                                  label="Address "
                                  value={data.address}
                              />
                              <EditInput label="Phone number " value={data.phone} onChange={e => setData('phone', e.target.value)} />
                              <EditInput label="Email address " value={data.email} onChange={e => setData('phone', e.target.value)} />
                              <div className="grid grid-cols-2 gap-3 pt-3">
                                  <MainButton reverse>Cancel</MainButton>
                                  <MainButton type>Save Changes</MainButton>
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
