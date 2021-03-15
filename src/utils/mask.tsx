export const realMask = (value: any) => {
  if (!value)
    return '0,00';

  value = value + '';
  value = parseInt(value.replace(/[\D]+/g, ''));
  value = value + '';
  value = value.replace(/([0-9]{2})$/g, ",$1");

  if (value.length > 6)
    value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

  return value;
};