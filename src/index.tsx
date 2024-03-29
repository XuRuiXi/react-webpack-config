import React from 'react';
import { createRoot } from 'react-dom/client';
import 截图1 from './assets/images/截图1.png';
import 截图4 from './assets/images/截图4.png';
import './public/ignoreResources/public.css';
import styles from './index.less';
import 组件一 from '@/components/TsCop';
import 组件二 from '@/components/TsCop2';
import Fog from './assets/svgs/天气_大雾.svg';

const App = () => {
  return (
    <div className="root">
      <div className={styles.background}>
        REACT环境
      </div>
      <组件一 title='组件一' />
      <组件二 />
      <img src={截图1} />
      <div className={styles.pngBgSmall} />
      <img src={截图4} style={{height: '300px'}}/>
      <div className={styles.pngBgBig} />
      <img src={Fog} />
    </div>
  );
};

createRoot(document.querySelector('#app')).render(<App />);


import { cloneDeep } from 'lodash-es';

console.log(cloneDeep({a: 1}));