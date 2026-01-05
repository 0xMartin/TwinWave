/**
 * TweenWave Configuration
 * Update version info and file paths here for easy maintenance
 */

const CONFIG = {
    // Project info
    project: {
        name: 'TweenWave',
        version: '2.1',
        date: '2026-01-04',
        author: '0xM4R71N',
        github: 'https://github.com/0xMartin/TweenWave',
    },
    
    // Firmware info
    firmware: {
        name: 'ESP32 Marauder',
        version: '1.8.6',
        chip: 'ESP32-PICO-V3-02',
        filename: 'MARAUDER_v1.8.6_ESP32_PICO_V3_02.zip',
        // Relative path for web flasher (same-origin)
        localPath: 'firmware/MARAUDER_v1.8.6_ESP32_PICO_V3_02.zip',
        // GitHub releases URL for downloads page
        downloadUrl: 'https://github.com/0xMartin/TweenWave/releases/latest/download/MARAUDER_v1.8.6_ESP32_PICO_V3_02.zip',
    },
    
    // PCB files
    pcb: {
        gerber: {
            filename: 'Gerber_PCB2_2026-01-04.zip',
            url: 'https://github.com/0xMartin/TweenWave/releases/latest/download/Gerber_PCB2_2026-01-04.zip',
        },
        bom: {
            filename: 'BOM_TweenWave_PCB2_2026-01-04.xlsx',
            url: 'https://github.com/0xMartin/TweenWave/releases/latest/download/BOM_TweenWave_PCB2_2026-01-04.xlsx',
        },
        pickPlace: {
            filename: 'PickAndPlace_PCB2_2026-01-04.xlsx',
            url: 'https://github.com/0xMartin/TweenWave/releases/latest/download/PickAndPlace_PCB2_2026-01-04.xlsx',
        },
    },
    
    // 3D case files
    case: {
        stl: {
            filename: '3DShell_3DShell_PCB2_T.stl',
            url: 'https://github.com/0xMartin/TweenWave/releases/latest/download/3DShell_3DShell_PCB2_T.stl',
        },
    },
    
    // EasyEDA project
    easyeda: {
        projectFile: 'project/ProDoc_TweenWave_2026-01-04.epro',
    },
    
    // Flash addresses for ESP32
    flashOffsets: {
        'bootloader.bin': 0x1000,
        'partitions.bin': 0x8000,
        'firmware.bin': 0x10000,
    },
};

// Helper function to get full firmware display name
CONFIG.firmware.displayName = `${CONFIG.firmware.name} v${CONFIG.firmware.version}`;
CONFIG.firmware.fullName = `${CONFIG.firmware.name} v${CONFIG.firmware.version} (${CONFIG.firmware.chip})`;

// Make it available globally
window.TWEENWAVE_CONFIG = CONFIG;
