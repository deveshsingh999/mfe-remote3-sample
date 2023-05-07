import { type } from 'os';
import { useCallback, useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

const stateMap = new Map<string, BehaviorSubject<any>>();

function stateFactory<T = any>(channel: string, initialValue?: T) {
  if (channel) {
    if (stateMap.has(channel)) {
      if (initialValue !== undefined) {
        // console.warn(`Channel '${channel}' already exists! initialValue ignored.`);
      }
      return stateMap.get(channel)! as BehaviorSubject<T>;
    } else if (initialValue !== undefined) {
      const bs = new BehaviorSubject(initialValue as T);
      stateMap.set(channel, bs);
      return bs;
    }  
  }

  console.warn(`Cannot create channel '${channel}'. initialValue: ${initialValue}`);
  throw new Error(`Cannot create channel '${channel}'`);
}

function useStateStore<T = any>(channel: string, initialValue?: T) {
  const [value, setValue] = useState(() => stateFactory(channel, initialValue).value);

  useEffect(() => {
    const subs = stateFactory(channel).subscribe(val => {
      setValue(val);
    });

    return () => subs.unsubscribe();
  }, []);

  const updateValueOrFunc = useCallback((valueOrFunc: T | SetStateActionFunc<T>) => {
    let val;
    if (typeof valueOrFunc === 'function') {
      const func = valueOrFunc as SetStateActionFunc<T>;
      val = func(stateFactory(channel).value);
    } else {
      val = valueOrFunc;
    }
    stateFactory(channel).next(val);
  }, []);

  return [value, updateValueOrFunc] as [T, SetStateAction<T>];
}

export { stateFactory, useStateStore };

type SetStateActionFunc<T> = (value: T) => T;
type SetStateAction<T> = (valueOrFunc: T | SetStateActionFunc<T>) => void;
