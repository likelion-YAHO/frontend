const dummyOrders = [
  {
    id: 1,

    orderNumber: "UPC-7K4D-92LM",

    productName: "Aren 비세토스 닥스훈트 참",
    store: "MCM 롯데면세점 명동본점",

    reservationStatus: "방문 예약",
    reservationDate: "2026. 8. 18",
    reservationTime: "14:00",

    arrivalDate: "2026. 9. 24",

    steps: [
      {
        id: 1,
        label: "접수 완료",
        completed: true,
        completedTime: "2026. 8. 18 14:32",
      },
      {
        id: 2,
        label: "본사 도착",
        completed: true,
        completedTime: "2026. 8. 20 10:15",
      },
      {
        id: 3,
        label: "제품 검수",
        completed: true,
        completedTime: "2026. 8. 21 16:40",
      },
      {
        id: 4,
        label: "제작 진행",
        completed: false,
        completedTime: null,
      },
      {
        id: 5,
        label: "제작 완료",
        completed: false,
        completedTime: null,
      },
      {
        id: 6,
        label: "배송 중",
        completed: false,
        completedTime: null,
      },
      {
        id: 7,
        label: "매장 도착",
        completed: false,
        completedTime: null,
      },
    ],
  },
];

export default dummyOrders;
