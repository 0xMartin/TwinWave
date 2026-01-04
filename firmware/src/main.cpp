#include "configs.h"

#include "EvilPortal.h"
#include "esp_system.h"
#include "esp_wifi.h"
#include "esp_wifi_types.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include <Arduino.h>
#include <WiFi.h>
#include <Wire.h>
#include <stdio.h>

#include "Assets.h"
#include "WiFiScan.h"
#include "Buffer.h"

#include "CommandLine.h"
#include "settings.h"

WiFiScan wifi_scan_obj;
EvilPortal evil_portal_obj;
Buffer buffer_obj;
Settings settings_obj;
CommandLine cli_obj;

const String PROGMEM version_number = MARAUDER_VERSION;

uint32_t currentTime = 0;

void setup()
{
#ifndef HAS_DUAL_BAND
    esp_spiram_init();
#endif

    Serial.begin(115200);

    while (!Serial)
        delay(10);

    Serial.println("ESP-IDF version is: " + String(esp_get_idf_version()));

    settings_obj.begin();
    buffer_obj = Buffer();

    wifi_scan_obj.RunSetup();
    evil_portal_obj.setup();
    wifi_scan_obj.StartScan(WIFI_SCAN_OFF);

    Serial.println(F("CLI Ready"));
    cli_obj.RunSetup();
}

void loop()
{
    currentTime = millis();
    bool mini = false;

    // Update all of our objects
    cli_obj.main(currentTime);
    wifi_scan_obj.main(currentTime);

    // Save buffer to SD and/or serial
    buffer_obj.save();
    settings_obj.main(currentTime);

    delay(50);
}
