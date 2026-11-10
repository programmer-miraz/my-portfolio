import { Code2, Heart } from "lucide-react";

const footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#070B14] px-4 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-2">
        <p className="text-sm text-gray-400">
          © 2026. All rights reserved.
        </p>

        <span className="hidden text-gray-600 sm:inline">|</span>

        <p className="flex items-center gap-1.5 text-sm text-gray-400">
          Developed with
          <Code2 className="size-4 text-blue-400" />
          by
          <span className="font-semibold text-white">Md. Miraz</span>
        </p>
      </div>
    </footer>
  );
};

export default footer;