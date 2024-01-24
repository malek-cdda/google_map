// import { axios } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get("lat");
  const lng = request.nextUrl.searchParams.get("lng");
 
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?lat=${lat}&lng=${lng}&key=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return NextResponse.json({ result: result });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
