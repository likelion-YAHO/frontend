import { useEffect, useRef } from "react";
import styled from "styled-components";
import JsBarcode from "jsbarcode";

const BarcodeSvg = styled.svg`
  max-width: 100%;
  height: 50px;
`;

export default function OrderBarcode({ value }) {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (!barcodeRef.current || !value) return;

    JsBarcode(barcodeRef.current, value, {
      format: "CODE128",

      width: 1.5,
      height: 36,

      displayValue: false,
      margin: 0,
    });
  }, [value]);

  return <BarcodeSvg ref={barcodeRef} />;
}
