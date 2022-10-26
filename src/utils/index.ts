import { useState, useEffect } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// 在一个函数,改变传入的对象本身是不好的
export const cleanObject = (object: any) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    //   排斥value是0
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line
  }, []);
};

// 用泛型来规范类型
export const useDebounce = <T>(value: T, delay?: number): T => {
  const [dedouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    //每次在value变化以后,设置一个定时器
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    //每次在上一个useEffect处理完以后再运行，清除定时器
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);
  return dedouncedValue;
};
