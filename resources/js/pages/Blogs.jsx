import React from "react";
import BlogBox from "../components/BlogBox";
import { blogSlider } from "../components/Data";
import Layout from "@/Layouts/Layout";
import {Link, usePage} from "@inertiajs/inertia-react";

const Blogs = ({seo}) => {
    const {blogs} = usePage().props;

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
          <div className="wrapper py-40 lg:px-20">
              <div className="text-center mb-10">
                  <div className="text-3xl bold mb-2">Blog</div>
                  <p className="opacity-50">New and trending products for best price</p>
              </div>
              <div className="grid md:grid-cols-2 gap-y-10 gap-x-5">
                  {blogs.data.map((item, index) => {
                      return (
                          <BlogBox
                              key={index}
                              largeImg
                              link={route('client.blog.show',item.slug)}
                              date={item.created_at}
                              title={item.title}
                              img={item.oldest_image ? '/' + item.oldest_image.path + '/' + item.oldest_image.title:null}
                              paragraph={item.short_description}
                          />
                      );
                  })}
              </div>
              <div className="flex items-center justify-center text-lg mt-20">
                  {/*<button className="bold mx-2 underline">1</button>
                  <button className="bold mx-2 ">2</button>
                  <button className="bold mx-2 ">3</button>*/}
                  {links(blogs.links)}
              </div>
          </div>
      </Layout>

  );
};

export default Blogs;
