import React from "react";
import { Link, useLocation } from "react-router-dom";
import Main from "./SignupMain";
import Phone from "./SignupPhone";
import Input from "./SignupInput";
import Accept from "./SignupAccept";
import Complete from "./SignupComplete";
import { useState } from "react";

function Signup() {
  let content = null;
  const [mode, setMode] = useState(0);
  const [id, setTotal_Id] = useState("");
  const [phone, setTotal_Phone] = useState("");
  const [name, setTotal_Name] = useState("");

  if (mode === 0) {
    content = <Main setMode={setMode} />;
  } else if (mode === 1) {
    content = (
      <Phone
        setMode={setMode}
        setTotal_Name={setTotal_Name}
        setTotal_Phone={setTotal_Phone}
      />
    );
  } else if (mode === 2) {
    content = (
      <Input
        setMode={setMode}
        name={name}
        phone={phone}
        setTotal_Id={setTotal_Id}
      />
    );
  } else if (mode === 3) {
    content = <Accept setMode={setMode} />;
  } else if (mode === 4) {
    content = <Complete setMode={setMode} name={name} id={id} />;
  }

  return <>{content}</>;
}
export default Signup;
