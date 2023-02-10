#include <Arduino.h>
#include <Wire.h> // Library for I2C communication
#include <LiquidCrystal_I2C.h> // Library for LCD
#include <ArduinoJson.h>
// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x27, 16, 2);


void ShowLcd(String park_state[2])
{
    
    int count = 0;

    for(int i =0; i< 2;i++){
        
        if (park_state[i] == "empty"){
            count++;
        }
        
    }
    lcd.init();
    lcd.backlight();
    lcd.print("Park remain ");
    lcd.setCursor(0,1);
    lcd.print(count);

}