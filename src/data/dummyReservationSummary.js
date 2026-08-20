// 추후 실제 예약/결제 API 응답으로 교체될 더미 데이터

const dummyReservationSummary = {
  items: [
    { id: "repair-fee", name: "수선비", quantity: 1, price: 150000 },
    { id: "charm", name: "MCM 메탈 스퀘어 참", quantity: 1, price: 270000 },
    {
      id: "scarf",
      name: "모노그램 쁘띠 프린트 스카프",
      quantity: 1,
      price: 175000,
    },
  ],
  total: 595000,
};

export default dummyReservationSummary;
