from pathlib import Path
import json
import whisper

root = Path(__file__).resolve().parents[1]
model = whisper.load_model("base", download_root=str(Path.home()/".cache"/"whisper"))
for item in sorted((root/"raw-audio").glob("*-intro.wav")):
    result = model.transcribe(str(item), language="en", fp16=False, verbose=False, condition_on_previous_text=False)
    lines = [{"start": round(s["start"], 1), "end": round(s["end"], 1), "text": s["text"].strip()} for s in result["segments"]]
    print(item.stem, json.dumps(lines, ensure_ascii=False))
