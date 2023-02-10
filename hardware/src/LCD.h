#include <Arduino.h>
#include <Wire.h> // Library for I2C communication
#include <LiquidCrystal_I2C.h> // Library for LCD
#include "connect.h"
// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x27, 16, 2);

void ShowLcd()
{
    get_data(doc);
    lcd.init();
    lcd.backlight();
    lcd.print("Hello, world!");
    lcd.setCursor(0, 1);
    lcd.print("Arduitronics.com");
}