import * as bcrypt from 'bcrypt';

export const hashData = async (
  password: string,
  saltRounds = 10,
): Promise<string> => {
  const hashedData: string = await bcrypt.hash(password, saltRounds);
  return hashedData;
};

export const verifyHashedData = async (
  data: string,
  encrypted: string,
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(data, encrypted);
    return match;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }
  }
};
