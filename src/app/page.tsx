"use client";

let apiKey = process.env.NEXT_PUBLIC_API_KEY;
export default function Home() {
  return (
    <main className=" ">
      {/* in autocomplete field i declare use can auto search to find place and street view when he/she make all value true  */}
      {/* <AutoComplete apiKey={apiKey} autoComplete={true} streetView={true} /> */}
      <div className="flex justify-center py-5 items-center flex-col">
        <span className="text-xl font-bold ">Goggle map</span>
        <div>
          <span>
            If you have never used the Google Cloud Console to create a billing
            account or a project, click the Get Started button that links to an
            interactive setup experience in the Cloud Console for new users:
          </span>
        </div>
      </div>
    </main>
  );
}
