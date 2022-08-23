import { useRef } from "react";
import { MdContentCopy } from "react-icons/md";
import { GoCreditCard } from "react-icons/go";
import { RiSettings3Line, RiBankLine, RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import EditInput from "../components/EditInput";
import MainButton from "../components/MainButton";

const BankAccount = () => {
  const affiliationLink = useRef();

  const copyText = () => {
    navigator.clipboard.writeText(affiliationLink.current.value);
  };

  return (
    <div className="overflow-hidden bg-zinc-100">
      <div className="wrapper h-full flex items-center justify-between flex-col md:flex-row">
        <div className="md:bg-white md:pt-60 pt-32 w-full md:w-auto relative  md:pb-32 pb-10 pr-5 h-auto md:self-stretch">
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
              value="http://www.pantsilion.ge/brass.htm=action"
              disabled
              className="bg-transparent w-full bold text-sm"
            />
            <button onClick={copyText} className="md:bg-white px-2">
              <MdContentCopy />
            </button>
          </div>
          <Link
            to="/account-settings"
            className="flex md:text-lg items-center  justify-start px-5 py-3 transition-all duration-300 hover:bg-zinc-100 "
          >
            <RiSettings3Line className="w-6 h-6 mr-6" />
            <div>Account settings</div>
          </Link>
          <Link
            to="/bank-account"
            className="flex md:text-lg items-center  justify-start px-5 py-3 transition-all duration-300  bg-custom-dark text-white  "
          >
            <RiBankLine className="w-6 h-6 mr-6" />
            <div>Bank details</div>
          </Link>
          <Link
            to="/withdraw-funds"
            className="flex md:text-lg items-center  justify-start px-5 py-3 transition-all duration-300 hover:bg-zinc-100  "
          >
            <GoCreditCard className="w-6 h-6 mr-6" />
            <div>Withdraw funds</div>
          </Link>
          <Link
            to="/"
            className="flex md:text-lg items-center  justify-start px-5 py-3 transition-all duration-300 hover:bg-zinc-100  "
          >
            <RiLogoutBoxLine className="w-6 h-6 mr-6" />
            <div>Sign out</div>
          </Link>
        </div>
        <div className="text-center md:pt-52 pb-32  mx-auto">
          <div className="sm:w-96 pr-5 max-w-md mx-auto">
            <div className="text-3xl bold mb-12">Bank Account</div>

            <EditInput label="Bank ID " value="TBCBGE22" />
            <EditInput label="account number " value="GE10TB7743200000007677" />
            <div className="grid grid-cols-2 gap-3 pt-5">
              <MainButton reverse>Cancel</MainButton>
              <MainButton>Save Changes</MainButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccount;
