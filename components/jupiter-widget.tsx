"use client";

import React, { useEffect } from "react";

export default function PluginComponent() {
  useEffect(() => {
    const initJupiter = () => {
      if (typeof window !== "undefined" && window.Jupiter) {
        window.Jupiter.init({
          displayMode: "integrated",
          integratedTargetId: "jupiter-container",
          formProps: {
            initialInputMint: "So11111111111111111111111111111111111111112",
            initialOutputMint: "DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777",
            fixedMint: "DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777",
          },
        });
      } else {
        setTimeout(initJupiter, 1000);
      }
    };

    setTimeout(initJupiter, 1000);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-4 mb-8">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
        Swap to ORGANIC
      </h2>
      <div id="jupiter-container" style={{ width: "100%", height: "568px" }} />
    </div>
  );
}
