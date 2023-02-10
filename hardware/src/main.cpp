#include <Arduino.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include "connect.h"

TaskHandle_t control_handle = NULL;

void control(void* param)
{
    while(1)
    {
        DynamicJsonDocument doc(2048);
        //get data from doc to global var
        get_data(doc);
        //xTask(check_door, 1);
    }
}

void setup() {
  Serial.begin(115200);
  connectWifi();
}

void loop() {
  // does nothing currently
}