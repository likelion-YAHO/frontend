import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import dummyTimeSlots from "../../data/dummyTimeSlots";
import LimitToast from "../toast/LimitToast";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// =========================
// 한 달의 달력 셀 생성
// =========================
const getMonthCells = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];

  // 이전 달 날짜
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({
      day: daysInPrevMonth - i,
      current: false,
    });
  }

  // 현재 달 날짜
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      day,
      current: true,
      weekday: (startWeekday + day - 1) % 7,
    });
  }

  // 다음 달 날짜
  let nextDay = 1;

  while (cells.length % 7 !== 0) {
    cells.push({
      day: nextDay,
      current: false,
    });

    nextDay++;
  }

  return cells;
};

// =========================
// 현재 월부터 4개월 생성
// =========================
const buildMonths = (baseYear, baseMonth, count = 4) => {
  const result = [];

  for (let offset = 0; offset < count; offset++) {
    const date = new Date(baseYear, baseMonth + offset, 1);

    result.push({
      year: date.getFullYear(),
      month: date.getMonth(),
      cells: getMonthCells(date.getFullYear(), date.getMonth()),
    });
  }

  return result;
};

const today = new Date();

const months = buildMonths(today.getFullYear(), today.getMonth(), 4);

// =========================
// initialDate 파싱
//
// "2026.8.20"
// "2026-08-20"
// "2026-08-20T13:00:00"
// 전부 대응
// =========================
const parseInitialDate = (initialDate) => {
  if (!initialDate) return null;

  const numbers = initialDate.match(/\d+/g);

  if (!numbers || numbers.length < 3) {
    return null;
  }

  const [year, month, day] = numbers.map(Number);

  return {
    year,
    month: month - 1,
    day,
  };
};

// =========================
// 과거 날짜 여부
// =========================
const isPastDate = (year, month, day) => {
  const targetDate = new Date(year, month, day);

  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  return targetDate < todayStart;
};

// =========================
// 오늘인지 확인
// =========================
const isToday = (year, month, day) => {
  return (
    year === today.getFullYear() &&
    month === today.getMonth() &&
    day === today.getDate()
  );
};

// =========================
// 시간 문자열 → 분 단위 변환
//
// "오후 13:00"
// "오후 1:00"
// "13:00"
// 전부 대응
// =========================
const getTimeMinutes = (time) => {
  if (!time) return null;

  const isAM = time.includes("오전");
  const isPM = time.includes("오후");

  const cleanTime = time.replace("오전", "").replace("오후", "").trim();

  const [hourText, minuteText] = cleanTime.split(":");

  let hour = Number(hourText);
  const minute = Number(minuteText);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return null;
  }

  // 오후 1:00 같은 12시간제 표현 대응
  if (isPM && hour < 12) {
    hour += 12;
  }

  // 오전 12:00 → 00:00
  if (isAM && hour === 12) {
    hour = 0;
  }

  return hour * 60 + minute;
};

// =========================
// 선택된 날짜 기준 지난 시간인지 확인
// =========================
const isPastTime = (time, selectedDate) => {
  if (!selectedDate) {
    return false;
  }

  // 오늘이 아니면 시간 제한 없음
  if (!isToday(selectedDate.year, selectedDate.month, selectedDate.day)) {
    return false;
  }

  const slotMinutes = getTimeMinutes(time);

  if (slotMinutes === null) {
    return false;
  }

  const now = new Date();

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  return slotMinutes <= currentMinutes;
};

// =========================
// CalendarModal
// =========================
const CalendarModal = ({
  isOpen,
  onClose,
  onSelectComplete,

  // create = 최초 예약
  // edit = 예약 변동
  mode = "create",

  // edit일 때 기존 예약 정보
  initialDate,
  initialTime,
}) => {
  if (!isOpen) return null;

  return (
    <CalendarModalContent
      onClose={onClose}
      onSelectComplete={onSelectComplete}
      mode={mode}
      initialDate={initialDate}
      initialTime={initialTime}
    />
  );
};

// =========================
// 실제 달력 내용
// =========================
const CalendarModalContent = ({
  onClose,
  onSelectComplete,
  mode,
  initialDate,
  initialTime,
}) => {
  const sliderRef = useRef(null);

  // =========================
  // 최초 선택값
  // =========================

  const [selectedDate, setSelectedDate] = useState(() => {
    if (mode === "edit") {
      return parseInitialDate(initialDate);
    }

    return null;
  });

  const [selectedTime, setSelectedTime] = useState(() => {
    if (mode === "edit") {
      return initialTime || null;
    }

    return null;
  });

  const [toastMessage, setToastMessage] = useState("");

  const [isToastVisible, setIsToastVisible] = useState(false);

  // =========================
  // 예약 변경 시
  // 기존 예약 날짜가 있는 달로 이동
  // =========================
  useEffect(() => {
    if (mode !== "edit") return;

    const parsedDate = parseInitialDate(initialDate);

    if (!parsedDate) return;

    const targetIndex = months.findIndex(
      (month) =>
        month.year === parsedDate.year && month.month === parsedDate.month,
    );

    if (targetIndex === -1 || !sliderRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      sliderRef.current.scrollLeft =
        sliderRef.current.clientWidth * targetIndex;
    });
  }, [mode, initialDate]);

  // =========================
  // 좌우 월 이동
  // =========================
  const scrollByMonth = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: sliderRef.current.clientWidth * direction,

      behavior: "smooth",
    });
  };

  // =========================
  // 날짜 선택
  // =========================
  const handleDayClick = (year, month, day) => {
    // 과거 날짜 선택 불가
    if (isPastDate(year, month, day)) {
      return;
    }

    const nextDate = {
      year,
      month,
      day,
    };

    setSelectedDate(nextDate);

    /*
     * 기존에 선택했던 시간이
     * 새 날짜 기준 이미 지난 시간이면 해제
     */
    if (selectedTime && isPastTime(selectedTime, nextDate)) {
      setSelectedTime(null);
    }
  };

  // =========================
  // 날짜 선택 여부
  // =========================
  const isSelected = (year, month, day) => {
    return (
      selectedDate &&
      selectedDate.year === year &&
      selectedDate.month === month &&
      selectedDate.day === day
    );
  };

  // =========================
  // 아래 결과 표시
  // =========================
  const formattedResult =
    selectedDate && selectedTime
      ? `${selectedDate.year}.${selectedDate.month + 1}.${selectedDate.day} - ${selectedTime}`
      : "";

  // =========================
  // 선택 완료
  // =========================
  const handleComplete = () => {
    if (!selectedDate) {
      setToastMessage("날짜를 선택해주세요");

      setIsToastVisible(true);

      return;
    }

    if (!selectedTime) {
      setToastMessage("시간을 선택해주세요");

      setIsToastVisible(true);

      return;
    }

    const dateLabel = `${selectedDate.year}.${selectedDate.month + 1}.${selectedDate.day}`;

    onSelectComplete({
      date: dateLabel,
      time: selectedTime,
    });

    onClose();
  };

  return (
    <>
      <Overlay onClick={onClose}>
        <ModalCard onClick={(e) => e.stopPropagation()}>
          <Title>{mode === "edit" ? "예약 변동" : "예약하기"}</Title>

          {/* 요일 */}
          <WeekdayRow>
            {WEEKDAYS.map((weekday, index) => (
              <WeekdayCell
                key={weekday}
                $isSun={index === 0}
                $isSat={index === 6}
              >
                {weekday}
              </WeekdayCell>
            ))}
          </WeekdayRow>

          {/* 달력 */}
          <SliderWrapper>
            <Slider ref={sliderRef}>
              {months.map((month) => (
                <MonthGrid key={`${month.year}-${month.month}`}>
                  {month.cells.map((cell, index) => {
                    const disabled =
                      !cell.current ||
                      isPastDate(month.year, month.month, cell.day);

                    return (
                      <DayCell
                        key={index}
                        type="button"
                        disabled={disabled}
                        $current={cell.current}
                        $disabled={disabled}
                        $isSun={cell.current && cell.weekday === 0}
                        $isSat={cell.current && cell.weekday === 6}
                        $selected={
                          cell.current &&
                          isSelected(month.year, month.month, cell.day)
                        }
                        onClick={() => {
                          if (disabled) {
                            return;
                          }

                          handleDayClick(month.year, month.month, cell.day);
                        }}
                      >
                        {cell.day}
                      </DayCell>
                    );
                  })}
                </MonthGrid>
              ))}
            </Slider>

            <ArrowButton
              type="button"
              $direction="left"
              onClick={() => scrollByMonth(-1)}
            >
              ‹
            </ArrowButton>

            <ArrowButton
              type="button"
              $direction="right"
              onClick={() => scrollByMonth(1)}
            >
              ›
            </ArrowButton>
          </SliderWrapper>

          {/* 시간 선택 */}
          <TimeSlotRow>
            {dummyTimeSlots.map((time) => {
              const disabled = isPastTime(time, selectedDate);

              return (
                <TimeSlot
                  key={time}
                  type="button"
                  disabled={disabled}
                  $disabled={disabled}
                  $selected={selectedTime === time}
                  onClick={() => {
                    if (disabled) {
                      return;
                    }

                    setSelectedTime(time);
                  }}
                >
                  {time}
                </TimeSlot>
              );
            })}
          </TimeSlotRow>

          {/* 선택 결과 */}
          <ResultBar>{formattedResult || "-"}</ResultBar>

          {/* 완료 */}
          <CompleteButton onClick={handleComplete}>
            {mode === "edit" ? "변경 완료" : "예약 완료"}
          </CompleteButton>
        </ModalCard>
      </Overlay>

      <ToastLayer>
        <LimitToast
          visible={isToastVisible}
          message={toastMessage}
          onHide={() => setIsToastVisible(false)}
        />
      </ToastLayer>
    </>
  );
};

export default CalendarModal;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  padding-top: 109px;
  box-sizing: border-box;

  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const ModalCard = styled.div`
  width: 350px;
  max-height: 80vh;

  display: flex;
  flex-direction: column;

  padding: 24px 20px;
  box-sizing: border-box;

  background: var(--gray-50, #fafafa);
  border-radius: 6px;

  overflow-y: auto;
`;

const Title = styled.h2`
  color: var(--gray-900, #141414);
  font-size: 18px;
  font-family: Pretendard Variable;
  font-weight: 700;
  line-height: 26px;

  margin-bottom: 16px;
`;

const WeekdayRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WeekdayCell = styled.div`
  width: 36px;
  text-align: center;

  color: ${({ $isSun, $isSat }) =>
    $isSun ? "#FF0000" : $isSat ? "#0095FF" : "#141414"};
  font-size: 16px;
  font-family: Pretendard Variable;
  font-weight: 400;
  line-height: 24px;
`;

const SliderWrapper = styled.div`
  position: relative;
  margin-top: 6px;
`;

const Slider = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MonthGrid = styled.div`
  min-width: 100%;
  flex-shrink: 0;
  scroll-snap-align: start;

  display: grid;
  grid-template-columns: repeat(7, 36px);
  justify-content: space-between;
  row-gap: 10px;
`;

const DayCell = styled.button`
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ $selected }) => ($selected ? "#141414" : "transparent")};
  border: none;
  border-radius: 4px;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  color: ${({ $current, $selected, $disabled, $isSun, $isSat }) => {
    if ($selected) return "#FAFAFA";
    if (!$current || $disabled) {
      return "#D0D0D0";
    }
    if ($isSun) return "#FF0000";
    if ($isSat) return "#0095FF";
    return "#141414";
  }};
  font-size: 16px;
  font-family: Pretendard Variable;
  font-weight: 400;
  line-height: 24px;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ $direction }) =>
    $direction === "left" ? "left: -20px;" : "right: -20px;"}
  transform: translateY(-50%);

  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  color: #141414;
  border: none;

  font-size: 20px;
  line-height: 1;
  cursor: pointer;
`;

const TimeSlotRow = styled.div`
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  margin-top: 16px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TimeSlot = styled.button`
  flex-shrink: 0;
  scroll-snap-align: start;

  padding: 5px 8px;

  background: ${({ $selected }) => ($selected ? "#141414" : "#ffffff")};
  outline: 1px solid var(--gray-300, #e3e3e3);
  outline-offset: -1px;
  border: none;
  border-radius: 2px;

  color: ${({ $selected, $disabled }) => {
    if ($selected) return "#FAFAFA";
    if ($disabled) return "#D0D0D0";
    return "#141414";
  }};

  font-size: 10px;
  font-family: Pretendard Variable;
  font-weight: 500;
  line-height: 18px;

  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

const ResultBar = styled.div`
  margin-top: 16px;
  padding: 5px 10px;

  background: #ffffff;
  outline: 1px solid var(--gray-300, #e3e3e3);
  outline-offset: -1px;
  border-radius: 2px;

  color: var(--gray-700, #727272);
  font-size: 14px;
  font-family: Pretendard Variable;
  font-weight: 400;
  line-height: 22px;
`;

const CompleteButton = styled.button`
  width: 100%;

  margin-top: 36px;
  padding: 10px 0;

  background: var(--gray-900, #141414);
  border: none;
  border-radius: 8px;
  box-shadow: none;
  appearance: none;

  color: var(--gray-50, #fafafa);
  font-size: 14px;
  font-family: Pretendard Variable;
  font-weight: 600;
  line-height: 22px;

  cursor: pointer;
`;

const ToastLayer = styled.div`
  position: relative;
  z-index: 2000;
`;
