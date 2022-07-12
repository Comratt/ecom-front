import React from 'react';

const Logo = ({ isTransparent, ...props }) => (
    <svg
        width="122"
        height="18"
        viewBox="0 0 109 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M16.8417 12.6559C16.0612 13.7708 15.448 14.1053 14.0544 14.1053H8.98141V13.9938C8.86992 14.1053 10.0406 13.1019 11.713 11.8197C13.8314 10.203 16.2285 8.53064 16.2285 5.68756C16.2285 3.01172 13.7756 1.84103 11.4343 1.84103C10.1521 1.84103 8.53543 2.45425 7.81073 2.95597C7.81073 2.95597 7.69923 4.23814 7.64349 5.35308H7.97797C8.47969 4.57262 9.03715 3.95941 9.65037 3.51344C10.1521 3.17896 10.7096 2.95597 11.6573 2.95597C13.2739 2.95597 14.4446 4.23814 14.3888 5.63181C14.3331 7.35996 13.1067 8.92087 11.713 10.3145C8.86992 13.1019 7.03027 14.7185 7.03027 14.7185V15.7777H14.5561C15.448 15.7777 16.0612 15.7777 16.8417 15.8335L17.1204 12.6559H16.8417Z" fill={isTransparent ? 'var(--color-lightest)' : 'var(--color-accent)'} />
        <path d="M55.4627 9.64558C55.4627 6.35652 53.9575 2.90022 50.8357 2.90022C48.2713 2.90022 46.6547 5.35308 46.6547 8.53064C46.6547 12.2099 48.5501 14.9415 51.3931 14.9415C53.846 14.9973 55.4627 12.7116 55.4627 9.64558ZM44.4248 9.08811C44.4248 4.68412 47.5466 1.84103 51.0587 1.84103C54.7937 1.84103 57.6368 4.57262 57.6368 8.92087C57.6368 13.1019 54.6822 16.0007 51.1144 16.0007C47.3236 16.0007 44.4248 13.2691 44.4248 9.08811Z" fill={isTransparent ? 'var(--color-lightest)' : 'var(--color-accent)'} />
        <path d="M79.1096 6.74675C78.9981 4.57262 77.7717 2.95597 75.4861 2.95597C73.2004 2.95597 71.974 4.9071 71.751 7.08123L79.1096 6.74675ZM69.7441 9.1996C69.7441 4.9071 72.3642 1.84103 76.0435 1.84103C79.2211 1.84103 81.228 3.73642 81.228 7.24847C81.228 7.47145 81.1722 7.6387 81.1722 7.86168H71.6953C71.6395 8.14042 71.6395 8.3634 71.6395 8.58639C71.6395 11.8754 73.3677 14.4955 76.8797 14.4955C78.6636 14.4955 79.8343 14.0496 80.9492 13.4921C80.782 14.1053 80.4475 14.607 80.0015 15.053C79.2211 15.6662 78.0504 16.0007 76.3223 16.0007C72.197 16.0007 69.7441 13.3249 69.7441 9.1996Z" fill={isTransparent ? 'var(--color-lightest)' : 'var(--color-accent)'} />
        <path d="M92.8148 6.74675C92.7033 4.57262 91.4768 2.95597 89.1912 2.95597C86.9056 2.95597 85.6792 4.9071 85.4562 7.08123L92.8148 6.74675ZM83.3936 9.1996C83.3936 4.9071 86.0136 1.84103 89.6929 1.84103C92.8705 1.84103 94.8774 3.73642 94.8774 7.24847C94.8774 7.47145 94.8216 7.6387 94.8216 7.86168H85.3447C85.2889 8.14042 85.2889 8.3634 85.2889 8.58639C85.2889 11.8754 87.0171 14.4955 90.5291 14.4955C92.313 14.4955 93.4837 14.0496 94.5986 13.4921C94.4314 14.1053 94.0969 14.607 93.651 15.053C92.8705 15.6662 91.6998 16.0007 89.9717 16.0007C85.8464 16.0007 83.3936 13.3249 83.3936 9.1996Z" fill={isTransparent ? 'var(--color-lightest)' : 'var(--color-accent)'} />
        <path d="M68.0681 1.95253C67.7894 1.89678 67.4549 1.84103 67.0647 1.84103C64.8906 1.84103 63.0509 3.79217 63.0509 3.79217V1.84103L59.6504 3.29045L61.2113 4.57262V13.4364C61.2113 14.4398 60.9883 15.053 59.9291 15.6105V15.7777H64.5004V15.6105C63.3297 15.053 62.9952 14.4398 62.9952 13.4364V4.57262C63.9429 3.95941 64.7791 3.68068 65.7825 3.68068C66.7302 3.68068 67.5664 3.95941 68.2354 4.46113H68.2911L68.0681 1.95253Z" fill={isTransparent ? 'var(--color-lightest)' : 'var(--color-accent)'} />
        <path d="M40.1894 14.5499C38.74 14.5499 37.8481 13.7137 37.8481 12.2643V3.62354H42.698L42.8095 2.56435H37.8481V0H37.7366L34.2803 3.51204V3.62354H36.0642L36.0084 12.2085C35.9527 14.6614 37.4021 15.9993 39.6877 15.9993C41.4716 15.9993 42.7538 15.2746 42.921 13.7694C42.2521 14.2154 41.3601 14.5499 40.1894 14.5499Z" fill={isTransparent ? 'var(--color-lightest)' : 'var(--color-accent)'} />
        <path d="M27.6633 7.80305C26.1581 7.18983 24.8759 6.46512 24.8759 5.57318C24.8759 4.17951 26.1024 3.00883 27.719 3.00883C28.611 3.00883 29.2242 3.23181 29.7259 3.56629C30.3391 4.01227 30.8966 4.62548 31.3983 5.40594H31.7328C31.677 4.291 31.5655 3.00883 31.5655 3.00883C30.8408 2.5071 29.1684 1.89389 27.942 1.89389C25.6006 1.89389 23.5938 3.28756 23.5938 5.90766C23.5938 8.75074 26.3811 9.58694 28.4995 10.4231C29.8931 10.9806 31.0081 11.4823 31.0081 12.5415C31.0081 13.9352 29.8374 14.7714 28.1092 14.7714C27.719 14.7714 27.3288 14.7156 26.9943 14.6599C26.2138 14.5484 25.4891 14.2139 24.9874 13.6565C24.5972 13.322 24.2627 12.876 23.984 12.3185H23.6495C23.7052 13.2105 23.761 13.9909 23.8167 14.7156C24.3185 15.1059 25.7121 15.9978 27.942 15.9978C30.6178 15.9978 32.4575 14.5484 32.4575 12.2628C32.346 9.58694 29.7816 8.69499 27.6633 7.80305Z" fill={isTransparent ? 'var(--color-lightest)' : 'var(--color-accent)'} />
        <path d="M108.21 12.9908C107.653 13.9942 107.095 14.7189 105.869 14.7189H99.8481L108.712 2.17593H97.451L97.1165 5.242H97.451C98.1757 4.12707 98.8447 3.29087 100.071 3.29087H105.646L96.8936 15.7781H108.266L108.545 12.9908H108.21Z" fill={isTransparent ? 'var(--color-lightest)' : 'var(--color-accent)'} />
        <path d="M3.56779 13.4364V5.46457V5.07434V1.84103H3.4563L0 5.35308V5.46457H1.7839V13.4364C1.7839 14.4398 1.56091 15.053 0.501721 15.6105V15.7777H5.07295V15.6105C3.90227 15.053 3.56779 14.4398 3.56779 13.4364Z" fill={isTransparent ? 'var(--color-lightest)' : 'var(--color-accent)'} />
    </svg>
);

export default Logo;
