const dummyOrders = [
  {
    id: 1,

    orderNumber: "UPC-7K4D-92LM",

    productName: "Aren 비세토스 닥스훈트 참",
    store: "MCM 롯데면세점 명동본점",

    status: "inProgress",

    reservationStatus: "방문 예약",
    reservationDate: "2026. 08. 18",
    reservationTime: "14:00",

    expectedArrivalDate: "2026. 09. 24",

    receivedDate: null,

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

    status: "completed",

    reservationStatus: "방문 예약",
    reservationDate: "2026. 07. 10",
    reservationTime: "16:30",

    expectedArrivalDate: "2026. 08. 25",

    receivedDate: "2026.09.25",

    steps: [
      {
        id: 1,
        label: "방문 예약",
        completed: true,
        completedTime: "2026. 07. 10 16:30",
      },
      {
        id: 2,
        label: "접수 완료",
        completed: true,
        completedTime: "2026. 07. 10 16:48",
      },
      {
        id: 3,
        label: "본사 도착",
        completed: true,
        completedTime: "2026. 07. 12 10:15",
      },
      {
        id: 4,
        label: "제품 검수",
        completed: true,
        completedTime: "2026. 07. 13 13:20",
      },
      {
        id: 5,
        label: "제작 진행",
        completed: true,
        completedTime: "2026. 07. 15 09:30",
      },
      {
        id: 6,
        label: "제작 완료",
        completed: true,
        completedTime: "2026. 08. 10 11:20",
      },
      {
        id: 7,
        label: "배송 중",
        completed: true,
        completedTime: "2026. 08. 20 15:10",
      },
      {
        id: 8,
        label: "매장 도착",
        completed: true,
        completedTime: "2026. 08. 25 10:40",
      },
    ],
  },

  {
    id: 3,

    orderNumber: "UPC-A1BC-D2EF",

    productName: "MCM 비세토스 참",
    store: "MCM 신세계백화점 강남점",

    status: "completed",

    reservationStatus: "방문 예약",
    reservationDate: "2026. 06. 05",
    reservationTime: "13:00",

    expectedArrivalDate: "2026. 07. 18",

    receivedDate: "2026.07.20",

    steps: [
      {
        id: 1,
        label: "방문 예약",
        completed: true,
        completedTime: "2026. 06. 05 13:00",
      },
      {
        id: 2,
        label: "접수 완료",
        completed: true,
        completedTime: "2026. 06. 05 13:35",
      },
      {
        id: 3,
        label: "본사 도착",
        completed: true,
        completedTime: "2026. 06. 07 09:40",
      },
      {
        id: 4,
        label: "제품 검수",
        completed: true,
        completedTime: "2026. 06. 08 14:15",
      },
      {
        id: 5,
        label: "제작 진행",
        completed: true,
        completedTime: "2026. 06. 10 10:20",
      },
      {
        id: 6,
        label: "제작 완료",
        completed: true,
        completedTime: "2026. 07. 10 16:10",
      },
      {
        id: 7,
        label: "배송 중",
        completed: true,
        completedTime: "2026. 07. 15 11:40",
      },
      {
        id: 8,
        label: "매장 도착",
        completed: true,
        completedTime: "2026. 07. 18 12:20",
      },
    ],
  },
];

export default dummyOrders;
