class haversineFormula {
  constructor() {}
  radiansMethod(degrees: any) {
    return (degrees * Math.PI) / 180;
  }
  haversineDistance(obj1: any, obj2: any) {
    //         a = sin²(φB - φA/2) + cos φA * cos φB * sin²(λB - λA/2)
    // c = 2 * atan2( √a, √(1−a) )
    // d = R ⋅ c
    // here φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km)
    const [lng1, lat1] = obj1;
    const [lng2, lat2] = obj2;
    const phi_1 = this.radiansMethod(lat1);
    const phi_2 = this.radiansMethod(lat2);
    const deltaPhi = this.radiansMethod(lat2 - lat1);
    const deltaLamda = this.radiansMethod(lng2 - lng1);
    const radius = 6371; // radius in km
    const formula =
      Math.pow(Math.sin(deltaPhi / 2), 2) +
      Math.cos(phi_1) * Math.cos(phi_2) * Math.pow(Math.sin(deltaLamda / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(formula), Math.sqrt(1 - formula));
    const d = radius * c;
    console.log(d);
  }
}
export const haversine = new haversineFormula();
