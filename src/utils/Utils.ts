export function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

// export function getIsAuth() {
//   const storedIsAuth = localStorage.getItem("isAuth");
//   console.log("dsfdsf", storedIsAuth);
//   return storedIsAuth === "true";
// }

// export function setItemInLocalStorage() {
//   const storedIsAuth = localStorage.setItem("isAuth", "true");
// }

// export function getCookies() {

// }
