export const errorMessages = {
  userNotFound: "User not found",
  userAlreadyExist: "A user with this email already exist. Please check your email or try to log in.",
  invalidEmail: "Email is not valid. Please try again!",
  invalidPassword: "Wrong password. Please try again!",
  propertyMissing: "There is an propery missing!",
  userHasNoAnimeSeries: (listStatus: string) => `Sorry, there are no anime series matching ${listStatus} status at the moment.`,
  animeNotFound: "The anime you're trying to get does not exist, please check the animeId",
};
