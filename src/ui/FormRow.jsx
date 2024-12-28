import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, errors, children }) {
  return (
    <StyledFormRow>
      {label && (
        <>
          <Label htmlFor={children.props.id}>{label}</Label>
        </>
      )}
      {children}
      {errors && <Error>{errors}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
//here since we have passed the input as a children to the FormRow component,
//on the htmlFor attribute of the Label we could use the id of that input to connect label with the input.
// since input here is the children so chidren.prop.id = jun children(input) xa tesma vayeko id naam ko props
