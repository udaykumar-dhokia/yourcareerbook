import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="animate-spin" />
          <p>Hang tight...</p>
        </div>
      </div>
    </>
  );
};

export default Loader;
