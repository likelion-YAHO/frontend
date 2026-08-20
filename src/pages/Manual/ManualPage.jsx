import { useState } from "react";
import styled from "styled-components";

import TwoTab from "../../components/tab/TwoTab";

import LabManual from "./LabManual";
import UpcycleManual from "./UpcycleManual";

const Page = styled.div`
  width: 100%;
  min-height: 100%;

  background: #fbfbfb;
`;

const Content = styled.div`
  padding: 16px 14px 40px;
`;

export default function ManualPage() {
  const [activeTab, setActiveTab] = useState("lab");

  const tabs = [
    { label: "MCM Lab", value: "lab" },
    { label: "업사이클", value: "upcycle" },
  ];

  return (
    <Page>
      <TwoTab tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <Content>
        {activeTab === "lab" ? <LabManual /> : <UpcycleManual />}
      </Content>
    </Page>
  );
}
