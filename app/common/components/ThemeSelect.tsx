import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import useDarkMode from "use-dark-mode";

export const ThemeSelect = () => {
  const { value: isDark, enable, disable } = useDarkMode();

  const [mounted, setMounted] = useState(false);

  // prevent hydration error
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center">
      {mounted &&
        (isDark ? (
          <button onClick={disable} title="light theme">
            <SunIcon className="hover:text-brand h-6 w-6" />
          </button>
        ) : (
          <button onClick={enable} title="dark theme">
            <MoonIcon className="hover:text-brand h-6 w-6" />
          </button>
        ))}
    </div>
  );
};
