import React, { Fragment, useState, type ChangeEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";

const FlamesCalculator: React.FC = () => {
  const [name1, setName1] = useState<string>("");
  const [name2, setName2] = useState<string>("");
  const [flames, setFlames] = useState<string | null>(null);
  const [quotes, setQuotes] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [base64String, setBase64String] = useState<string>("");

  function closeModal() {
    setIsOpen(false);
  }
  const handleCopyClick = () => {
    if (flames && quotes) {
      const jsonString = JSON.stringify([{ flames: flames, quotes: quotes }]);

      const base64String = btoa(jsonString);
      navigator.clipboard
        .writeText(`https://flames-xt.vercel.app/flames/${base64String}`)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 1500);
        })
        .catch((err) => {
          console.error("Error copying text:", err);
        });
    }
  };

  const handleName1Change = (event: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = event.target.value.replace(/[^a-zA-Z]/g, "");
    setName1(sanitizedValue);
  };

  const handleName2Change = (event: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = event.target.value.replace(/[^a-zA-Z]/g, "");
    setName2(sanitizedValue);
  };

  const calculateFlames = () => {
    const sanitizedName1 = name1.toLowerCase().replace(/\s/g, "").split("");
    const sanitizedName2 = name2.toLowerCase().replace(/\s/g, "").split("");

    // const value = sanitizedName1.concat(sanitizedName2);
    let val1 = sanitizedName1.filter((val) => !sanitizedName2.includes(val));
    let val2 = sanitizedName2.filter((val) => !sanitizedName1.includes(val));

    const value = val1.concat(val2);

    let flamesResult = [
      "Friends",
      "Love",
      "Affection",
      "Marriage",
      "Enemy",
      "Sibling",
    ];
    for (let index = 0; index < 7; index++) {
      function repeatArrayElements(arr: string[], num: number) {
        while (arr.length < num) {
          arr = arr.concat(arr);
        }
        return arr.slice(0, num);
      }

      let newArray = repeatArrayElements(flamesResult, value.length + 1);

      flamesResult = flamesResult.filter(
        (element) => element !== newArray[value.length - 1]
      );

      const indexToCut = flamesResult.indexOf(newArray[value.length]);
      if (indexToCut !== -1) {
        flamesResult = flamesResult
          .slice(indexToCut)
          .concat(flamesResult.slice(0, indexToCut));
      }
      if (flamesResult.length === 1) {
        break;
      }
    }
    setFlames(flamesResult[0]);
    switch (flamesResult[0]) {
      case "Friends":
        setQuotes(
          `${name1} and ${name2} enjoy a close friendship, fostering a bond built on trust and mutual understanding. Their connection is characterized by shared laughter, support, and a genuine appreciation for each other's company.`
        );
        break;
      case "Love":
        setQuotes(
          `${name1} and ${name2} share a deep and meaningful love, marked by affection, understanding, and a profound connection that goes beyond words.`
        );
        break;
      case "Affection":
        setQuotes(
          `There exists a warm and tender affection between ${name1} and ${name2}, expressed through caring gestures, thoughtful moments, and a genuine fondness for each other.`
        );
        break;
      case "Marriage":
        setQuotes(
          `${name1} and ${name2} have entered into the sacred bond of marriage, uniting their lives in a commitment characterized by love, partnership, and a shared journey through the highs and lows of life together.`
        );
        break;
      case "Enemy":
        setQuotes(
          `${name1} and ${name2} find themselves in an adversarial relationship, marked by conflicts and disagreements that have led to a strained connection characterized as adversaries.`
        );
        break;
      default:
        setQuotes(
          `${name1} and ${name2} share a unique and lifelong bond as siblings, their relationship defined by a special blend of camaraderie, shared memories, and an enduring familial connection.`
        );
        break;
    }

    const jsonString = JSON.stringify([{ flames: flames, quotes: quotes }]);

    setBase64String(btoa(jsonString));
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex flex-col space-y-5 items-center justify-center">
        <div className="flex flex-col space-y-1 items-center text-center">
          <h1 className="text-center font-bold sm:text-6xl text-2xl">
            Welcome to
          </h1>
          <h1 className="text-center font-bold lg:text-9xl md:text-8xl sm:text-7xl text-6xl">
            <span className={`${flames === "Friends" && "text-flames-f"}`}>
              F
            </span>
            <span className={`${flames === "Love" && "text-flames-l"}`}>L</span>
            <span className={`${flames === "Affection" && "text-flames-a"}`}>
              A
            </span>
            <span className={`${flames === "Marriage" && "text-flames-m"}`}>
              M
            </span>
            <span className={`${flames === "Enemy" && "text-flames-e"}`}>
              E
            </span>
            <span className={`${flames === "Sibling" && "text-flames-s"}`}>
              S
            </span>
          </h1>
        </div>
        <div className="flex flex-col space-y-4 items-center w-full">
          <input
            type="text"
            value={name1}
            placeholder="Your name"
            className="bg-transparent border px-4 py-2 text-white border-white rounded-lg focus-visible:ring-1 focus-visible:ring-white outline-none max-w-sm w-full"
            onChange={handleName1Change}
          />
          <input
            type="text"
            value={name2}
            placeholder="Partner name"
            className="bg-transparent border px-4 py-2 text-white border-white rounded-lg focus-visible:ring-1 focus-visible:ring-white outline-none max-w-sm w-full"
            onChange={handleName2Change}
          />
          <button
            disabled={name1 === "" || name2 === ""}
            onClick={calculateFlames}
            className="font-semibold px-4 py-2 text-black bg-white rounded-lg"
          >
            Check
          </button>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full text-center flex flex-col justify-between item max-w-md h-[500px] transform overflow-hidden rounded-2xl backdrop-blur-lg bg-gradient-to-br from-[rgb(119, 46, 195)] to-[rgb(58, 18, 153)] border border-white p-6 align-middle shadow-xl transition-all">
                  <div className="flex flex-col space-y-3">
                    <Dialog.Title
                      as="h1"
                      className={`text-5xl font-bold 
                    ${
                      flames === "Friends"
                        ? "text-flames-f"
                        : flames === "Love"
                        ? "text-flames-l"
                        : flames === "Affection"
                        ? "text-flames-a"
                        : flames === "Marriage"
                        ? "text-flames-m"
                        : flames === "Enemy"
                        ? "text-flames-e"
                        : "text-flames-s"
                    }
                    `}
                    >
                      {flames}
                    </Dialog.Title>
                    <div className="">
                      <p className="text-2xl text-white">{quotes}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      disabled
                      type="text"
                      value={`https://flames-xt.vercel.app/flames/${base64String}`}
                      placeholder="Name"
                      className="bg-transparent border px-4 py-2 text-white border-white rounded-lg focus-visible:ring-1 focus-visible:ring-white outline-none max-w-sm w-full"
                    />
                    <button
                      type="button"
                      className="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => handleCopyClick()}
                    >
                      {isCopied ? "Copied" : "Share"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default FlamesCalculator;
