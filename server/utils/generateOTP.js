import otpGenerator from 'otp-generator';

export default async function generateRandomOTP() {
  return otpGenerator.generate(4, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
};
