#include <Arduino.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <ESP32servo.h>
#include "connect.h"
#include "LCD.h"
#define servo0 19
#define servo1 18
#define ldr0 32
#define ldr1 33

bool is_park[2] = {false};
String park_state[2];
bool door_state[2] = {false}; //false is open


int ldr_reading0 = 4000, ldr_reading1 = 4000;
Servo myservo0, myservo1;

TaskHandle_t control_handle = NULL;
TaskHandle_t door_handle = NULL;
TaskHandle_t ldr_handle = NULL;
TaskHandle_t lcd_handle = NULL;

void lcd_control(void* param)
{
  while (1)
  {
    ShowLcd(park_state);
  }
}
void ldr_control(void* param)
{
  while (1)
  {
    ldr_reading0 = analogRead(ldr0);
    ldr_reading1 = analogRead(ldr1);
    // Serial.print("ldr1 : ");
    // Serial.println(ldr_reading0);
    // Serial.print("ldr2 : ");
    // Serial.println(ldr_reading1);
    if (ldr_reading0 < 2000)
      is_park[0] = true;
    else 
      is_park[0] = false;
    
    if (ldr_reading1 < 2000)
      is_park[1] = true;
    else 
      is_park[1] = false;
    Serial.print(is_park[0]);
    Serial.println(is_park[1]);
    vTaskDelay(200/portTICK_PERIOD_MS);
  }
}
void door_control(void* param)
{
  while(1)
  {
    if (door_state[0] == false)
    {
      myservo0.write(0);

    }
    else if (door_state[0] == true)
    {
      myservo0.write(110);
    }

    if (door_state[1] == false)
    {
      myservo1.write(0);
    }
    else if (door_state[1] == true)
    {
      myservo1.write(110);
    }
    vTaskDelay(1000);
  }
}
void control(void* param)
{
    while(1)
    {
        DynamicJsonDocument doc0(2048);
        DynamicJsonDocument doc1(2048);
        get_data(doc0, doc1);
        park_state[0] = doc0["result"]["state"].as<String>();
        park_state[1] = doc1["result"]["state"].as<String>();
        door_state[0] = doc0["result"]["is_open"].as<bool>();
        door_state[1] = doc1["result"]["is_open"].as<bool>();

        // put_data();
        vTaskDelay(1000/portTICK_PERIOD_MS);
    }

}

void setup() {
  Serial.begin(115200);

  myservo0.attach(servo0);
  myservo1.attach(servo1);
  connectWifi();
  xTaskCreatePinnedToCore(control, "main control",10000,NULL,1,&control_handle,1);
  xTaskCreatePinnedToCore(ldr_control, "ldr control",2000, NULL, 1,&ldr_handle,0);
  xTaskCreatePinnedToCore(door_control, "door control",2000, NULL, 1, &door_handle,0);
  xTaskCreatePinnedToCore(lcd_control, "lcd control", 2000, NULL, 1, &lcd_handle, 0);
}

void loop() {
  // does nothing currently
}