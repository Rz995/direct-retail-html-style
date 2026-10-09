"""Build a portable demonstration from canonical style and demo sources."""
from pathlib import Path
import argparse
p=argparse.ArgumentParser()
p.add_argument('--output',required=True)
a=p.parse_args()
r=Path(__file__).resolve().parents[1]
html=(r/'assets/template.html').read_text()
for marker,name in [('/* STYLE_BUNDLE */','theme.css'),('/* DEMO_BUNDLE */','demo.js')]:
    if html.count(marker)!=1: raise ValueError('Missing or duplicate marker: '+marker)
    html=html.replace(marker,(r/'assets'/name).read_text())
out=Path(a.output);out.parent.mkdir(parents=True,exist_ok=True);out.write_text(html)
print(out)
