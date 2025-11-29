#!/bin/bash

# Script to move newly added Shadcn components to the primitives folder
# Usage: ./scripts/organize-shadcn.sh

echo "🔄 Organizing Shadcn components..."

# Check if src/components/ui directory exists
if [ ! -d "src/components/ui" ]; then
    echo "❌ src/components/ui directory not found"
    exit 1
fi

# Create primitives directory if it doesn't exist
mkdir -p src/components/ui/primitives

# Move all .tsx files from src/components/ui to src/components/ui/primitives
# but skip if they're already in primitives or effects subdirectories
for file in src/components/ui/*.tsx; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "  Moving $filename to primitives/"
        mv "$file" "src/components/ui/primitives/$filename"
    fi
done

# Also check for nested ui/ui/ directory (Shadcn bug)
if [ -d "src/components/ui/ui" ]; then
    echo "  Found nested ui/ui/ directory, moving files..."
    for file in src/components/ui/ui/*.tsx; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            echo "  Moving $filename from ui/ui/ to primitives/"
            mv "$file" "src/components/ui/primitives/$filename"
        fi
    done
    # Remove the empty ui/ui directory
    rmdir src/components/ui/ui 2>/dev/null && echo "  Removed empty ui/ui/ directory"
fi

# Fix import paths in newly added components
echo "  Fixing import paths..."
find src/components/ui/primitives -name "*.tsx" -type f -exec sed -i '' 's|from "@/lib/utils"|from "@/shared/lib/utils"|g' {} \;
find src/components/ui/primitives -name "*.tsx" -type f -exec sed -i '' 's|from "@/components/ui/ui/|from "@/components/ui/primitives/|g' {} \;

echo "✅ Done! All components moved to src/components/ui/primitives/"
