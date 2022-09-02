import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import MainButton from "../components/MainButton";
import CabinetTabs from "../components/CabinetTabs";
import Layout from "../Layouts/Layout";
import { usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

const WithdrawFunds = ({seo, user}) => {
  const [accountNumber, setAccountNumber] = useState(false);

  const [checked, setChecked] = useState(false);

    const { errors, bank_accounts } = usePage().props

    const [bankId,setBankId] = useState('Choose account number');


    const [values, setValues] = useState({
        bank_account: null,
    })

    function handleChange(bank) {
        values.bank_account = bank.id

        setBankId(bank.account_number)
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route('partner.withdraw-create'), values)
    }

  return (
      <Layout seo={seo}>
          <div className="overflow-hidden bg-zinc-100">
              <div className="wrapper h-full flex items-center justify-between flex-col md:flex-row">
                  <CabinetTabs />
                  <div className="md:pt-52 pb-32  mx-auto">
                      <div className="sm:w-96 max-w-md mx-auto ">
                          <div className="bold mb-2">Ballance</div>
                          <div className="w-full bg-white py-3 px-4 mb-6 bold text-xl ">
                              ₾ {user.balance}
                          </div>
                          <div className="bold mb-2">Withdraw fund to:</div>
                          <div
                              onClick={() => setAccountNumber(!accountNumber)}
                              className="w-full bg-white py-3 px-4 mb-6  relative"
                          >
                              <div className="opacity-50">{bankId}</div>
                              <FiChevronDown className="absolute top-1/2 -translate-y-1/2 right-3" />{" "}
                              <div
                                  className={`absolute left-0 top-full w-full bg-white  transition-all duration-300 z-10 overflow-hidden ${
                                      accountNumber ? "max-h-72  " : " max-h-0  "
                                  }`}
                              >
                                  {bank_accounts.map((item,index) => {
                                        return (
                                            <button onClick={() => {
                                                handleChange(item)
                                            }} className="w-full p-2 transition-all hover:bg-zinc-100 block">
                                                {item.account_number}
                                            </button>
                                        )
                                  })}

                                  {/*<button className="w-full p-2 transition-all hover:bg-zinc-100 block">
                                      GE10TB7743200000007677
                                  </button>
                                  <button className="w-full p-2 transition-all hover:bg-zinc-100 block">
                                      GE10TB7743200000007677
                                  </button>*/}
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
                          <MainButton disabled={!checked} onclick={handleSubmit}>Withdraw</MainButton>
                      </div>
                  </div>
              </div>
          </div>
      </Layout>

  );
};

export default WithdrawFunds;
