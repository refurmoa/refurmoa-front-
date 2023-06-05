// 판매 상세 페이지 - 상세정보

function PostProdDetail(props) {
    return (
        <div className="detailInfoCon">
            {/* 경매 안내 내용 */}
            <div className="PD-auction_info">
            입찰가 -자동입찰에 대한내용
“자동입찰”은 입찰 한도액을 미리 설정해 자동으로 입찰이 진행되는 입찰 방식으로 상대 입찰자가 없으면 한도액 내 최소금액으로 낙찰됩니다.

입찰가 
화살표를 클릭하여 원하시는 금액까지 미리 응찰금액을 설정(자동응찰)할 수 있습니다.

            </div>

            {/* 상세 이미지 */}
            <div className="PD-detail_image_wrap">
                <img className="PD-detail_image" alt="상품 상세 이미지" src={`/images/${props.detail_image}`}></img>
            </div>
        </div>
    );
}
export default PostProdDetail;