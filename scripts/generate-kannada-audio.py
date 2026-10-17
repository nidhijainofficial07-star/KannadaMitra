
import json
import subprocess
import sys
from pathlib import Path

PROJECT_DIR = Path(__file__).resolve().parent.parent
MANIFEST_PATH = Path(__file__).resolve().parent / "kannada-audio-manifest.json"
AUDIO_DIR = PROJECT_DIR / "public" / "audio"

AUDIO_DIR.mkdir(parents=True, exist_ok=True)

with MANIFEST_PATH.open("r", encoding="utf-8") as file:
    phrases = json.load(file)

total = len(phrases)
success = 0
failed = []

for index, phrase in enumerate(phrases, start=1):
    text = phrase["text"]
    output_file = AUDIO_DIR / phrase["file"]

    if output_file.exists() and output_file.stat().st_size > 0:
        success += 1
        print(f"[{index}/{total}] Already exists: {phrase['file']}")
        continue

    print(f"[{index}/{total}] Generating: {text}")

    command = [
        sys.executable, "-m", "edge_tts",
        "--voice", "kn-IN-SapnaNeural",
        "--text", text,
        "--write-media", str(output_file),
    ]

    try:
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            timeout=90,
        )

        if (
            result.returncode == 0
            and output_file.exists()
            and output_file.stat().st_size > 0
        ):
            success += 1
        else:
            failed.append(text)
            print("  FAILED:", result.stderr[-500:])

    except subprocess.TimeoutExpired:
        failed.append(text)
        print("  FAILED: Timed out")

print(f"\nFinished: {success}/{total} audio files available.")

if failed:
    print(f"{len(failed)} phrases failed. You can rerun the script to retry.")
    with (PROJECT_DIR / "scripts" / "failed-phrases.txt").open(
        "w", encoding="utf-8"
    ) as file:
        file.write("\n".join(failed))
else:
    print("All audio files are available!")
