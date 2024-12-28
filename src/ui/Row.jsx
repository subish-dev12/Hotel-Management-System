import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

//so if no type prop, is used it will default to vertical
// so if we have to apply vertical type we just can remove the type 'vertical'
//in the app component since we have used the defaultProps
Row.defaultProps = {
  type: "vertical",
};

export default Row;
