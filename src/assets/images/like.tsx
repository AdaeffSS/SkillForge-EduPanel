import * as React from "react";

const SvgComponent = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="100%"
        width="auto"
        viewBox="0 0 11.63 12.83"
        preserveAspectRatio="xMidYMid meet"
        {...props}
    >
        <path
            fill="currentColor"
            d="M10.34 4.89c.76.08 1.33.8 1.28 1.55-.04.59-.22 1.45-.33 2.05-.31 1.7-.95 2.97-2.55 3.78-1.13.57-1.91.49-3.12.51-1.56.02-3.1.42-3.31-1.6-.19-1.78-.27-3.58-.47-5.36-.02-1.08 1.2-1.62 1.84-2.32.73-.8.73-1.52 1.05-2.48.29-.88.99-1.27 1.89-.85 1.51.71.6 3.2.46 4.44 0 .05-.05.28 0 .28h3.25ZM.37 4.9c.29-.05.52.18.55.46l.57 6.55c.11 1.01-1.3 1.24-1.49.25V5.31c.02-.19.18-.37.37-.4Z"
        />
    </svg>
);

export default SvgComponent;