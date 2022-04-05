import React ,{useState} from 'react';

function Searchbar({data}){
    const [filteredData,setFilteredData] = useState([]);

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        const newFilter = data.filter((value) => {
        return value.title.toLowerCase().includes(searchWord.toLowerCase()); 
        });
        if(searchWord === ""){
            setFilteredData(data);
        }
        else
        {  
            setFilteredData(newFilter);
        }
    }
    

return(
    <div>
        <input type="text" onChange={handleFilter}/>
        <ul>
            {filteredData.map((value,key) => {
                return <li>{value}</li>
            })}
        </ul>
    </div>

)
}

export default Searchbar;