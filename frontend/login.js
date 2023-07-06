const form = document.querySelector("#login-form");

const handleSubmit = async (ev) => {
  ev.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);

  const div = document.querySelector("#info");
  const resp = await fetch("/login", {
    method: "post",
    body: formData,
  });
  const data = await resp.json();
  const accessToken = data.access_token;
  window.localStorage.setItem("token", accessToken);
  alert("로그인되었습니다. ");

  window.location.pathname = "/";

  //   const btn = document.createElement("button");
  //   btn.innerText = "상품 보기 ";
  //   btn.addEventListener("click", async () => {
  //     console.log(accessToken);
  //     const resp = await fetch("/items", {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     const data = await resp.json();
  //     console.log(data);
  //   });
  //   infoDiv.appendChild(btn);
  //   if (resp.status === 200) {
  //     alert("로그인 성공");
  //     // window.location.pathname = "/";
  //   } else if (resp.status === 401) {
  //     alert("아이디와 비밀번호를 확인해주세요");
  //     console.log(resp.status);
  //   }
};
form.addEventListener("submit", handleSubmit);
