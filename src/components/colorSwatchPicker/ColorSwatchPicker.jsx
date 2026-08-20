import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const SwatchButton = styled.button`
  width: 100%;
  aspect-ratio: 1;

  padding: 0;
  box-sizing: border-box;

  border: 1px solid ${({ $selected }) => ($selected ? "#141414" : "#e3e3e3")};
  border-radius: 2px;
  outline: none;

  overflow: hidden;

  cursor: pointer;
`;

const SwatchImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function ColorSwatchPicker({ colors, value, onChange }) {
  return (
    <Grid>
      {colors.map((color) => (
        <SwatchButton
          key={color.id}
          type="button"
          $selected={value === color.id}
          onClick={() => onChange(color.id)}
          aria-label={color.id}
        >
          <SwatchImage src={color.thumbnail} alt={color.id} />
        </SwatchButton>
      ))}
    </Grid>
  );
}
