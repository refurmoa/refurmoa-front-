// 결제 - 판매 정보

import styled from "styled-components";
import delivery_icon from "../../images/delivery_icon-240.png";

function PayInfo(props) {
    return (
        <InfoWrap>
            <Info>
                <Image alt="상품 이미지" src={`/images/${props.prod.main_image}`}/>
                <NameWrap>
                    <ComName>{props.prod.prod_com}</ComName>
                    <Name>{props.prod.prod_name}</Name>
                </NameWrap>
                <PriceWrap>
                    <DeliPriceWrap>
                        <DeliIconWrap>
                            <DeliIcon alt="배송설치비" src={delivery_icon}/>
                        </DeliIconWrap>
                        {props.prod.delivery_price.toLocaleString('ko-KR')}
                    </DeliPriceWrap>
                    <Price>{props.prod.price.toLocaleString('ko-KR')}원</Price>
                </PriceWrap>
            </Info>
        </InfoWrap>
    );
};

export default PayInfo;


const InfoWrap = styled.div`
    width: 1200px;
    height: 250px;
    border-bottom: 3px solid rgba(185, 168, 154, 0.2);
`;

const Info = styled.div`
    width: 1100px;
    height: 150px;
    padding: 50px;
`;

const Image = styled.img`
    float: left;
    width: 150px;
    height: 150px;
    border-radius: 100px;
    object-fit: cover;
    object-position: center;
`;

const NameWrap = styled.span`
    float: left;
    width: 500px;
    margin: 40px 0 0 50px;
`;

const ComName = styled.span`
    height: 25px;
    font-size: 18px;
    line-height: 25px;
    color: #666666;
`;

const Name = styled.div`
    width: 500px;
    font-size: 25px;
    line-height: 35px;
`;

const PriceWrap = styled.span`
    float: right;
    margin-top: 65px;
`;

const DeliPriceWrap = styled.span`
    float: left;
    height: 35px;
    font-weight: 500;
    font-size: 20px;
    line-height: 35px;
    color: #777777;
    margin-right: 10px;
`;

const DeliIconWrap = styled.span`
    position: relative;
    float: left;
    width: 25px;
    height: 25px;
    margin-right: 5px;
`;

const DeliIcon = styled.img`
    position: absolute;
    left: 0;
    top: 5px;
    width: 25px;
    height: 25px;
    opacity: 0.4;
`;

const Price = styled.span`
    float: left;
    width: 160px;
    height: 35px;
    font-weight: bold;
    font-size: 25px;
    line-height: 35px;
    text-align: right;
    color: #514438;
`;