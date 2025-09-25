import { First } from './matryoshka/First';
import { createContext, ReactNode, useContext, useState } from 'react';

const CounterContext = createContext(null);

export const Counter = () => {
  return (
    <>
      <CounterProvider>
        <First />
      </CounterProvider>
    </>
  );
};

export function CounterProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);

  const value = {
    count,
    increment,
  };

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}

export function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
}
