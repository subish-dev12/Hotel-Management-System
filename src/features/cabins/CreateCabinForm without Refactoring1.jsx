import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
``;
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const FormRow = styled.div`
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

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;

  console.log(getValues());

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
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

  function onSubmit(data) {
    //data would be all the datas send by the inputs of the form
    mutate(data);
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

      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field can't be empty.",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field can't be empty.",
            min: {
              value: 1,
              message: "Value can't be less then 1",
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field can't be empty.",
            min: {
              value: 1,
              message: "Value can't be less then 1",
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field can't be empty.",
            validate: (
              value //here validate is a function and the value is the value of the current field.
            ) =>
              value <= getValues().regularPrice ||
              // value <= getValues("reguarPrice") || //we could do this too
              "Discount can't be more than 100%",
          })}
          // here we have to take the value of regularPrice and compare whether the regular price is less then discount or not,
          //for that we need the regularPrice which can be extracted by using "getValues"  obtained from the useForm hook
          //getValues() function  is used to retrieve the current value(s) of the form fields.SO when we call that function it returns an object which
          //contains the values of all the form fields.so if we want to check the value of the regularPrice then we can do : getValues().reguarPrice

          //or simply i can do like this too:--- getValues("regularPrice") i can call the function with the name of the field whose value i want to check
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field can't be empty.",
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating === true}>Add cabin</Button>
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