import React, { useEffect, useState } from "react";

function HatForm() {
    const [locations, setLocations] = useState([]);

    const [fabric, setFabric] = useState('');
    const handleFabricChange = (event) => {
        const value = event.target.value;
        setFabric(value);
    }

    const [style_name, setStyleName] = useState('');
    const handleStyleNameChange = (event) => {
        const value = event.target.value;
        setStyleName(value);
    }

    const [color, setColor] = useState('');
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const [picture_url, setPictureUrl] = useState('');
    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const [location, setLocation] = useState('');
    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.fabric = fabric;
        data.style_name = style_name;
        data.color = color;
        data.picture_url = picture_url;
        data.location = location;
        console.log(data);

        const hatUrl = 'http://localhost:8080/api/hats/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(hatUrl, fetchConfig);
        if (response.ok) {
            const newHat = await response.json();
            console.log(newHat);
            setFabric('');
            setStyleName('');
            setColor('');
            setPictureUrl('');
            setLocation('');
          }
    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/locations/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new hat</h1>
                        <form onSubmit={handleSubmit} id="create-hat-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleFabricChange} placeholder="Fabric" required type="text" id="fabric" name="fabric" className="form-control" />
                                <label htmlFor="fabric">Fabric</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleStyleNameChange} placeholder="Style Name" required type="text" id="style_name" name="style_name" className="form-control" />
                                <label htmlFor="style_name">Style Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleColorChange} placeholder="color" required type="text" id="color" name="color" className="form-control" />
                                <label htmlFor="color">Color</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handlePictureUrlChange} placeholder="Picture Url" required type="text" id="picture_url" name="picture_url" className="form-control" />
                                <label htmlFor="picture_url">Picture Url</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">Location</label>
                                <select onChange={handleLocationChange} required id="location" name="location" className="form-select">
                                    <option value="">Choose a Location</option>
                                    {locations.map(location => {
                                        return (
                                            <option key={location.id} value={location.href}>
                                                {`${location.closet_name} - Section: ${location.section_number} - Shelf: ${location.shelf_number}`}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HatForm;
