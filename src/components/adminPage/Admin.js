// 관리자 페이지 - 메인
import { MyResponsivePie } from "./piechart.js";
import  data  from "./data.json"

const Admin = () => {
    return (
        <MyResponsivePie data={data} />
    );
};

export default Admin;