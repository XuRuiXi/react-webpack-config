import React from 'react';

interface props {
  title?: string;
}

const TsCop = (props: props) => {
  const { title = '组件一' } = props;
  return (
    <div>
      {title}
    </div>
  )
};


export default TsCop;
