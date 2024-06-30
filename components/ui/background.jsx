import React from "react";

export function GridBackground() {
  return (
    <div className="fixed inset-0 w-full h-full bg-gray-200 bg-grid-small-black/[0.3] z-0">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"></div>
    </div>
  );
}
