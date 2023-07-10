
getData();

async function getData() {
  const response = await fetch('languages2.csv');
  const data = await response.text();
  

  const table = data.split('\n').slice(1);
  const markers = [];
  // Define a function to convert lat and lon to x and y positions on the map
  function latLonToXY(lat, lon) {
    const x = lon;
    const y = lat;
    return [x, y];
  }
  
  // Loop through the rows and create ellipses for each item
  table.forEach(row => {
    const columns = row.split(',');
    const language = columns[3];
    const link = columns[9];
    const lat = parseFloat(columns[6]);
    const lon = parseFloat(columns[7]);

    // Convert lat and lon to x and y positions on the map
    const [x, y] = latLonToXY(lat, lon);
    
    //create clickable markers 
    const marker = L.marker([y, x], [5000, 10000], 0); 
    marker.addTo(mymap);
    
    //click to be directed to page showing sample language
    const txt = "language: " + language + " " + " <a href='" + link + "'>view sample</a>"
    marker.bindPopup(txt);
    
    
   markers.push({ marker, data: language });
  });
  
    function markerClick(e) {
    const marker = e.target;
    const dataItem = markers.find(item => item.marker === marker);
    console.log(dataItem.data);
  }
  
  
  // Making a map and tiles
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(mymap);
}