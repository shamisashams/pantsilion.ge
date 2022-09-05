import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import CabinetTabs from "../components/CabinetTabs";
import Layout from "../Layouts/Layout";
import {Link, usePage} from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'

const AffiliationsList = ({seo}) => {

    const {referrals, localizations} = usePage().props;

    console.log(referrals);

  const list = [
    {
      name: "Name Surname",
      mail: "example@yahoo.com",
      date: "10.05.2022",
    },
    {
      name: "lskdnf koaskjdgbuasnd ",
      mail: "sdfgsdfsdfggsdfg@yahoo.com",
      date: "10.05.2022",
    },
    {
      name: "askjdh oasin",
      mail: "ffff@yahoo.com",
      date: "10.05.2022",
    },
    {
      name: "sdfdfkg pdlksldfk ds",
      mail: "asdfasdfgsdg@yahoo.com",
      date: "10.05.2022",
    },
  ];

  function removeReferral(id){
      Inertia.get(route('partner.referral-remove',id),{id:id})
  }

    let links = function (links) {
        let rows = [];
        //links.shift();
        //links.splice(-1);
        {
            links.map(function (item, index) {
                if (index > 0 && index < links.length - 1) {
                    rows.push(
                        <Link
                            href={item.url}
                            className={item.active ? "bold mx-2 underline" : "bold mx-2"}
                        >
                            {item.label}
                        </Link>
                    );
                }
            });
        }
        return <div className="nums"> {rows.length > 1 ? rows : null} </div>;
    };

    let linksPrev = function (links) {
        let rowCount = 0;
        links.map(function (item, index) {
            if (index > 0 && index < links.length - 1) {
                rowCount++;
            }
        });
        return rowCount > 1 ? (
            <Link href={links[0].url}>
                <Arrow color="#2F3E51" rotate="90" />
                <Arrow color="#2F3E51" rotate="90" />
            </Link>
        ) : null;
    };
    let linksNext = function (links) {
        let rowCount = 0;
        links.map(function (item, index) {
            if (index > 0 && index < links.length - 1) {
                rowCount++;
            }
        });
        return rowCount > 1 ? (
            <Link href={links[links.length - 1].url}>
                <Arrow color="#2F3E51" rotate="-90" />
                <Arrow color="#2F3E51" rotate="-90" />
            </Link>
        ) : null;
    };

  return (
      <Layout seo={seo}>
          <div className="overflow-hidden bg-zinc-100">
              <div className="wrapper h-full flex items-center justify-between flex-col lg:flex-row">
                  <CabinetTabs />
                  <div className=" lg:pt-52 pb-32  mx-auto">
                      <div className="lg:w-auto mx-auto">
                          <div className="text-3xl bold mb-12 sm:-ml-20 text-center">
                              {__('client.affiliations_list', localizations)}
                          </div>

                          <div className="sm:pr-20">
                              <div className="sm:flex justify-between mb-5 text-sm  px-4 hidden ">
                                  <div className="opacity-50 ">{__('client.affiliations_name', localizations)}</div>
                                  <div className="opacity-50 mx-8  ">{__('client.affiliations_email', localizations)}</div>
                                  <div className="opacity-50 ">{__('client.affiliations_date', localizations)}</div>
                              </div>
                              {referrals.data.map((item, index) => {
                                  let date = new Date(item.created_at).toUTCString()
                                  return (
                                      <div
                                          key={index}
                                          className=" sm:flex-row flex-col flex justify-between mb-5 items-center   bg-white sm:h-12 px-4 py-2 relative"
                                      >
                                          <div className="opacity-50 ">{item.name} {item.surname}</div>
                                          <div className="mx-8  ">{item.email}</div>
                                          <div className="opacity-50 ">{date}</div>

                                          <button onClick={() => {
                                                removeReferral(item.id);
                                          }} className="absolute sm:-right-16 -right-2 top-1/2 -translate-y-1/2 shrink-0 w-12 h-12 flex items-center justify-center rounded-full text-custom-red hover:bg-zinc-200 hover:text-black  transition-all">
                                              <IoTrashOutline className="w-6 h-6 " />
                                          </button>
                                      </div>
                                  );
                              })}
                              <div className="flex items-center justify-center text-lg mt-20">
                                  {/*<button className="bold mx-2 underline">1</button>
                                  <button className="bold mx-2 ">2</button>
                                  <button className="bold mx-2 ">3</button>*/}

                                  {links(referrals.links)}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </Layout>

  );
};

export default AffiliationsList;
