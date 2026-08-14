import styled from "styled-components";

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: var(--gray-700, #727272);
  font-family: "Pretendard Variable", Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

export default function LabEditionPage() {
  return <Placeholder>Lab Edition 준비 중입니다.</Placeholder>;
}
