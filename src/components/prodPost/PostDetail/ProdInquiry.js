// 판매 상세 페이지 - 상품문의

import "./ProdInquiry.css";
import React from 'react';
import { useEffect, useState } from "react";
import lock_icon from "../../../images/lock_icon-240.png";
import inquirylist from "./inquirylist.json";

function ProdInquiry(props) {
  const [inquiryList, setInquiryList] = useState(inquirylist); // 문의 글 리스트
  const [inquiryExist, setInquiryExist] = useState(false); // 문의 글 여부
  const [inquiryForm, setInquiryForm] = useState({ // 문의 글 등록
    private: 0,
    title: "",
    content: "",
  });
  const [detailOn, setDetailOn] = useState(""); // 문의 상세 보기
  const [replyForm, setReplyForm] = useState(""); // 답글 등록
  const [totalPage, setTotalPage] = useState(1); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  useEffect(() => {
    // 문의 리스트 조회
    // setList();

    // 문의 글 여부 조회
    setInquiryExist(true);

    // 문의 글 수 조회
    pageCount();
  }, []);

  // 문의 글 목록 조회
  const setList = () => {
  // setInquiryList();
  }

  // 문의 내용 폼 입력
  const iiChange = (e) => {
    e.target.id === "inquiry_title" ?
      setInquiryForm((prevInquiryForm) => ({
        ...prevInquiryForm,
        title: e.target.value,
      }))
    : setInquiryForm((prevInquiryForm) => ({
        ...prevInquiryForm,
        content: e.target.value,
      }));
  };

  // 문의 글 등록
  const inquiryInsert = () => {

  };

  // 문의 글 상세 보기
  const detailOnChange = (num) => {
    detailOn === num ? setDetailOn("")
    : props.login_id === null ?
      alert("로그인 후 확인 가능합니다.")
    : setDetailOn(num);
  };
  
  // 문의 글 삭제
  const deleteInquiry = (e) => {
    e.stopPropagation();
    const deleteQ = window.confirm("정말 삭제하시겠습니까?");
    if (deleteQ) {
      
    }
  }

  // 문의 내용 폼 입력
  const reChange = (e) => {
    setReplyForm(e.target.value);
  };

  // 문의 댓글 등록
  const replyInsert = () => {

  }

  // 문의 글 수 조회
  const pageCount = () => {
    setTotalPage(5);
  }

  // 문의 글 목록 >시작<
  const iList = inquiryList.map((li) => (
    <React.Fragment key={li.prod_inquiry_num}>
      <tr className="PI-list_line" onClick={() => detailOnChange(li.prod_inquiry_num)}>
        <td className={props.login_id !== "admin" ? "PI-reply" : li.re_con === null ? "PI-reply_admin_red" : "PI-reply_admin"}>
          { li.re_con === null ? "미답변" : "답변완료" }
        </td>
        <td className={ props.login_id === "admin" || props.login_id === li.member_id ? "PI-title" : li.private === 1 ? "PI-title_lock" : "PI-title"}>
          { props.login_id === "admin" || props.login_id === li.member_id ? li.title : li.private === 1 && "비밀글입니다." }
          { li.private === 1 ? 
            <img className="PI-lock_icon" alt="비밀글" src={lock_icon}></img>
            : li.title
          }
          <span className="PI-id_wrap">
            { props.login_id === "admin" || props.login_id === li.member_id ? <span className="PI-id">{li.member_id}</span>
              : <span className="PI-id">{li.member_id.slice(0, 2)}{"*".repeat(li.member_id.length-2)}</span>
            }
            { ( props.login_id === "admin" || props.login_id === li.member_id ) &&
              <span className="PI-delete" onClick={deleteInquiry}>삭제</span>
            }
          </span>
        </td>
        <td className="PI-date">{li.date}</td>
      </tr>

      {/* 문의 글 상세 */}
      { detailOn === li.prod_inquiry_num &&
        ( li.private === 0 || props.login_id === "admin" || props.login_id === li.member_id ) &&
        <tr className="PI-detail_line">
          <td className="PI-reply"></td>
          <td className="PI-content-wrap" colSpan="2">
            <div className="PI-content">{li.content}</div>
            { li.re_con !== null ?
              <div className="PI-reply_content_wrap">
                <span className="PI-reply_icon">A.</span>
                <span className="PI-reply_content">{li.re_con}</span>
              </div>
              : props.login_id === "admin" && // 문의 댓글 폼
                <form className="PI-reply_form_wrap">
                  <span className="PI-reply_form">
                    <textarea className="PI-reply_form_content"
                      type="text"
                      id="inquiry_content"
                      name="inquiry_content"
                      maxLength="500"
                      value={replyForm}
                      onChange={reChange}
                      placeholder="답변을 입력하세요"
                      required
                    />
                    <span className="PI-reply_form_length">{replyForm.length} / 500</span>
                  </span>
                  <button className="PI-reply_form_btn" onClick={replyInsert}>등록</button>
                </form>
            }
          </td>
        </tr>
      }
    </React.Fragment>
  ));
  // 문의 글 목록 >끝<


  return (
    <div className="PI-wrap">

      {/* 문의 글 입력 폼 */}
      {props.login_id !== null && props.login_id !== "admin" && (
        <form className="PI-form_wrap">
          <span className="PI-form">
            <input className="PI-form_title"
              type="text"
              id="inquiry_title"
              name="inquiry_title"
              maxLength="20"
              value={inquiryForm.title}
              onChange={iiChange}
              placeholder="제목을 입력하세요"
              required
            />
            <textarea className="PI-form_content"
              type="text"
              id="inquiry_content"
              name="inquiry_content"
              maxLength="500"
              value={inquiryForm.content}
              onChange={iiChange}
              placeholder="내용을 입력하세요"
              required
            />
            <span className="PI-form_length">{inquiryForm.content.length} / 500</span>
          </span>
          <span className="PI-form_btn_wrap">
            <button className="PI-form_btn" onClick={inquiryInsert}>등록</button>
            <div className="PI-form_checkbox">
              <input type="checkbox" id="private_check" name="private_check" />
              <label htmlFor="private_check">비공개</label>
            </div>
          </span>
        </form>
      )}

      {/* 문의 글 목록 */}
      <table className="PI-list">
        <tbody>
          { !inquiryExist ?
            <tr className="PI-list_line">
              <td className="PI-list_line_none">작성된 문의 글이 없습니다.</td>
            </tr>
            : iList
          }
        </tbody>
      </table>

      {/* 페이지 출력 */}
      { totalPage > 1 &&
        <div className="PI-page">
          { currentPage === 1 ? <span className="PI-page_prev_gray">&lt;</span>
            : <span className="PI-page_prev" onClick={() => setCurrentPage(currentPage - 1)}>&lt;</span>
          }
          <span className="PI-page_now">{currentPage}</span>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <span className="PI-page_total">{totalPage}</span>
          { currentPage === totalPage ? <span className="PI-page_next_gray">&gt;</span>
            : <span className="PI-page_next" onClick={() => setCurrentPage(currentPage + 1)}>&gt;</span>
          }
        </div>
      }

    </div>
  );
}
export default ProdInquiry;
