import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { createAndEditCabin } from "../../services/apiCabins";
//in this component we are using the same form to create a new cabin or edit an existing cabin
//so the cabinToEdit prop default has been set to empty if we are using the form to create a new form.
//but if we are using the form to edit a cabin then the cabinToEdit prop will be the cabin that we want to edit(without empty object)
function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;

  console.log(cabinToEdit);

  const isEditMode = Boolean(editId); //to determine whether we are in editing mode or creating new mode

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditMode ? editValues : {},
  });

  const { errors } = formState;
  const queryClient = useQueryClient(); //we get the instance of the queryClient with this hook
  //mutation for creating a new cabin
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createAndEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      //specifying which query to invalidate(refetch)
      reset(); //resets back to empty
      //also its nice to reset here then inside onSubmit functions since we want to reset
      // the data only when we haev sucessfully created a new cabin
    },
    onError: (err) => toast.error(err.message),
  });

  //mutation for editing a cabin
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createAndEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully!!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      //specifying which query to invalidate(refetch)
      reset(); //resets back to empty
      //also its nice to reset here then inside onSubmit functions since we want to reset
      // the data only when we haev sucessfully created a new cabin
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;

  //data would be all the datas send by the inputs of the form
  function onSubmit(data) {
    //after the form is submitted the image will be either in string(url) format or the image itself(file).
    //(this is true for both creating and editing mode )
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditMode) {
      editCabin({ newCabinData: { ...data, image }, id: editId });
    } else {
      createCabin({ ...data, image });
    }
    console.log(data);
  }

  function onError(errors) {
    //errors would be all the errors that react hook form would return
    // toast.error(formState.errors);
  }

  // 1st step of using react hook form will always going to be connecting
  //each input fields to the library using the "register" function.

  //2nd step as you guessed it would be to use "handleSubmit" as our onsubmit handler.
  //if everything goes well handleSubmit will call the onSubmit function, if the validation fails it will call the onError function.

  //useform is one of the hook provided by the react-hook-form library.
  //register allows us to connect each input fields to the form.
  //It connects your form inputs to the library, allowing React Hook Form to
  // manage their state, validation, and value retrieval seamlessly.

  //if you take a look at the component tree on the createCabinForm inside one
  //of the inputs you'll see two extra props
  //onblur and onchange that are set by react-hook-form simply by calling register

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* onSubmit is the function that would be called whenever the form is submitted
      but while calling it we will use the handleSubmit function provided by react hook form */}

      <FormRow label="Cabin name" errors={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field can't be empty.",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" errors={errors?.maxCapacity?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field can't be empty.",
            min: {
              value: 1,
              message: "Value can't be less then 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" errors={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field can't be empty.",
            min: {
              value: 1,
              message: "Value can't be less then 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" errors={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field can't be empty.",
            validate: (
              value //here validate is a function and the value is the value of the current field.
            ) =>
              //data from the form are in string type so converting it into the number type
              parseFloat(value) < parseFloat(getValues().regularPrice) ||
              "Discount can't be more than the regularPrice",
            // value <= getValues("reguarPrice") || //we could do this too
          })}
          // here we have to take the value of regularPrice and compare whether the regular price is less then discount or not,
          //for that we need the regularPrice which can be extracted by using "getValues"  obtained from the useForm hook
          //getValues() function  is used to retrieve the current value(s) of the form fields.SO when we call that function it returns an object which
          //contains the values of all the form fields.so if we want to check the value of the regularPrice then we can do : getValues().reguarPrice

          //or simply i can do like this too:--- getValues("regularPrice") i can call the function with the name of the field whose value i want to check
        />
      </FormRow>

      <FormRow
        label="Description for website"
        errors={errors?.description?.message}
        disabled={isWorking}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "This field can't be empty.",
          })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          // type="file"
          //we already mentioned the type as "file" on FileInput.jsx
          {...register("image", {
            required: isEditMode ? false : "This field can't be empty.",
            //if we are in edit mode we want the image to stay the same as it was so we will toggle the require to false
            //when we 're in edit mode
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditMode ? "Edit Form" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

/*What register Does:-------
Links Inputs to Form State: Automatically tracks the
 value and validation state of the input field.
Adds Validation Rules: You can pass validation rules directly 
while registering the input.
Handles Uncontrolled Components: React Hook Form uses refs to manage 
the inputs, making them uncontrolled components for better performance.*/
