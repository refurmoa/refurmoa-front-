// 판매 상세 페이지 - 상세정보

function PostProdDetail(props) {
    return (
        <div className="detailInfoCon">
            {/* 경매 안내 내용 */}
            <div className="PD-auction_info">

            </div>

            {/* 상세 이미지 */}
            <div className="PD-detail_image_wrap">
                <img className="PD-detail_image" alt="상품 상세 이미지" src={`/images/${props.detail_image}`}></img>
            </div>
        </div>
    );
}
export default PostProdDetail;