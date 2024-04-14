/*
  WiFiAccessPoint.ino creates a WiFi access point and provides a web server on it.

  Steps:
  1. Connect to the access point "yourAp"
  2. Point your web browser to http://192.168.4.1/H to turn the LED on or http://192.168.4.1/L to turn it off
     OR
     Run raw TCP "GET /H" and "GET /L" on PuTTY terminal with 192.168.4.1 as IP address and 80 as port

  Created for arduino-esp32 on 04 July, 2018
  by Elochukwu Ifediora (fedy0)
*/

#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>

#define LED_BUILTIN 2   // Set the GPIO pin where you connected your test LED or comment this line out if your dev board has a built-in LED

// Set these to your desired credentials.
const char *ssid = "yourAP";
const char *password = "yourPassword";
String header;
String requestBody;
String wifiSsid;
String wifiPassword;
String reqType;
String uri;

WiFiServer server(80);

void handleCredentials() {
  WiFi.mode(WIFI_AP);
  Serial.println("Configuring access point...");

  // You can remove the password parameter if you want the AP to be open.
  // a valid password must have more than 7 characters
  if (!WiFi.softAP(ssid, password)) {
    log_e("Soft AP creation failed.");
    while(1);
  }

  IPAddress myIP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(myIP);
  server.begin();

  Serial.println("Server started");
  while(wifiSsid == "" && wifiPassword == "") {
    WiFiClient client = server.available();   // listen for incoming clients
    header = "";
    requestBody = "";
    if (client) {                             // if you get a client,
      Serial.println("New Client.");           // print a message out the serial port
      String currentLine = "";                // make a String to hold incoming data from the client
      while (client.connected()) {            // loop while the client's connected
        if (client.available()) {           // if there's bytes to read from the client,
          char c = client.read();             // read a byte, then
          Serial.write(c);
          header += c;                   // print it out the serial monitor
          if (c == '\n') {                    
            if (currentLine.length() == 0) {
              int contentLength = header.indexOf("Content-Length: ");
              if (contentLength != -1) {
                int endOfContentLength = header.indexOf("\r\n", contentLength);
                if (endOfContentLength != -1) {
                  contentLength = header.substring(contentLength + 16, endOfContentLength).toInt();
                  int bodyRead = 0;
                  while (bodyRead < contentLength && client.available()) {
                    char c = client.read();
                    requestBody += c;
                    bodyRead++;
                  }
                }
              }
              client.println("HTTP/1.1 200 OK");
              client.println("Content-type:text/html");
              client.println();
              client.println("bora");
              break;
            } else {    // if you got a newline, then clear currentLine:
              currentLine = "";
            }
          } else if (c != '\r') {  // if you got anything else but a carriage return character,
            currentLine += c;      // add it to the end of the currentLine
          } 
          if (currentLine.endsWith("POST /credentials")) {
            uri = "credentials";
            reqType = "POST";
          } 
        }
      }
      if(reqType == "POST" && uri == "credentials") {
        String wifiSsidNotFormatted = requestBody.substring(0, 32);
        int ssidLength = requestBody.substring(33, 35).toInt();
        wifiSsid = wifiSsidNotFormatted.substring(0, ssidLength);
        String wifiPasswordNotFormatted = requestBody.substring(36, 99);
        int passwordLength = requestBody.substring(100, 102).toInt();
        wifiPassword = wifiPasswordNotFormatted.substring(0, passwordLength);
        Serial.print("WIFI SSID: ");
        Serial.println(wifiSsid);
        Serial.print("WIFI SSID LENGTH: ");
        Serial.println(ssidLength);
        Serial.print("WIFI PASSWORD: ");
        Serial.println(wifiPassword);
        Serial.print("WIFI PASSWORD LENGTH: ");
        Serial.println(passwordLength);
      }
      Serial.println("---------------------");
      Serial.println("REQUEST BODY:");
      Serial.println(requestBody);
      Serial.println("---------------------");
      client.stop();
      Serial.println("Client Disconnected.");
      Serial.println("===================================");
    }
  }
  Serial.println("CREDENCIAIS SALVAS COM SUCESSO");
}

void connectToWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(wifiSsid, wifiPassword);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi CONECTADO");
}


void setup() {
  pinMode(LED_BUILTIN, OUTPUT);

  Serial.begin(115200);
  Serial.println();
  //WiFi.disconnect();
  handleCredentials();
  connectToWiFi();
  
}

void loop() {
  
}
