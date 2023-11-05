import Script from "next/script";

const CustomScript = ({ apiKey }: any) => {
  return (
    <div>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places&v=weekly`}
        defer
      ></Script>
    </div>
  );
};

export default CustomScript;
