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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 text-center text-gray-900">
        <h1 className="text-3xl font-extrabold mb-4 animate-fade-in">
          Nearby Hospitals
        </h1>
        <p className="text-lg mb-6 animate-fade-in">
          Find hospitals near your location quickly and easily. Click below to
          start.
        </p>

        <button
          onClick={fetchHospitals}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Fetching Hospitals..." : "Find Nearby Hospitals"}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* Hospitals List Section */}
      {hospitals.length > 0 && (
        <div className="mt-6 w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Hospitals Near You:
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner max-h-64 overflow-y-auto">
            <ul className="space-y-4">
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
        </div>
      )}

      {hospitals.length === 0 && !loading && !error && (
        <p className="mt-6 m-auto text-center">
          No hospitals found yet. Click the button to search.
        </p>
      )}
    </div>
  );
};

export default HospitalsList;
