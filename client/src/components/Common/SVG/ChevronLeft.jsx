import { memo } from 'react';
const SvgChevronLeft = (props) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 256 256'
        width='1em'
        height='1em'
        {...props}
    >
        <path fill='none' d='M0 0h256v256H0z' />
        <path
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={16}
            d='m160 208-80-80 80-80'
        />
    </svg>
);
const Memo = memo(SvgChevronLeft);
export default Memo;
