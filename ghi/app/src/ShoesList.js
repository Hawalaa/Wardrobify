import { useEffect, useState } from "react";


function ShoesList() {
    const [shoes, setShoes] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/shoes/');
        if (response.ok) {
            const data = await response.json();
            setShoes(data.shoes)
        }
    }

    useEffect(() =>{
        getData()
    }, [])


    const handleDelete = async (id) => {
            const shoeUrl = `http://localhost:8080/api/shoes/${id}/`;
            const fetchConfig = {
                method: "delete",
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(shoeUrl, fetchConfig);
            if (response.ok) {
                getData();
            }
    }


    return (
        <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Manufacturer</th>
                    <th>Model Name</th>
                    <th>Color</th>
                    <th>Picture</th>
                    <th>Bin</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {shoes.map(shoe => {
                    return (
                        <tr key={shoe.id}>
                            <td>{ shoe.manufacturer }</td>
                            <td>{ shoe.model_name }</td>
                            <td>{ shoe.color }</td>
                            <td>
                                <img src={ shoe.picture_url } height={150} width={150} />
                            </td>
                            <td>{ shoe.bin.closet_name }</td>
                            <td>
                                <button onClick={() => handleDelete(shoe.id)}>DELETE</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <button className="btn btn-primary">Add New Shoe</button>
        </>
    )
}

export default ShoesList;
