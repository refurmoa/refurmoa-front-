// 본인인증
import React, { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


function SignVerification({ update, name, setName, phone, setPhone, setCerti, certiChk, setCertiChk, setPhoneChk }) {

    const firebaseConfig = {
        apiKey: "AIzaSyDRGfVURrcwZODaqG-OatKqqH1DRcKSYpE",
        authDomain: "ascendant-cache-386102.firebaseapp.com",
        projectId: "ascendant-cache-386102",
        storageBucket: "ascendant-cache-386102.appspot.com",
        messagingSenderId: "450258491122",
        appId: "1:450258491122:web:0b5072033e0959a3c1626b",
        measurementId: "G-HPK58PBB7Z"
    };

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            size: 'invisible',
            callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        });
    }, []);

    useEffect(() => {
        if (certiChk) handleAuthCode();
    }, [certiChk])

    // firebase PhoneNumber 인증 요청
    const handlePhoneNumberAuth = (e) => {
        const tlno = document.querySelector('input[name=tlno]').value.trim().substring(1); // PhoneNumber

        firebase.auth().languageCode = 'ko';
        firebase
        .auth()
        .signInWithPhoneNumber('+82' + tlno, window.recaptchaVerifier)
        .then((confirmationResult) => {
            alert('인증번호를 전송하였습니다.');
            window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
            firebaseError(error);
        });
    };

    // 인증 코드 확인
    const handleAuthCode = (e) => {
        const authCode = document.querySelector('input[name=authCode]').value.trim();

        window.confirmationResult.confirm(authCode).then((result) => {
            setCerti(true);
            setCertiChk(false);
            // console.log(result.user, result.user.uid);
        }).catch((error) => {
            firebaseError(error);
        });
    };

    // firebase 에러 처리
    const firebaseError = (error) => {
        if ('auth/invalid-verification-code' === error.code) {
            alert('인증번호가 유효하지 않습니다.');
        } else if ('auth/session-expired' === error.code) {
            alert('인증번호가 만료되었습니다.');
        } else if ('auth/too-many-requests' === error.code) {
            alert('잠시 후 다시 시도해 주세요.');
        } else {
            console.log(error);
        }
    };

    
    return ( <>
        { update !== null && update === true ?
            <div className="Sign_form_line">
                <label className="Sign_form_text" htmlFor="name">이름</label>
                <input className="Sign_input" style={{border: '0'}}
                    name="name" type="text" placeholder="이름" maxLength="10" value={name} readOnly />
            </div>
            : <div className="Sign_form_line">
                <label className="Sign_form_text" htmlFor="name">이름</label>
                <input className="Sign_input"
                    name="name" type="text" placeholder="이름" maxLength="10"
                    value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
        }
        
        <div className="Sign_form_line Sign_phone_line">
            <label className="Sign_form_text" htmlFor="phone">전화번호</label>
            <input className="Sign_input Sign_phone"
                name="tlno" type="text" placeholder="'-' 없이 입력" maxLength="15"
                value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <span className="Sign_phone_btn" onClick={() => handlePhoneNumberAuth()}>인증번호 전송</span>
        </div>
        <div className="Sign_form_line Sign_phone_line">
            <input className="Sign_input"
                name="authCode" type="text" placeholder="인증번호 입력" maxLength="6" required />
        </div>
        <div className="Sign_indivation">
            <span className="Sign_indivation_left">∙</span>
            <span className="Sign_indivation_right">
                본인인증 시 제공되는 정보는 해당 인증기관에서 직접 수집하며,
                <br />
                인증 이외의 용도로 이용 또는 저장되지 않습니다.
            </span>
        </div>
        <div id="recaptcha-container"></div>
    </> )
    
}

export default SignVerification;
