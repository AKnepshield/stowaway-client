import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "./auth/Login.jsx";
import { Register } from "./auth/Register.jsx";
import App from "../App.jsx";
import { RecordList } from "./records/RecordList.jsx";
import { RecordDetails } from "./records/RecordDetails.jsx";
import { RecordForm } from "./records/RecordForm.jsx";

export const ApplicationViews = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<App />} />
          <Route path="/records">
            <Route index element={<RecordList />} />
            <Route path=":id" element={<RecordDetails />} />
            <Route path="new" element={<RecordForm />} />
            <Route path=":id/edit" element={<RecordForm />} />
          </Route>
          <Route path="/my-records" element={<RecordList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
