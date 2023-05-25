// 회원가입 페이지

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Main from "./SignupMain";
import Phone from "./SignupPhone";
import Input from "./SignupInput";
import Accept from "./SignupAccept";
import Complete from "./SignupComplete";


function Signup() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(0);
  const [id, setTotal_Id] = useState("");
  const [phone, setTotal_Phone] = useState("");
  const [name, setTotal_Name] = useState("");
  const [data, setData]=useState({});

  // useEffect(() => {
  //   if (sessionStorage.getItem("id") !== null) navigate("/");
  // }, []);

  if (mode === 1) {
    return ( <Phone setMode={setMode} setTotal_Name={setTotal_Name} setTotal_Phone={setTotal_Phone} /> );
  } else if (mode === 2) {
    return ( <Input setMode={setMode} name={name} phone={phone} setTotal_Id={setTotal_Id} setData={setData} /> );
  } else if (mode === 3) {
    return ( <Accept setMode={setMode}  data={data}/> );
  } else if (mode === 4) {
    return ( <Complete setMode={setMode} name={name} id={id} /> );
  } else return ( <Main setMode={setMode} /> );
}

export default Signup;
