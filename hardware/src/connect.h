#include <Arduino.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
const char* ssid = "AZEUS 7671";
const char* password = "9225iC:3";

const String baseUrl = "";

void get_data(DynamicJsonDocument &doc) {
	const String url = baseUrl + "";
	String payload;
	HTTPClient http;
	http.begin(url);
	int httpCode = http.GET();
	if (httpCode >= 200 && httpCode < 300) {
		Serial.println("GET OK");
		payload = http.getString();
		deserializeJson(doc, payload);
		// actions on doc
	} else {
		Serial.print("ERROR : ");
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
		delay(500);
		Serial.print(".");
	}
	Serial.print("Connected, IP = ");
	Serial.println(WiFi.localIP());
}
