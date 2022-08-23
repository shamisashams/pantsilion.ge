import { useRef, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { GoCreditCard } from "react-icons/go";
import { FiChevronDown } from "react-icons/fi";
import { RiSettings3Line, RiBankLine, RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import MainButton from "../components/MainButton";

const WithdrawFunds = () => {
  const affiliationLink = useRef();
  const [accountNumber, setAccountNumber] = useState(false);
  const [checked, setChecked] = useState(false);

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
            className="flex md:text-lg items-center  justify-start px-5 py-3 transition-all duration-300 hover:bg-zinc-100"
          >
            <RiSettings3Line className="w-6 h-6 mr-6" />
            <div>Account settings</div>
          </Link>
          <Link
            to="/bank-account"
            className="flex md:text-lg items-center  justify-start px-5 py-3 transition-all duration-300 hover:bg-zinc-100  "
          >
            <RiBankLine className="w-6 h-6 mr-6" />
            <div>Bank details</div>
          </Link>
          <Link
            to="/withdraw-funds"
            className="flex md:text-lg items-center  justify-start px-5 py-3 transition-all duration-300    bg-custom-dark text-white  "
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
        <div className="md:pt-52 pb-32  mx-auto">
          <div className="sm:w-96 max-w-md mx-auto ">
            <div className="bold mb-2">Ballance</div>
            <div className="w-full bg-white py-3 px-4 mb-6 bold text-xl ">
              ₾ 1170.23
            </div>
            <div className="bold mb-2">Withdraw fund to:</div>
            <div
              onClick={() => setAccountNumber(!accountNumber)}
              className="w-full bg-white py-3 px-4 mb-6  relative"
            >
              <div className="opacity-50">Choose account number</div>
              <FiChevronDown className="absolute top-1/2 -translate-y-1/2 right-3" />{" "}
              <div
                className={`absolute left-0 top-full w-full bg-white  transition-all duration-300 z-10 overflow-hidden ${
                  accountNumber ? "max-h-72  " : " max-h-0  "
                }`}
              >
                <button className="w-full p-2 transition-all hover:bg-zinc-100 block">
                  GE10TB7743200000007677
                </button>
                <button className="w-full p-2 transition-all hover:bg-zinc-100 block">
                  GE10TB7743200000007677
                </button>
                <button className="w-full p-2 transition-all hover:bg-zinc-100 block">
                  GE10TB7743200000007677
                </button>
              </div>
            </div>
            <div className="flex mb-6">
              <input
                className="mr-2 mt-px"
                id="checkbox"
                type="checkbox"
                checked={checked}
                onClick={() => setChecked(!checked)}
              />
              <label htmlFor="checkbox">I accept terms and conditions</label>
            </div>
            <MainButton disabled={!checked}>Withdraw</MainButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawFunds;
