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

const renderData = (data) => {
  const main = document.querySelector("main");
  data.forEach(async (obj) => {
    const div = document.createElement("div");
    div.className = "item-list";
    main.appendChild(div);

    const ImgDiv = document.createElement("div");
    ImgDiv.className = "item-list__img";

    const img = document.createElement("img");
    const resp = await fetch(`/images/${obj.id}`);
    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;

    const InfoDiv = document.createElement("div");
    InfoDiv.className = "item-list__info";

    const InfoTitleDiv = document.createElement("div");
    InfoTitleDiv.className = "item-list__info-title";
    InfoTitleDiv.innerText = obj.title;

    const InfoMetaDiv = document.createElement("div");
    InfoMetaDiv.className = "item-list__info-meta";
    InfoMetaDiv.innerText = obj.place + " " + calcTime(obj.insertAt);

    const InfoPriceDiv = document.createElement("div");
    InfoPriceDiv.className = "item-list__info-price";
    InfoPriceDiv.innerText = Number(obj.price).toLocaleString("us-US");

    ImgDiv.appendChild(img);

    InfoDiv.appendChild(InfoTitleDiv);
    InfoDiv.appendChild(InfoMetaDiv);
    InfoDiv.appendChild(InfoPriceDiv);

    div.appendChild(ImgDiv);
    div.appendChild(InfoDiv);
  });
};

const fetchList = async () => {
  const accessToken = window.localStorage.getItem("token");

  const resp = await fetch("/items", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await resp.json();
  const dataSorted = await data.sort((a, b) => {
    if (a.insertAt < b.insertAt) return 1;
    if (a.insertAt > b.insertAt) return -1;
  });
  renderData(dataSorted);
};

fetchList();
