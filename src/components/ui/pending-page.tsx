import { Spinner } from "..";

export function PendingPage() {
  return (
    <div className="min-h-[80svh] flex justify-center items-center">
      <div className="flex justify-center flex-col items-center gap-1">
        <Spinner className="size-8 text-primary" />
        <p>Hold while we cook up the desired screen</p>
      </div>
    </div>
  );
}
