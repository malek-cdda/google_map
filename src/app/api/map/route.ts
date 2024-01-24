// import { axios } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const placeId = request.nextUrl.searchParams.get("placeId");
  const key = request.nextUrl.searchParams.get("nameValue");
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;
  // const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;
  // curl "https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJcUElzOzMQQwRLuV30nMUEUM&key=YOUR_API_KEY"
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    return NextResponse.json({ result: result });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
