import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import dummyTimeSlots from "../../data/dummyTimeSlots";
import LimitToast from "../toast/LimitToast";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getMonthCells = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];

  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({
      day: daysInPrevMonth - i,
      current: false,
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      current: true,
      weekday: (startWeekday + d - 1) % 7,
    });
  }
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

const buildMonths = (baseYear, baseMonth, range) => {
  const months = [];
  for (let offset = -range; offset <= range; offset++) {
    const date = new Date(baseYear, baseMonth + offset, 1);
    months.push({
      year: date.getFullYear(),
      month: date.getMonth(),

      cells: getMonthCells(date.getFullYear(), date.getMonth()),
    });
  }

  return months;
};

const today = new Date();

const months = buildMonths(today.getFullYear(), today.getMonth(), 2);

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

const CalendarModalContent = ({
  onClose,
  onSelectComplete,
  mode,
  initialDate,
  initialTime,
}) => {
  const sliderRef = useRef(null);

  // 모달을 처음 열었을 때 보여줄 월
  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    let targetDate = today;

    // 예약 변동이면 기존 예약 날짜가 있는 달부터 보여준다.
    if (mode === "edit") {
      const parsedDate = parseInitialDate(initialDate);

      if (parsedDate) {
        targetDate = new Date(
          parsedDate.year,
          parsedDate.month,
          parsedDate.day,
        );
      }
    }

    // months 배열에서 보여줄 월의 위치 찾기
    const targetIndex = months.findIndex(
      (month) =>
        month.year === targetDate.getFullYear() &&
        month.month === targetDate.getMonth(),
    );

    if (targetIndex === -1) return;

    // 각 MonthGrid가 Slider 너비의 100%이므로
    // 해당 월의 index만큼 이동
    slider.scrollLeft = slider.clientWidth * targetIndex;
  }, [mode, initialDate]);

  /*
   * 신규 예약(create)
   * → 아무 날짜도 선택되지 않은 상태
   *
   * 예약 변동(edit)
   * → 기존 예약 날짜가 선택된 상태
   */
  const [selectedDate, setSelectedDate] = useState(() => {
    if (mode === "edit") {
      return parseInitialDate(initialDate);
    }

    return null;
  });

  /*
   * 신규 예약
   * → 시간 선택 X
   *
   * 예약 변동
   * → 기존 예약 시간 선택
   */
  const [selectedTime, setSelectedTime] = useState(() => {
    if (mode === "edit") {
      return initialTime || null;
    }

    return null;
  });

  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);

  const scrollByMonth = (direction) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: sliderRef.current.clientWidth * direction,
      behavior: "smooth",
    });
  };

  const handleDayClick = (year, month, day) => {
    setSelectedDate({
      year,
      month,
      day,
    });
  };

  const isSelected = (year, month, day) => {
    return (
      selectedDate &&
      selectedDate.year === year &&
      selectedDate.month === month &&
      selectedDate.day === day
    );
  };

  const formattedResult =
    selectedDate && selectedTime
      ? `${selectedDate.year}.${selectedDate.month + 1}.${selectedDate.day} - ${selectedTime}`
      : "";

  const handleComplete = () => {
    // 날짜 미선택
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

          <WeekdayRow>
            {WEEKDAYS.map((w, i) => (
              <WeekdayCell key={w} $isSun={i === 0} $isSat={i === 6}>
                {w}
              </WeekdayCell>
            ))}
          </WeekdayRow>

          <SliderWrapper>
            <Slider ref={sliderRef}>
              {months.map((m) => (
                <MonthGrid key={`${m.year}-${m.month}`}>
                  {m.cells.map((cell, i) => (
                    <DayCell
                      key={i}
                      $current={cell.current}
                      $isSun={cell.current && cell.weekday === 0}
                      $isSat={cell.current && cell.weekday === 6}
                      $selected={
                        cell.current && isSelected(m.year, m.month, cell.day)
                      }
                      onClick={() =>
                        cell.current &&
                        handleDayClick(m.year, m.month, cell.day)
                      }
                    >
                      {cell.day}
                    </DayCell>
                  ))}
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

          <TimeSlotRow>
            {dummyTimeSlots.map((time) => (
              <TimeSlot
                key={time}
                $selected={selectedTime === time}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </TimeSlot>
            ))}
          </TimeSlotRow>

          <ResultBar>{formattedResult || "-"}</ResultBar>

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
  cursor: ${({ $current }) => ($current ? "pointer" : "default")};

  color: ${({ $current, $selected, $isSun, $isSat }) => {
    if ($selected) return "#FAFAFA";
    if (!$current) return "#D0D0D0";
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

  color: ${({ $selected }) => ($selected ? "#FAFAFA" : "#141414")};
  font-size: 10px;
  font-family: Pretendard Variable;
  font-weight: 500;
  line-height: 18px;

  cursor: pointer;
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
