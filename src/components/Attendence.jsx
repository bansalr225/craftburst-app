const Attendence = () => {
    const [students, setStudents] = useState({});

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

      return (
        <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
            <Link to={`/userprofile/${result.rollNumber}`}>{`${result.name}(${result.rollNumber})`}</Link>
          </li>
        ))}
      </ul>
      );
};