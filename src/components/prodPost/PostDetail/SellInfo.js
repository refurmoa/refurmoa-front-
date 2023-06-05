// 판매 상세 페이지 - 결제 및 배송, 교환환불
import "./SellInfo.css";
function SellInfo(props) {
    const detailInfo= props.detailInfo;
    return (
        props.detail_info===3?
        (<div className="detailInfoCon">
            <div className="Sell_detail_title">1. 결제 </div>
            <div className="Sell_detail_content">
            <ul>
                <li className="Sell_small_title">결제 가능 수단 : 카드 / 계좌 이체 / 휴대폰 결제 </li>
                <li className="Sell_small_title"> 결제 시한</li>
                <li>경매 상품: 낙찰 후 72시간 이내 결제</li>
                <li>바로구매 상품 : 즉시 결제</li>
                <li>경매와 상품에 따라 결제 수단 및 기한이 변경되거나 한정될 수 있으며 이 경우, 
                    경매 개별 약관 및 상품의 상세정보를 통해 안내 되고 그 내용은 기본 내용보다 우선 됩니다. 경매 개별 약관 또는 상세 정보를 확인해 주시기 바랍니다.</li>
            </ul>
            <div className="Sell_detail_title">2. 배송 정보</div>
            <div className="Sell_detail_content">
                <ul>
                    <li>배송은 판매 상품의 특성에 따라 다른 방식으로 진행됩니다. </li>
                    <li>설치 서비스를 제공하는 가전/가구제품의 경우에는 서로 방문일정을 조율하며, 
                        택배로 배송되는 상품은 결제 후 배송까지 약 3~7일 정도 소요됩니다. </li>
                    <li>설치 서비스에 대해서는 비용이 추가로 부과될 수도 있습니다.</li>
                </ul>
            </div>
            </div>

        </div>):(<div className="detailInfoCon">
            <div className="Sell_detail_content">
                <ul>
                    <li className="Sell_small_title">교환 및 반품 주소</li>
                    <li>서울특별시 강남구 언주로 508 14층(역삼동, 서울상록빌딩) (주)리퍼모아</li>
                    <li className="Sell_small_title"> 교환 및 반품이 가능한 경우</li>
                    <li>즉시 구매 상품에 한하여 공급 받으신 날로부터 7일이내 단, 가전제품의 경우 포장을 개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우에는 교환/반품이 불가능합니다.</li>
                    <li>공급받으신 상품 및 용역의 내용이 표시.광고 내용과 다르거나 다르게 이행된 경우에는 공급받은 날로부터 3일이내, 그사실을 알게 된 날로부터 30일이내</li>
                    <li className="Sell_small_title">교환 및 반품이 불가능한 경우</li>
                    <li className="Sell_small_title">[경매 상품]</li>
                    <li>경매 상품의 경우, 경매 상품의 특성 상 경매에서 회원님께서 낙찰이 되셨다면 낙찰 취소는 불가합니다.</li>
                    <li>다만, 잘못된 상품 정보로 인한 낙찰 취소일 경우 판매자에게 1:1 문의하기를 통해 취소를 요청해 주시면 판매자와의 소통을 통해 환불 및 반품 절차가 진행됩니다.</li>
                    <li>단순 변심으로 인한 낙찰 취소의 경우, 위약금 부과 및 추후 리퍼모아 경매 응찰 불가 등의 페널티가 발생할 수 있습니다.</li>
                    <li className="Sell_small_title">[즉시 구매 상품]</li>
                    <li>고객님의 책임 있는 사유로 상품등이 멸실 또는 훼손된 경우. 단, 상품의 내용을 확인하기 위하여 포장 등을 훼손한 경우는 제외</li>
                    <li>고객님의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우</li>
                    <li>시간의 경과에 의하여 재판매가 곤란할 정도로 상품등의 가치가 현저히 감소한 경우</li>
                    <li className="Sell_small_title">※ 고객님의 마음이 바뀌어 교환, 반품을 하실 경우 상품반송 비용은 고객님께서 부담하셔야 합니다.</li>
                </ul>
            </div>
        </div>)
        
    );
}
export default SellInfo;