/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import "../../Login/SignUp.css";
import home from "../..//img/home.png";
import king from "../..//img/king.png";
import thounder from "../..//img/thounder.png";
import Button from "../../Button/Button";
import MainTitle from "../../MainTitle/MainTitle";
import busd from "../../img/busd.png";
import tronImg from "../../img/tron-logo.svg";
import axios from "axios";
import TronWeb from "tronweb";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import smartnode from "../../img/Smartnode.png";
import useEncryption from "../../EncryptData/EncryptData";
import instance from "../../BaseUrl/BaseUrl";
import toast, { Toaster } from "react-hot-toast";
import $ from "jquery";
import Web3 from "web3";
import { Link, useNavigate } from "react-router-dom";
import CommingSoon from "../CommingSoon/CommingSoon";

function Dashboard({ totlenode }) {
  useEffect(() => {
    setpopup(true);
  }, []);

  const [open, setopen] = useState(false);
  const [drop, setdrop] = useState(false);
  const [transaction, settransaction] = useState();
  const [totalsupply, settotalsupply] = useState([]);
  const [busdprice, setbusdprice] = useState([]);
  const [value, setValue] = useState(0);
  const [mark, setmark] = useState("BUSD");
  const { encryptData, decryptData } = useEncryption();
  const effectCalled = useRef(false);
  const [totalremaining, settotalremaining] = useState([]);
  const navigate = useNavigate();
  const [popup, setpopup] = useState(false);
  const getDetelis = decryptData(localStorage.getItem("quantity"));
  const getdata = decryptData(localStorage.getItem("details"));
  // console.log("🚀 ~ getdata", getdata);

  const [walletAddress, setWalletAddress] = useState("");
  console.log("🚀 ~ walletAddress", walletAddress);

  //===== openpopp=====

  const openpopp = () => {
    if (totalremaining?.smart === 0) {
      // setpopup(true);
      toast.success("Tier 3 has been sold. Tier 4 will be launched soon.");
    } else {
      setopen(!open);
    }
  };

  // =======claim data========
  const claim = [
    {
      id: 0,
      card: 0,
      img: home,
    },
    // {
    //   id: 1,
    //   card: "0",
    //   img: thounder,
    // },
    // {
    //   id: 2,
    //   card: "0",
    //   img: king,
    // },
  ];

  // =======mynode data========
  const mynode = [
    {
      id: 0,
      card: totlenode === undefined ? 0 : totlenode,
      img: home,
    },
    // {
    //   id: 1,
    //   card: "0",
    //   img: thounder,
    // },
    // {
    //   id: 2,
    //   card: "0",
    //   img: king,
    // },
  ];
  // ======node data========

  const Buy = [
    {
      id: 0,
      node: busdprice,
      CurrentPrice: 1000,
      TotalNodes: totalremaining?.smart,
    },
    // {
    //   id: 1,
    //   node: "Power Node",
    //   CurrentPrice: "$4400 USD",
    //   TotalNodes: totalsupply?.power,
    // },
    // {
    //   id: 2,
    //   node: "Master Node",
    //   CurrentPrice: "$4400 USD",
    //   TotalNodes: totalsupply?.master,
    // },
  ];

  // ========slider data======
  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // lazyLoad: true,
    // autoplay: true,
    autoplaySpeed: 3000,
    className: "sample",
  };
  //=========wallet data========
  const wallet = [
    // {
    //   id: 0,
    //   img: wizzlogo,
    //   walletname: "WIZZ",
    //   balance: 0,
    // },
    {
      id: 1,
      img: busd,
      walletname: "BUSD",
      balance: 0,
    },
  ];

  const paymentAddress = "0x30a5d60Db900Fa46336A0EDC9fd1Ae8851362f79"; //Your wallet address to rec payment
  // 0x30a5d60Db900Fa46336A0EDC9fd1Ae8851362f79
  const BUSD_CONTRACT = "0xe9e7cea3dedca5984780bafc599bd69add087d56"; //BUSD CONTRACT Address
  const BUSD_ABI = [
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      constant: true,
      inputs: [],
      name: "_decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "_name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "_symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "burn",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "subtractedValue", type: "uint256" },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getOwner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "mint",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  //BUSD CONTRACT ABI
  var web3 = null;
  var instanced = null;
  var chainId = null;
  async function changeToMain() {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }], //MAIN BSC 0x38      // bsc testnet= 0x61
    });
  }

  // ==============placeOrder API=========

  // async function payBUSD() {
  //   if (getdata?.data?.token === undefined) {
  //     navigate("/signup");
  //   } else {
  //     let amt = $("#amount").val();
  //     web3 = new Web3(Web3.givenProvider);
  //     await Web3.givenProvider.enable();
  //     chainId = await web3.eth.getChainId();
  //     await window.ethereum
  //       .request({ method: "eth_requestAccounts" })
  //       .then(async (account) => {
  //         if (chainId !== 56) {
  //           await changeToMain();
  //         }
  //         instanced = new web3.eth.Contract(BUSD_ABI, BUSD_CONTRACT);
  //         instanced.methods
  //           .transfer(paymentAddress, web3.utils.toWei(amt, "ether"))
  //           .send({
  //             from: account[0],
  //             gas: 150000,
  //           })
  //           .on("transactionHash", function (hash) {})
  //           .on("receipt", function (receipt) {})
  //           .on("confirmation", function (confirmationNumber, receipt) {
  //             settransaction(receipt?.events?.Transfer?.returnValues?.value);

  //             if (receipt?.status && confirmationNumber === 0) {
  //               txnData();
  //               setopen(!open);
  //               toast.success(
  //                 "Congratulations! You have bough the Wizz Nodes. Please refresh page to see Nodes."
  //               );
  //               // window.location.reload();
  //             } else {
  //               // toast.error(essage);
  //             }
  //           })
  //           .on("error", function (error, receipt) {});
  //       });
  //   }
  // }

  // ==============function of increment and decrement Quantity=========
  const min = 0;
  const max = 1000;
  const handleChange = (event) => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    // setValue(Number(value).toString());
    setValue(value);
  };

  //======== increment Quantity========
  function increment() {
    //setCount(prevCount => prevCount+=1);
    setValue(function(prevCount) {
      if (prevCount < 1000) {
        return (prevCount += 1);
      }
    });
  }
  // ==============decrement Quantity=========================
  function decrement() {
    setValue(function(prevCount) {
      if (prevCount > 0) {
        return (prevCount -= 1);
      } else {
        return (prevCount = 0);
      }
    });
  }

  function gettronweb() {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      setWalletAddress(window.tronWeb.defaultAddress.base58);
    }
  }

  const txnData = async () => {
    try {
      const encrypt = encryptData(
        JSON.stringify({
          walletAddress: getdata?.data?.exists?.walletAddress,
          name: "smart node",
          currency: "TRON",
          quantity: value,
        })
      );
      const result = await instance.post("/txnData", {
        data: encrypt,
      });
      localStorage.setItem("quantity", result.data.data);
      const results = decryptData(result.data.data);

      if (results.status) {
        gettronweb();
      } else {
        toast.error(results.message);
      }
    } catch (err) {}
  };

  // const obj = async () => {
  //   if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
  //     var tronweb = window.tronWeb;
  //     var tx = await tronweb.transactionBuilder.sendTrx(
  //       "TT8QSND3jHSMLqhJQ9JpwQohKp5HMHQ8jv",
  //       value * 10 ** 6,
  //       walletAddress
  //     );
  //     var signedTx = await tronweb.trx.sign(tx);
  //     var broastTx = await tronweb.trx.sendRawTransaction(signedTx);
  //     console.log(broastTx);
  //     // txnData();

  //   }

  // };

  var obj = async () => {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      //if (window.tronLink.tronWeb)

      var tronweb = window.tronWeb;
      var tx = await tronweb.transactionBuilder.sendTrx(
        "TT8QSND3jHSMLqhJQ9JpwQohKp5HMHQ8jv",
        value * 10 ** 6,
        walletAddress
      );
      var signedTx = await tronweb.trx.sign(tx);
      var broastTx = await tronweb.trx.sendRawTransaction(signedTx);
      console.log(broastTx);
    }
  };

  const HttpProvider = TronWeb.providers.HttpProvider;
  const fullNode = new HttpProvider("https://api.shasta.trongrid.io");
  const solidityNode = new HttpProvider("https://api.shasta.trongrid.io");
  const eventServer = new HttpProvider("https://api.shasta.trongrid.io");
  const privateKey =
    "4f2c15814342c9b571e7ca465dd0c66763d5664f2747313fe88d70af3fe8e085"; // Your PrivateKey

  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

  const ACCOUNT = "TT8QSND3jHSMLqhJQ9JpwQohKp5HMHQ8jv"; // Receiver address
  const memo = "tttttttttttttttransfer";

  async function withdrawTron() {
    try {
      console.log(tronWeb.defaultAddress.base58, "=>", ACCOUNT);

      const unSignedTxn = await tronWeb.transactionBuilder.sendTrx(
        ACCOUNT,
        2 * 10 ** 6
      );
      console.log("🚀 ~ unSignedTxn", unSignedTxn);

      const unSignedTxnWithNote = await tronWeb.transactionBuilder.addUpdateData(
        unSignedTxn,
        memo,
        "utf8"
      );

      console.log("🚀 ~ unSignedTxnWithNote", unSignedTxnWithNote);

      const signedTxn = await tronWeb.trx.sign(unSignedTxnWithNote);
      console.log("signed =>", signedTxn);
      const ret = await tronWeb.trx.sendRawTransaction(signedTxn);
      console.log("broadcast =>", ret);
      console.log("ok");
    } catch (e) {
      console.log(e, "------------");
    }
  }

  const payTron = () => {
    if (getdata?.data?.token === undefined) {
      toast.error(getdata?.message);
    } else {
      obj();
    }
  };

  // ==============nodeSupplies API=========
  const nodeSupplies = async () => {
    try {
      const result = await instance.get("/nodeSupplies");

      const results = decryptData(result.data.data);

      if (results.status) {
        // toast.success(results.message);
        settotalsupply(results.data);
      } else {
        toast.error(results.message);
      }
    } catch (err) {}
  };

  // ==============getPrice API=========

  const getPrice = async () => {
    try {
      const result = await instance.get("/getPrice");

      const results = decryptData(result.data.data);

      if (results.status) {
        // toast.success(results.message);
        setbusdprice(results.data.price);
      } else {
        toast.error(results.message);
      }
    } catch (err) {}
  };
  // ==============totalNodes API=========
  const remainingNodes = async () => {
    try {
      const result = await instance.get("/remainingNodes");

      const results = decryptData(result.data.data);

      if (results.status) {
        settotalremaining(results.data);
      } else {
        toast.error(results.message);
      }
    } catch (err) {}
  };

  // ==============addWallet API=========
  const addWallet = async (wallet) => {
    try {
      const encrypt = encryptData(
        JSON.stringify({
          walletAddress: wallet,
        })
      );

      const result = await instance.post("/addWallet", {
        data: encrypt,
      });

      const results = decryptData(result.data.data);

      if (results.status) {
        toast.success(results.message);
      } else {
        toast.error(results.message);
      }
    } catch (err) {}
  };

  const openmetamask = async () => {
    const wallet = await window?.ethereum?.enable();
    addWallet(wallet?.toString());
  };

  useEffect(() => {
    if (!effectCalled.current) {
      nodeSupplies();
      getPrice();
      remainingNodes();
      effectCalled.current = true;
    }

    gettronweb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="py-6 xl:py-0 container mx-auto xl:block flex items-center flex-col">
        <div className="my-5">
          <MainTitle title={"Dashboard"} />
        </div>

        {/* {popup && <CommingSoon setpopup={setpopup} />} */}

        <div className="px-10 gap-5 xl:grid grid-cols-3 place-content-center mx-auto mt-4  hidden  ">
          <div className="nodetype-bg  rounded-2xl p-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[#7351FC] text-2xl font-bold">
                  Earning Rewards
                </p>
              </div>
              {/* <Link to="/investments"> */}
              <button onClick={withdrawTron}>
                <Button btn={"Withdraw"} />
              </button>
              {/* </Link> */}
            </div>
            <div className="text-[55px] text-color font-bold mt-2">0.000</div>
            <div className="flex justify-start items-center gap-5 mt-2">
              {claim?.map((index, key) => (
                <>
                  <div className="Rewards rounded-lg ">
                    <div
                      className="   p-4 gap-5 flex justify-center items-center flex-col"
                      key={index.id}
                    >
                      <img src={index.img} alt="" className="w-8 h-8" />
                      <p className="rewardstextcolor text-xl">{index.card}</p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="nodetype-bg flex flex-col gap-5 justify-between p-5 items-center rounded-2xl ">
            <div>
              <p className="text-[#7351FC] text-2xl font-bold">
                Mining Hash Rate
              </p>
            </div>
            <table className="w-full  text-center">
              <thead className="text-[#7351FC] text-lg font-bold">
                <tr>
                  <th scope="col">1 Hash Price</th>
                  <th scope="col">Daily ROI</th>
                  <th scope="col">Min. Withdrawl</th>
                </tr>
              </thead>
              <tbody>
                {Buy?.map((items, key) => (
                  <tr key={items.id}>
                    <td className="py-3 px-3 text-color text-base font-bold ">
                      {/* {items.node} BUSD */}
                      100 USDT
                    </td>
                    <td className="py-3 px-3 text-color text-base font-bold">
                      {/* {items.CurrentPrice} */}
                      2%
                    </td>
                    <td className="py-3 px-3 text-color text-base font-bold ">
                      {/* {items.TotalNodes} */}
                      20 USDT
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center" onClick={openpopp}>
              <Button btn={"Deposit Hash"} />
            </div>
          </div>
          <div className="nodetype-bg  rounded-2xl p-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[#7351FC] text-2xl font-bold">My Hash</p>
              </div>
              <Link to="/myNode">
                <Button btn={"View Hash"} />
              </Link>
            </div>
            <div className="text-[55px]  font-bold mt-2 text-color">
              {totlenode === undefined ? 0 : totlenode}
            </div>
            <div className="flex justify-start items-center gap-5 mt-2">
              {mynode?.map((index) => (
                <>
                  <div className="Rewards rounded-lg ">
                    <div
                      className="  p-4 gap-5 flex justify-center items-center flex-col"
                      key={index.id}
                    >
                      <img src={index.img} alt="" className="w-8 h-8" />
                      <p className="rewardstextcolor text-xl">{index.card}</p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>

        <div className=" xl:hidden nodetype-bg rounded-2xl flex justify-center px-5">
          <Slider {...settings}>
            <div className="py-14">
              <div className="flex md:flex-row flex-col gap-2 justify-between items-center">
                <div>
                  <p className="text-[#7351FC] text-2xl font-bold text-center">
                    Earning Rewards
                  </p>
                </div>
                <Link to="/investments">
                  <Button btn={"Withdraw"} />
                </Link>
              </div>
              <div className="md:text-[55px] text-[40px] text-center md:text-start text-color font-bold  ">
                <p>0.000</p>
              </div>
              <div className="flex justify-center md:justify-start flex-wrap items-center gap-5 mt-2">
                {claim?.map((index, key) => (
                  <>
                    <div className="Rewards rounded-lg ">
                      <div
                        className="  md:p-5  p-2 gap-5 flex justify-center items-center flex-col"
                        key={index.id}
                      >
                        <img src={index.img} alt="" className="w-8 h-8" />
                        <p className="rewardstextcolor text-xl">{index.card}</p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="py-14 flex  ">
              <div className="flex flex-col justify-between items-center gap-10">
                {" "}
                <div clas>
                  <p className="text-[#7351FC] text-2xl font-bold">
                    Mining Hash Rate
                  </p>
                </div>
                <table className="w-full  md:text-center">
                  <thead className="text-[#7351FC] md:text-lg text-[11px] md:font-bold">
                    <tr>
                      <th scope="col">1 Hash Price</th>
                      <th scope="col">Daily ROI</th>
                      <th scope="col">Min. Withdrawl</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Buy?.map((items, key) => (
                      <tr key={items.id}>
                        <td className="py-3 px-3 text-color text-base font-bold ">
                          {items.node} BUSD
                        </td>
                        <td className="py-3 px-3 text-color text-base font-bold">
                          {items.CurrentPrice}
                        </td>
                        <td className="py-3 px-3 text-color text-base font-bold ">
                          {items.TotalNodes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center  " onClick={openpopp}>
                  <Button btn={"Deposit Hash"} />
                </div>
              </div>
            </div>
            <div className="py-14">
              <div className="flex md:flex-row flex-col gap-2 justify-between items-center">
                <div>
                  <p className="text-[#7351FC] text-2xl font-bold">My Hash</p>
                </div>
                <Link to="/myNode">
                  <Button btn={"View Hash"} />
                </Link>
              </div>
              <div className="golden md:text-[55px] text-[40px] text-center md:text-start text-color font-bold  ">
                <p>{totlenode === undefined ? 0 : totlenode}</p>
              </div>
              <div className="flex justify-center md:justify-start flex-wrap items-center gap-5 mt-2">
                {mynode?.map((index, key) => (
                  <>
                    <div className="Rewards rounded-lg ">
                      <div
                        className="  rounded-lg md:p-5  p-2 gap-5 flex justify-center items-center flex-col"
                        key={index.id}
                      >
                        <img src={index.img} alt="" className="w-8 h-8" />
                        <p className="rewardstextcolor text-xl">{index.card}</p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </Slider>
        </div>

        {open && (
          <div
            className="py-3  z-50 flex justify-center items-center mx-auto fixed top-0 right-0 bottom-0 left-0 backdrop-blur "
            id="modal"
          >
            <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
              <div className="relative py-8 px-5 md:px-10 nodetype-bg   border-[#14206A] border-2 rounded-3xl shadow-2xl -3xl  ">
                <h1 className="text-[white] font-lg font-bold tracking-normal leading-tight mb-4">
                  Currency
                </h1>
                <>
                  <div
                    className="relative  text-left"
                    // onClick={() => setdrop(!drop)}
                  >
                    <div>
                      <div className="flex cursor-pointer  justify-between items-center  rounded-md border bg-[#CFD6FE] text-[#515151] px-4 py-3 text-sm font-medium  shadow-sm  focus:outline-none ">
                        {/* */}
                        {/* {mark === 0 ? (
                          <p className="text-base text-black">
                            Select Payment Method
                          </p>
                        ) : ( */}
                        <div className="flex gap-5 justify-center items-center text-lg font-bold">
                          <img src={tronImg} alt="" className="w-10 h-8" />
                          <p>TRON (USDT-TRC20)</p>
                        </div>
                        {/* )} */}
                        {/* <i className="fa-solid fa-caret-down"></i> */}
                      </div>
                    </div>
                    {/* {drop && (
                      <div className="absolute right-0 left-0 z-10 mt-2 cursor-pointer  rounded-md bg-[#CFD6FE] text-[#515151] shadow-lg ">
                        <div role="none">
                          {wallet?.map((i) => (
                            <div
                              className="flex justify-between items-center px-4 py-3   "
                              key={i.id}
                              onClick={() => setmark(i)}
                            >
                              {// console.log(i)}
                              <div className=" flex justify-start items-center gap-4">
                                <div>
                                  <img
                                    src={i.img}
                                    alt=""
                                    className="w-10 h-8"
                                  />
                                </div>
                                <div>
                                  <p className=" font-semibold">
                                    {i.walletname}
                                  </p>
                                  <p>Balance : {i.balance}</p>
                                </div>
                              </div>
                              <div>
                                {mark.id === i.id ? (
                                  <i className="fa-solid fa-check text-[#24AF0D]"></i>
                                ) : null}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )} */}
                  </div>
                </>
                {/* <div className="flex justify-center py-5">
                  <img
                    src={smartnode}
                    alt=""
                    className="md:w-44 w-32 lg:w-fit"
                  />
                </div> */}
                <div className="mt-10">
                  <label className="text-[white] text-xl font-bold leading-tight tracking-normal ">
                    Total Cost:
                  </label>
                </div>

                <div className=" mb-5 mt-2 relative">
                  <input
                    className="text-color  focus:outline-none  font-extrabold w-full h-10 flex items-center  text-xl  border-[#14206A] border-b"
                    placeholder="Enter Price"
                    value={(busdprice * value).toFixed(6)}
                    id="amount"
                    readOnly
                    // 0.1
                  />

                  <p className="absolute right-0 top-2 text-white">
                    {/* {mark.walletname} */}
                    USDT
                  </p>
                </div>
                {/* <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <label className="text-[white] text-2xl font-bold leading-tight tracking-normal">
                      Drop Schedule :
                    </label>
                  </div>
                  <div className="rounded-md bg-[#DCE0FF] p-2">
                    <p>TIER 1 of 25</p>
                  </div>
                </div> */}
                <div className="mt-10 text-center rounded-md bg-[#97A5FC] p-3">
                  <p className="text-[black] text-xl font-bold leading-tight tracking-normal">
                    {totalremaining?.smart} / {totalsupply?.master} Remain
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-8">
                  <label className="text-[white] text-xl font-bold leading-tight tracking-normal">
                    Quantity: (Up to 1000)
                  </label>
                </div>

                <div className=" mb-5 mt-2 flex bot-left1 rounded-lg">
                  <div
                    className=" btn-bg p-2  flex justify-center items-center cursor-pointer  border-y border-l"
                    onClick={decrement}
                  >
                    {/* <i className="fa-solid fa-chevron-up"></i> */}
                    <i className="fa-solid fa-minus text-center"></i>
                  </div>
                  <input
                    className="  focus:outline-none  font-light w-full h-10 flex items-center bg-[#97A5FC]   border-y text-center caret-black"
                    placeholder="Enter Quantity"
                    type="number"
                    value={value}
                    onChange={handleChange}
                    min="0"
                    max="1000"
                    step="1"
                    pattern="[0-9]*"
                  />
                  <div
                    className=" btn-bg p-2 flex justify-center items-center cursor-pointer  border-y border-r"
                    onClick={increment}
                  >
                    <i className="fa-solid fa-plus text-center"></i>
                  </div>
                </div>
                <div
                  className="flex justify-center items-center"
                  onClick={payTron}
                >
                  <Button btn={"Place Order"} />
                </div>

                <div
                  className=" cursor-pointer outline-none border-none absolute top-0 right-0 mt-4 mr-5 text-[#CFD6FE] transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                  onClick={openpopp}
                >
                  <i className="fa-sharp fa-solid fa-xmark"></i>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
