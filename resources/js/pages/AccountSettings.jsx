import React, { useRef } from "react";
import { MdContentCopy } from "react-icons/md";
import { GoCreditCard } from "react-icons/go";
import { RiSettings3Line, RiBankLine, RiLogoutBoxLine } from "react-icons/ri";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
//import File from "../assets/images/icons/file.png";
import EditInput from "../components/EditInput";
import MainButton from "../components/MainButton";
import Layout from "../Layouts/Layout";

const AccountSettings = ({seo , user, affiliate_link}) => {
  const affiliationLink = useRef();

  console.log(user)
  const copyText = () => {
    navigator.clipboard.writeText(affiliationLink.current.value);
  };

  return (
      <Layout seo={seo}>
          <div className="overflow-hidden bg-zinc-100">
              <div className="wrapper h-full flex items-center justify-between flex-col md:flex-row">
                  <div className="md:bg-white md:pt-60 pt-32 w-full md:w-auto relative md:pb-32 pb-10 pr-5 h-auto md:self-stretch">
                      <div
                          className="hidden md:block absolute right-full top-0 h-full bg-white"
                          style={{ width: "500px" }}
                      ></div>
                      <div>Partner Cabinet</div>
                      <div className="bold text-2xl mb-5 mt-1">Name Surname</div>
                      <div className="opacity-50">Affiliation link:</div>
                      <div className="relative w-72 flex justify-between md:mb-20 mb-10">
                          <input
                              ref={affiliationLink}
                              type="text"
                              value={affiliate_link}
                              disabled
                              className="bg-transparent w-full bold text-sm"
                          />
                          <button onClick={copyText} className="md:bg-white px-2">
                              <MdContentCopy />
                          </button>
                      </div>
                      <Link
                          href="/account-settings"
                          className="flex md:text-lg items-center  justify-start px-5 py-3 transition-all duration-300 bg-custom-dark text-white  "
                      >
                          <RiSettings3Line className="w-6 h-6 mr-6" />
                          <div>Account settings</div>
                      </Link>
                      <Link
                          href="/bank-account"
                          className="flex md:text-lg items-center  justify-start px-5 py-3 transition-all duration-300 hover:bg-zinc-100  "
                      >
                          <RiBankLine className="w-6 h-6 mr-6" />
                          <div>Bank details</div>
                      </Link>
                      <Link
                          href="/withdraw-funds"
                          className="flex md:text-lg items-center  justify-start px-5 py-3 transition-all duration-300 hover:bg-zinc-100  "
                      >
                          <GoCreditCard className="w-6 h-6 mr-6" />
                          <div>Withdraw funds</div>
                      </Link>
                      <Link
                          href={route('logout')}
                          className="flex md:text-lg items-center  justify-start px-5 py-3 transition-all duration-300 hover:bg-zinc-100  "
                      >
                          <RiLogoutBoxLine className="w-6 h-6 mr-6" />
                          <div>Sign out</div>
                      </Link>
                  </div>
                  <div className="text-center md:pt-52 pb-32  mx-auto">
                      <div className="sm:w-96 pr-5 max-w-md mx-auto">
                          <div className="text-3xl bold mb-7">Personal information</div>
                          <div className="w-full text-center p-5 bg-white mb-4 border-dashed border-2 rounded border-zinc-300">
                              <img src="/client/assets/images/icons/file.png" className="mx-auto" alt="" />
                              <div className="my-3">Upload your ID photo both sides</div>
                              <div className="text-sm opacity-50">or drag and drop it here</div>
                          </div>
                          <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                              <label className="opacity-50">Name</label>
                              <input type="text " value="Name" className="text-right " />
                          </div>
                          <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                              <label className="opacity-50">Surname</label>
                              <input type="text " value="Surname" className="text-right " />
                          </div>
                          <div className="flex justify-between items-center w-full bg-white h-12 px-4 mb-4 text-sm">
                              <label className="opacity-50">ID</label>
                              <input type="text " value="01012022011" className="text-right " />
                          </div>
                          <EditInput
                              label="Address "
                              value="street name #22. Tbilisi, Georgia"
                          />
                          <EditInput label="Phone number " value="+995 555 233 211" />
                          <EditInput label="Email address " value="example@mail.com" />
                          <div className="grid grid-cols-2 gap-3 pt-3">
                              <MainButton reverse>Cancel</MainButton>
                              <MainButton>Save Changes</MainButton>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </Layout>

  );
};

export default AccountSettings;
