{locations.map(location => {
    return (
        <option key={location.id} value={location.href}>
            {`${location.closet_name} - Section: ${location.section_number} - Shelf: ${location.shelf_number}`}
        </option>
    );
})}
