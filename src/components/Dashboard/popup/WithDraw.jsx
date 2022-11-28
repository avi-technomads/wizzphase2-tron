import React, { useState } from "react";
import TronWeb from "tronweb";
import Button from "../../Button/Button";
import tronImg from "../../img/tron-logo.svg";

const WithDraw = ({ show }) => {
  const [value, setValue] = useState(0);

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

  const min = 0;
  const max = 1000;
  const handleChange = (event) => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    // setValue(Number(value).toString());
    setValue(value);
  };

  const withdrawTron = async () => {
    try {
      const HttpProvider = TronWeb.providers.HttpProvider;
      const fullNode = new HttpProvider("https://api.shasta.trongrid.io");
      const solidityNode = new HttpProvider("https://api.shasta.trongrid.io");
      const eventServer = new HttpProvider("https://api.shasta.trongrid.io");
      const privateKey =
        "4f2c15814342c9b571e7ca465dd0c66763d5664f2747313fe88d70af3fe8e085"; // Your PrivateKey

      const tronWeb = new TronWeb(
        fullNode,
        solidityNode,
        eventServer,
        privateKey
      );

      const ACCOUNT = "TT8QSND3jHSMLqhJQ9JpwQohKp5HMHQ8jv"; // Receiver address
      const memo = "tttttttttttttttransfer";
      console.log(tronWeb.defaultAddress.base58, "=>", ACCOUNT);

      const unSignedTxn = await tronWeb.transactionBuilder.sendTrx(
        ACCOUNT,
        value * 10 ** 6
      );
      const unSignedTxnWithNote = await tronWeb.transactionBuilder.addUpdateData(
        unSignedTxn,
        memo,
        "utf8"
      );
      const signedTxn = await tronWeb.trx.sign(unSignedTxnWithNote);
      console.log("signed =>", signedTxn);
      const ret = await tronWeb.trx.sendRawTransaction(signedTxn);
      console.log("broadcast =>", ret);
      console.log("ok");
    } catch (e) {
      console.log(e, "------------");
    }
  };

  return (
    <>
      <div
        className="py-3  z-50 flex justify-center items-center mx-auto fixed top-0 right-0 bottom-0 left-0 backdrop-blur"
        id="modal"
      >
        <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div className="relative py-8 px-5 md:px-10 nodetype-bg   border-[#14206A] border-2 rounded-3xl shadow-2xl -3xl  ">
            <h1 className="text-[white] font-lg font-bold tracking-normal leading-tight mb-4">
              Currency
            </h1>
            <>
              <div className="relative  text-left">
                <div>
                  <div className="flex cursor-pointer  justify-between items-center  rounded-md border bg-[#CFD6FE] text-[#515151] px-4 py-3 text-sm font-medium  shadow-sm  focus:outline-none ">
                    <div className="flex gap-5 justify-center items-center text-lg font-bold">
                      <img src={tronImg} alt="" className="w-10 h-8" />
                      <p>TRON (USDT-TRC20)</p>
                    </div>
                  </div>
                </div>
              </div>
            </>

            <div className="mt-10">
              <label className="text-[white] text-xl font-bold leading-tight tracking-normal ">
                Total Cost:
              </label>
            </div>

            <div className=" mb-5 mt-2 flex bot-left1 rounded-lg">
              <div
                className=" btn-bg p-2  flex justify-center items-center cursor-pointer  border-y border-l"
                onClick={decrement}
              >
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

            <button
              onClick={() => withdrawTron()}
              className="mx-auto flex justify-center"
            >
              <Button btn={"Withdraw"} />
            </button>
          </div>
        </div>

        <div
          className=" cursor-pointer outline-none border-none absolute top-0 right-0 mt-4 mr-5 text-[#CFD6FE] transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
          onClick={() => {
            show();
          }}
        >
          <i className="fa-sharp fa-solid fa-xmark"></i>
        </div>
      </div>
    </>
  );
};

export default WithDraw;
