const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = process.env.SENHA_SECRET;
const iv = crypto.randomBytes(16);

const encrypt = (password) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(password), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};

const decrypt = (password) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(password.iv, 'hex')
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(password.content, 'hex')),
    decipher.final(),
  ]);

  return decrpyted.toString();
};

module.exports = {
  encrypt,
  decrypt,
};
