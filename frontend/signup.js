const form = document.querySelector("#signup-form");

const checkPassWord = () => {
  const formData = new FormData(form);
  const password1 = formData.get("password");
  const password2 = formData.get("password2");
  if (password1 === password2) return true;
  else return false;
};

const handleSubmit = async (ev) => {
  ev.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);

  const div = document.querySelector("#info");
  if (checkPassWord()) {
    const resp = await fetch("/signup", {
      method: "post",
      body: formData,
    });
    const data = await resp.json();
    if (data === "200") {
      div.style.color = "blue";
      div.innerText = "회원가입에 성공했습니다. ";
      alert("회원가입에 성공했습니다.");
      window.location.pathname = "/login.html";
    }
  } else {
    div.style.color = "red";
    div.innerText = "비밀번호가 일치하지 않습니다. ";
    form.appendChild(div);
  }
};
form.addEventListener("submit", handleSubmit);
