import styled from "styled-components";

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0;
  margin: 0;

  border: none;
  background: none;

  font: inherit;
  color: inherit;

  cursor: pointer;
`;

const CommonButton = ({ children, onClick, ...props }) => (
  <Button onClick={onClick} {...props}>
    {children}
  </Button>
);

export default CommonButton;
