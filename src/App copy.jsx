import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Button from "./ui/Button";
import Row from "./ui/Row";
//es6 feature tagged template literal
//design token

//if we have to style the whole component then we have to
//style the parent element
const StyledApp = styled.div`
  /* background-color: orangered; */
  padding: 20px;
`;
//H1 would be a new component
//only scoped to this exact component which eliminates the probllem of global css
//such as name collisions etc.
//so the css which we have written above will only be available to the
//H1 component all over the app

//globalstyles component below can't accept any children (self closing component)
//and it needs to be the siblings of all the other components
function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>
            <div>
              <Heading as="h2">Check In and Out</Heading>
              <Button>Check In</Button>
              <Button variation="secondary">Check Out</Button>
            </div>
          </Row>
          <Row>
            <Heading as="h3">Form</Heading>
            <form>
              <Input type="number" placeholder="number of guests" />
              <Input type="number" placeholder="number of guests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}
//Some component has been applied with the default props so some component
//have no any props specified

// The "as" prop in styled components lets you change the default HTML
//element that the styled component renders. For example, if you want a div
// to render as a span instead, you can use <StyledDiv as="span" />.
export default App;
