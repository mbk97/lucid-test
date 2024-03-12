import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAutocompleteData } from "../service/fetchData";
import { IoClose } from "react-icons/io5";

const InputComponent = () => {
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: "autoCompelete",
    queryFn: async () => {
      const response = await fetch(
        `https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  const filteredResult = data?.filter((user) => {
    const nameMatches =
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.category.toLowerCase().includes(query.toLowerCase());
    return nameMatches;
  });

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-5 text-[red]">
        Error fetching data: {error.message}
      </div>
    );

  const handleClick = (clickedText) => {
    setInputValue((prevInputValue) => [...prevInputValue, clickedText]);
    setQuery("");
  };

  const handleDelete = (clickedTextIndex) => {
    setInputValue((prevInputValue) => {
      const newValue = [...prevInputValue];
      newValue.splice(clickedTextIndex, 1);
      return newValue;
    });
  };

  return (
    <div>
      <div>
        <h1 className="text-center lg:text-[3rem] text-[1.7rem] mt-4">
          Lucid Auto-Complete Application
        </h1>
        <div className="flex justify-center items-center">
          <div
            className={`border lg:w-[900px]  ${
              inputValue.length > 0 && "gap-4"
            } flex items-center p-4 mt-10`}
          >
            <div className="flex gap-3">
              {inputValue.map((text, index) => {
                return (
                  <div
                    key={index}
                    className="flex bg-[#8b8b8b]  items-center p-1"
                  >
                    <p className=" rounded-[3px]">{text}</p>
                    <IoClose
                      className="cursor-pointer text-[red]"
                      onClick={() => handleDelete(index)}
                    />
                  </div>
                );
              })}
            </div>
            <input
              type="text"
              placeholder="Search"
              className="border-0 outline-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col ">
        <div className="  bg-[#3eb6da] ">
          {query &&
            filteredResult?.map((text) => {
              return (
                <div key={text.id} className="lg:w-[900px] p-4">
                  <p
                    className=" cursor-pointer "
                    onClick={() => handleClick(text.name)}
                  >
                    {text.name}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default InputComponent;
