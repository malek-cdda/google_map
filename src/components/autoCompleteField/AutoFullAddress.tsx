import { useEffect, useState } from "react";

export const AutoCompletePage = ({ placeData }: any) => {
  const [addressField, setAddressField] = useState<any>({
    apt: "",
    street_number: "",
    street_name: "",
    country: "",
    city: "",
    zip: "",
    state: "",
  });
  useEffect(() => {
    function addressData() {
      // formatting address set function
      async function placeFetch(value: any) {
        return placeData?.address?.filter((item: any) =>
          item?.types?.includes(value)
        );
      }
      //   formatting address field
      async function setPlaceAddress(params: any) {
        setAddressField({
          apt: await placeFetch("suit"),
          street_number: await placeFetch("street_number"),
          street_name: await placeFetch("route"),
          country: await placeFetch("country"),
          city: await placeFetch("locality"),
          zip: await placeFetch("postal_code"),
          state: await placeFetch("administrative_area_level_1"),
        });
      }
      setPlaceAddress(placeData);
    }
    placeData?.formatted_address && addressData();
  }, [placeData]);
  console.log(placeData, "placedaata page");
  return (
    <div>
      {
        <div className="mt-1 flex justify-between flex-wrap">
          <div className="flex w-full gap-5">
            {addressField?.apt?.length ? (
              <Label item={addressField?.apt[0]?.long_name} name="Apt/Suit" />
            ) : (
              <Label item="" name="Apt/Suit" />
            )}
            {addressField?.street_number?.length ? (
              <Label
                item={addressField?.street_number[0]?.long_name}
                name="street_number"
              />
            ) : (
              <Label item="" name="street_number" />
            )}
            {addressField?.street_name?.length ? (
              <Label
                item={addressField?.street_name[0]?.long_name}
                name="Street Name"
              />
            ) : (
              <Label item="" name="Street Name" />
            )}
          </div>
          <div className="flex w-full gap-5">
            {addressField?.country?.length ? (
              <Label
                item={addressField?.country[0]?.long_name}
                name="Country"
              />
            ) : (
              <Label item="" name="Country" />
            )}
            {addressField?.city?.length ? (
              <Label item={addressField?.city[0]?.long_name} name="City" />
            ) : (
              <Label item="" name="City" />
            )}
            {addressField?.zip?.length ? (
              <Label item={addressField?.zip[0]?.long_name} name="Zip" />
            ) : (
              <Label item="" name="Zip" />
            )}
            {addressField?.state?.length ? (
              <Label item={addressField?.state[0]?.long_name} name="State" />
            ) : (
              <Label item="" name="State" />
            )}
          </div>
          <div className="flex w-full gap-5">
            <Label item={placeData?.position?.lat} name="Latitude" />
            <Label item={placeData?.position?.lng} name="Longitude" />
          </div>
        </div>
      }
    </div>
  );
};

const Label = ({ item, name }: any) => {
  return (
    <div className=" w-full">
      <label
        htmlFor="apt_suite"
        className="block text-sm font-medium text-gray-700">
        {name}
      </label>
      <input
        name="apt_suite"
        type="text"
        id="apt_suite"
        className="w-full px-2 block disabled:bg-gray-200   rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm outline-none border py-2"
        placeholder=""
        value={item}
        readOnly
      />
    </div>
  );
};
