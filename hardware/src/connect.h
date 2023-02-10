#include <Arduino.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "SCPR";
const char* password = "88888888";
// const char* ssid = "AZEUS 7671";
// const char* password = "9225iC:3";
const String baseUrl = "http://group11.exceed19.online";

// void get_data(DynamicJsonDocument &doc0, DynamicJsonDocument &doc1,  DynamicJsonDocument &doc2, DynamicJsonDocument &doc3,String is_park[2])
void get_data(String park_state[2], bool door_state[2],String is_park[2])
{

	// park_state[0] = doc0["result"]["state"].as<String>();
    //     park_state[1] = doc1["result"]["state"].as<String>();
    //     Serial.println(doc0["result"].as<String>());
    //     door_state[0] = doc2["result"].as<bool>();
    //     door_state[1] = doc3["result"].as<bool>();
	const String url0 = baseUrl + "/park/0";
	const String url1 = baseUrl + "/park/1";
	const String url2 = baseUrl + "/park/barrier/0/"+ is_park[0] ;
	const String url3 = baseUrl + "/park/barrier/1/"+ is_park[1] ;
	DynamicJsonDocument doc0(2048);
	DynamicJsonDocument doc1(2048);
	DynamicJsonDocument doc2(2048);
	DynamicJsonDocument doc3(2048);

	String payload0;
	String payload1;
	String payload2;
	String payload3;
	HTTPClient http0;
	HTTPClient http1;
	HTTPClient http2;
	HTTPClient http3;
	http0.begin(url0);
	http1.begin(url1);
	http2.begin(url2);
	http3.begin(url3);

	int httpCode;

	httpCode = http2.GET();
	payload2 = http2.getString();
	deserializeJson(doc2,payload2);
	door_state[0] = doc2["result"].as<bool>();
	httpCode = http3.GET();
	payload3 = http3.getString();
	deserializeJson(doc3,payload3);
	door_state[1] = doc3["result"].as<bool>();

	httpCode = http0.GET();
	if (httpCode >= 200 && httpCode < 300) {
		Serial.println("GET doc0 OK");
		payload0 = http0.getString();
		deserializeJson(doc0, payload0);
		park_state[0] = doc0["result"]["state"].as<String>();
		
	} else {
		Serial.print("ERROR doc0: ");
		Serial.println(httpCode);
	}
	httpCode = http1.GET();
	if (httpCode >= 200 && httpCode < 300) {
		Serial.println("GET doc1 OK");
		payload1 = http1.getString();
		deserializeJson(doc1, payload1);
		park_state[1] = doc1["result"]["state"].as<String>();
		
	} else {
		Serial.print("ERROR doc1: ");
		Serial.println(httpCode);
	}


}

void put_data() {
	const String url = baseUrl + "";
	DynamicJsonDocument doc_put(2048);
	String json;
	// populate doc
	serializeJson(doc_put, json);
	HTTPClient http;
	http.begin(url);
	http.addHeader("Content-Type", "application/json");
	int httpCode = http.PUT(json);
	if (httpCode >= 200 && httpCode < 300) {
		Serial.println("PUT OK");
	} else {
		Serial.print("PUT ERROR : ");
		Serial.println(httpCode);
	}
}

void connectWifi() {
	WiFi.begin(ssid, password);
	Serial.println("Connecting to WiFi");
	while (WiFi.status() != WL_CONNECTED) {
		vTaskDelay(500/portTICK_PERIOD_MS);
		Serial.print(".");
	}
	Serial.print("Connected, IP = ");
	Serial.println(WiFi.localIP());
}
