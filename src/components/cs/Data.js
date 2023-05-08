// 전체 데이터
const noticeList = [
  {
    noti_num: 1,
    title: "이용 약관 개정 안내",
    date: "2022-12-25",
    content:
      "이용약관 변경에 대한 안내입니다.이용약관 변경에 대한 안내입니다.이용약관 변경에 대한 안내입니다.이용약관 변경에 대한 안내입니다.이용약관 변경에 대한 안내입니다.이용약관 변경에 대한 안내입니다.",
  },
  {
    noti_num: 2,
    title: "[종료] 3월 4주차 LUCKY DRAW",
    date: "2022-12-25",
    content: "ddd",
  },
  {
    noti_num: 3,
    title: "[종료] 3월 4주차 LUCKY DRAW",
    date: "2022-12-25",
    content: "ddd",
  },
  {
    noti_num: 4,
    title: "[종료] 3월 3주차 LUCKY DRAW",
    date: "2022-11-25",
    content: "ddd",
  },
  {
    noti_num: 5,
    title: "[종료] 3월 3주차 LUCKY DRAW",
    date: "2022-11-25",
    content: "ddd",
  },
  {
    noti_num: 6,
    title: "[종료] 3월 3주차 LUCKY DRAW",
    date: "2022-11-25",
    content: "ddd",
  },
  {
    noti_num: 7,
    title: "[종료] 3월 3주차 LUCKY DRAW",
    date: "2022-11-25",
    content: "ddd",
  },
  {
    noti_num: 8,
    title: "[종료] 3월 3주차 LUCKY DRAW",
    date: "2022-11-25",
    content: "ddd",
  },
  {
    noti_num: 9,
    title: "[종료] 3월 3주차 LUCKY DRAW",
    date: "2022-11-25",
    content: "ddd",
  },
  {
    noti_num: 10,
    title: "[종료] 3월 3주차 LUCKY DRAW",
    date: "2022-11-25",
    content: "ddd",
  },
  {
    noti_num: 11,
    title: "[종료] 3월 3주차 LUCKY DRAW",
    date: "2022-11-25",
    content: "ddd",
  },
  {
    noti_num: 12,
    title: "[종료] 3월 3주차 LUCKY DRAW",
    date: "2022-11-05",
    content: "ddd",
  },
];
const getPostByNo = (noti_num) => {
  const array = noticeList.filter((x) => x.noti_num === noti_num);
  if (array.length === 1) {
    return array[0];
  }
  return null;
};

export { noticeList, getPostByNo };
