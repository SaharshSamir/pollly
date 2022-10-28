import { SyntheticEvent } from "react";
import { trpc } from "../utils/trpc";

interface FormShape {
  ask: { value: string };
  opt1: { value: string };
  opt2: { value: string };
  opt3?: { value: string };
  opt4?: { value: string };
}

const NewPoll = () => {
  const { mutate, isLoading } = trpc.main.createPoll.useMutation();
  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & FormShape;

    const options = [];
    options.push(target.opt1.value, target.opt2.value);
    target.opt3?.value ? options.push(target.opt3.value) : null;
    target.opt4?.value ? options.push(target.opt4.value) : null;
    console.log(target.opt1.value);
    console.log(options);
    // mutate({
    //   question: target.ask,
    //   options,
    // });
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center p-10 text-slate-200">
      <h2 className="mb-3 text-3xl">Enter The Question</h2>
      <form onSubmit={submit} className="w-3/6">
        <input
          name="ask"
          className="focus:ring-slate-400-red-400 w-full rounded border border-slate-600 bg-gray-700 p-2.5 text-slate-300"
        ></input>
        <input
          name="opt1"
          className="focus:ring-slate-400-red-400 w-full rounded border border-slate-600 bg-gray-700 p-2.5 text-slate-300"
        ></input>
        <input
          name="opt2"
          className="focus:ring-slate-400-red-400 w-full rounded border border-slate-600 bg-gray-700 p-2.5 text-slate-300"
        ></input>
        <input
          name="opt3"
          className="focus:ring-slate-400-red-400 w-full rounded border border-slate-600 bg-gray-700 p-2.5 text-slate-300"
        ></input>
        <input
          name="opt4"
          className="focus:ring-slate-400-red-400 w-full rounded border border-slate-600 bg-gray-700 p-2.5 text-slate-300"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewPoll;
