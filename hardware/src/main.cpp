#include <Arduino.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <ESP32servo.h>
#include "connect.h"
#include "LCD.h"
#define servo0 25
#define servo1 26
#define ldr0 32
#define ldr1 33

String is_park[2];
String park_state[2];
bool door_state[2] = {false}; //false is close

int ldr_reading0 = 4000, ldr_reading1 = 4000;
Servo myservo0;
Servo myservo1;
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
    Serial.print("ldr0 : ");
    Serial.println(ldr_reading0);
    Serial.print("ldr1 : ");
    Serial.println(ldr_reading1);
    if (door_state[0]) //door close
    {
      if (ldr_reading0 < 3000)
        is_park[0] = "parked";
      else 
      {
        if (park_state[0] == "reserved")is_park[0] = "reserved";
        else is_park[0] = "empty";
      }
    }
    else //door open
    {
      if (ldr_reading0 < 3000)
        is_park[0] = "parked";
      else 
      {
        if (park_state[0] == "reserved")is_park[0] = "reserved";
        else is_park[0] = "empty";
      }
    }  
    //door1
    if (door_state[1])
    {
      if (ldr_reading1 < 2300)
        is_park[1] = "parked";
      else 
      {
        if (park_state[1] == "reserved")is_park[1] = "reserved";
        else is_park[1] = "empty";
      }
    }
    else //door open
    {
      if (ldr_reading1 < 2300)
        is_park[1] = "parked";
      else 
      {
        if (park_state[1] == "reserved")is_park[1] = "reserved";
        else is_park[1] = "empty";
      }
    }  

    // Serial.print(is_park[0]);
    // Serial.println(is_park[1]);
    vTaskDelay(100/portTICK_PERIOD_MS);
  }
}
void door_control(void* param)
{
  while(1)
  {
    if (door_state[0] == false)
    {
      // Serial.println("----------------------------------------");
      myservo0.write(0);

    }
    else if (door_state[0] == true)
    {
      // Serial.println("-------------------1---------------------");
      myservo0.write(90);
    }

    if (door_state[1] == false)
    {
      // Serial.println("----------------------------------------");
      myservo1.write(0);
    }
    else if (door_state[1] == true)
    {
      myservo1.write(90);
      // Serial.println("-------------------2---------------------");
    }
    vTaskDelay(100/portTICK_PERIOD_MS);
    
  }
}
void control(void* param)
{
    while(1)
    {
        get_data(park_state,door_state,is_park);
        
        
        Serial.print("door0 state : ");
        Serial.println(door_state[0]);
        Serial.print("door1 state : ");
        Serial.println(door_state[1]);
        // put_data();
        vTaskDelay(100/portTICK_PERIOD_MS);
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