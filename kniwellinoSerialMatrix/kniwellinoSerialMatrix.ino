#include <Kniwwelino.h>

String inputString = "";

void setup() {
  Kniwwelino.begin("yo", false, true, false); // Wifi=false, Fastboot=true, MQTT logging false
  inputString.reserve(26);
  Serial.println("waiting for data...");
  Kniwwelino.MATRIXdrawIcon("0b1001110011100111001110011");
}

void loop() {
  while (Serial.available()) {
    char inChar = (char) Serial.read();
    if (inChar != '|') {
      inputString += inChar;
    }
    else {
      Serial.println(inputString);
      Kniwwelino.MATRIXdrawIcon(inputString);
      inputString = "";
    }
  }

  Kniwwelino.sleep(20);
  Kniwwelino.loop();
}
