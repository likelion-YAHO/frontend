import { useCallback, useEffect, useState } from "react";
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

import { createReservation } from "../../api/reservation";

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

  // 이전 페이지에서 넘어온 예상 결제 정보
  const summary = location.state?.summary ?? dummyReservationSummary;

  // 이전 페이지에서 전달받은 실제 reformId
  const reformId = location.state?.reformId;

  // =========================
  // 예약 데이터
  // =========================

  // 매장 이름만 저장하지 않고 객체 전체 저장
  const [selectedStore, setSelectedStore] = useState(null);

  const [userLocation, setUserLocation] = useState(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // =========================
  // 모달 상태
  // =========================

  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  // =========================
  // 버튼 상태
  // =========================

  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================
  // 토스트
  // =========================

  const [toastMessage, setToastMessage] = useState("");

  const [isToastVisible, setIsToastVisible] = useState(false);

  // =========================
  // 사용자 현재 위치 조회
  // =========================

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        console.log("현재 위치:", latitude, longitude);

        setUserLocation({
          latitude,
          longitude,
        });
      },
      (error) => {
        console.error("위치 정보 조회 실패:", error);
      },
    );
  }, []);

  // =========================
  // 예약 생성
  // =========================

  const handleReserve = async () => {
    // 매장 검사
    if (!selectedStore) {
      setToastMessage("매장을 선택해주세요");
      setIsToastVisible(true);
      return;
    }

    // 날짜 검사
    if (!date) {
      setToastMessage("날짜를 선택해주세요");
      setIsToastVisible(true);
      return;
    }

    // 시간 검사
    if (!time) {
      setToastMessage("예약 시간을 선택해주세요");
      setIsToastVisible(true);
      return;
    }

    // reformId 검사
    if (!reformId) {
      console.error("reformId 없음:", location.state);

      setToastMessage("리폼 정보를 확인할 수 없습니다.");
      setIsToastVisible(true);
      return;
    }

    // =========================
    // storeId 추출
    // =========================

    const storeId = selectedStore.id ?? selectedStore.storeId;

    if (!storeId) {
      console.error("storeId 없음:", selectedStore);

      setToastMessage("매장 정보를 확인할 수 없습니다.");
      setIsToastVisible(true);
      return;
    }

    // =========================
    // 날짜 형식 변환
    // =========================

    /*
     * CalendarModal:
     * date = "2026.8.20"
     * time = "14:00"
     *
     * 예약 API:
     * "2026-08-20T14:00:00"
     */

    const [year, month, day] = date.split(".");

    const formattedDate = [
      year,
      month.padStart(2, "0"),
      day.padStart(2, "0"),
    ].join("-");

    // CalendarModal에서 "오후 13:00"처럼 넘어오는 문자열에서
    // 실제 시간 "13:00"만 추출
    const formattedTime = time.replace(/^(오전|오후)\s*/, "");

    const visitDate = `${formattedDate}T${formattedTime}:00`;

    // =========================
    // 최종 payload
    // =========================

    const payload = {
      reformId,
      storeId,
      visitDate,
    };

    // 백엔드에서 확인 요청한 3개 값
    console.log("================ 예약 생성 확인 ================");

    console.log("reformId:", reformId);

    console.log("storeId:", storeId);

    console.log("visitDate:", visitDate);

    console.log("예약 생성 payload:", payload);

    console.log("선택 매장 전체 객체:", selectedStore);

    console.log("================================================");

    // =========================
    // 실제 예약 API 호출
    // =========================

    try {
      setIsSubmitting(true);

      const reservation = await createReservation(payload);

      console.log("예약 생성 성공:", reservation);

      // 실제 API 성공했을 때만 완료 모달 표시
      setIsCompleteModalOpen(true);
    } catch (error) {
      console.error("예약 생성 실패:", error);

      console.error("예약 생성 실패 응답:", error.response?.data);

      setToastMessage(
        error.response?.data?.message ??
          "예약에 실패했습니다. 다시 시도해주세요.",
      );

      setIsToastVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================
  // 예약 완료 모달 이동
  // =========================

  const handleConfirmReservation = useCallback(() => {
    navigate("/orders");
  }, [navigate]);

  const handleAutoRedirect = useCallback(() => {
    navigate("/main");
  }, [navigate]);

  return (
    <Screen>
      <Page>
        <SubHeader title="수선 예약하기" onBack={() => navigate(-1)} />

        <ContentArea>
          {/* =========================
              매장 선택
          ========================= */}

          <Section>
            <SectionLabel>매장</SectionLabel>

            <IconInputBox
              icon={searchIcon}
              placeholder="가까운 매장 찾기"
              value={selectedStore?.name ?? selectedStore?.storeName ?? ""}
              onClick={() => setIsStoreModalOpen(true)}
            />
          </Section>

          {/* =========================
              날짜 선택
          ========================= */}

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

          {/* =========================
              예상 결제 금액
          ========================= */}

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

        {/* =========================
            예약 버튼
        ========================= */}

        <SubmitButtonArea>
          <IntentButton
            variant="black"
            width="350px"
            height="44px"
            disabled={isSubmitting}
            onClick={handleReserve}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onTouchStart={() => setIsButtonHovered(true)}
            onTouchEnd={() => setIsButtonHovered(false)}
          >
            {isSubmitting
              ? "예약 중..."
              : isButtonHovered
                ? "선택 완료"
                : "예약하기"}
          </IntentButton>
        </SubmitButtonArea>

        {/* =========================
            매장 선택 모달
        ========================= */}

        <StoreSearchModal
          isOpen={isStoreModalOpen}
          onClose={() => setIsStoreModalOpen(false)}
          mode="reservation"
          latitude={userLocation?.latitude}
          longitude={userLocation?.longitude}
          onSelectComplete={(store) => {
            if (store) {
              console.log("선택한 매장:", store);

              setSelectedStore(store);
            }

            setIsStoreModalOpen(false);
          }}
        />

        {/* =========================
            캘린더 모달
        ========================= */}

        <CalendarModal
          isOpen={isCalendarModalOpen}
          onClose={() => setIsCalendarModalOpen(false)}
          onSelectComplete={({ date: selectedDate, time: selectedTime }) => {
            setDate(selectedDate);
            setTime(selectedTime);
          }}
        />

        {/* =========================
            예약 완료 모달
        ========================= */}

        <ReservationCompleteModal
          isOpen={isCompleteModalOpen}
          onConfirm={handleConfirmReservation}
          onAutoRedirect={handleAutoRedirect}
        />
      </Page>

      {/* =========================
          토스트
      ========================= */}

      <LimitToast
        visible={isToastVisible}
        message={toastMessage}
        onHide={() => setIsToastVisible(false)}
      />
    </Screen>
  );
}
