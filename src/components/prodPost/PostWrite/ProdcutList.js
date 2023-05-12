// 전체 데이터
const productList = [
  {
    product_code: "1",
    com_num: "6",
    category_code: "SF",
    category: "funliving",
    main_image: "",
    prod_com: "삼성",
    prod_name: "쇼파",
    prod_grade: "B",
    guarantee: false,
    org_price: "102000",
    Deffect_text: "모서리 스크래치",
  },
  {
    product_code: "2",
    com_num: "4",
    category_code: "AF",
    category: "applife",
    main_image: "",
    prod_com: "삼성",
    prod_name: "TV",
    prod_grade: "S",
    guarantee: true,
    org_price: "92000",
    Deffect_text: "모서리 스크래치",
  },
  {
    product_code: "3",
    com_num: "6",
    category_code: "RF",
    category: "appkitchen",
    main_image: "",
    prod_com: "LG",
    prod_name: "냉장고",
    prod_grade: "A",
    guarantee: false,
    org_price: "1000000",
    Deffect_text: "모서리 스크래치",
  },
  {
    product_code: "12",
    com_num: "6",
    category_code: "CH",
    category: "funoffice",
    main_image: "",
    prod_com: "시디즈",
    prod_name: "의자",
    prod_grade: "A",
    guarantee: true,
    org_price: "180000",
    Deffect_text: "모서리 스크래치",
  },
  {
    product_code: "1",
    com_num: "6",
    category_code: "SF",
    category: "funbed",
    main_image: "",
    prod_com: "에이스",
    prod_name: "침대",
    prod_grade: "S",
    guarantee: false,
    org_price: "3000000",
    Deffect_text: "모서리 스크래치",
  },
  {
    product_code: "1",
    com_num: "6",
    category_code: "SF",
    category: "funliving",
    main_image: "",
    prod_com: "삼성",
    prod_name: "쇼파",
    prod_grade: "B",
    guarantee: false,
    org_price: "102000",
    Deffect_text: "모서리 스크래치",
  },
  {
    product_code: "2",
    com_num: "4",
    category_code: "AF",
    category: "applife",
    main_image: "",
    prod_com: "삼성",
    prod_name: "TV",
    prod_grade: "S",
    guarantee: true,
    org_price: "92000",
    Deffect_text: "모서리 스크래치",
  },
  {
    product_code: "3",
    com_num: "6",
    category_code: "RF",
    category: "appkitchen",
    main_image: "",
    prod_com: "LG",
    prod_name: "냉장고",
    prod_grade: "A",
    guarantee: false,
    org_price: "1000000",
    Deffect_text: "모서리 스크래치",
  },
  {
    product_code: "12",
    com_num: "6",
    category_code: "CH",
    category: "funoffice",
    main_image: "",
    prod_com: "시디즈",
    prod_name: "의자",
    prod_grade: "A",
    guarantee: true,
    org_price: "180000",
    Deffect_text: "모서리 스크래치",
  },
  {
    product_code: "1",
    com_num: "6",
    category_code: "SF",
    category: "funbed",
    main_image: "",
    prod_com: "에이스",
    prod_name: "침대",
    prod_grade: "S",
    guarantee: false,
    org_price: "3000000",
    Deffect_text: "모서리 스크래치",
  },
  {
    product_code: "12",
    com_num: "6",
    category_code: "CH",
    category: "funoffice",
    main_image: "",
    prod_com: "시디즈",
    prod_name: "의자",
    prod_grade: "A",
    guarantee: true,
    org_price: "180000",
    Deffect_text: "모서리 스크래치",
  },
  {
    product_code: "1",
    com_num: "6",
    category_code: "SF",
    category: "funbed",
    main_image: "",
    prod_com: "에이스",
    prod_name: "침대",
    prod_grade: "S",
    guarantee: false,
    org_price: "3000000",
    Deffect_text: "모서리 스크래치",
  },
];
const getPostByNo = (product_code) => {
  const array = productList.filter((x) => x.product_code === product_code);
  if (array.length === 1) {
    return array[0];
  }
  return null;
};

export { productList, getPostByNo };
