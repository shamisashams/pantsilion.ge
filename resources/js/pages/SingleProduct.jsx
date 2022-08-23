import React, { useState } from "react";
import SingleSlider from "../components/SingleSlider";
//import Left from "../assets/images/icons/sofa1.png";
//import Right from "../assets/images/icons/sofa2.png";
import { BsArrowLeft } from "react-icons/bs";
import {
  IoIosCloseCircleOutline,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import Quantity from "../components/Quantity";
import MainButton from "../components/MainButton";
import { FiHeart } from "react-icons/fi";
import ProductSlider from "../components/ProductSlider";
//import img7 from "../assets/images/gallery/7.png";
import ColorPick from "../components/ColorPick";
import Layout from "../Layouts/Layout";
import {Inertia} from "@inertiajs/inertia";

const SingleProduct = ({seo}) => {
  const [side, setSide] = useState(0);
  const [chooseCity, setChooseCity] = useState(false);
  const [chooseSize, setChooseSize] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const {category_last, product, product_images, similar_products, product_config} = usePage().props;


  //console.log(product);
    //console.log(product_config);

    const renderHTML = (rawHTML) =>
        React.createElement("div", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });

    function addToWishlist(id){
        Inertia.post(route('client.favorite.add'), {id:id});
    }

    function addToCart(id,qty){
        Inertia.post(route('add-to-cart'), {id:id,qty:qty});
    }

    let colors = []

    Array.prototype.remove = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };

    function selectCorner(corner){

        let sizes = [];



        Object.keys(product_config.corner).map((key,index) => {
            if(product_config.corner[key].code == corner){
                console.log(product_config.corner[key].variants)

                product_config.corner[key].variants.map((item, index) => {
                    let id = [];
                    Object.keys(product_config.size).map((key2,index) => {

                        if(product_config.size[key2].variants.includes(item)){

                            id.push(item);
                            //product_config.size[key2].variants = id;
                            //product_config.size[key2].variants.remove(item);
                            sizes.push({label: product_config.size[key2].label, variants: id});
                            //delete product_config.size[key2];
                        }
                    })
                })
            }
        })

        console.log(sizes);
        //console.log(p_id);

        let select = document.getElementById('choose_size');
        select.innerHTML = '<option value=""></option>';

        let pick = document.getElementById('choose_color');
        pick.innerHTML = '<option value=""></option>';

        for (var i = 0; i<sizes.length; i++){
            var opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = sizes[i].label;
            select.appendChild(opt);
        }

        //select.removeEventListener('change',);
        let id2 = [];

        select.addEventListener('change',function (e){

            let colors_ = [];
            let selected_size = sizes[e.target.value]
            console.log(selected_size)
            selected_size.variants.map((item,index) => {


                Object.keys(product_config.color).map((key3,index) => {
                    if(product_config.color[key3].variants.includes(item)){
                        //id2.push(item);
                        //product_config.color[key3].variants.remove(item);
                        colors_.push({id: item, label:product_config.color[key3].label});
                        //delete product_config.color[key3];
                    }
                })

            })
            console.log(colors_)
            //console.log(p_id2)

            pick.innerHTML = '<option value=""></option>';
            for (var iw = 0; iw<colors_.length; iw++){
                var opt4 = document.createElement('option');
                opt4.value = colors_[iw].id;
                opt4.innerHTML = colors_[iw].label;
                pick.appendChild(opt4);
            }

            let selected = [];
            //pick.removeEventListener('change');
            pick.addEventListener('change',function (e){
                selected = e.target.value;

                        document.getElementById('product_id').value = selected;


                console.log(selected)
            });
        });


    }

    console.log(product_config)
    let left = false;
    let right = false;
    Object.keys(product_config.corner).map((key,index) => {
        if(product_config.corner[key].code == 'left'){
            left = true;
        }
        if(product_config.corner[key].code == 'right'){
            right = true;
        }
    })

  return (
      <Layout seo={seo}>
          <>
              <div className="wrapper  py-40">
                  <Link className="bold text-center" href="/cart">
                      <BsArrowLeft className="inline-block mr-2 w-5 h-5" />
                      Back to carts
                  </Link>
                  <div className="flex flex-col xl:flex-row mt-7 mb-20">
                      <div className="max-w-2xl xl:mr-20">
                          <SingleSlider images={product_images} />
                          {product.video ? <div className="w-full sm:h-96 h-60 mt-20">
                              {renderHTML(product.video.path)}
                          </div>:null}
                      </div>
                      <div className="max-w-xl xl:mt-0 mt-20">
                          <div className="opacity-50">product code # {product.code}</div>
                          <div className="bold text-4xl my-3">{product.title}</div>
                          <div>
                              {/* if in stock */}
                              <IoIosCheckmarkCircleOutline className="w-6 h-6 mb-1 text-green-500 inline-block mr-2" />
                              <div className="inline-block ">In stock</div>

                              {/* if not in stock */}
                              <IoIosCloseCircleOutline className="w-6 h-6 mb-1 text-custom-red inline-block mr-2 hidden" />
                              <div className="inline-block hidden">Out of stock</div>
                          </div>
                          <div className="my-3">
                              <div className="bold inline-block line-through text-lg">
                                  ₾699.50
                              </div>
                              <div className="bold inline-block text-2xl text-custom-red pl-3">
                                  ₾578.99
                              </div>
                          </div>
                          <p>
                              Installment from:{" "}
                              <span className="bold text-custom-red pl-2">22 GEL</span>
                          </p>
                          <p className="my-5">
                              {product.description}
                          </p>
                          <div className="bold mb-4">Choose corner:</div>
                          <div className="flex text-sm mb-5">
                              {left ? <div
                                  onClick={() => {
                                      setSide(1)
                                        selectCorner('left')
                                  }}
                                  className={` group transition-all duration-300 cursor-pointer  ${
                                      side === 1 ? "opacity-100" : "opacity-20  hover:opacity-50"
                                  }`}
                              >
                                  <div
                                      className={`flex items-center justify-center mb-1 w-12 h-12 bg-zinc-100 rounded border-2  transition-all duration-300 mr-7 0 ${
                                          side === 1
                                              ? "border-custom-red "
                                              : "border-zinc-100 group-hover:border-zinc-200"
                                      } `}
                                  >
                                      <img src="/client/assets/images/icons/sofa1.png" alt="" />
                                  </div>
                                  <p>Left side</p>
                              </div>:null}
                              {right ? <div
                                  onClick={() => {
                                      setSide(2)
                                      selectCorner('right')
                                  }}
                                  className={`group  transition-all duration-300 cursor-pointer ${
                                      side === 2 ? "!opacity-100" : "opacity-20 hover:opacity-50 "
                                  }`}
                              >
                                  <div
                                      className={`flex items-center justify-center mb-1 w-12 h-12 bg-zinc-100 rounded border-2 transition-all duration-300 ${
                                          side === 2
                                              ? "border-custom-red "
                                              : " border-zinc-100 group-hover:border-zinc-200"
                                      } `}
                                  >
                                      <img src="/client/assets/images/icons/sofa2.png" alt="" />
                                  </div>
                                  <p>Right side</p>
                              </div>:null}
                          </div>
                          <div className="bold mb-4">Specification</div>
                          <div className="">
                              <p className="opacity-50 text-sm inline-block mr-2">
                                  size:
                                  <span className="pl-2">(length x height x width x depth)</span>
                              </p>
                              <select id="choose_size">
                                    <option value=""></option>
                              </select>
                              <div
                                  onClick={() => {
                                      setChooseSize(!chooseSize)

                                  }}
                                  className="relative inline-block align-middle cursor-default"
                              >
                                  <div className="bg-zinc-200 rounded py-1 px-2">
                                      155x25x225x112 cm{" "}
                                      <FiChevronDown className="inline-block bg-white rounded-full  pt-px ml-1" />
                                  </div>
                                  <div
                                      className={`absolute left-0 top-full w-full bg-white scrollbar transition-all duration-300 z-10  ${
                                          chooseSize
                                              ? "max-h-72  overflow-y-scroll"
                                              : " max-h-0  overflow-y-hidden"
                                      }`}
                                  >
                                      <button className="w-full p-1 transition-all hover:bg-zinc-100 block">
                                          155x25x225x112 cm
                                      </button>
                                      <button className="w-full p-1 transition-all hover:bg-zinc-100 block">
                                          155x25x225x112 cm
                                      </button>
                                      <button className="w-full p-1 transition-all hover:bg-zinc-100 block">
                                          155x25x225x112 cm
                                      </button>
                                      <button className="w-full p-1 transition-all hover:bg-zinc-100 block">
                                          155x25x225x112 cm
                                      </button>
                                      <button className="w-full p-1 transition-all hover:bg-zinc-100 block">
                                          155x25x225x113 cm
                                      </button>
                                      <button className="w-full p-1 transition-all hover:bg-zinc-100 block">
                                          155x25x225x112 cm
                                      </button>
                                      <button className="w-full p-1 transition-all hover:bg-zinc-100 block">
                                          155x25x225x112 cm
                                      </button>
                                      <button className="w-full p-1 transition-all hover:bg-zinc-100 block">
                                          155x25x225x112 cm
                                      </button>
                                  </div>
                              </div>
                          </div>
                          <p className="opacity-50 text-sm mb-2">
                              material:
                              <span className="pl-2">{product.attributes.material}</span>
                          </p>
                          <p className="opacity-50 text-sm ">
                              manufacturer:
                              <span className="pl-2">{product.attributes.brand}</span>
                          </p>
                          <div className="flex my-5 ">
                              <p className="whitespace-nowrap opacity-50">Choose color:</p>
                              <div id="color_pick" className="ml-5 max-w-sm mt-1 flex flex-wrap">
                                  <select id="choose_color">
                                      <option value=""></option>
                                  </select>
                                  <ColorPick colors={colors} />
                              </div>
                          </div>
                          <div className="flex flex-wrap -ml-5 mb-7">
                              <Quantity item={product} />
                              <div className="max-w-md ">
                                  <MainButton>Buy now</MainButton>
                              </div>
                              <input type="hidden" id="product_id" value="0"/>
                              <button
                                  className={`mx-4 whitespace-nowrap bold  border border-custom-dark  py-2 px-3 rounded transition-all duration-500 bg-transparent text-custom-dark hover:bg-custom-dark hover:text-white`}
                                  onClick={() => {
                                      let qty = document.getElementById('qty_' + product.id).value;
                                      console.log(qty)
                                      let product_id = document.getElementById('product_id').value;
                                      if(parseInt(product_id) !== 0){
                                          addToCart(product_id,qty)
                                      } else {
                                          alert('select options');
                                      }

                                  }}
                              >
                                  Add to cart
                              </button>
                              <button
                                  onClick={() => {
                                      setFavorite(!favorite);
                                      addToWishlist(product.id);
                                  }}
                                  className="shrink-0 hover:bg-zinc-200 rounded-full flex items-center justify-center w-12 h-12 transition-all duration-500 "
                              >
                                  <FiHeart className={favorite ? "text-custom-red" : ""} />
                              </button>
                          </div>
                          <p className="opacity-50 ">check availability</p>
                          <div
                              onClick={() => setChooseCity(!chooseCity)}
                              className="relative inline-block align-middle cursor-default"
                          >
                              <div className="py-2 bold">
                                  Choose City
                                  <FiChevronDown className="inline-block  ml-1" />
                              </div>
                              <div
                                  className={`absolute left-0 top-full w-full bg-white scrollbar transition-all duration-300 z-10  ${
                                      chooseCity
                                          ? "max-h-72  overflow-y-scroll"
                                          : " max-h-0  overflow-y-hidden"
                                  }`}
                              >
                                  <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                      Tbilisi
                                  </button>
                                  <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                      Gori
                                  </button>
                                  <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                      Mstkheta
                                  </button>
                                  <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                      Batumi
                                  </button>
                                  <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                      Zugdidi
                                  </button>
                                  <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                      Mstkheta
                                  </button>
                                  <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                      Batumi
                                  </button>
                                  <button className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                      Zugdidi
                                  </button>
                              </div>
                          </div>
                          <div className="mt-5 w-72 h-40 scrollbar overflow-y-scroll pr-5 ">
                              <div className="flex w-full justify-between border-b pb-3 mb-3">
                                  <div>
                                      <div>Didube stock</div>
                                      <div className="opacity-50">Eristavi st.1</div>
                                  </div>
                                  <div>
                                      <IoIosCheckmarkCircleOutline className="w-6 h-6 mb-1 text-green-500 inline-block mr-1" />
                                      <div className="inline-block ">In stock</div>
                                  </div>
                              </div>
                              <div className="flex w-full justify-between border-b pb-3 mb-3">
                                  <div>
                                      <div>Didube stock</div>
                                      <div className="opacity-50">Eristavi st.1</div>
                                  </div>
                                  <div>
                                      <IoIosCheckmarkCircleOutline className="w-6 h-6 mb-1 text-green-500 inline-block mr-1" />
                                      <div className="inline-block ">In stock</div>
                                  </div>
                              </div>
                              <div className="flex w-full justify-between border-b pb-3 mb-3">
                                  <div>
                                      <div>Didube stock</div>
                                      <div className="opacity-50">Eristavi st.1</div>
                                  </div>
                                  <div>
                                      <IoIosCheckmarkCircleOutline className="w-6 h-6 mb-1 text-green-500 inline-block mr-1" />
                                      <div className="inline-block ">In stock</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="w-full my-10 mb-20">
                      <div className="bold text-lg mb-5">Customize your furniture:</div>
                      <img id="cat_col_img" src={category_last.colors[0].file ? '/' + category_last.colors[0].file.path + '/' + category_last.colors[0].file.title:null} alt="" className="w-full mb-5" />
                      <div className="flex items-center justify-center flex-wrap">
                          <ColorPick colors={category_last.colors} />
                      </div>
                  </div>
                  <div className="bold text-lg mb-7">Similar products</div>
                  <ProductSlider products={similar_products} />
              </div>
          </>
      </Layout>

  );
};

export default SingleProduct;
