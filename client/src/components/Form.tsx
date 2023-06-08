import { useState } from "react";
import { MODELS, POPULAR_CARS } from "../data";

const Form: React.FunctionComponent = () => {
  const data = MODELS;
  const popularCars = POPULAR_CARS;
  // selected values
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [badge, setBadge] = useState<string>("");
  const [file, setFile] = useState<File>();
  console.log(file);
  // select options
  const makeOptions = Object.keys(data);

  const modelOptions = (key: string): string[] =>
    Object.keys(data[key as keyof typeof data]);

  const badgeOptions = (key: string): string[] => {
    const dataModel = data[make as keyof typeof data];
    return dataModel[key as keyof typeof dataModel];
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

  return (
    <div>
      <h2>"Drill Down Form"</h2>
      <form
        action="#"
        method="POST"
        className="space-y-6 max-w-4xl ml-0 md:ml-40 md:mr-10 mt-5 relative"
      >
        <div>
          <select
            id="make"
            name="make"
            value={make}
            required
            onChange={handleMakeChange}
          >
            <option disabled={true} value="">
              --Choose make--
            </option>
            {makeOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>

          {make && (
            <select
              id="model"
              value={model}
              name="model"
              required
              onChange={handleModelChange}
            >
              <option disabled={true} value="">
                --Choose Model--
              </option>
              {modelOptions(make).map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          )}
          {model && (
            <select
              id="badge"
              value={badge}
              name="badge"
              required
              onChange={handleBadgeChange}
            >
              <option disabled={true} value="">
                --Choose Badge--
              </option>
              {badgeOptions(model).map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          )}
        </div>
        {badge && (
          <div>
            <h3>Upload Logbook</h3>
            <div>
              <input
                type="file"
                onClick={(e: React.MouseEvent) => {
                  const value = e.target as HTMLInputElement;
                  if (value.files) {
                    setFile(value.files[0]);
                  }
                }}
              />
            </div>
            <button type="submit">Submit</button>
          </div>
        )}

        <h3>Select a vehicle</h3>
        {popularCars.map((car, i) => (
          <button
            key={i}
            onClick={(e) =>
              handleCommonVehicleSelect(e, car.make, car.badge, car.model)
            }
          >
            {Object.values(car)}
          </button>
        ))}
      </form>
    </div>
  );
};

export default Form;
