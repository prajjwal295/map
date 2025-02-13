import { useState } from "react";

const HospitalsList = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHospitals = async () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLocation({ lat, lng });

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=hospital+near+${lat},${lng}`
          );
          const data = await response.json();
          console.log(data);
          setHospitals(data);
        } catch (error) {
          setError("Failed to fetch hospital data.");
          console.error("Error fetching hospitals:", error);
        }

        setLoading(false);
      },
      (error) => {
        setError("Unable to retrieve your location.");
        setLoading(false);
        console.error("Error fetching location:", error);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Nearby Hospitals
        </h1>
        <p className="text-gray-600 mb-6">
          Click the button below to find hospitals near your location.
        </p>

        <button
          onClick={fetchHospitals}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-all duration-300 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Fetching Hospitals..." : "Find Nearby Hospitals"}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {hospitals.length > 0 && (
          <div className="mt-6 w-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Hospitals Near You:
            </h2>
            <ul className="space-y-4 max-h-64 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-inner">
              {hospitals.map((hospital, index) => (
                <li
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg text-left bg-white shadow-sm"
                >
                  <strong className="text-lg text-blue-700">
                    {hospital.display_name.split(",")[0]}
                  </strong>
                  <p className="text-gray-600">{hospital.display_name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {hospitals.length === 0 && !loading && !error && (
          <p className="mt-6 text-gray-500">
            No hospitals found yet. Click the button to search.
          </p>
        )}
      </div>
    </div>
  );
};

export default HospitalsList;
