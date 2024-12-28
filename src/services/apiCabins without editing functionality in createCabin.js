import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }
  return data;
}

export async function createCabin(newCabin) {
  //https://jybtdupavrwlbusfjlcg.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  //we are creating a unique name for each image just incase if image have the same name for that we're using the random func.
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  //if cabin name contains "/" then supabase would create a new folder which we dont want for that
  //so we need to replace / with "".

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //in this step we are including the imagePath in the image column
  //1.create cabins in supabase
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  //2.Upload Images : below code obtained from the supabase docs and we made some modification to it
  //in this step we are including the image itself
  const { error: storageError } = await supabase.storage
    .from("cabin-images") //bucket-name
    .upload(imageName, newCabin.image);

  //3.prevent a new cabin from being created if the file didnt upload correctly
  //Delete the cabin if the image upload fails
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not uploaded so cabin  could not be created"
    );
  }

  return data;
}

//lets create a function for deleting a cabin
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  //from which column which data to delete
  //from "id" column delete the id that's passed in this function .
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
