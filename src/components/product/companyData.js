// 전체 데이터
const companyList = [
  {
    com_num: "1",
    com_name: "삼성",
    com_phone: "010-1234-5678",
  },
  {
    com_num: "2",
    com_name: "LG",
    com_phone: "010-1234-5678",
  },
  {
    com_num: "3",
    com_name: "현대",
    com_phone: "010-1234-5678",
  },
  {
    com_num: "4",
    com_name: "하이마트",
    com_phone: "010-1234-5678",
  },
  {
    com_num: "5",
    com_name: "이마트",
    com_phone: "010-1234-5678",
  },
  {
    com_num: "6",
    com_name: "다이슨",
    com_phone: "010-1234-5678",
  },
  {
    com_num: "7",
    com_name: "샤오미",
    com_phone: "010-1234-5678",
  },
];
const getCom_num = (com_num) => {
  const array = companyList.filter((x) => x.com_num === com_num);
  if (array.length === 1) {
    return array[0];
  }
  return null;
};

export { companyList, getCom_num };
