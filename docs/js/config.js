/**
 * TwinWave Configuration
 * Update version info and file paths here for easy maintenance
 */

const CONFIG = {
    // Project info
    project: {
        name: 'TwinWave',
        version: '2.1',
        date: '2026-01-04',
        author: '0xM4R71N',
        github: 'https://github.com/0xMartin/TwinWave',
    },
    
    // Firmware info
    firmware: {
        name: 'ESP32 Marauder',
        version: '1.9.1',
        chip: 'ESP32-PICO-V3-02',
        filename: 'MARAUDER-v1.9.1-ESP32-PICO-V3-02.zip',
        // Relative path for web flasher (same-origin)
        localPath: 'firmware/MARAUDER-v1.9.1-ESP32-PICO-V3-02.zip',
        // GitHub releases URL for downloads page
        downloadUrl: 'https://github.com/0xMartin/TwinWave/releases/latest/download/MARAUDER-v1.9.1-ESP32-PICO-V3-02.zip',
    },
    
    // PCB files
    pcb: {
        gerber: {
            filename: 'Gerber_PCB_2026-01-06.zip',
            url: 'https://github.com/0xMartin/TwinWave/releases/latest/download/Gerber_PCB_2026-01-06.zip',
        },
        bom: {
            filename: 'BOM_TwinWave_PCB_2026-01-06.xlsx',
            url: 'https://github.com/0xMartin/TwinWave/releases/latest/download/BOM_TwinWave_PCB_2026-01-06.xlsx',
        },
        pickPlace: {
            filename: 'PickAndPlace_PCB_2026-01-06.xlsx',
            url: 'https://github.com/0xMartin/TwinWave/releases/latest/download/PickAndPlace_PCB_2026-01-06.xlsx',
        },
    },
    
    // 3D case files
    case: {
        stl: {
            filename: 'TwinWave_3D_Shell.stl',
            url: 'https://github.com/0xMartin/TwinWave/releases/latest/download/TwinWave_3D_Shell.stl',
        },
    },
    
    // EasyEDA project
    easyeda: {
        projectFile: 'hardware/ProDoc_TwinWave_2026-01-06.epro',
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
window.TWIWAVE_CONFIG = CONFIG;
