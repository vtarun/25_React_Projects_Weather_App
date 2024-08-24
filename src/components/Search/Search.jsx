export default function Search({search, setSearch, handleSearch}){

    return <>
        <input 
            type="text" 
            value={search}
            name="search"
            onChange={(event)=> setSearch(event.target.value)}
            placeholder="Search place"
        />
        <button onClick={handleSearch}>Search</button>
    </>
}