// 본인인증

function SignVerification({ name, setName, phone, setPhone, certi, setCerti }) {

    // 인증번호 전송
    const certifyClick = () => {

    }

    return ( <>
        <div className="Sign_form_line">
            <label className="Sign_form_text" htmlFor="name">이름</label>
            <input className="Sign_input"
                name="name" type="text" placeholder="이름" maxLength="10"
                value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="Sign_form_line Sign_phone_line">
            <label className="Sign_form_text" htmlFor="phone">전화번호</label>
            <input className="Sign_input Sign_phone"
                name="phone" type="text" placeholder="전화번호" maxLength="15"
                value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <span className="Sign_phone_btn" onClick={certifyClick}>인증번호 전송</span>
        </div>
        <div className="Sign_form_line Sign_phone_line">
            <input className="Sign_input"
                name="phone" type="text" placeholder="인증번호 입력" maxLength="15"
                value={certi} onChange={(e) => setCerti(e.target.value)} required />
        </div>
        <div className="Sign_indivation">
            <span className="Sign_indivation_left">∙</span>
            <span className="Sign_indivation_right">
                본인인증 시 제공되는 정보는 해당 인증기관에서 직접 수집하며,
                <br />
                인증 이외의 용도로 이용 또는 저장되지 않습니다.
            </span>
        </div>
    </> )
    
}

export default SignVerification;