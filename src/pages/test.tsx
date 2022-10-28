import { useRouter } from "next/router";
import { KeyboardEvent } from "react";
import { trpc } from "../utils/trpc";

const Test = () => {
  const { mutate, data, error, isLoading } = trpc.main.createPoll.useMutation();
  const router = useRouter();

  const doSomething = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(e.currentTarget.value);
      const question = e.currentTarget.value;
      mutate({ question, options: ["opt1", "opt2"] });
    }
    return;
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error?.message}</p>;
  }
  if (data) {
    router.push(`/ask/${data.data.question.ask.replace(" ", "-")}`);
  }
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <input className="w-2/3 border-slate-600" onKeyDown={doSomething}></input>
      <button>Get Data</button>
      <p>
        {data?.data?.question ? `${JSON.stringify(data.data.question)}` : ""}
      </p>
    </div>
  );
};

export default Test;
