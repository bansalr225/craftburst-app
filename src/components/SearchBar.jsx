import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState({});
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/hello/getAllStudents');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredResults = Object.entries(students)
      .filter(([rollNumber, name]) => name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(([rollNumber, name]) => ({ name, rollNumber }));

    setSearchResults(filteredResults);
  }, [searchTerm, students]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>
              <Link to={`/userprofile/${result.rollNumber}`}>{`${result.name}(${result.rollNumber})`}</Link>
            </li>
          ))}
        </ul>
      )}
     
    </div>
  );
};

export default SearchBar;
