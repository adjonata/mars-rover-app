import bcrypt from "bcrypt";

const generate = async (value: string, salt: number) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .hash(value, salt)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

const compare = async (value: string, hash: string) => {
  const match = await bcrypt.compare(value, hash);

  return match;
};

export { generate, compare };
