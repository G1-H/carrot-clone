<script>
  import {
    getDatabase,
    ref,
    push,
    child,
    get,
    DataSnapshot,
    onValue,
  } from "firebase/database";
  import {
    getStorage,
    ref as refImage,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";
  import Nav from "../components/Nav.svelte";
  let title;
  let price;
  let description;
  let place;
  let files;
  export let params;

  const storage = getStorage();
  const db = getDatabase();

  const dbRef = ref(getDatabase());
  const itemsRef = ref(db, "items/");

  const index = params.index;

  onValue(itemsRef, (snapshot) => {
    const data = snapshot.val();
    const key = Object.keys(data);

    get(child(dbRef, `items/${key[index]}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          title = snapshot.val().title;
          price = snapshot.val().price;
          description = snapshot.val().description;
          place = snapshot.val().place;
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

  async function writeUserData(imgUrl) {
    console.log(title, price, description);
    push(ref(db, "items/"), {
      title,
      price,
      description,
      place,
      insertAt: new Date().getTime(),
      imgUrl,
    });
    window.location.hash = "/";
  }

  const uploadFile = async () => {
    const file = files[0];
    const name = file.name;
    const imgRef = refImage(storage, name);
    const res = await uploadBytes(imgRef, file);
    const url = await getDownloadURL(imgRef);
    return url;
  };
  const handleSubmit = async () => {
    const url = await uploadFile();
    writeUserData(url);
  };
</script>

<form id="write-form" on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="image">이미지</label>
    <!-- <img src={item.imgUrl} alt={item.title} /> -->
    <input type="file" bind:files id="image" name="image" />
  </div>
  <div>
    <label for="title">제목</label>
    <input type="text" id="title" name="title" bind:value={title} />
  </div>
  <div>
    <label for="price">가격</label>
    <input type="number" id="price" name="price" bind:value={price} />
  </div>
  <div>
    <label for="description">설명</label>
    <input
      type="text"
      id="description"
      name="description"
      bind:value={description}
    />
  </div>
  <div>
    <label for="place">장소</label>
    <input type="text" id="place" name="place" bind:value={place} />
  </div>
  <div>
    <button class="write-button" type="submit">글쓰기</button>
  </div>
</form>
<Nav location="write" />

<style>
  .write-button {
    background-color: tomato;
    padding: 5px 10px 5px 10px;
    border-radius: 10px;
    color: white;
    margin-top: 10px;
    cursor: pointer;
  }
</style>
