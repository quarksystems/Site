
# QUARK‑SYSTEMS — Deploy a GitHub Pages (rama `Main_2`)

Última actualización: 2025-10-24

## Opción A — Publicar desde la rama `Main_2`
1. Subí **todo** el contenido a la rama `Main_2` en la **raíz**.
2. **Settings → Pages → Build and deployment → Deploy from a branch**.
3. **Branch:** `Main_2` y **/ (root)** → Save.
4. Esperá 1–3 minutos y abrí `https://<usuario>.github.io/<repo>/`.

## Opción B — Usar `main`
```bash
git fetch origin
git branch -m Main_2 main
git push -u origin main
```
Luego elegí `main` en **Settings → Pages**.

## Chequeos
- Repo **Public**
- `index.html` en la raíz de la rama elegida
- `.nojekyll` presente
- Revisar job *Pages build and deployment* si demora
