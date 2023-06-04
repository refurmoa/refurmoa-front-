import React, { Component } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDRGfVURrcwZODaqG-OatKqqH1DRcKSYpE",
  authDomain: "ascendant-cache-386102.firebaseapp.com",
  projectId: "ascendant-cache-386102",
  storageBucket: "ascendant-cache-386102.appspot.com",
  messagingSenderId: "450258491122",
  appId: "1:450258491122:web:0b5072033e0959a3c1626b",
  measurementId: "G-HPK58PBB7Z"
};
class FirebaseContainer extends Component {
  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  componentDidMount() {

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    });
  }

  /**
   * firebase PhoneNumber 인증 요청
   * @param {*} e 
   */
  handlePhoneNumberAuth = (e) => {

    const tlno = document.querySelector('input[name=tlno]').value.trim(); // PhoneNumber

    // firebase request
    firebase.auth().languageCode = 'ko'; // language set
    firebase
      .auth()
      .signInWithPhoneNumber('+82' + tlno, window.recaptchaVerifier)
      .then((confirmationResult) => {
        // success
        alert('인증 요청')
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        // error
        this.firebaseError(error);
      });
  }

  /**
   * 인증코드 확인
   * @param {*} e 
   */
  handleAuthCode = (e) => {

    const authCode = document.querySelector('input[name=authCode]').value.trim(); // AuthCode

    window.confirmationResult.confirm(authCode).then((result) => {
      // User signed in successfully.
      alert('인증 완료');
      console.log(result.user, result.user.uid);
    }).catch((error) => {
      // User couldn't sign in
      this.firebaseError(error);
    });
  }

  /**
   * firebase 에러 처리
   * @param {*} e 
   */
  firebaseError = (error) => {

    if ('auth/invalid-verification-code' === error.code) {
      alert('인증번호가 유효하지 않습니다.');
    } else if ('auth/session-expired' === error.code) {
      alert('인증번호가 만료되었습니다.');
    } else if ('auth/too-many-requests' === error.code) {
      alert('잠시 후 다시 시도해 주세요.');
    } else {
      console.log(error);
    }
  }

  render() {

    return (
      <>
        <div>
          <input type="text" placeholder="'-' 없이 입력" name="tlno" />
          <button onClick={this.handlePhoneNumberAuth}>인증 요청</button>
        </div>
        <div>
          <input type="text" placeholder="인증번호 6자리" name="authCode" />
          <button onClick={this.handleAuthCode}>인증 확인</button>
        </div>
        <div id="recaptcha-container"></div>
      </>
    )
  }
}

export default FirebaseContainer;