import React from "react";
import { useState } from "react";
import PushJsonToGitHub from "./PushJsonToGitHub.jsx";
// import TestComp from "./TestComp";

function MusollahForm() {
  const [dataContent, setDataContent] = useState({});
  const [data, setData] = useState({});
  const [isRead, isSetRead] = useState(true);
  const [formValues, setFormValues] = useState({
    locationNameInput: "",
    addressInput: "",
    floorInput: "",
    layoutInput: "",
    layoutDescriptionInput: "",
    statusInput: "",
    statusDescriptionInput: "",
    wudhuAreaInput: "",
    directionsInput: [""],
    prayerItemsInput: "",
    imagesInput: [""],
    importantNotesInput: "",
    coordinatesInputLat: "",
    coordinatesInputLong: "",
    countryInput: "",
    idInput: "",
  });

  const toggleEdit = () => {
    if(isRead){
      isSetRead(false);
    }
    else {
      isSetRead(true);
    }
  }

  const pulledData = (data) => {
    setData(data);

    let { content } = data;

    let prettifyObj = "";

    if (content) {
      let decodedContent = atob(content);
      let decodedObj = JSON.parse(decodedContent);

      console.log(decodedContent);
      console.log(decodedObj);
      setDataContent(decodedObj);
    }

    renderData();
  };

  const convertToMusollahData = (formValues) => {
    let {
      locationNameInput,
      addressInput,
      floorInput,
      layoutInput,
      layoutDescriptionInput,
      statusInput,
      statusDescriptionInput,
      wudhuAreaInput,
      directionsInput,
      prayerItemsInput,
      imagesInput,
      importantNotesInput,
      coordinatesInputLat,
      coordinatesInputLong,
      countryInput,
      idInput,
    } = formValues;

    let convertedObj = {
      name: locationNameInput,
      address: [addressInput, floorInput],
      layoutType: layoutInput,
      layoutDescription: layoutDescriptionInput,
      status: statusInput,
      statusDescription: statusDescriptionInput,
      wudhuArea: wudhuAreaInput,
      directions: directionsInput,
      prayerItems: prayerItemsInput,
      images: imagesInput,
      importantNotes: importantNotesInput,
      coordinates: [coordinatesInputLat, coordinatesInputLong],
      country: countryInput,
      id: idInput,
    };

    return convertedObj;
  };

  const pushData = () => {
    let { content } = data;
    let dataIndex = "";
    let decodedObj = "";
    if (content) {
      let decodedContent = atob(content);
      decodedObj = JSON.parse(decodedContent);

      // console.log(decodedContent);
      // console.log(decodedObj);
      // console.group("CURRENT CONTENT >>> ", decodedObj);
      // console.log("Check data length >>> ", Object.keys(decodedObj));

      dataIndex = Object.keys(decodedObj);

      let newIndex = Number(dataIndex) + 1;
      let newMusollahData = convertToMusollahData(formValues);
      decodedObj[newIndex] = newMusollahData;
    }

    // setData(data, formValues);
    // console.log("NEW DATA >>> ", data);
    return decodedObj;
  };

  const renderData = (data) => {
    if (data) {
      let { name, html_url } = data;

      // let prettifyObj = "";

      // if (content) {
      //   let decodedContent = atob(content);
      //   let decodedObj = JSON.parse(decodedContent);
      //   prettifyObj = JSON.stringify(decodedObj, undefined, 4);

      //   console.log(decodedContent);
      //   console.log(decodedObj);
      //   console.log(prettifyObj);
      // }

      return (
        <>
          <h1>Data Info</h1>
          <PushJsonToGitHub pulledData={pulledData} pushData={pushData()} />
          <h3>Filename: </h3>
          <p>{name}</p>
          <h3>Content URL:</h3>
          <p>{html_url}</p>
          <h3>Content 
            <button type="button" class="btn btn-success" onClick={()=>toggleEdit()}>{isRead ? "Read Only" : "Edit Mode"}</button>
          </h3>
          
          <textarea
            className="form-control"
            name="content-info"
            id="content-info"
            value={dataContent ?  JSON.stringify(dataContent, undefined, 4) : ""}
            readOnly={isRead}
            style={{ height: 45 + "vh" }}
          ></textarea>
        </>
      );
    }
  };

  const handleChange = (e) => {
    // console.log(e.target.name + " : " + e.target.value);
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(dataContent){
      console.log("object keys >>> ",Object.keys(dataContent).length);
      let dataIndex = Object.keys(dataContent).length;

      // let newIndex = Number(dataIndex) + 1;
      // console.log("newIndex >>> ", newIndex);
      let newMusollahData = convertToMusollahData(formValues);
      let oldData = dataContent;
      // oldData[newIndex] = newMusollahData;
      // setDataContent(oldData);
      setDataContent({ ...dataContent, [dataIndex]: newMusollahData });
    }
    
    
    console.log("All input values:", dataContent);
  };

  const handleAddDirections = (e) => {
    e.preventDefault();
    setFormValues((prev) => {
      let updatedDirectionInput = [...prev.directionsInput];
      updatedDirectionInput = [...prev.directionsInput, ""];
      return {
        ...prev,
        directionsInput: updatedDirectionInput,
      };
    });
  };

  const handleDirectionsChange = (index, value) => {
    setFormValues((prev) => {
      const updatedDirectionInput = [...prev.directionsInput];
      updatedDirectionInput[index] = value;
      return {
        ...prev,
        directionsInput: updatedDirectionInput,
      };
    });
  };

  const handleDirectionsRemove = (index) => {
    setFormValues((prev) => {
      let updatedDirectionInput = [...prev.directionsInput];
      updatedDirectionInput.splice(index, 1);
      return {
        ...prev,
        directionsInput: updatedDirectionInput,
      };
    });
  };

  const handleAddImages = (e) => {
    e.preventDefault();
    setFormValues((prev) => {
      let updatedImagesInput = [...prev.imagesInput];
      updatedImagesInput = [...prev.imagesInput, ""];
      return {
        ...prev,
        imagesInput: updatedImagesInput,
      };
    });
  };

  const handleImagesChange = (index, value) => {
    setFormValues((prev) => {
      const updatedImagesInput = [...prev.imagesInput];
      updatedImagesInput[index] = value;
      return {
        ...prev,
        imagesInput: updatedImagesInput,
      };
    });
  };

  const handleImagesRemove = (index) => {
    setFormValues((prev) => {
      let updatedImagesInput = [...prev.imagesInput];
      updatedImagesInput.splice(index, 1);
      return {
        ...prev,
        imagesInput: updatedImagesInput,
      };
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <h1>Musollah Form</h1>
            <div className="mb-3">
              <label htmlFor="location-name-input" className="form-label">
                Location Name
              </label>
              <input
                type="text"
                className="form-control"
                id="location-name-input"
                placeholder="Tampines Mall"
                name="locationNameInput"
                value={formValues.locationNameInput}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address-input" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address-input"
                placeholder="4 Tampines Central 5, Singapore 529510"
                name="addressInput"
                value={formValues.addressInput}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="floor-input" className="form-label">
                Floor Number
              </label>
              <input
                type="text"
                className="form-control"
                id="floor-input"
                placeholder="3rd Floor"
                name="floorInput"
                value={formValues.floorInput}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="layout-input" className="form-label">
                Layout Type
              </label>
              <select
                className="form-select"
                aria-label="Select layout type"
                id="layout-input"
                name="layoutInput"
                value={formValues.layoutInput}
                onChange={handleChange}
              >
                <option selected value="None">
                  Select layout type
                </option>
                <option value="shared (non-partitioned)">
                  Shared (non-partitioned)
                </option>
                <option value="shared (partitioned)">
                  Shared (partitioned)
                </option>
                <option value="separated (within area)">
                  Separated (within area)
                </option>
                <option value="separated (different areas)">
                  Separated (different areas)
                </option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="layout-description-input" className="form-label">
                Layout Description
              </label>
              <textarea
                className="form-control"
                id="layout-description-input"
                rows="3"
                name="layoutDescriptionInput"
                value={formValues.layoutDescriptionInput}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="status-input" className="form-label">
                Status
              </label>
              <select
                className="form-select"
                aria-label="Select status"
                id="status-input"
                name="statusInput"
                value={formValues.statusInput}
                onChange={handleChange}
              >
                <option selected value="None">
                  Select status
                </option>
                <option value="opened">Opened</option>
                <option value="closed htmlFor renovation">
                  Closed htmlFor Renovation
                </option>
                <option value="closed permanently">Closed Permanently</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="status-description-input" className="form-label">
                Status Description
              </label>
              <textarea
                className="form-control"
                id="status-description-input"
                rows="3"
                name="statusDescriptionInput"
                value={formValues.statusDescriptionInput}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="wudhu-area-input" className="form-label">
                Wudhu Area
              </label>
              <select
                className="form-select"
                aria-label="Select wudhu"
                id="wudhu-area-input"
                name="wudhuAreaInput"
                value={formValues.wudhuAreaInput}
                onChange={handleChange}
              >
                <option selected value="None">
                  Select wudhu area
                </option>
                <option value="built-in">Built-in</option>
                <option value="nearest toilet">Nearest toilet</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="direction-input" className="form-label">
                Directions
              </label>

              {formValues.directionsInput.map((elm, index) => {
                // console.log(elm,index);
                return (
                  <div className="d-flex align-items-center mb-3" key={index}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`Enter direction line ${index + 1}`}
                      value={formValues.directionsInput[index]}
                      onChange={(e) =>
                        handleDirectionsChange(index, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="btn-close ms-3"
                      aria-label={`Remove direction line ${index + 1}`}
                      onClick={() => handleDirectionsRemove(index)}
                    ></button>
                  </div>
                );
              })}
              <button
                className="btn btn-primary btn-sm"
                onClick={handleAddDirections}
              >
                Add more directions
              </button>
            </div>
            <div className="mb-3">
              <label htmlFor="prayer-items-input" className="form-label">
                Prayer Items
              </label>
              <select
                className="form-select"
                aria-label="Select prayer items status"
                id="prayer-items-input"
                name="prayerItemsInput"
                value={formValues.prayerItemsInput}
                onChange={handleChange}
              >
                <option selected value="None">
                  Select prayer items status
                </option>
                <option value="Provided. But advised to carry your own.">
                  Provided. But advised to carry your own.
                </option>
                <option value="Not provided. Please bring your own.">
                  Not provided. Please bring your own.
                </option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="images-input" className="form-label">
                Images
              </label>
              {formValues.imagesInput.map((elm, index) => {
                // console.log(elm,index);
                return (
                  <div className="d-flex align-items-center mb-3" key={index}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`Enter image ${index + 1}`}
                      value={formValues.imagesInput[index]}
                      onChange={(e) =>
                        handleImagesChange(index, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="btn-close ms-3"
                      aria-label={`Remove image line ${index + 1}`}
                      onClick={() => handleImagesRemove(index)}
                    ></button>
                  </div>
                );
              })}
              <button
                className="btn btn-primary btn-sm"
                onClick={handleAddImages}
              >
                Add more images
              </button>
            </div>
            <div className="mb-3">
              <label htmlFor="important-notes-input" className="form-label">
                Important Notes
              </label>
              <textarea
                className="form-control"
                id="important-notes-input"
                rows="3"
                name="importantNotesInput"
                value={formValues.importantNotesInput}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="coordinates-input" className="form-label">
                Coordinates
              </label>
              <input
                type="text"
                className="form-control mb-3"
                id="coordinates-input-lat"
                placeholder="latitude"
                name="coordinatesInputLat"
                value={formValues.coordinatesInputLat}
                onChange={handleChange}
              />
              <input
                type="text"
                className="form-control mb-3"
                id="coordinates-input-long"
                placeholder="longitude"
                name="coordinatesInputLong"
                value={formValues.coordinatesInputLong}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country-input" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="country-input"
                placeholder="Enter country"
                name="countryInput"
                value={formValues.countryInput}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="id-input" className="form-label">
                Entry Id
              </label>
              <input
                type="text"
                className="form-control"
                id="id-input"
                placeholder="Enter entry id"
                name="idInput"
                value={formValues.idInput}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary mb-3">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-6">{renderData(data)}</div>
      </div>
    </>
  );
}

export default MusollahForm;
