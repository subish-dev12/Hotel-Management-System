import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }
  return data;
}

//this function is for creating and editing cabins, we only need to specify newCabin for creating new cabin but both newCabin and id for editing a existing one
//but why ? lau naya cabin banauna xa vane naya cabin ko data ayera new cabin ma basxa ani tei db ma add hunxa tesko lagi id chaiyena
//tara existing cabin lai edit garda edit vayera ayeko data(newCabin) + kun cabin lai edit garne ho tesko id ta chaiyo so
//creating a new cabin = newCabin
//editing existing cabin = newcabin + id both needed
export async function createAndEditCabin(newCabin, id) {
  //https://jybtdupavrwlbusfjlcg.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

  console.log(hasImagePath);
  console.log(newCabin);

  //we are creating a unique name for each image just incase if image have the same name for that we're using the random func.
  //if cabin name contains "/" then supabase would create a new folder which we dont want for that
  //so we need to replace / with "".
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  console.log(imageName);

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`; //path to supabase bucket

  //1.create/edit cabins in supabase
  //since same query is required for both creating and editing so we  abstracted that query into its own variable.
  let query = supabase.from("cabins");

  //A.create a new cabin (we dont need id for creating )
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B.Edit the existing cabin by id(we need both newCabin and id for editing)
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  //whether creating or updating both would return a data.
  const { data, error } = await query.select().single();
  //by default, Supabase's insert function does not return the newly inserted row to the data variable. If you want the newly inserted row to be
  //returned, you need to explicitly include the
  //.select() method in your query.

  console.log(data);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  //2.Upload Images : below code obtained from the supabase docs and we made some modification to it
  //in this step we are including the image itself
  //if the hasImagePath is true then this step would be ignored since the image has already been uploaded and no need to upload again during the editing mode.
  // that means while in editing mode if we don't use a new image then only in that case.
  //but if we use a different image during editing then hasImagePath would be false and this step would run for uploading that new image.
  const { error: storageError } = await supabase.storage
    .from("cabin-images") //bucket-name
    .upload(imageName, newCabin.image);

  console.log(storageError);

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
