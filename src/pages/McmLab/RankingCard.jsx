import styled from "styled-components";
import heartIcon from "../../assets/images/icons/heart_icon.svg";
import heartFilledIcon from "../../assets/images/icons/heartFilled_icon.svg";

const Card = styled.div`
  width: 100%;
`;

const Name = styled.p`
  margin: 0 0 8px;

  color: var(--gray-900, #141414);

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 10px;
  font-weight: 500;
  line-height: 18px;
`;

const ImageWrap = styled.div`
  position: relative;

  width: 173px;
  height: 200px;

  background: #f2f2f2;

  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LikesRow = styled.div`
  position: absolute;
  right: 9px;
  bottom: 9px;

  display: flex;
  align-items: center;
  gap: 8px;
`;

const LikesCount = styled.span`
  color: var(--gray-900, #141414);

  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
`;

const HeartButton = styled.button`
  width: 24px;
  height: 24px;

  appearance: none;
  -webkit-appearance: none;
  border: none;
  background: none;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const HeartIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

export default function RankingCard({ item, onToggleLike }) {
  return (
    <Card>
      <Name>{item.name}</Name>
      <ImageWrap>
        <ProductImage src={item.image} alt={item.name} />
        <LikesRow>
          <LikesCount>{item.likes}</LikesCount>
          <HeartButton type="button" onClick={() => onToggleLike(item.id)}>
            <HeartIcon
              src={item.isLiked ? heartFilledIcon : heartIcon}
              alt="좋아요"
            />
          </HeartButton>
        </LikesRow>
      </ImageWrap>
    </Card>
  );
}