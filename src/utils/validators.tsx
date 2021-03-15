export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  if (!email || email.length <= 0) return 'E-mail não pode ser vazio.';
  if (!re.test(email)) return 'Ooops! Digite um e-mail válido.';
  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return 'Senha não pode ser vazia.';
  return '';
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return 'Nome não pode ser vazio.';
  return '';
};

export const valueValidator = (name: string) => {
  console.log('name ', name);

  if (!name || name.length <= 0) return 'Valor não pode ser vazio.';
  return '';
};
