const form = document.getElementById("write-form");

const handleSubmitForm = async (ev) => {
  ev.preventDefault();
  const body = new FormData(form);
  body.append("insertAt", new Date().getTime());
  try {
    const resp = await fetch("/items", {
      method: "POST",
      body,
    });
    const data = await resp.json();
    if (data === "200") window.location.pathname = "/";
  } catch (e) {
    console.error(e);
  }
};

form.addEventListener("submit", handleSubmitForm);
