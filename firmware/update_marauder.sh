#!/bin/bash
# ==============================================================================
# TwinWave - Marauder Firmware Update Script
# ==============================================================================
# This script updates the ESP32 Marauder source code for TwinWave module.
# It clones the official repository, extracts required files, and applies
# necessary configuration changes for ESP32-PICO-V3-02 chip.
#
# Usage: ./update_marauder.sh <version>
# Example: ./update_marauder.sh 1.10.2
# ==============================================================================

set -e  # Exit on error

# Check for version argument
if [ -z "$1" ]; then
    echo "Usage: $0 <version>"
    echo "Example: $0 1.10.2"
    echo ""
    echo "Available versions: https://github.com/justcallmekoko/ESP32Marauder/tags"
    exit 1
fi

VERSION="$1"
TAG="v$VERSION"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC_DIR="$SCRIPT_DIR/src"
REPO_URL="https://github.com/justcallmekoko/ESP32Marauder.git"
REPO_DIR="$SCRIPT_DIR/ESP32Marauder"
MARAUDER_SRC="$REPO_DIR/esp32_marauder"

echo "=========================================="
echo "  TwinWave Marauder Firmware Updater"
echo "=========================================="
echo "  Version: $VERSION (tag: $TAG)"
echo ""

# Step 1: Clean src directory
echo "[1/7] Cleaning src directory..."
if [ -d "$SRC_DIR" ]; then
    rm -rf "$SRC_DIR"/*
    echo "      ✓ Removed contents of src/"
else
    mkdir -p "$SRC_DIR"
    echo "      ✓ Created src/"
fi

# Step 2: Clone Marauder repository
echo "[2/7] Cloning ESP32 Marauder repository (tag: $TAG)..."
if [ -d "$REPO_DIR" ]; then
    echo "      Removing existing clone..."
    rm -rf "$REPO_DIR"
fi
git clone --branch "$TAG" --depth 1 "$REPO_URL" "$REPO_DIR"
echo "      ✓ Repository cloned"

# Step 3: Copy .h and .cpp files from esp32_marauder
echo "[3/7] Copying source files to src/..."
if [ -d "$MARAUDER_SRC" ]; then
    # Count files
    H_COUNT=$(find "$MARAUDER_SRC" -maxdepth 1 -name "*.h" | wc -l | tr -d ' ')
    CPP_COUNT=$(find "$MARAUDER_SRC" -maxdepth 1 -name "*.cpp" | wc -l | tr -d ' ')
    INO_COUNT=$(find "$MARAUDER_SRC" -maxdepth 1 -name "*.ino" | wc -l | tr -d ' ')
    
    # Copy files
    find "$MARAUDER_SRC" -maxdepth 1 -name "*.h" -exec cp {} "$SRC_DIR/" \;
    find "$MARAUDER_SRC" -maxdepth 1 -name "*.cpp" -exec cp {} "$SRC_DIR/" \;
    
    # Copy .ino file as .cpp (contains setup() and loop())
    for ino in "$MARAUDER_SRC"/*.ino; do
        if [ -f "$ino" ]; then
            basename=$(basename "$ino" .ino)
            cp "$ino" "$SRC_DIR/${basename}.cpp"
        fi
    done
    
    echo "      ✓ Copied $H_COUNT .h files"
    echo "      ✓ Copied $CPP_COUNT .cpp files"
    echo "      ✓ Copied $INO_COUNT .ino files (as .cpp)"
else
    echo "      ✗ Error: esp32_marauder directory not found!"
    rm -rf "$REPO_DIR"
    exit 1
fi

# Step 4: Remove cloned repository
echo "[4/7] Cleaning up repository..."
rm -rf "$REPO_DIR"
echo "      ✓ Removed cloned repository"

# Step 5: Configure for GENERIC_ESP32
echo "[5/7] Configuring for GENERIC_ESP32..."
CONFIGS_FILE="$SRC_DIR/configs.h"
if [ -f "$CONFIGS_FILE" ]; then
    # Uncomment #define GENERIC_ESP32 (handle various comment styles)
    if grep -q "//\s*#define GENERIC_ESP32" "$CONFIGS_FILE"; then
        sed -i '' 's|//\s*#define GENERIC_ESP32|#define GENERIC_ESP32|g' "$CONFIGS_FILE"
        echo "      ✓ Uncommented #define GENERIC_ESP32"
    elif grep -q "#define GENERIC_ESP32" "$CONFIGS_FILE"; then
        echo "      ✓ GENERIC_ESP32 already defined"
    else
        echo "      ⚠ Warning: GENERIC_ESP32 macro not found in configs.h"
    fi
else
    echo "      ✗ Error: configs.h not found!"
    exit 1
fi

# Step 6: Build with PlatformIO
echo "[6/7] Building firmware with PlatformIO..."
cd "$SCRIPT_DIR"

# Find PlatformIO executable
PIO_CMD=""
if command -v pio &> /dev/null; then
    PIO_CMD="pio"
elif [ -f "$HOME/.platformio/penv/bin/pio" ]; then
    PIO_CMD="$HOME/.platformio/penv/bin/pio"
else
    echo "      ✗ Error: PlatformIO (pio) not found!"
    echo "      Install with: pip install platformio"
    exit 1
fi

$PIO_CMD run
echo "      ✓ Build complete"

# Step 7: Create release ZIP
echo "[7/7] Creating release ZIP..."
BUILD_DIR="$SCRIPT_DIR/.pio/build/esp32dev"
ZIP_NAME="MARAUDER-v${VERSION}-ESP32-PICO-V3-02.zip"
ZIP_PATH="$SCRIPT_DIR/$ZIP_NAME"

# Check if build files exist
if [ ! -f "$BUILD_DIR/firmware.bin" ]; then
    echo "      ✗ Error: Build files not found in $BUILD_DIR"
    exit 1
fi

# Create ZIP with required files
cd "$BUILD_DIR"
zip -j "$ZIP_PATH" \
    firmware.bin \
    firmware.elf \
    bootloader.bin \
    partitions.bin

cd "$SCRIPT_DIR"
echo "      ✓ Created: $ZIP_NAME"

echo ""
echo "=========================================="
echo "  ✓ Build complete!"
echo "=========================================="
echo ""
echo "Release package: $ZIP_PATH"
echo ""
echo "Contents:"
unzip -l "$ZIP_PATH" | awk 'NR>3 && /\.(bin|elf)$/ {print "  " $4 " (" $1 " bytes)"}'
echo ""
echo ""
