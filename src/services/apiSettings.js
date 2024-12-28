import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();
  //only after "selecting" query we can return the data .
  //Return data as a single object instead of an array of objects = single()

  //if u see the settings row in supbase "cabins" table you'll see only one row
  //that's only row we're gonna fetch

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
