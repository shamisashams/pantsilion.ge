import React from "react";
import EditInput from "../components/EditInput";
import MainButton from "../components/MainButton";
import CabinetTabs from "../components/CabinetTabs";
import Layout from "../Layouts/Layout";

const BankAccount = ({seo}) => {
  return (
      <Layout seo={seo}>
          <div className="overflow-hidden bg-zinc-100">
              <div className="wrapper h-full flex items-center justify-between flex-col md:flex-row">
                  <CabinetTabs />
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
      </Layout>

  );
};

export default BankAccount;
