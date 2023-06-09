import React from 'react';

interface props {
  title?: string;
}

const TsCop = (props: props) => {
  const { title = '组件一' } = props;
  const count = async () => {
    const { default: count } = await import(/* webpackPrefetch: true */ './utils');
    console.log(count(1, 2));
  };
  return (
    <div>
      {title}
      <button onClick={count}>点击动态加载TS</button>
    </div>
  );
};


export default TsCop;
