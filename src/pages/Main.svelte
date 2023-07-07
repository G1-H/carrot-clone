<script>
  import { onMount } from "svelte";
  import { getDatabase, ref, onValue } from "firebase/database";
  import { loop_guard } from "svelte/internal";
  import Nav from "../components/Nav.svelte";

  let hour = new Date().getHours();
  let min = new Date().getMinutes();

  $: items = [];
  $: length;

  const db = getDatabase();
  const itemsRef = ref(db, "items/");
  onMount(() => {
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      items = Object.values(data).reverse();
      length = items.length;
    });
  });

  const calcTime = (timestamp) => {
    const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
    const time = new Date(curTime - timestamp);
    const hour = time.getHours();
    const min = time.getMinutes();
    const sec = time.getSeconds();

    if (hour > 0) return `${hour}시간 전`;
    else if (min > 0) return `${min}분 전`;
    else if (sec > 0) return `${sec}초 전`;
    else return "방금 전";
  };

  const updateItem = (index) => {
    window.location.hash = `/update/${index}`;
    return;
  };
</script>

<header>
  <div class="info-bar">
    <div class="info-bar__time">{hour}:{min}</div>
    <div class="info-bar__icons">
      <img src="assets/chart-bar.svg" alt="chart-bar" />
      <img src="assets/wifi.svg" alt="wifi" />
      <img src="assets/battery.svg" alt="battery" />
    </div>
  </div>
  <div class="menu-bar">
    <div class="menu-bar__location">
      <div>역삼1동</div>
      <div class="menu-bar__location-icon">
        <img src="assets/arrow-down.svg" alt="" />
      </div>
    </div>
    <div class="menu-bar__icons">
      <img src="assets/search.svg" alt="" />
      <img src="assets/menu.svg" alt="" />
      <img src="assets/alert.svg" alt="" />
      <div id="dot" />
    </div>
  </div>
</header>

<main>
  {#each items as item, index}
    <button
      class="item-list"
      data-key={index}
      on:click={() => updateItem(length - index - 1)}
    >
      <div class="item-list__img">
        <img src={item.imgUrl} alt={item.title} />
      </div>
      <div class="item-list__info">
        <div class="item-list__info-title">{item.title}</div>
        <div class="item-list__info-meta">
          {item.place}
          {calcTime(item.insertAt)}
        </div>
        <div class="item-list__info-price">
          {Number(item.price).toLocaleString("KR-kr")}원
        </div>
        <div class="item-list__info-meta">
          {#if item.description.length > 20}
            {item.description.substr(0, 20)}...더보기
          {:else}
            {item.description.substr(0, 20)}
          {/if}
        </div>
      </div>
    </button>
  {/each}
</main>
<Nav location="home" />

<div class="media-info-msg">화면 크기를 줄여주세요.</div>
