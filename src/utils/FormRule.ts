import { Rule } from 'rc-field-form/lib/interface';
import { FormValidatorRule } from '../types/common.type';

export const nameRule = (): Rule[] => {
  return [
    {
      validator: nameRuleValidator(),
    },
    {
      max: 59,
    },
  ];
};

export const nameRuleValidator = (): FormValidatorRule => {
  return (_: any, value: string) => {
    const startReg = /^[a-zA-Z]/;
    if (!startReg.test(value)) {
      return Promise.reject('必须要以字母开头');
    }
    const reg = /^[a-zA-Z0-9_-]*$/;
    if (!reg.test(value)) {
      return Promise.reject('只能包含字母、数字、中划线和下划线');
    }
    return Promise.resolve();
  };
};

export const whiteSpaceSql = (): Rule[] => {
  return [
    {
      validator: whiteSpaceSqlValidator(),
    },
  ];
};

export const whiteSpaceSqlValidator = (): FormValidatorRule => {
  return (_: any, values: string) => {
    const placeholder = '/* input your sql */';
    if (values === placeholder) {
      return Promise.reject('必须填写SQL语句');
    }
    return Promise.resolve();
  };
};

export const validatorPort = (min = 1, max = 65535): FormValidatorRule => {
  return (_: any, value: string) => {
    const reg = /^[0-9]*$/;
    if (!reg.test(value)) {
      return Promise.reject('只能包含数字');
    }
    const port = parseInt(value, 10);
    if (port < min || port > max) {
      return Promise.reject(`端口号范围为${min}-${max}`);
    }
    return Promise.resolve();
  };
};
