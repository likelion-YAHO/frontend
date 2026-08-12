import { useState } from "react";
import styled from "styled-components";

import OrderTab from "./OrderTab";
import ReservationListPage from "./ReservationListPage";
import OrderHistoryListPage from "./OrderHistoryListPage";

const Page = styled.div`
  width: 100%;
  min-height: 100%;

  background: #fbfbfb;
`;

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState("reservation");

  return (
    <Page>
      <OrderTab activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "reservation" && <ReservationListPage />}

      {activeTab === "history" && <OrderHistoryListPage />}
    </Page>
  );
}
