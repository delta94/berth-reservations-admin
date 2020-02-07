import React from 'react';

type Props = { className?: string };

export default ({ className = '' }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M11.9999824,16.9076194 C8.50979285,16.9076194 5.5196113,15.5733282 3.06349734,13.166267 C4.3163616,13.1247284 5.17030793,12.8429472 5.88450481,12.6050923 C6.44511777,12.4185724 6.88799709,12.271379 7.41627104,12.271379 C8.37527523,12.271379 8.86720731,12.5502108 9.43705496,12.8735306 C10.0663839,13.2303481 10.7788603,13.6350948 11.9988237,13.6350948 C13.2326568,13.6350948 13.94573,13.230945 14.5750239,12.8700895 C15.1385512,12.5484902 15.6252866,12.271379 16.5808146,12.271379 C17.1102824,12.271379 17.5542502,12.4191693 18.1160219,12.6068128 C18.829657,12.8441059 19.6818828,13.1264138 20.931306,13.1714988 C18.4722776,15.5744869 15.4866959,16.9076194 11.9999824,16.9076194 M5.45321276,9.03751377 C6.30772089,8.18360256 7.09003685,7.63394483 8.45554338,7.63394483 C10.0865738,7.63394483 10.3608409,8.45207598 12.0005794,8.45207598 C13.6402827,8.45207598 13.9151116,7.64374134 15.5461772,7.63394483 C16.909928,7.6275894 17.6916822,8.18300564 18.5485078,9.03751377 C19.3752767,9.86487961 19.3672007,9.84584841 21.1680022,11.5404333 C20.0588902,11.5265637 19.337741,11.2869531 18.6374137,11.0536979 C18.01904,10.847585 17.3793176,10.633958 16.5842908,10.633958 C15.1951532,10.633958 14.4036026,11.0854751 13.7678831,11.4480512 C13.2286539,11.7557457 12.8025234,11.9982707 12.0022999,11.9982707 C11.2147872,11.9982707 10.7898155,11.7563426 10.2488307,11.4497717 C9.60854649,11.0865987 8.81236092,10.633958 7.41974722,10.633958 C6.62584399,10.633958 5.98843907,10.8464263 5.37122408,11.0519423 C4.67145861,11.2829151 3.95090628,11.5236844 2.84179433,11.5346396 C4.63451981,9.84584841 4.62700564,9.86431781 5.45321276,9.03751377 M19.7061107,7.88279013 C18.6668734,6.84639705 17.4543539,6 15.8123682,6 C13.6356478,6 13.1991942,6.81813114 12.001703,6.81813114 C10.8042469,6.81813114 10.3643171,6 8.45554338,6 C6.54673457,6 5.33256475,6.84351779 4.29213368,7.88279013 C3.19165951,8.97978812 0,12.2707821 0,12.2707821 C2.18068818,15.2730776 5.9988325,18.546796 12.0011412,18.546796 C18.0034498,18.546796 21.8152387,15.2730776 24,12.2707821 C24,12.2707821 20.8071818,8.97978812 19.7061107,7.88279013" />
  </svg>
);
