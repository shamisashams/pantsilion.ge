import React, { useState, useEffect, useRef } from "react";
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

  const {category_last, product, product_images, similar_products, product_config,cities, stocks} = usePage().props;

  const [productImages, setProductImages] = useState(product_images)


    const [productStocksOver, setProductStocksOver] = useState(stocks ?? [])

    const [cityId, setCityId] = useState(cities[0].id)
    const [productStocks, setProductStocks] = useState(stocks[cities[0].id] ?? [])
    const [productVideo, setProductVideo] = useState(product.video ? product.video.path : null)

    const [toCart, setToCart] = useState(product)

    const [productId, setProductId] = useState(0)

    const [productColors, setProductColors] =  useState([])

    const [productSizes, setProductSizes] = useState({});
    const [selectedSize, setSelectedSize] = useState(' select size ');

    const [categoryColorImg, setCategoryColorImg] = useState(category_last.colors.length > 0 ? (category_last.colors[0].file ? '/' + category_last.colors[0].file.path + '/' + category_last.colors[0].file.title:null):null)

    const [productPrice, setProductPrice] = useState(`from ₾${product.min_price}`)
    const [oldPrice, setOldPrice] = useState(``)

    const [productCode, setProductCode] = useState(product.code)

    const [selectedCity,setSelectedCity] = useState(cities[0].title)


    console.log(stocks)

  console.log(product);
    console.log(category_last);

    const renderHTML = (rawHTML) =>
        React.createElement("div", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });

    function addToWishlist(id){
        Inertia.post(route('client.favorite.add'), {id:id});
    }

    function addToCart(product,qty){
        console.log(product);
        if(product.stocks.length === 0){
            alert('out of stock')
            return;
        }
        Inertia.post(route('add-to-cart'), {id: product.id,qty:qty});
    }

    function buyNow(product,qty){
        console.log(product);
        if(product.stocks.length === 0){
            alert('out of stock')
            return;
        }
        Inertia.post(route('add-to-cart'), {id: product.id,qty:qty, buy_now: true});
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


    function initializeAttributes(){
        if(category_last.corner === 0 && category_last.size === 1 && category_last.color === 1){

            let sizes = [];

            Object.keys(product_config.size).map((key2,index3) => {


                //product_config.size[key2].variants = id;
                //product_config.size[key2].variants.remove(item);
                sizes.push({id: key2, label: product_config.size[key2].label, variants: product_config.size[key2].variants});
                //delete product_config.size[key2];

            })

            let result = {};

            sizes.map((item, index) => {

                if(result.hasOwnProperty(item.id)){
                    console.log(item.id)

                    result[item.id].variants = result[item.id].variants.concat(item.variants);
                }
                else result[item.id] = {label:item.label,variants: item.variants}
            })

            setProductSizes(result);

        }

        if(category_last.corner === 0 && category_last.size === 0 && category_last.color === 1){
            let colors = [];
            Object.keys(product_config.color).map((key2,index3) => {

                product_config.color[key2].variants.map((key4,index3) => {



                    colors.push({id: key4, label: product_config.color[key2].label, color: product_config.color[key2].color});


                })


            })

            console.log(colors)

            setProductColors(colors)
        }

        if(category_last.corner === 0 && category_last.size === 1 && category_last.color === 0){
            let sizes = [];
            Object.keys(product_config.size).map((key2,index3) => {


                product_config.size[key2].variants.map((item,index) => {
                    sizes.push({id: item, label: product_config.size[key2].label, variants: []});
                })
                //product_config.size[key2].variants = id;
                //product_config.size[key2].variants.remove(item);

                //delete product_config.size[key2];

            })
            let result = {};

            sizes.map((item, index) => {


                 result[item.id] = {label:item.label,variants: item.variants}
            })
            setProductSizes(result)
        }
    }

    function selectCorner(corner){

        let sizes = [];

        setProductImages(product_images);
        setProductVideo(product.video ? product.video.path :null)
        setProductPrice(`from ₾${product.min_price}`)
        setSelectedSize(' select size ')
        setProductId(0)
        setOldPrice('');
        setProductStocksOver(stocks ?? [])

        setProductSizes({})

        setProductColors([])
        let colors = [];

        Object.keys(product_config.corner).map((key,index) => {
            if(product_config.corner[key].code == corner){
                console.log(product_config.corner[key].variants)

                product_config.corner[key].variants.map((item, index) => {
                    let id = [];

                    Object.keys(product_config.size).map((key2,index3) => {

                        if(product_config.size[key2].variants.includes(item)){


                            id.push(item);

                            //product_config.size[key2].variants = id;
                            //product_config.size[key2].variants.remove(item);
                            sizes.push({id: key2, label: product_config.size[key2].label, variants: id});
                            //delete product_config.size[key2];
                        }
                    })

                    if(category_last.color === 1 && category_last.size === 0){


                        Object.keys(product_config.color).map((key2c,index3c) => {


                                if(product_config.color[key2c].variants.includes(item)){
                                    colors.push({id: item, label: product_config.color[key2c].label, color: product_config.color[key2c].color});
                                }


                        })

                        console.log(colors)

                        setProductColors(colors)
                    }
                })
            }
        })

        let result = {};

        sizes.map((item, index) => {

            if(result.hasOwnProperty(item.id)){
                console.log(item.id)

                result[item.id].variants = result[item.id].variants.concat(item.variants);
            }
            else result[item.id] = {label:item.label,variants: item.variants}
        })

        //console.log(sizes);

        //console.log(result);
        //console.log(category_last);






        setProductSizes(result)

        setProductStocks(stocks[cities[0].id] ?? [] )




    }


    Inertia.on('success', (event) => {
        initializeAttributes()
    })


    window.onload = function (e){
        initializeAttributes()
    }





    function selectSize(id) {
        setProductImages(product_images)
        setProductVideo(product.video ? product.video.path :null)
        setProductPrice(`from ₾${product.min_price}`);
        setProductStocks(stocks[cities[0].id] ?? [] );
        setProductStocksOver(stocks ?? [])
        setProductId(0)
        setOldPrice('');
        let colors_ = [];
        let selected_size = productSizes[id]
        console.log(selected_size)
        setSelectedSize(selected_size.label + ' cm')
        selected_size.variants.map((item,index) => {


            Object.keys(product_config.color).map((key3,index) => {
                if(product_config.color[key3].variants.includes(item)){
                    //id2.push(item);
                    //product_config.color[key3].variants.remove(item);
                    colors_.push({id: item, id2: key3, label:product_config.color[key3].label, color: product_config.color[key3].color});
                    //delete product_config.color[key3];
                }
            })

        })
        setProductColors(colors_);

        if(category_last.corner === 0 && category_last.size === 1 && category_last.color === 0){
            let selected = id;

            let price;

            console.log(selected);

            setProductId(selected);

            if(product_config.variants[selected].variant.special_price){
                price = product_config.variants[selected].variant.special_price;
                setOldPrice('₾' + product_config.variants[selected].variant.price)
            } else {
                price = product_config.variants[selected].variant.price;
                setOldPrice('')
            }
            setProductPrice(price);

            setProductImages(product_config.variants[selected].images);

            setToCart(product_config.variants[selected].variant)
            setProductStocksOver(product_config.variants[selected].stocks ?? {})
            setProductStocks(product_config.variants[selected].stocks[cityId] ?? {} )
            setProductVideo(product_config.variants[selected].variant.video ? product_config.variants[selected].variant.video.path:null)
            setProductCode(product_config.variants[selected].variant.code)
        }
    }

    function selectColor(color){
       let selected = color.id;

        console.log(selected);

        setProductId(selected);

        let price;
        if(product_config.variants[selected].variant.special_price){
            price = product_config.variants[selected].variant.special_price;
            setOldPrice('₾' + product_config.variants[selected].variant.price)
        } else {
            price = product_config.variants[selected].variant.price;
            setOldPrice('')
        }

        setProductPrice(price);

        setProductImages(product_config.variants[selected].images);

        setToCart(product_config.variants[selected].variant)

        console.log(product_config.variants[selected].stocks)

        setProductStocks(product_config.variants[selected].stocks[cityId] ?? {} )
        setProductStocksOver(product_config.variants[selected].stocks ?? {})
        setProductVideo(product_config.variants[selected].variant.video ? product_config.variants[selected].variant.video.path:null)
        setProductCode(product_config.variants[selected].variant.code)
    }


    function selectCategoryColor(color){
        setCategoryColorImg(color.file ? '/' + color.file.path + '/' + color.file.title:null)
    }

    console.log(product_config)
    let left = false;
    let right = false;

    if(category_last.corner === 1 && product_config.corner){
        Object.keys(product_config.corner).map((key,index) => {
            if(product_config.corner[key].code == 'left'){
                left = true;
            }
            if(product_config.corner[key].code == 'right'){
                right = true;
            }
        })
    }


    /*let c_id = document.getElementById('cities');

    c_id.addEventListener('change',function (e){
        alert(4);
    })

    if(c_id) c_id = c_id.value*/

    function selectCity(city){

        setCityId(city.id)
        console.log('---------')
        console.log(productStocks)
        console.log(city)
        setProductStocks(stocks[city.id] ?? {});

        setSelectedCity(city.title)
    }

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
                          <SingleSlider images={productImages} />
                          {product.video ? <div className="w-full sm:h-96 h-60 mt-20">
                              {renderHTML(productVideo)}
                          </div>:null}
                      </div>
                      <div className="max-w-xl xl:mt-0 mt-20">
                          <div className="opacity-50">product code # {productCode}</div>
                          <div className="bold text-4xl my-3">{product.title}</div>
                          <div>
                              {/* if in stock */}
                              {Object.keys(productStocksOver).length > 0 ?<IoIosCheckmarkCircleOutline className="w-6 h-6 mb-1 text-green-500 inline-block mr-2" />:null}
                              {Object.keys(productStocksOver).length > 0 ? <div className="inline-block ">In stock</div>:null}

                              {/* if not in stock */}
                              {Object.keys(productStocksOver).length === 0 ?<IoIosCloseCircleOutline className="w-6 h-6 mb-1 text-custom-red inline-block mr-2" />:null}
                              {Object.keys(productStocksOver).length === 0 ?<div className="inline-block">Out of stock</div>:null}
                          </div>
                          <div className="my-3">
                              <div className="bold inline-block line-through text-lg">
                                  {oldPrice}
                              </div>
                              <div className="bold inline-block text-2xl text-custom-red pl-3">
                                  <span id="price_actual">{productPrice}</span>

                              </div>
                          </div>
                          {product.installment_price ? <p>
                              Installment from:{" "}
                              <span className="bold text-custom-red pl-2">{product.installment_price} GEL</span>
                          </p>:null}
                          <p className="my-5">
                              {product.description}
                          </p>
                          {category_last.corner === 1 ? <div className="bold mb-4">Choose corner:</div>:null}
                          {category_last.corner === 1 ? <div className="flex text-sm mb-5">
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
                          </div>:null}
                          <div className="bold mb-4">Specification</div>
                          {category_last.size === 1 ? <div className="">
                              <p className="opacity-50 text-sm inline-block mr-2">
                                  size:
                                  <span className="pl-2">(length x height x width x depth)</span>
                              </p>
                              {/*<select id="choose_size">
                                    <option value=""></option>
                              </select>*/}
                              <div
                                  onClick={() => {
                                      setChooseSize(!chooseSize)

                                  }}
                                  className="relative inline-block align-middle cursor-default"
                              >
                                  <div className="bg-zinc-200 rounded py-1 px-2">
                                      {selectedSize}
                                      <FiChevronDown className="inline-block bg-white rounded-full  pt-px ml-1" />
                                  </div>
                                  <div
                                      className={`absolute left-0 top-full w-full bg-white scrollbar transition-all duration-300 z-10  ${
                                          chooseSize
                                              ? "max-h-72  overflow-y-scroll"
                                              : " max-h-0  overflow-y-hidden"
                                      }`}
                                  >
                                      {Object.keys(productSizes).map((item,index) => {

                                          return (<button onClick={() => {
                                              selectSize(item)
                                          }} className="w-full p-1 transition-all hover:bg-zinc-100 block">
                                              {productSizes[item].label} cm
                                          </button>)
                                      })}

                                      {/*<button className="w-full p-1 transition-all hover:bg-zinc-100 block">
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
                                      </button>*/}
                                  </div>
                              </div>
                          </div>:null}
                          <p className="opacity-50 text-sm mb-2">
                              material:
                              <span className="pl-2">{product.attributes.material}</span>
                          </p>
                          <p className="opacity-50 text-sm ">
                              manufacturer:
                              <span className="pl-2">{product.attributes.brand}</span>
                          </p>
                          {category_last.color === 1 ?<div className="flex my-5 ">
                              <p className="whitespace-nowrap opacity-50">Choose color:</p>
                              <div id="color_pick" className="ml-5 max-w-sm mt-1 flex flex-wrap">
                                  {/*<select id="choose_color">
                                      <option value=""></option>
                                  </select>*/}
                                  <ColorPick colors={productColors} onClick={selectColor} />
                              </div>
                          </div>:null}
                          <div className="flex flex-wrap -ml-5 mb-7">
                              <Quantity item={product} />
                              <div className="max-w-md ">
                                  <MainButton>Buy now</MainButton>
                              </div>
                              <input type="hidden" id="product_id" value={productId}/>
                              <button
                                  className={`mx-4 whitespace-nowrap bold  border border-custom-dark  py-2 px-3 rounded transition-all duration-500 bg-transparent text-custom-dark hover:bg-custom-dark hover:text-white`}
                                  onClick={() => {
                                      let qty = document.getElementById('qty_' + product.id).value;
                                      console.log(qty)
                                      let product_id = document.getElementById('product_id').value;
                                      if(toCart.parent_id !== null){
                                          addToCart(toCart,qty)
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
                                  {selectedCity}
                                  <FiChevronDown className="inline-block  ml-1" />
                              </div>
                              <div
                                  className={`absolute left-0 top-full w-full bg-white scrollbar transition-all duration-300 z-10  ${
                                      chooseCity
                                          ? "max-h-72  overflow-y-scroll"
                                          : " max-h-0  overflow-y-hidden"
                                  }`}
                              >
                                  {cities.map((item,index) => {
                                      return (
                                      <button onClick={() => {
                                          selectCity(item)
                                      }} className="w-full p-3 transition-all hover:bg-zinc-100 block">
                                          {item.title}
                                      </button>
                                      )
                                  })}

                                  {/*<button className="w-full p-3 transition-all hover:bg-zinc-100 block">
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
                                  </button>*/}
                              </div>

                          </div>

                          <div className="mt-5 w-72 h-40 scrollbar overflow-y-scroll pr-5 " id="stock_list">
                              {Object.keys(productStocks).length > 0 ? Object.keys(productStocks).map((item, index) => {
                                  //let c_id = document.getElementById('stock_city').value;
                                  return (
                                      <div className="flex w-full justify-between border-b pb-3 mb-3">
                                          <div>
                                              <div>{productStocks[item].title}</div>
                                              <div className="opacity-50">{productStocks[item].address}</div>
                                          </div>
                                          <div>
                                              <IoIosCheckmarkCircleOutline className="w-6 h-6 mb-1 text-green-500 inline-block mr-1" />
                                              <div className="inline-block ">In stock</div>
                                          </div>
                                      </div>
                                  )
                              }):<div>out of stock</div>}
                              {/*<div className="flex w-full justify-between border-b pb-3 mb-3">
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
                              </div>*/}
                          </div>
                      </div>
                  </div>
                  <div className="w-full my-10 mb-20">
                      <div className="bold text-lg mb-5">Customize your furniture:</div>
                      <img id="cat_col_img" src={categoryColorImg} alt="" className="w-full mb-5" />
                      <div className="flex items-center justify-center flex-wrap">
                          <ColorPick colors={category_last.colors} onClick={selectCategoryColor} />
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
