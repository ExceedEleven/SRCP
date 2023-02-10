#include <Arduino.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <Wire.h>
#include "connect.h"
#include <ESP32servo.h>

#define servo0 19
#define ldr0 32
#define ldr1 33
bool is_park[2] = {false};
bool door_state[2] = {false}; //false is open
int ldr_reading0 = 4000, ldr_reading1 = 4000;
Servo myservo0, myservo1;

TaskHandle_t control_handle = NULL;
TaskHandle_t door_handle = NULL;
TaskHandle_t ldr_handle = NULL;

void ldr_control(void* param)
{
  while (1)
  {
    ldr_reading0 = analogRead(ldr0);
    ldr_reading1 = analogRead(ldr1);
    if (ldr_reading0 < 2000)
      is_park[0] = true;
    else 
      is_park[0] = false;
    
    if (ldr_reading1)
      is_park[1] = true;
    else 
      is_park[1] = false;
    Serial.print(is_park[0]);
    Serial.println(is_park[1]);
    vTaskDelay(1000/portTICK_PERIOD_MS);
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
        DynamicJsonDocument doc(2048);
        //get data from doc to global var
        // get_data(doc);

        // put_data();
        vTaskDelay(1000/portTICK_PERIOD_MS);
    }

}

void setup() {
  Serial.begin(115200);
  myservo0.attach(servo0);
  connectWifi();
  xTaskCreatePinnedToCore(control, "main_control",10000,NULL,1,&control_handle,1);
  xTaskCreatePinnedToCore(ldr_control, "ldr_control",2000, NULL, 1,&ldr_handle,0);
  xTaskCreatePinnedToCore(door_control, "door control",2000, NULL, 1, &door_handle,0);

}

void loop() {
  // does nothing currently
}