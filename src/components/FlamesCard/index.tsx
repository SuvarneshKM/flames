import { type FC } from "react";

interface FlamesCardProps {
  jsontoString: string;
}
const FlamesCard: FC<FlamesCardProps> = ({ jsontoString }) => {
  const jsonString = atob(jsontoString);
  const jsonData = JSON.parse(jsonString);

  return (
    <>
      <div className="flex items-center justify-center max-w-md">
        <div className="flex flex-col space-y-4 items-center text-center w-full">
          <h1 className="text-5xl font-bold">{jsonData[0].flames}</h1>
          <p className="text-2xl text-white">{jsonData[0].quotes}</p>
          <a
            href="/"
            className="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Check flames
          </a>
        </div>
      </div>
    </>
  );
};

export default FlamesCard;
