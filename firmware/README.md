# ESP32 Marauder Firmware

> ⚡ **Based on [ESP32 Marauder](https://github.com/justcallmekoko/ESP32Marauder) by [justcallmekoko](https://github.com/justcallmekoko)**
>
> This is a custom port adapted for the **TwinWave** module with `ESP32-PICO-V3-02` chip.
> All credit for the original firmware goes to the Marauder project and its contributors.

📖 For complete project documentation, see the [main README](../README.md)

---

## 📋 Overview

| Property | Value |
|----------|-------|
| **Base Firmware** | ESP32 Marauder v1.10.2 |
| **Target Chip** | ESP32-PICO-V3-02 |
| **Flash Size** | 8MB |
| **Framework** | Arduino (PlatformIO) |
| **Board Config** | `GENERIC_ESP32` |

---

## ⚡ Quick Start

### Option 1: Flash Precompiled Binaries

Download the latest release: **`MARAUDER-vX.Y.Z-ESP32-PICO-V3-02.zip`**

The package contains:
- `bootloader.bin` – ESP32 bootloader
- `firmware.bin` – Main firmware image
- `partitions.bin` – Partition table

**Flash using esptool:**

```bash
# Install esptool
pip install esptool

# Flash firmware (adjust port as needed)
esptool --chip esp32 --port /dev/cu.usbserial-0001 --baud 115200 write-flash -z \
    0x1000 bootloader.bin \
    0x8000 partitions.bin \
    0x10000 firmware.bin
```

> **Port examples:** `/dev/cu.usbserial-*` (macOS), `/dev/ttyUSB0` (Linux), `COM3` (Windows)

### Option 2: Build from Source

1. **Install PlatformIO** – [VS Code extension](https://platformio.org/install/ide?install=vscode) or CLI
2. **Open this folder** in VS Code with PlatformIO
3. **Connect USB-TTL adapter** to the TwinWave GPIO pins (see pinout below)
4. **Enter flash mode** – Hold BOOT, press RESET, release both
5. **Click Upload** (→) in PlatformIO toolbar

---

## 🔌 UART Connection (Flashing)

Connect a USB-TTL adapter (CP2102, CH340, FT232) to the **10-pin header** on the bottom of TwinWave PCB:

| TwinWave Pin | USB-TTL Adapter |
|---------------|-----------------|
| Pin 1 (3V3)   | VCC ⚠️ **3.3V only!** |
| Pin 3 (GND)   | GND |
| Pin 5 (RX)    | TX |
| Pin 6 (TX)    | RX |

> ⚠️ **Warning:** Using 5V will permanently damage the ESP32!

### Enter Flash Mode

1. Hold **BOOT** button
2. Press **RESET** button
3. Release both buttons
4. The module is now in flash mode

---

### PlatformIO Settings

Key settings from [platformio.ini](platformio.ini):

```ini
platform = espressif32@5.2.0
board = esp32dev
framework = arduino
board_build.flash_mode = dio
board_build.partitions = default_8MB.csv
board_upload.flash_size = 8MB
```

### Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| NimBLE-Arduino | ^1.4.1 | Bluetooth Low Energy |
| LinkedList | 0.0.0-alpha | Data structures |
| ESP32Ping | ^1.7 | Network diagnostics |
| AsyncTCP | latest | Async TCP connections |
| ESPAsyncWebServer | latest | Web server for Evil Portal |
| ArduinoJson | ^6.19.4 | JSON parsing |
| Adafruit MAX1704X | ^1.0.3 | Battery monitoring |
| MicroNMEA | ^2.0.6 | GPS parsing |
| EspSoftwareSerial | ^8.2.0 | Software serial communication |

---

## ⚠️ Troubleshooting

### Upload fails / "Failed to connect"

- Ensure you're in **flash mode** (BOOT + RESET sequence)
- Check USB-TTL connections (TX↔RX crossed)
- Try lower baud rate: `upload_speed = 57600`
- Verify correct serial port in `platformio.ini`

### "No serial data available"

- Check baud rate is **115200**
- Verify TX/RX connections
- Try different USB-TTL adapter

### Build errors

- Run `pio pkg update` to update libraries
- Clean build: `pio run -t clean`
- Check PlatformIO version compatibility

---

## 📜 Credits & License

- **Original Firmware:** [justcallmekoko](https://github.com/justcallmekoko) – ESP32 Marauder
- **Port/Adaptation:** [0xM4R71N](https://github.com/0xMartin) – ESP32-PICO-V3-02 adaptation

> ⚖️ This firmware is subject to the original [ESP32 Marauder license](https://github.com/justcallmekoko/ESP32Marauder). See the original repository for license terms.

---

## 🔗 Links

- 🏠 [TwinWave Project](https://github.com/0xMartin/TwinWave)
- 🌐 [Project Website](https://0xmartin.github.io/TwinWave/)
- 📖 [ESP32 Marauder Wiki](https://github.com/justcallmekoko/ESP32Marauder/wiki)
- 🛠️ [PlatformIO Documentation](https://docs.platformio.org/)
