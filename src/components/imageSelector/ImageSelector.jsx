import styled from "styled-components";

const Grid = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ItemButton = styled.button`
  flex: 1 1 0;
  height: ${({ $itemHeight }) => $itemHeight};

  padding: 0;
  box-sizing: border-box;

  border: none;
  outline: 1px solid ${({ $selected }) => ($selected ? "#141414" : "#e3e3e3")};
  outline-offset: -1px;
  border-radius: 2px;

  background: #f6f6f6;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Placeholder = styled.span`
  color: #a0a0a0;
  font-size: 10px;
  font-weight: 500;
  text-align: center;
  padding: 4px;
`;

export default function ImageSelector({
  items,
  value,
  onChange,
  itemHeight = "81.5px",
}) {
  return (
    <Grid>
      {items.map((item) => (
        <ItemButton
          key={item.id}
          type="button"
          $selected={value === item.id}
          $itemHeight={itemHeight}
          onClick={() => onChange(item.id)}
          aria-label={item.name}
        >
          {item.thumbnail ? (
            <Thumbnail src={item.thumbnail} alt={item.name} />
          ) : (
            <Placeholder>{item.name}</Placeholder>
          )}
        </ItemButton>
      ))}
    </Grid>
  );
}
