// 전체 데이터
const inquiryList = [
  {
    num: 1,
    title: "회원탈퇴는 어떻게 하나요?",
    date: "2022-12-25",
    content:
      "회원탈퇴는 어떻게 하나요 ? \n& 이용약관 변경에 대한 안내입니다. \n 이용약관 변경에 대한 안내입니다.이용약관 변경에 대한 안내입니다.이용약관 변경에 대한 안내입니다.이용약관 변경에 대한 안내입니다.이용약관 변경에 대한 안내입니다.",
    answer:
      "로그인 후 홈페이지 상단 마이페이지 > 개인정보 수정 창 안에서 탈퇴 가능합니다. 탈퇴 시, 적립된 예치금 및 포인트는 모두 소멸되며 복구 불가- 기존에 사용한 휴대폰 번호로 재가입 가능. 단, 기존 아이디로 재가입 불가 ※ 상법 및 전자상거래 등에서의 소비자 보호에 관한 법률 등 관련 법령에 의하여 거래 관련 권리 의무 관계의 확인 등을 이유로 일정 기간 보유하여야 할 필요가 있을 경우에는 정해진 기간 동안 보유 후 파기합니다.",
    answerdate: "2023-05-09 답변완료",
  },
  {
    num: 2,
    title: "[결제를 취소하고 싶어요",
    date: "2022-12-25",
    content: "ddd",
    answer: "잘 해보세요",
    answerdate: "2023-05-09 답변완료",
  },
  {
    num: 3,
    title: "배송 확인은 어디서 하나요?",
    date: "2022-12-25",
    content: "ddd",
    answer: "잘 해보세요",
    answerdate: "2023-05-09 답변완료",
  },
  {
    num: 4,
    title: "연락처가 바뀌었어요.",
    date: "2022-11-25",
    content: "ddd",
  },
  {
    num: 5,
    title: "낙찰 정보는 어디서 확인할 수 있나요?",
    date: "2022-11-25",
    content: "ddd",
  },
  {
    num: 6,
    title: "낙찰 정보는 어디서 확인할 수 있나요?",
    date: "2022-11-25",
    content: "ddd",
  },
  {
    num: 7,
    title: "낙찰 정보는 어디서 확인할 수 있나요?",
    date: "2022-11-25",
    content: "ddd",
  },
  {
    num: 8,
    title: "낙찰 정보는 어디서 확인할 수 있나요?",
    date: "2022-11-25",
    content: "ddd",
  },
  {
    num: 9,
    title:
      "낙찰 정보는 어디서 확인할 수 있나요? 낙찰 정보는 어디서 확인할 수 있나요?",
    date: "2022-11-25",
    content: "ddd",
  },
  {
    num: 10,
    title: "낙찰 정보는 어디서 확인할 수 있나요?",
    date: "2022-11-25",
    content: "ddd",
  },
  {
    num: 11,
    title: "낙찰 정보는 어디서 확인할 수 있나요?",
    date: "2022-11-25",
    content: "ddd",
  },
  {
    num: 12,
    title: "낙찰 정보는 어디서 확인할 수 있나요?",
    date: "2022-11-05",
    content: "ddd",
  },
];
const getPostByNo = (num) => {
  const array = inquiryList.filter((x) => x.num === num);
  if (array.length === 1) {
    return array[0];
  }
  return null;
};

export { inquiryList, getPostByNo };
