import { memo } from 'react';
const SvgSpinner = (props) => (
  <svg height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{ background: 'none' }} {...props}>
    <circle cx="75" cy="50" fill="currentColor" r="6.4">
      <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" dur="1s" repeatCount="indefinite" begin="-0.875s" />
    </circle>
    <circle cx="67.7" cy="67.7" fill="currentColor" r="4.8">
      <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" dur="1s" repeatCount="indefinite" begin="-0.75s" />
    </circle>
    <circle cx="50" cy="75" fill="currentColor" r="4.8">
      <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" dur="1s" repeatCount="indefinite" begin="-0.625s" />
    </circle>
    <circle cx="32.3" cy="67.7" fill="currentColor" r="4.8">
      <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" dur="1s" repeatCount="indefinite" begin="-0.5s" />
    </circle>
    <circle cx="25" cy="50" fill="currentColor" r="4.8">
      <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" dur="1s" repeatCount="indefinite" begin="-0.375s" />
    </circle>
    <circle cx="32.3" cy="32.3" fill="currentColor" r="4.8">
      <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" dur="1s" repeatCount="indefinite" begin="-0.25s" />
    </circle>
    <circle cx="50" cy="25" fill="currentColor" r="6.4">
      <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" dur="1s" repeatCount="indefinite" begin="-0.125s" />
    </circle>
    <circle cx="67.7" cy="32.3" fill="currentColor" r="8">
      <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" dur="1s" repeatCount="indefinite" begin="0s" />
    </circle>
  </svg>
);
const Memo = memo(SvgSpinner);
export default Memo;
