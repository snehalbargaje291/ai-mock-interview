// import React from "react";
 
// export function GridBackground() {
//   return (
//     <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
//       <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
//     </div>
//   );
// }

import React from "react";
 
export function GridBackground() {
  return (
    <div className="h-[50rem] w-full bg-gray-200  bg-grid-small-black/[0.3] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-centerbg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"></div>
    </div>
  );
}