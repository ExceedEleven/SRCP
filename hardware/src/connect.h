#include <Arduino.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "SCPR";
const char* password = "88888888";
// const char* ssid = "AZEUS 7671";
// const char* password = "9225iC:3";
const String baseUrl = "http://group11.exceed19.online";

void get_data(DynamicJsonDocument &doc0, DynamicJsonDocument &doc1) {
	const String url0 = baseUrl + "/park/0";
	const String url1 = baseUrl + "/park/1";
	String payload0;
	String payload1;
	HTTPClient http0;
	HTTPClient http1;
	http0.begin(url0);
	http1.begin(url1);
	int httpCode = http0.GET();
	if (httpCode >= 200 && httpCode < 300) {
		Serial.println("GET doc0 OK");
		payload0 = http0.getString();
		deserializeJson(doc0, payload0);
		
	} else {
		Serial.print("ERROR doc0: ");
		Serial.println(httpCode);
	}
	httpCode = http1.GET();
	if (httpCode >= 200 && httpCode < 300) {
		Serial.println("GET doc1 OK");
		payload1 = http1.getString();
		deserializeJson(doc1, payload1);
		
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
