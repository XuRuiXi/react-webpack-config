import React from 'react';

const TsCop = () => {
  const count = async () => {
    const { default: count } = await import('./utils');
    console.log(count(1, 2));
  };
  return (
    <div>
      <input />
      <button onClick={count}>点击动态加载JS</button>
    </div>
  );
};

export default TsCop;
