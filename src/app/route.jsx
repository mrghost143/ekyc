import {
  AdminPage, BankUpload, Digilocker, EmailPage, Home, Login, NomineeDetails,
  PersonalDetails, BankDetails, Signature, Selfie, ApplicationForm, Fno, RetailPack, Congratulation
} from "@module";
import { PrivateRoute } from "@shared";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import { HniPack } from "../module/protected/hni-pack";
import useScrollToTop from "../hooks/useScrollToTop";

const Routing = () => {
  useScrollToTop()


  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <Layout footerFlag={false} >
            <Home />
          </Layout>
        }
      />
      <Route
        path="/protected"
        element={
          <Layout>
            <PrivateRoute element={<AdminPage />} />
          </Layout>
        }
      />
      <Route
        path="/email"
        element={
          <Layout>
            <EmailPage />
          </Layout>
        }
      />
      <Route
        path="/digilocker"
        element={
          <Layout>
            <Digilocker />
          </Layout>
        }
      />
      <Route
        path="/personal"
        element={
          <Layout>
            <PersonalDetails />
          </Layout>
        }
      />
      <Route
        path="/nominee"
        element={
          <Layout>
            <NomineeDetails />
          </Layout>
        }
      />
      <Route
        path="/bank-details"
        element={
          <Layout>
            <BankDetails />
          </Layout>
        }
      />
      <Route
        path="/bank-upload"
        element={
          <Layout>
            <BankUpload />
          </Layout>
        }
      />
      <Route
        path="/signature"
        element={
          <Layout>
            <Signature />
          </Layout>
        }
      />
      <Route
        path="/fno"
        element={
          <Layout>
            <Fno />
          </Layout>
        }
      />
      <Route
        path="/selfie"
        element={
          <Layout>
            <Selfie />
          </Layout>
        }
      />
      <Route
        path="/application-form"
        element={
          <Layout>
            <ApplicationForm />
          </Layout>
        }
      />
      <Route
        path="/retail-pack"
        element={
          <Layout>
            <RetailPack />
          </Layout>
        }
      />
      <Route
        path="/hni-pack"
        element={
          <Layout>
            <HniPack />
          </Layout>
        }
      />
      <Route
        path="/congratulation"
        element={
          <Layout>
            <Congratulation />
          </Layout>
        }
      />
    </Routes>
  );
};

export default Routing;
