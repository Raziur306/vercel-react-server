export const generateId = () => {
  const characters = "123456789abcdefghijklmnopqrstuvwxyz";
  let uId = "";
  for (let i = 0; i < 7; i++) {
    uId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return uId;
};
