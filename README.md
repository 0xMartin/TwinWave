<div align="center">

<img src="media/logo.png" alt="TwinWave Logo" width="70%"/>

#### Wi‑Fi & Sub‑GHz GPIO Module for Flipper Zero

🌐 **[View Project Website](https://0xmartin.github.io/TwinWave/)** 🌐

📋 **[View PCB Project on OSHWLab](https://oshwlab.com/martin.krcma1/flipper-wifi-and-433mhz-shield)** 📋

[![PCB v2.1](https://img.shields.io/badge/PCB%20rev-v2.1-4caf50?style=flat-square)](#)
[![Firmware: Marauder 1.8.6](https://img.shields.io/badge/Firmware-Marauder%201.8.6-1976d2?style=flat-square)](#)
[![Radios: Wi‑Fi 2.4 GHz + 433 MHz](https://img.shields.io/badge/Radios-Wi%E2%80%91Fi%202.4%E2%80%89GHz%20%2B%20433%E2%80%89MHz-1f7a8c?style=flat-square)](#features)
[![Designed in EasyEDA](https://img.shields.io/badge/PCB%20designed%20in-EasyEDA-0aa8f0?style=flat-square)](#)

Compact GPIO module designed for Flipper Zero, combining 2.4 GHz Wi-Fi and 433 MHz Sub-GHz.

</div>

<div align="center">

<table>
<tr>
<td align="center" width="50%">
<img src="media/product/final_2.jpg" alt="Real photo of TwinWave" width="92%"/>
</td>
<td align="center" width="50%">
<img src="media/product/final_3.jpg" alt="Real photo of TwinWave" width="92%"/>
</td>
</tr>
</table>

<br>

<a href="https://youtu.be/bnLjusv_fXI">
    <img src="media/yt_video_thumb_2.jpg" alt="Watch the video" width="70%"/>
</a>

<br>

<sub><em>📺 Click to watch TwinWave in action on YouTube</em></sub>

</div>

<br>

The module is designed to be **as compact as possible**, with replaceable antennas and the ability to remain permanently installed in the port. Two micro switches allow you to activate or deactivate the Wi‑Fi and Sub‑GHz radios, preventing unnecessary power draw when not in use.


<br>

> [!IMPORTANT]
> ### 📦 Manufacturing Files & Project
> 
> - **PCB Manufacturing:** Gerber files, Bill of Materials (BOM), and Pick and Place data for PCB manufacturing are available in the **[./hardware/export](./hardware/export)** directory.
> - **EasyEDA Project:** The complete PCB project can be found in the **[./hardware](./hardware)** directory and can be opened in **EasyEDA Pro**.

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🔌 Hardware
- **Direct GPIO plug-in** – No wiring needed
- **Dual radios** – Wi‑Fi 2.4 GHz + Sub‑GHz 433 MHz
- **Replaceable antennas** – 2× SMA female connectors
- **Power switches** – Independent Wi‑Fi/Sub‑GHz control
- **Compact design** – Optimized RF layout

</td>
<td width="50%">

### 💻 Software & Chips
- **ESP32-PICO-V3-02** – Wi‑Fi connectivity
- **TI CC1101** – Sub‑GHz transceiver
- **Marauder compatible** – ESP32 Marauder support
- **Easy updates** – UART firmware flashing
- **Status LEDs** – Visual indicators

</td>
</tr>
</table>

---

## 📋 Technical Specifications

| Category | Details |
|----------|----------|
| **Radios** | Wi‑Fi 2.4 GHz (ESP32‑PICO‑V3‑02) <br> Sub‑GHz 433 MHz (TI CC1101) |
| **Antennas** | 2× SMA female connectors (Wi‑Fi + 433 MHz) |
| **Power** | Supplied from Flipper GPIO (3.3V, GND) |
| **ESP32 Interface** | UART/Serial via Flipper GPIO <br> Firmware update via external USB‑TTL |
| **CC1101 Interface** | SPI bus (shared with Flipper) |
| **Indicators** | Status and power LEDs |
| **Compatibility** | Flipper Zero with GPIO header |
| **Dimensions** | Compact form factor, designed for permanent installation |

---

## ⚡ Power Consumption

<details>
<summary><b>📊 Click to view Power Consumption Measurements</b></summary>

<br>

Power consumption measured using oscilloscope in different operating modes:

<div align="center">

<table>
    <tr>
        <td align="center">
            <img src="media/graph/graph_esp32_evil_portal.png" alt="Power consumption - Evil Portal mode" width="95%"/><br/>
            <sub><strong>Evil Portal Mode</strong> – Power consumption during Evil Portal operation</sub>
        </td>
    </tr>
    <tr>
        <td align="center">
            <img src="media/graph/graph_esp32_deauth.png" alt="Power consumption - ESP32 Deauth" width="95%"/><br/>
            <sub><strong>ESP32 Deauth Detail</strong> – Detailed ESP32 power draw during deauthentication activity</sub>
        </td>
    </tr>
    <tr>
        <td align="center">
            <img src="media/graph/graph_c1101.png" alt="Power consumption - CC1101 Detail" width="95%"/><br/>
            <sub><strong>CC1101 Detail</strong> – Detailed CC1101 power draw during read/replay activity</sub>
        </td>
    </tr>
</table>

</div>

> [!NOTE]
> These measurements help you understand the power requirements when using the module with Flipper Zero. Use the power switches to disable unused radios and save battery.

</details>

---

## ⚙️ Quick Start Guide

### Step-by-Step

1. **📡 Attach Antennas**
   - Connect 2.4 GHz antenna to the Wi‑Fi SMA connector
   - Connect 433 MHz antenna to the Sub‑GHz SMA connector

2. **🔌 Install Module**
   - Carefully plug the module onto Flipper Zero's GPIO header
   - Ensure proper alignment and secure connection

3. **⚡ Enable Radios**
   - Use micro switches to enable Wi‑Fi and/or Sub‑GHz as needed
   - LEDs will indicate active radios

4. **🚀 Start Experimenting**
   - Use Flipper's serial/terminal to interact with ESP32
   - Integrate CC1101 into your Sub‑GHz workflows

> [!WARNING]
> **Never transmit without antennas connected!** This can damage the RF stages.

---

## 🛠️ ESP32 Marauder Firmware

> [!NOTE]
> The firmware is a **port** of [ESP32 Marauder](https://github.com/justcallmekoko/ESP32Marauder) (v1.8.6) by **justcallmekoko**, specifically adapted for the `ESP32-PICO-V3-02` chip.

### 📥 Downloads & Flashing

Download precompiled binaries from repository releases: **`MARAUDER_vX.Y.Z_ESP32_PICO_V3_02.zip`**

#### ⚡ Web Flasher (Recommended)

The easiest way to flash firmware — directly from your browser, no installation required!

**[🚀 Open Web Flasher](https://0xmartin.github.io/TwinWave/flash.html)**

- ✓ Automatically downloads the latest firmware version
- ✓ Supports custom firmware upload
- ✓ Works in Chrome, Edge, and Opera browsers
- ✓ Step-by-step wizard guides you through the process

📖 **For manual flashing instructions and build guide, see [`firmware/README.md`](./firmware/README.md)**

---

## 📐 Technical Documentation

<details>
<summary><b>🔍 Click to view Schematic</b></summary>

<br>

<div align="center">
    <img src="media/schematic/sch.png" alt="Circuit Schematic" width="95%"/>
    <sub><em>Complete circuit schematic with pinout details</em></sub>
</div>

</details>

<details>
<summary><b>🔍 Click to view PCB Design</b></summary>

<br>

<div align="center">
    <table>
        <tr>
            <td align="center" width="50%">
                <img src="media/schematic/pcb.png" alt="PCB Top View" width="95%"/><br/>
                <sub><strong>Top View</strong> – Component placement</sub>
            </td>
            <td align="center" width="50%">
                <img src="media/schematic/pcb2.png" alt="PCB 3D View" width="95%"/><br/>
                <sub><strong>3D View</strong> – Layout visualization</sub>
            </td>
        </tr>
    </table>
</div>

</details>

---

## ⚠️ RF Safety & Compliance

> [!WARNING]
> **Important Safety Information**

### 📻 RF Safety
- ✅ Use properly tuned antennas for 2.4 GHz and 433 MHz
- ❌ **NEVER transmit without antenna connected** – can damage RF stages
- 📏 Observe local regulations and duty‑cycle/ERP limits for ISM bands
- 🔬 **Lab/experimental use only** – not certified for commercial use

### ⚖️ Legal Compliance
- User is **fully responsible** for legal compliance and safe operation
- Verify local RF transmission laws before use
- Some features may be restricted in certain jurisdictions

### 🚫 Usage Restrictions
- **Do NOT use** in life‑support systems
- **Do NOT use** in safety‑critical applications
- **Do NOT use** in mission‑critical systems

> 🛡️ This device is intended for educational and research purposes only.

---

## ❓ Frequently Asked Questions

<details>
<summary><b>Does it support ESP32 Marauder?</b></summary>

<br>

✅ Yes! The ESP32‑PICO‑V3‑02 is fully wired and compatible with ESP32 Marauder firmware. Precompiled binaries are available in releases.

</details>

<details>
<summary><b>Is CC1101 fixed to 433 MHz only?</b></summary>

<br>

The PCB design and RF matching network are **optimized for 433 MHz**. While the CC1101 chip can technically target other Sub‑GHz bands, you'll need to:
- Verify the matching network is suitable
- Check your local RF regulations
- Use appropriate antennas

</details>

<details>
<summary><b>Where can I find the pinout?</b></summary>

<br>

📋 Complete pinout and signal routing are documented in the schematic above (see 📐 Technical Documentation section).

</details>

<details>
<summary><b>Can I use this module permanently?</b></summary>

<br>

✅ Yes! The module is designed to remain **permanently installed** in the Flipper Zero GPIO port. The micro switches let you disable radios when not needed to save power.

</details>

<details>
<summary><b>What antennas should I use?</b></summary>

<br>

Use standard SMA antennas:
- **2.4 GHz** antenna for Wi‑Fi (2.4-2.5 GHz)
- **433 MHz** antenna for Sub‑GHz (typically 430-440 MHz)

Ensure antennas are properly tuned for best performance.

</details>

---

## 📦 Part List

| Comment | Designator | Footprint | Value | Manufacturer Part | Manufacturer |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TS-1088-AR02016 | BOOT,RESET | SW-SMD_L3.9-W3.0-P4.4 | | TS-1088-AR02016 | XUNPU(讯普) |
| 100nF | C9,C15,C22,C36 | C0603 | 100nF | CC0603KRX7R9BB104 | YAGEO(国巨) |
| 10uF | C10,C14 | C0603 | 10uF | CL10A106MP8NNNC | SAMSUNG(三星) |
| 1.2pF | C12 | C0201 | 1.2pF | GRM0335C1H1R2BA01D | muRata(村田) |
| 100uF | C23,C25,C26 | CASE-B_3528 | 100uF | TAJB107K006RNJ | Kyocera AVX |
| 100uF | C24 | CASE-B_3528-1 | 100uF | TPSB107K006R0250 | Kyocera AVX |
| 100nF | C27,C28 | C0402 | 100nF | CC0402KRX7R7BB104 | YAGEO(国巨) |
| 3.9pF | C29,C30 | C0402 | 3.9pF | 0402CG3R9C500NT | FH(风华) |
| 220pF | C31,C34 | C0402 | 220pF | CC0402JRNPO9BN221 | YAGEO(国巨) |
| 8.2pF | C32 | C0402 | 8.2pF | CC0402BRNPO9BN8R2 | YAGEO(国巨) |
| 5.6pF | C33 | C0402 | 5.6pF | CC0402BRNPO9BN5R6 | YAGEO(国巨) |
| 1.5pF | C35 | C0201 | 1.5pF | GRM0335C1H1R5BA01D | muRata(村田) |
| 15pF | C39,C40 | C0402 | 15pF | CC0402JRNPO9BN150 | YAGEO(国巨) |
| PZ254V-11-10P | H2 | HDR-TH_10P-P2.54-V-M | | PZ254V-11-10P | XFCN(兴飞) |
| PZ254V-11-08P | H3 | HDR-TH_8P-P2.54-V-M | | PZ254V-11-08P | XFCN(兴飞) |
| 22nH | L4 | L0402 | 22nH | LQG15HS22NJ02D | muRata(村田) |
| 27nH | L6,L7,L8 | L0402-RD | 27nH | LQG15HS27NJ02D | muRata(村田) |
| 1.8nH | L9 | L0201-RD | 1.8nH | LQP03TN1N8B02D | muRata(村田) |
| TZ-P2-0402RTIA1-0.45T | LED4,LED5,RX,TX | LED0402-RD_RED | | TZ-P2-0402RTIA1-0.45T | TUOZHAN(拓展光电) |
| 10K | R24,R25 | R0603 | | RC0603DR-0710KL | YAGEO(国巨) |
| 470Ω | R28,R29,R31,R33 | R0402 | 470Ω | 0402WGF4700TCE | UNI-ROYAL(厚声) |
| 56kΩ | R32 | R0402 | 56kΩ | 0402WGF5602TCE | UNI-ROYAL(厚声) |
| - | RF3,RF4 | SMA-SMD_BWSMA-KE-P00 | - | BWSMA-KE-P001 | BAT WIRELESS(蝙蝠无线) |
| MK-12D18-G020 | SW3,SW4 | SW-TH_MK-12D18-G040 | | MK-12D18-G020 | G-Switch(品赞) |
| ESP32-PICO-V3-02 | U4 | QFN-48_L7.0-W7.0-P0.50 | | ESP32-PICO-V3-02 | ESPRESSIF(乐鑫) |
| CC1101RGPR | U5 | QFN-20_L4.0-W4.0-P0.5-1 | | CC1101RGPR | TI(德州仪器) |
| 26MHz | X5 | CRYSTAL-SMD_4P-L3.2-W | 26MHz | X322526MMB4SI | YXC(扬兴晶振) |

---

## 📜 License & Credits

### License

**Hardware:** [CERN-OHL-S v2 (Strongly Reciprocal)](hardware/LICENSE.txt)

**Firmware:** [MIT License (Based on ESP32 Marauder)](firmware/LICENSE.txt)

For details, see the LICENSE file in each subfolder.

**NOTICE:** The firmware is a derivative work of ESP32 Marauder by just-v, used under the MIT License. See [firmware/NOTICE](firmware/NOTICE).

### 👨‍💻 Contributors
<table>
<tr>
<td>

**🔧 Hardware Design**  
[0xM4R71N](https://github.com/0xMartin) – PCB design, 3D case, Marauder port for ESP32-PICO-V3-02

</td>
</tr>
<tr>
<td>

**💻 Original Firmware**  
[justcallmekoko](https://github.com/justcallmekoko) – ESP32 Marauder firmware author

</td>
</tr>
</table>

---

<div align="center">

### 🌟 If you find this project useful, please consider giving it a star!

[![GitHub stars](https://img.shields.io/github/stars/0xMartin/TwinWave?style=social)](https://github.com/0xMartin/TwinWave)

**Made with ❤️ for the Flipper Zero community**

</div>

