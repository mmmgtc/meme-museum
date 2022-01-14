export async function getProfileData(address: string) {
  let displayName: string;
  let karma: number;

  try {
    const response = await fetch(
      `https://evening-anchorage-43225.herokuapp.com/museum/poaster/${address}/`
    );
    const data = await response.json();
    return {
      displayName: data.userprofile.display_name,
      karma: data.userprofile.karma,
    };
  } catch (error) {
    console.log(error);
    return {
      displayName: null,
      karma: null,
    };
  }
}

export async function getMemes(address: string) {
  try {
    const response = await fetch(
      `https://evening-anchorage-43225.herokuapp.com/museum/poaster/memes/${address}/`
    );
    const data = await response.json();
    return {
      memes: data,
    };
  } catch (error) {
    console.log(error);
    return {
      memes: null,
    };
  }
}

export default null;
