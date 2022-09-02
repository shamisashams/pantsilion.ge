import React, { useRef } from "react";
import { MdContentCopy } from "react-icons/md";
import { GoCreditCard } from "react-icons/go";
import { MdHistory } from "react-icons/md";
import {
  RiSettings3Line,
  RiBankLine,
  RiLogoutBoxLine,
  RiListUnordered,
} from "react-icons/ri";
//import { Link, useLocation } from "react-router-dom";
import { Link, usePage, useForm } from "@inertiajs/inertia-react";

const CabinetTabs = () => {
  const { pathname, user, affiliate_link, localizations } = usePage().props;





    const affiliationLink = useRef();

  const copyText = () => {
    navigator.clipboard.writeText(affiliationLink.current.value);
  };

  const tabs = [
    {
      link: route('partner.settings'),
      icon: <RiSettings3Line className="w-6 h-6 mr-6" />,
      text: __('client.account_settings',localizations),
    },
    {
      link: route('partner.bank-account'),
      icon: <RiBankLine className="w-6 h-6 mr-6" />,
      text: __('client.bank_details',localizations),
    },
    {
      link: route('partner.withdraw'),
      icon: <GoCreditCard className="w-6 h-6 mr-6" />,
      text: __('client.withdraw_funds',localizations),
    },
    {
      link: route('partner.referrals'),
      icon: <RiListUnordered className="w-6 h-6 mr-6" />,
      text: __('client.affiliations_list',localizations),
    },
    {
      link: route('partner.orders'),
      icon: <MdHistory className="w-6 h-6 mr-6" />,
      text: __('client.order_history',localizations)
    },
  ];

  return (
    <div className="md:bg-white md:pt-60 pt-32 w-full md:w-auto relative md:pb-32 pb-10 pr-5 h-auto md:self-stretch">
      <div
        className="hidden md:block absolute right-full top-0 h-full bg-white"
        style={{ width: "500px" }}
      ></div>
      <div>{__('client.partner_cabinet',localizations)}</div>
      <div className="bold text-2xl mb-5 mt-1">{user.name} {user.surname}</div>
      <div className="opacity-50">{__('client.affiliation_link', localizations)}:</div>
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
      {tabs.map((tab, index) => {
        return (
          <Link
            key={index}
            href={tab.link}
            className={`flex md:text-lg items-center  justify-start px-5 py-3 transition-all duration-300 ${
              pathname === tab.link
                ? "bg-custom-dark text-white"
                : "hover:bg-zinc-100"
            } `}
          >
            {tab.icon}
            <div>{tab.text}</div>
          </Link>
        );
      })}

      <Link
        href={route('logout')}
        className="flex md:text-lg items-center  justify-start px-5 py-3 transition-all duration-300 hover:bg-zinc-100  "
      >
        <RiLogoutBoxLine className="w-6 h-6 mr-6" />
        <div>{__('client.sign_out', localizations)}</div>
      </Link>
    </div>
  );
};

export default CabinetTabs;
