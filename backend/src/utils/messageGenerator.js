// Function to generate a random message of 20 characters
export const generateRandomMessage = () => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let message = "";
  for (let i = 0; i < 20; i++) {
    message += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return message;
};
