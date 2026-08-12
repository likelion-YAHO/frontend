const dummyOrders = [
  {
    id: 1,

    orderNumber: "UPC-7K4D-92LM",

    productName: "Aren 비세토스 닥스훈트 참",

    store: "MCM 롯데면세점 명동본점",

    reservationStatus: "방문 예약",

    reservationDate: "2026. 08. 18",

    reservationTime: "14:00",

    expectedArrivalDate: "2026. 09. 24",

    barcodeValue: "UPC7K4D92LM20260818",

    steps: [
      {
        id: 1,
        label: "방문 예약",
        completed: true,
        completedTime: "2026. 08. 18 14:00",
      },
      {
        id: 2,
        label: "접수 완료",
        completed: true,
        completedTime: "2026. 08. 18 14:32",
      },
      {
        id: 3,
        label: "본사 도착",
        completed: true,
        completedTime: "2026. 08. 20 10:15",
      },
      {
        id: 4,
        label: "제품 검수",
        completed: true,
        completedTime: "2026. 08. 21 16:40",
      },
      {
        id: 5,
        label: "제작 진행",
        completed: true,
        completedTime: "2026. 08. 22 13:05",
      },
      {
        id: 6,
        label: "제작 완료",
        completed: false,
        completedTime: null,
      },
      {
        id: 7,
        label: "배송 중",
        completed: false,
        completedTime: null,
      },
      {
        id: 8,
        label: "매장 도착",
        completed: false,
        completedTime: null,
      },
    ],
  },

  {
    id: 2,

    orderNumber: "UPC-8P2M-11AA",

    productName: "MCM 비세토스 키링",

    store: "MCM 롯데백화점 본점",

    reservationStatus: "방문 예약",

    reservationDate: "2026. 08. 25",

    reservationTime: "16:30",

    expectedArrivalDate: "2026. 10. 02",

    barcodeValue: "UPC8P2M11AA20260825",

    steps: [
      {
        id: 1,
        label: "방문 예약",
        completed: true,
        completedTime: "2026. 08. 25 16:32",
      },
      {
        id: 2,
        label: "접수 완료",
        completed: true,
        completedTime: "2026. 08. 25 16:48",
      },
      {
        id: 3,
        label: "본사 도착",
        completed: true,
        completedTime: "2026. 08. 25 16:48",
      },
      {
        id: 4,
        label: "제품 검수",
        completed: false,
        completedTime: null,
      },
      {
        id: 5,
        label: "제작 진행",
        completed: false,
        completedTime: null,
      },
      {
        id: 6,
        label: "제작 완료",
        completed: false,
        completedTime: null,
      },
      {
        id: 7,
        label: "배송 중",
        completed: false,
        completedTime: null,
      },
      {
        id: 8,
        label: "매장 도착",
        completed: false,
        completedTime: null,
      },
    ],
  },
];

export default dummyOrders;
