import React, { useState } from "react";
import { MODELS, POPULAR_CARS } from "../data";
import Button from "./Button";
import Select from "./Select";

const Form: React.FunctionComponent = () => {
  const data = MODELS;
  const popularCars = POPULAR_CARS;

  const [error, setError] = useState<boolean | undefined>(undefined);

  // selected values
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [badge, setBadge] = useState<string>("");
  const [file, setFile] = useState<File>();

  // select options
  const makeOptions = Object.keys(data);

  const modelOptions = () => Object.keys(data[make as keyof typeof data]);

  const badgeOptions = () => {
    const dataModel = data[make as keyof typeof data];
    return dataModel[model as keyof typeof dataModel];
  };

  const handleMakeChange = (event: React.ChangeEvent): void => {
    setBadge("");
    setModel("");
    setMake((event.target as HTMLInputElement).value);
  };
  const handleModelChange = (event: React.ChangeEvent): void => {
    setBadge("");
    setModel((event.target as HTMLInputElement).value);
  };
  const handleBadgeChange = (event: React.ChangeEvent): void => {
    setBadge((event.target as HTMLInputElement).value);
  };

  const handleCommonVehicleSelect = (
    e: React.MouseEvent,
    mk: string,
    md: string,
    bg: string
  ) => {
    e.preventDefault();
    setMake(mk);
    setModel(md);
    setBadge(bg);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    if (!file) {
      setError(true);
    } else {
      let data = new FormData();

      data.append("make", make);
      data.append("model", model);
      data.append("badge", badge);
      data.append("file", file);

      fetch("http://localhost:4000/upload", {
        method: "POST",
        body: data,
      }).then(function (response) {
        window.location.href = "http://localhost:4000/upload";
        return response.json();
      });
    }

    event.preventDefault();
  };
  return (
    <form
      className="flex flex-col text-left p-8 gap-6"
      key="form"
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold text-6xl">Drill Down Form</h1>
      <div className="flex flex-col gap-1">
        <Select
          name="make"
          value={make}
          options={makeOptions}
          testId="testMakeSelect"
          handleChange={handleMakeChange}
        />
        {make && (
          <Select
            name="model"
            value={model}
            options={modelOptions()}
            testId="testModelSelect"
            handleChange={handleModelChange}
          />
        )}
        {model && (
          <Select
            name="badge"
            value={badge}
            options={badgeOptions()}
            testId="testBadgeSelect"
            handleChange={handleBadgeChange}
          />
        )}
      </div>
      {badge && (
        <div className="flex flex-col gap-5">
          <h3 className="text-lg font-medium">Upload Logbook</h3>
          <div className="flex flex-col gap-1">
            <input
              name="file"
              type="file"
              accept="text/plain"
              onChange={(e: React.ChangeEvent) => {
                const value = e.target as HTMLInputElement;
                if (error) setError(false);
                if (value.files) {
                  setFile(value.files[0]);
                }
              }}
              className={`text-sm w-fit line ${
                error && "after:content-['❗️'] after:pl-1"
              }
                  ${error === false && "after:content-['✅'] after:pl-1"}`}
            />
            {error && (
              <div className="text-rose-600 text-sm">Please upload a file</div>
            )}
            <Button type="submit" text="Submit"></Button>
          </div>
        </div>
      )}

      <h3 className="text-4xl font-bold">Select a vehicle</h3>
      <div className="flex flex-col gap-1">
        {popularCars.map((car, i) => (
          <Button
            id={i}
            key={i}
            text={Object.values(car).join(" ")}
            inline
            handleClick={(e) =>
              handleCommonVehicleSelect(e, car.make, car.badge, car.model)
            }
          />
        ))}
      </div>
    </form>
  );
};

export default Form;
