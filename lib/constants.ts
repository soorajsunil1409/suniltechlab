export const STADIUM_TIMEZONES: Record<string, string> = {
	"1": "America/Mexico_City",     // Mexico City Stadium
	"2": "America/Mexico_City",     // Guadalajara
	"3": "America/Monterrey",       // Monterrey

	"4": "America/Chicago",         // Dallas
	"5": "America/Chicago",         // Houston
	"6": "America/Chicago",         // Kansas City

	"7": "America/New_York",        // Atlanta
	"8": "America/New_York",        // Miami
	"9": "America/New_York",        // Boston
	"10": "America/New_York",       // Philadelphia
	"11": "America/New_York",       // New York/New Jersey
	"12": "America/Toronto",        // Toronto

	"13": "America/Vancouver",      // Vancouver
	"14": "America/Los_Angeles",    // Seattle
	"15": "America/Los_Angeles",    // San Francisco Bay Area
	"16": "America/Los_Angeles",    // Los Angeles
};

export const STADIUMS = [
	{
		"_id": "679c9c8a5749c4077500f001",
		"id": "1",
		"name_en": "Estadio Azteca",
		"name_fa": "استادیوم آزتکا",
		"fifa_name": "Mexico City Stadium",
		"city_en": "Mexico City",
		"city_fa": "مکزیکوسیتی",
		"country_en": "Mexico",
		"country_fa": "مکزیک",
		"capacity": 83000,
		"region": "Central",
		"lat": 19.3029,
		"lon": -99.1505
	},
	{
		"_id": "679c9c8a5749c4077500f002",
		"id": "2",
		"name_en": "Estadio Akron",
		"name_fa": "استادیوم آکرون",
		"fifa_name": "Estadio Guadalajara",
		"city_en": "Guadalajara (Zapopan)",
		"city_fa": "گوادالاخارا",
		"country_en": "Mexico",
		"country_fa": "مکزیک",
		"capacity": 48000,
		"region": "Central",
		"lat": 20.6829,
		"lon": -103.4623
	},
	{
		"_id": "679c9c8a5749c4077500f003",
		"id": "3",
		"name_en": "Estadio BBVA",
		"name_fa": "استادیوم بی‌بی‌وی‌ای",
		"fifa_name": "Estadio Monterrey",
		"city_en": "Monterrey (Guadalupe)",
		"city_fa": "مونتری",
		"country_en": "Mexico",
		"country_fa": "مکزیک",
		"capacity": 53500,
		"region": "Central",
		"lat": 25.6692,
		"lon": -100.2447
	},
	{
		"_id": "679c9c8a5749c4077500f004",
		"id": "4",
		"name_en": "AT&T Stadium",
		"name_fa": "استادیوم ای‌تی‌اند‌تی",
		"fifa_name": "Dallas Stadium",
		"city_en": "Dallas (Arlington, Texas)",
		"city_fa": "دالاس",
		"country_en": "United States",
		"country_fa": "آمریکا",
		"capacity": 94000,
		"region": "Central",
		"lat": 32.7473,
		"lon": -97.0945
	},
	{
		"_id": "679c9c8a5749c4077500f005",
		"id": "5",
		"name_en": "NRG Stadium",
		"name_fa": "استادیوم ان‌آر‌جی",
		"fifa_name": "Houston Stadium",
		"city_en": "Houston",
		"city_fa": "هیوستون",
		"country_en": "United States",
		"country_fa": "آمریکا",
		"capacity": 72000,
		"region": "Central",
		"lat": 29.6847,
		"lon": -95.4107
	},
	{
		"_id": "679c9c8a5749c4077500f006",
		"id": "6",
		"name_en": "GEHA Field at Arrowhead Stadium",
		"name_fa": "استادیوم اروهد",
		"fifa_name": "Kansas City Stadium",
		"city_en": "Kansas City",
		"city_fa": "کانزاس سیتی",
		"country_en": "United States",
		"country_fa": "آمریکا",
		"capacity": 73000,
		"region": "Central",
		"lat": 39.0489,
		"lon": -94.4839
	},
	{
		"_id": "679c9c8a5749c4077500f007",
		"id": "7",
		"name_en": "Mercedes-Benz Stadium",
		"name_fa": "استادیوم مرسدس بنز",
		"fifa_name": "Atlanta Stadium",
		"city_en": "Atlanta",
		"city_fa": "آتلانتا",
		"country_en": "United States",
		"country_fa": "آمریکا",
		"capacity": 75000,
		"region": "Eastern",
		"lat": 33.7554,
		"lon": -84.4009
	},
	{
		"_id": "679c9c8a5749c4077500f008",
		"id": "8",
		"name_en": "Hard Rock Stadium",
		"name_fa": "استادیوم هارد راک",
		"fifa_name": "Miami Stadium",
		"city_en": "Miami (Miami Gardens)",
		"city_fa": "میامی",
		"country_en": "United States",
		"country_fa": "آمریکا",
		"capacity": 65000,
		"region": "Eastern",
		"lat": 25.9580,
		"lon": -80.2389
	},
	{
		"_id": "679c9c8a5749c4077500f009",
		"id": "9",
		"name_en": "Gillette Stadium",
		"name_fa": "استادیوم ژیلت",
		"fifa_name": "Boston Stadium",
		"city_en": "Boston (Foxborough)",
		"city_fa": "بوستون",
		"country_en": "United States",
		"country_fa": "آمریکا",
		"capacity": 65000,
		"region": "Eastern",
		"lat": 42.0909,
		"lon": -71.2643
	},
	{
		"_id": "679c9c8a5749c4077500f010",
		"id": "10",
		"name_en": "Lincoln Financial Field",
		"name_fa": "استادیوم لینکلن فایننشال",
		"fifa_name": "Philadelphia Stadium",
		"city_en": "Philadelphia",
		"city_fa": "فیلادلفیا",
		"country_en": "United States",
		"country_fa": "آمریکا",
		"capacity": 69000,
		"region": "Eastern",
		"lat": 39.9008,
		"lon": -75.1675
	},
	{
		"_id": "679c9c8a5749c4077500f011",
		"id": "11",
		"name_en": "MetLife Stadium",
		"name_fa": "استادیوم متلایف",
		"fifa_name": "New York/New Jersey Stadium",
		"city_en": "New York/New Jersey (East Rutherford)",
		"city_fa": "نیویورک/نیوجرسی",
		"country_en": "United States",
		"country_fa": "آمریکا",
		"capacity": 82500,
		"region": "Eastern",
		"lat": 40.8135,
		"lon": -74.0745
	},
	{
		"_id": "679c9c8a5749c4077500f012",
		"id": "12",
		"name_en": "BMO Field",
		"name_fa": "استادیوم بی‌ام‌او",
		"fifa_name": "Toronto Stadium",
		"city_en": "Toronto",
		"city_fa": "تورنتو",
		"country_en": "Canada",
		"country_fa": "کانادا",
		"capacity": 45000,
		"region": "Eastern",
		"lat": 43.6332,
		"lon": -79.4186
	},
	{
		"_id": "679c9c8a5749c4077500f013",
		"id": "13",
		"name_en": "BC Place",
		"name_fa": "استادیوم بی‌سی پلیس",
		"fifa_name": "BC Place Vancouver",
		"city_en": "Vancouver",
		"city_fa": "ونکوور",
		"country_en": "Canada",
		"country_fa": "کانادا",
		"capacity": 54000,
		"region": "Western",
		"lat": 49.2768,
		"lon": -123.1118
	},
	{
		"_id": "679c9c8a5749c4077500f014",
		"id": "14",
		"name_en": "Lumen Field",
		"name_fa": "استادیوم لومن فیلد",
		"fifa_name": "Seattle Stadium",
		"city_en": "Seattle",
		"city_fa": "سیاتل",
		"country_en": "United States",
		"country_fa": "آمریکا",
		"capacity": 69000,
		"region": "Western",
		"lat": 47.5952,
		"lon": -122.3316
	},
	{
		"_id": "679c9c8a5749c4077500f015",
		"id": "15",
		"name_en": "Levi's Stadium",
		"name_fa": "استادیوم لیوایز",
		"fifa_name": "San Francisco Bay Area Stadium",
		"city_en": "San Francisco Bay Area (Santa Clara)",
		"city_fa": "سن‌فرانسیسکو",
		"country_en": "United States",
		"country_fa": "آمریکا",
		"capacity": 71000,
		"region": "Western",
		"lat": 37.4030,
		"lon": -121.9700
	},
	{
		"_id": "679c9c8a5749c4077500f016",
		"id": "16",
		"name_en": "SoFi Stadium",
		"name_fa": "استادیوم سوفای",
		"fifa_name": "Los Angeles Stadium",
		"city_en": "Los Angeles (Inglewood)",
		"city_fa": "لس‌آنجلس",
		"country_en": "United States",
		"country_fa": "آمریکا",
		"capacity": 70000,
		"region": "Western",
		"lat": 33.9535,
		"lon": -118.3392
	}
]

export const MAP_BOUNDS = {
  lonMin: -175,
  lonMax: -7,
  latMin: 5,
  latMax: 85,
};