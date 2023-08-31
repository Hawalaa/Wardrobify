import { useEffect, useState } from "react";


function HatsList() {
    const [hats, setHats] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/hats/');
        if (response.ok) {
            const data = await response.json();
            setHats(data.hats)
        }
    }

    useEffect(() =>{
        getData()
    }, [])


    const handleDelete = async (id) => {
            const hatUrl = `http://localhost:8090/api/hats/${id}/`;
            const fetchConfig = {
                method: "delete",
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(hatUrl, fetchConfig);
            if (response.ok) {
                getData();
            }
    }


    return (
        <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Fabric</th>
                    <th>Style Name</th>
                    <th>Color</th>
                    <th>Picture</th>
                    <th>Location</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {hats.map(hat => {
                    return (
                        <tr key={hat.id}>
                            <td>{ hat.fabric }</td>
                            <td>{ hat.style_name }</td>
                            <td>{ hat.color }</td>
                            <td>
                                <img src={ hat.picture_url } height={150} width={150}/>
                            </td>
                            <td>{ hat.location.closet_name }</td>
                            <td>
                                <button onClick={() => handleDelete(hat.id)}>DELETE</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <button className="btn btn-primary">Add New Hat</button>
        </>
    )
}

export default HatsList;
