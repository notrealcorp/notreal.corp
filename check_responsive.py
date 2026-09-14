from playwright.sync_api import sync_playwright
import pathlib

base = pathlib.Path(r"C:\Users\kamme\.local\bin\notreal-corp").resolve().as_uri()
out = pathlib.Path(r"C:\Users\kamme\.local\bin\notreal-corp\shots")
out.mkdir(exist_ok=True)

viewports = {
    "mobile": (390, 844),
    "tablet": (820, 1180),
    "desktop": (1440, 900),
}
pages = ["index.html", "services.html", "contact.html"]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for vname, (w, h) in viewports.items():
        ctx = browser.new_context(viewport={"width": w, "height": h})
        page = ctx.new_page()
        for pg in pages:
            page.goto(f"{base}/{pg}")
            page.wait_for_load_state('networkidle')
            page.wait_for_timeout(600)
            page.screenshot(path=str(out / f"{pg.replace('.html','')}_{vname}.png"), full_page=True)
        ctx.close()
    browser.close()
print("done")
