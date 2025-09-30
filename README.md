# TweenWave 🔌📡
#### GPIO Wi‑Fi + Sub‑GHz Module for Flipper Zero

[![PCB v2.0](https://img.shields.io/badge/PCB%20rev-v2.0-4caf50?style=for-the-badge)](#)
[![Firmware: Marauder 1.8.6](https://img.shields.io/badge/Firmware-Marauder%201.8.6-1976d2?style=for-the-badge)](#)

[![Radios: Wi‑Fi 2.4 GHz + 433 MHz](https://img.shields.io/badge/Radios-Wi%E2%80%91Fi%202.4%E2%80%89GHz%20%2B%20433%E2%80%89MHz-1f7a8c?style=for-the-badge)](#features)
[![ESP32 Marauder Supported](https://img.shields.io/badge/ESP32-Marauder%20supported-ff6f00?style=for-the-badge)](https://github.com/justcallmekoko/ESP32Marauder)
[![Designed in EasyEDA](https://img.shields.io/badge/PCB%20designed%20in-EasyEDA-0aa8f0?style=for-the-badge)](#)

A compact GPIO add‑on for Flipper Zero that combines 2.4 GHz Wi‑Fi and 433 MHz Sub‑GHz into one small board. Perfect for lab experiments, RF tinkering, and extending Flipper’s connectivity.

<table>
    <tr>
        <td align="center" width="50%">
            <img src="doc/final_1.jpg" alt="Real photo of TweenWave" width="95%"/><br/>
            <sub>Actual TweenWave module (real photo)</sub>
        </td>
        <td align="center" width="50%">
            <img src="doc/render_1.jpg" alt="Render of TweenWave" width="95%"/><br/>
            <sub>3D render of TweenWave (not a real photo)</sub>
        </td>
    </tr>
</table>

The module is designed to be as compact as possible, with replaceable antennas and the ability to remain permanently installed in the port.  
Two micro switches allow you to activate or deactivate the Wi‑Fi and Sub‑GHz radios, preventing unnecessary power draw when not in use.

> Photo of the TweenWave module plugged directly into the Flipper Zero GPIO port.  

<img src="doc/final_2.jpg" alt="Real photo of TweenWave" width="100%"/><br/>

> **ℹ️ NOTE ℹ️** 
>
> Gerber files, Bill of Materials (BOM), and Pick and Place data for manufacturing the GPIO Wi‑Fi + Sub‑GHz Module for Flipper Zero are located in the [./export](./export) directory of this repository.

---
## ✨ Highlights

- 🧩 Direct plug‑in to Flipper Zero GPIO
- 📶 Wi‑Fi 2.4 GHz via ESP32‑PICO‑V3‑02  
    - Compatible with ESP32 Marauder firmware
- 📻 Sub‑GHz 433 MHz via TI CC1101
- 📡 External antennas using 2× SMA female connectors (one for Wi‑Fi, one for 433 MHz)
- 🧱 Small footprint, careful RF layout
- 🔄 ESP32 firmware updatable over UART (USB‑TTL)

---

## 📋 Specifications

- Radios
    - Wi‑Fi: 2.4 GHz (ESP32‑PICO‑V3‑02)
    - Sub‑GHz: 433 MHz (TI CC1101)
- Antennas: 2× SMA female (Wi‑Fi + 433 MHz)
- Power: from Flipper GPIO (3V3, GND)
- Interfaces
    - ESP32: UART/Serial from Flipper GPIO (for control/logs), flashing via external USB‑TTL
    - CC1101: SPI bus (see schematic)
- Indicators: status/power LEDs as routed on PCB
- Compatibility: Flipper Zero with GPIO header

Note: exact pin mapping and signals are shown in the schematic below.

---

## ⚡ Quick Start

1. Attach suitable antennas:
     - 2.4 GHz antenna to the Wi‑Fi SMA
     - 433 MHz antenna to the Sub‑GHz SMA
2. Plug the module onto GPIO
3. Enable the Wi‑Fi or Sub‑GHz power switch on the module
4. Use Flipper’s serial/terminal to interact with ESP32 or integrate the CC1101 into your Sub‑GHz workflows

---

## 🛠️ ESP32 Marauder Firmware (short guide)

The firmware for this module is located in the `Firmware` directory of this repository. It is a fixed version of Marauder 1.8.6, modified to compile and upload for the ESP32-PICO-V3-02 chip used in this device. The project uses PlatformIO for building and flashing.

Precompiled `.bin` files are available in the repository releases as `MARAUDER_v1.8.6_ESP32_PICO_V3_02.zip`. The release contains:
- `bootloader.bin`
- `firmware.bin`
- `firmware.elf`
- `partitions.bin`

### Flashing precompiled binaries

1. Connect your ESP32-PICO-V3-02 module via USB-TTL to your computer.
2. Use [esptool.py](https://github.com/espressif/esptool) or similar tool to flash the binaries:
    ```sh
    esptool.py --chip esp32 --port /dev/ttyUSB0 --baud 460800 write_flash -z 0x1000 bootloader.bin 0x8000 partitions.bin 0x10000 firmware.bin
    ```
    Adjust the serial port as needed.

### Building and flashing with PlatformIO

1. Install [PlatformIO](https://platformio.org/) (VS Code extension or CLI).
2. Open the `Firmware` folder in PlatformIO.
3. Select the correct environment for ESP32-PICO-V3-02.
4. Click "Build" to compile the firmware.
5. Click "Upload" to flash directly to the chip.

For more details, see the PlatformIO documentation or the Marauder firmware README.


---

## 📐 Technical Views

<p align="center">
    <img src="doc/sch.png" alt="Schematic" width="95%"/>
</p>

<p align="center">
    <img src="doc/pcb.png" alt="PCB – top view" width="49%"/>
    <img src="doc/pcb2.png" alt="PCB – 3D/side view" width="49%"/>
</p>

---

## 📡 RF, Safety, and Compliance

- Use properly tuned antennas for 2.4 GHz and 433 MHz.
- Do not transmit without an antenna connected to avoid RF stage damage.
- Observe local regulations and duty‑cycle/ERP limits for ISM bands.
- Regulatory status: not certified. For lab/experimental use only. User is responsible for legal compliance and safe operation.
- Do not use in life‑support, safety‑critical, or mission‑critical systems.

---

## ❓ FAQ

- Does it support Marauder?  
    Yes. The ESP32‑PICO‑V3‑02 is wired for ESP32 Marauder support.

- Is CC1101 fixed to 433 MHz only?  
    The design and matching are optimized for 433 MHz. CC1101 can target other sub‑GHz bands, but follow the schematic/matching network and your local regulations.

- Where is the pinout?  
    See the schematic (doc/sch.png).

---

## 📦 Part List

| Comment                  | Designator                      | Footprint                        | JLCPCB Part #      |
|--------------------------|---------------------------------|----------------------------------|--------------------|
| 15pF                     | C39, C40                        | C0402                            | C106997            |
| 8.2pF                    | C32                             | C0402                            | C327205            |
| 56kΩ                     | R32                             | R0402                            | C25796             |
| TS-1088-AR02016          | BOOT, RESET                     | SW-SMD_L3.9-W3.0-P4.45           | C720477            |
| 220pF                    | C31, C34                        | C0402                            | C107001            |
| 22nH                     | L4                              | L0402                            | C12670             |
| 10K                      | R24, R25                        | R0603                            | C137819            |
| 26MHz                    | X5                              | CRYSTAL-SMD_4P-L3.2-W2.5-BL      | C15192             |
| 1.2pF                    | C12                             | C0201                            | C85895             |
| 100uF                    | C23, C24, C25, C26              | CASE-B_3528                      | C16133             |
| 1.5pF                    | C35                             | C0201                            | C161414            |
| -                        | RF3, RF4                        | SMA-SMD_BWSMA-KE-P001            | C496550            |
| 470Ω                     | R28, R29, R31, R33              | R0402                            | C25117             |
| 5.6pF                    | C33                             | C0402                            | C505468            |
| 27nH                     | L6, L7, L8                      | L0402-RD                         | C12669             |
| 100nF                    | C9, C15, C22, C36               | C0603                            | C14663             |
| CC1101RGPR               | U5                              | QFN-20_L4.0-W4.0-P0.5-TL-EP      | C29953             |
| 100nF                    | C27, C28                        | C0402                            | C60474             |
| ESP32-PICO-V3-02         | U4                              | QFN-48_L7.0-W7.0-P0.50-BL-EP5.1  | C908392            |
| MK-12D18-G020            | SW3, SW4                        | SW-TH_MK-12D18-G040              | C3019727           |
| 10uF                     | C10, C14                        | C0603                            | C85713             |
| 1.8nH                    | L9                              | L0201-RD                         | C98040             |
| 3.9pF                    | C29, C30                        | C0402                            | C1566              |
| TZ-P2-0402RTIA1-0.45T    | LED4, LED5, RX, TX              | LED0402-RD_RED                   | C779449            |

## 👨‍💻 Authors

* Author of PCB, CASE and Marauder (port for ESP32 PICO V3 02): __0xM4R71N__
* Original author of ESP32 Marauder firmware: __justcallmekoko__
* Additional authors of Evil portal HTML files: see [portals/README.md](./portals/README.md)

---

## 📜 License and Disclaimer

Summary (non‑binding): personal, non‑commercial use only; no warranty; you are responsible for safe use and legal compliance.

Legal terms:

- License (Non‑Commercial, Personal, Attribution)
    - Copyright (c) 2025 Martin Krčma (0xM4R71N)
    - Permission is granted to use, view, and modify the hardware design files for personal, experimental, and non‑commercial purposes only.
    - Commercial manufacturing, distribution, or sale of the hardware, derivatives, or prebuilt devices is prohibited without prior written consent from the author.
    - When redistributing modified files for personal/non‑commercial use, retain this notice and attribute “0xM4R71N”.
- Warranty Disclaimer
    - The design, files, and documentation are provided “AS IS”, without warranties or conditions of any kind, express or implied, including but not limited to merchantability, fitness for a particular purpose, and non‑infringement.
- Limitation of Liability
    - To the maximum extent permitted by law, in no event shall the author or contributors be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, loss of use, data, business, or profits; personal injury; property damage; or regulatory penalties) arising from or related to the use, misuse, or inability to use this design, even if advised of the possibility of such damages.
- User Responsibility and Compliance
    - You are solely responsible for evaluation, safe assembly, testing, operation, and compliance with applicable laws, regulations, and standards (including RF spectrum use and EMC).
    - Not intended for life‑support, safety‑critical, or high‑risk environments.
- Miscellaneous
    - This notice is not legal advice. For commercial licensing or special permissions, contact the author.
    - Trademarks (e.g., “Flipper Zero”, “ESP32”) belong to their respective owners and are used for identification only.
