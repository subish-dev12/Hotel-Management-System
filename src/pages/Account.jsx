import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <p>Update user data form</p>
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <p>Update user password form</p>
      </Row>
    </>
  );
}

export default Account;

//we are using the fragments to enclose the component instead of a div
//because we want all the elements above to be directly seen inside main element
//as an outlet of  (applayout.jsx file) so any active page who gets rendred as
//an outlet gets consistently same css.
