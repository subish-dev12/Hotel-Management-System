import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
//here we are trying to implement the compound comoponent pattern for sharing the state.
function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabins-form">
          {/* since button component can't be attached with any event handler since this addCabin component 
        dont have any state so we needed to clone this element on the Open component (inside the modal) */}
          <Button>Add Another Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabins-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>

      {/* <Modal>
        <Modal.Open opens="table">
          <Button>Open Cabin Table</Button>
        </Modal.Open>
        <Modal.Window name="table">
          <CabinTable />
        </Modal.Window>
      </Modal> */}
    </div>
  );
}

// function AddCabin() {
//   const [showModal, setShowModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setShowModal((show) => !show)}>
//         {showModal ? "close form" : "Add New Cabin"}
//       </Button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           {" "}
//           <CreateCabinForm onCloseModal={() => setShowModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
export default AddCabin;
