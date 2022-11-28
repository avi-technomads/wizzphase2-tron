/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import MyNode from "./components/MyNode/MyNode";
import Investments from "./components/Investments/Investments";
import FAQ from "./components/FAQ/FAQ";
import Referral from "./components/Referral/Referral";
import Logo from "./components/Logo/Logo";
import "./components/Login/SignUp.css";
import OTP from "./components/OTP/OTP";
import { Toaster } from "react-hot-toast";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import { useEffect, useState } from "react";
import useEncryption from "./components/EncryptData/EncryptData";
import instance from "./components/BaseUrl/BaseUrl";
import toast from "react-hot-toast";
import Profile from "./components/Profile/Profile";
import Protected from "./components/ProtectedRouter/Protected";
import CommingSoon from "./components/Dashboard/CommingSoon/CommingSoon";
import ErrorPage from "./components/ErrorPage/ErrorPage";
function App() {
  const navigate = useNavigate();
  const { encryptData, decryptData } = useEncryption();
  const getdata = decryptData(localStorage.getItem("details"));
  const [totlenode, settotlenode] = useState();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (getdata?.data?.token === undefined) {
      navigate("/signUp");
    } else {
      totalNodes();
    }
  }, [getdata?.data?.token]);

  // ==============totalNodes API=========
  const totalNodes = async () => {
    try {
      const encrypt = encryptData(
        JSON.stringify({
          email: getdata?.data?.userData?.email,
        })
      );
      const result = await instance.post("/totalNodes", {
        data: encrypt,
      });

      const results = decryptData(result.data.data);

      if (results.status) {
        // toast.success(results.message);
        settotlenode(results?.data?.total);
      } else {
        toast.error(results.message);
      }
    } catch (err) {}
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex  h-full">
        <Navbar />

        <div className="lg:ml-[54px] w-full h-screen  h min-h-screen  bg ">
          <Logo />
          <Routes>
            <Route element={<Protected />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
            </Route>
            <Route path="/" element={<Dashboard totlenode={totlenode} />} />
            <Route path="/myNode" element={<MyNode totlenode={totlenode} />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/logo" element={<Logo />} />

            <Route
              path="/profile"
              element={<Profile totlenode={settotlenode} />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
