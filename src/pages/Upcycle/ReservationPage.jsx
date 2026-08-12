import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import SubHeader from "../../common/header/SubHeader";
import IntentButton from "../../components/button/IntentButton";
import IconInputBox from "../../components/iconInputBox/IconInputBox";
import PriceSummaryTable from "../../components/priceSummaryTable/PriceSummaryTable";
import InfoNote from "../../components/infoNote/InfoNote";
import StoreSearchModal from "../../components/storeSearchModal/StoreSearchModal";
import CalendarModal from "../../components/calendarModal/CalendarModal";
import LimitToast from "../../components/toast/LimitToast";
import ReservationCompleteModal from "../../components/reservationCompleteModal/ReservationCompleteModal";

import dummyReservationSummary from "../../data/dummyReservationSummary";

import searchIcon from "../../assets/images/icons/search_icon.svg";
import calendarIcon from "../../assets/images/icons/calendar_icon.svg";

const Screen = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background: #f2f2f2;
`;

const Page = styled.div`
  position: relative;

  width: 100%;
  max-width: 390px;
  min-height: 100vh;
  padding: 68px 18px 0;
  box-sizing: border-box;
  background: #ffffff;

  display: flex;
  flex-direction: column;
`;

const ContentArea = styled.div`
  flex: 1;
`;

const Section = styled.section`
  margin-top: ${({ $marginTop }) => $marginTop || "0"};
`;

const SectionLabel = styled.p`
  margin: 0 0 6px;
  color: #141414;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
`;

const SummaryTitle = styled.h2`
  margin: 0;
  color: #141414;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
`;

const NoteArea = styled.div`
  margin-top: 12px;
`;

const SubmitButtonArea = styled.div`
  margin: 114px -18px 0;
  padding: 10px 10px 72px;
  box-sizing: border-box;

  background: #ffffff;

  display: flex;
  justify-content: center;
`;

export default function ReservationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const summary = location.state?.summary ?? dummyReservationSummary;

  const [store, setStore] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleReserve = () => {
  if (!store) {
    setToastMessage("매장을 선택해주세요");
    setIsToastVisible(true);
    return;
  }
  if (!date) {
    setToastMessage("날짜를 선택해주세요");
    setIsToastVisible(true);
    return;
  }
  if (!time) {
    setToastMessage("예약 시간을 선택해주세요");
    setIsToastVisible(true);
    return;
  }
  // TODO: 예약 확정 API 연동 (추후 이슈)
  setIsCompleteModalOpen(true);
  };

  return (
    <Screen>
      <Page>
        <SubHeader title="수선 예약하기" onBack={() => navigate(-1)} />

        <ContentArea>
          <Section>
            <SectionLabel>매장</SectionLabel>
            <IconInputBox
              icon={searchIcon}
              placeholder="가까운 매장 찾기"
              value={store}
              onClick={() => setIsStoreModalOpen(true)}
            />
          </Section>

          <Section $marginTop="60px">
            <SectionLabel>날짜</SectionLabel>
            <IconInputBox
              icon={calendarIcon}
              placeholder="-"
              value={date && time ? `${date} - ${time}` : ""}
              width="241px"
              height="38px"
              gap="10px"
              padding="10px 12px"
              onClick={() => setIsCalendarModalOpen(true)}
            />
          </Section>

          <Section $marginTop="60px">
            <SummaryTitle>예상 결제 금액</SummaryTitle>

            <PriceSummaryTable items={summary.items} total={summary.total} />

            <NoteArea>
              <InfoNote>
                본사 실물 검수 후 손상 정도에 따라 추가 비용이 발생할 수
                있습니다.
              </InfoNote>
            </NoteArea>
          </Section>
        </ContentArea>

        <SubmitButtonArea>
          <IntentButton
            variant="black"
            width="350px"
            height="44px"
            onClick={handleReserve}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onTouchStart={() => setIsButtonHovered(true)}
            onTouchEnd={() => setIsButtonHovered(false)}
          >
            {isButtonHovered ? "선택 완료" : "예약하기"}
          </IntentButton>
        </SubmitButtonArea>

        <StoreSearchModal
          isOpen={isStoreModalOpen}
          onClose={() => setIsStoreModalOpen(false)}
          onSelectComplete={(selectedStore) => {
            if (selectedStore) {
              setStore(selectedStore.name);
            }
            setIsStoreModalOpen(false);
          }}
        />

        <CalendarModal
          isOpen={isCalendarModalOpen}
          onClose={() => setIsCalendarModalOpen(false)}
          onSelectComplete={({ date: selectedDate, time: selectedTime }) => {
            setDate(selectedDate);
            setTime(selectedTime);
          }}
        />

        <ReservationCompleteModal
          isOpen={isCompleteModalOpen}
          onConfirm={() => navigate("/orders")}
          onAutoRedirect={() => navigate("/main")}
        />
      </Page>

      <LimitToast
        visible={isToastVisible}
        message={toastMessage}
        onHide={() => setIsToastVisible(false)}
      />
    </Screen>
  );
}