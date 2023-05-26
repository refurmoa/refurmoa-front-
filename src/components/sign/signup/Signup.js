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
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData]=useState({});

  useEffect(() => {
    if (sessionStorage.getItem("id") !== null) navigate("/");
  }, []);

  if (mode === 1) {
    return ( <Phone setMode={setMode} name={name} setName={setName} phone={phone} setPhone={setPhone} /> );
  } else if (mode === 2) {
    return ( <Input setMode={setMode} id={id} setId={setId} name={name} setName={setName} phone={phone} setPhone={setPhone} setData={setData} /> );
  } else if (mode === 3) {
    return ( <Accept setMode={setMode} id={id} name={name} phone={phone} data={data} /> );
  } else if (mode === 4) {
    return ( <Complete setMode={setMode} name={name} id={id} /> );
  } else return ( <Main setMode={setMode} /> );
}

export default Signup;
