#include <PubSubClient.h>
#include <WiFiClientSecure.h>
#include <WiFiManager.h>
#include <RTClib.h>
#include "HX711.h"

const int LOADCELL_DOUT_PIN = 16;
const int LOADCELL_SCK_PIN = 4;
char weight[8];

const char *mqtt_broker = "broker.emqx.io";
const char *mqtt_username = "emqx";
const char *mqtt_password = "public";
const int mqtt_port = 8883;
const int qos = 1;

int device_id;

WiFiClientSecure espClient;
PubSubClient client(espClient);

HX711 scale;

Preferences preferences;

const char *ca_cert = R"EOF(
-----BEGIN CERTIFICATE-----
MIIDjjCCAnagAwIBAgIQAzrx5qcRqaC7KGSxHQn65TANBgkqhkiG9w0BAQsFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBH
MjAeFw0xMzA4MDExMjAwMDBaFw0zODAxMTUxMjAwMDBaMGExCzAJBgNVBAYTAlVT
MRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j
b20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IEcyMIIBIjANBgkqhkiG
9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzfNNNx7a8myaJCtSnX/RrohCgiN9RlUyfuI
2/Ou8jqJkTx65qsGGmvPrC3oXgkkRLpimn7Wo6h+4FR1IAWsULecYxpsMNzaHxmx
1x7e/dfgy5SDN67sH0NO3Xss0r0upS/kqbitOtSZpLYl6ZtrAGCSYP9PIUkY92eQ
q2EGnI/yuum06ZIya7XzV+hdG82MHauVBJVJ8zUtluNJbd134/tJS7SsVQepj5Wz
tCO7TG1F8PapspUwtP1MVYwnSlcUfIKdzXOS0xZKBgyMUNGPHgm+F6HmIcr9g+UQ
vIOlCsRnKPZzFBQ9RnbDhxSJITRNrw9FDKZJobq7nMWxM4MphQIDAQABo0IwQDAP
BgNVHRMBAf8EBTADAQH/MA4GA1UdDwEB/wQEAwIBhjAdBgNVHQ4EFgQUTiJUIBiV
5uNu5g/6+rkS7QYXjzkwDQYJKoZIhvcNAQELBQADggEBAGBnKJRvDkhj6zHd6mcY
1Yl9PMWLSn/pvtsrF9+wX3N3KjITOYFnQoQj8kVnNeyIv/iPsGEMNKSuIEyExtv4
NeF22d+mQrvHRAiGfzZ0JFrabA0UWTW98kndth/Jsw1HKj2ZL7tcu7XUIOGZX1NG
Fdtom/DzMNU+MeKNhJ7jitralj41E6Vf8PlwUHBHQRFXGU7Aj64GxJUTFy8bJZ91
8rGOmaFvE7FBcf6IKshPECBV1/MUReXgRPTqh5Uykw7+U0b6LJ3/iyK5S9kJRaTe
pLiaWN0bfVKfjllDiIGknibVb63dDcY3fe0Dkhvld1927jyNxF1WW6LZZm6zNTfl
MrY=
-----END CERTIFICATE-----
)EOF";

void mqtt_callback(char *topic, byte *payload, unsigned int length) {
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  char char_payload[length];
  for (int i=0;i<length;i++) {
    Serial.print((char)payload[i]);
    char_payload[i] = payload[i];
  }
  device_id = atoi(char_payload);
  Serial.println("-----------------------");
  if (strcmp(topic, "emqx/vitu_pet-feeder/realTimeWeight") == 0) {
    client.publish("emqx/vitu_pet-feeder/realTimeWeightResponse", dtostrf(scale.get_units(10), 1, 2, weight));
    Serial.println("Message published to topic: emqx/vitu_pet-feeder/realTimeWeightResponse");
  } else if (strcmp(topic, "emqx/vitu_pet-feeder/reconnectDeviceWifi") == 0) {
    WiFiManager wm;
    wm.resetSettings();
    wm.setConfigPortalTimeout(120);
    if(!wm.startConfigPortal("VITU PET FEEDER.V1", "12345678")) {
      Serial.println("failed to connect and hit timeout");
      delay(3000);
      ESP.restart();
      delay(5000);
    }
    Serial.println("Connected again!!");
    setupMqtt();
  } else if (strcmp(topic, "emqx/vitu_pet-feeder/macAddress") == 0) {
    delay(1000);
    char esp32_unique_id[20];
    itoa(ESP.getEfuseMac(), esp32_unique_id, 10);
    bool published = client.publish("emqx/vitu_pet-feeder/macAddressResponse", esp32_unique_id);
    Serial.print(published);
    Serial.println("Message published to topic: emqx/vitu_pet-feeder/macAddressResponse");
  }
}

void setupScale() {
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  scale.set_scale(-375.5);
  scale.tare();
}

void setupMqtt() {
  espClient.setCACert(ca_cert);
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(mqtt_callback);
  while (!client.connected()) {
    String client_id = "esp32-client-";
    client_id += String(WiFi.macAddress());
    Serial.printf("The client %s connects to the public MQTT broker\n", client_id.c_str());
    if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
      Serial.println("Public EMQX MQTT broker connected");
    } else {
      Serial.print("failed with state ");
      Serial.println(client.state());
    }
  }
  client.subscribe("emqx/vitu_pet-feeder/realTimeWeight", qos);
  client.subscribe("emqx/vitu_pet-feeder/reconnectDeviceWifi", qos);
  client.subscribe("emqx/vitu_pet-feeder/macAddress", qos);
  delay(500); 
}

void setup() {
  WiFi.mode(WIFI_STA);
  Serial.begin(115200);
  WiFiManager wm;
  bool res;
  res = wm.autoConnect("VITU PET FEEDER.V1","12345678");
  if(!res) {
    Serial.println("Failed to connect");
    ESP.restart();
  }
  else {  
    Serial.println("Connected to WiFi! xD");
  }
  setupScale();
  setupMqtt();
}

void loop() {
  client.loop();
}