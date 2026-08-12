import styled from "styled-components";

import infoIcon from "../../assets/images/icons/info_icon.svg";

const NoteRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
`;

const NoteIcon = styled.img`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
`;

const NoteText = styled.p`
  margin: 0;
  color: #727272;
  font-size: 10px;
  font-weight: 300;
  line-height: 18px;
`;

export default function InfoNote({ children }) {
  return (
    <NoteRow>
      <NoteIcon src={infoIcon} alt="" />
      <NoteText>{children}</NoteText>
    </NoteRow>
  );
}
