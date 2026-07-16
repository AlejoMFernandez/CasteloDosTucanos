# Castelo dos Tucanos — Reforma web

Propuesta de rediseño + prototipo para el hostel **Castelo dos Tucanos** (Santa Teresa, Rio de Janeiro).

## Contenido

Sitio **100% estático (HTML/CSS/JS)** — sin PHP ni build. Listo para Vercel.

```
castelodostucanos/
├─ index.html                ★ Selector de las 4 propuestas (landing)
├─ base.html                 Base / refinada
├─ inmersiva.html            Inmersiva (cinematográfica, scroll-telling)
├─ mosaico.html              Mosaico / Bento (grilla de tiles)
├─ azulejo.html              Azulejo brasileño (vibrante, marcos de tile)
├─ assets/
│  ├─ css/                   style.css (base) + v-inmersiva/v-mosaico/v-azulejo/versiones
│  ├─ js/                    main.js (base) + un js por versión
│  └─ img/                   azulejo-wash.svg / azulejo-band.svg (patrones)
├─ images/                   Fotos reales (logo, hero, casas, habitaciones, eventos)
└─ propuesta/
   └─ Propuesta-Reforma-Web-Castelo-dos-Tucanos.pdf
```

Cada versión tiene su propio HTML, CSS, componentes y motion (GSAP + ScrollTrigger).
Los datos están inline en cada HTML (antes venían de un config PHP compartido).

## Cómo verlo

- **Local:** cualquier servidor estático, p. ej. `npx serve .` y abrir `index.html`.
- **Deploy en Vercel:** sin configuración. Importar el repo (o `vercel` desde la carpeta);
  Framework Preset = "Other", sin build command. Vercel sirve `index.html` en la raíz.

## Notas de diseño

- Toda la data editable está en `includes/config.php` (no hace falta tocar HTML).
- Las imágenes son placeholders de color con la marca hasta cargar las fotos reales
  del equipo (ver `assets/img/LEEME.txt`); el sitio las detecta automáticamente.
- El precio "desde" y el buscador son **demo**. En producción se integran con el
  motor de reservas existente **hqbeds** (`booking.hqbeds.com.br`).

## Estado

- [x] Mockup del home (dirección estética aprobada)
- [x] Documento de propuesta (PDF, español)
- [x] Prototipo funcional del home
- [x] Fotos reales: logo, hero, las dos casas y los 4 eventos (carpeta `images/`)
- [ ] Fotos de las habitaciones (siguen como placeholder de color)
- [ ] Páginas internas (habitaciones, las casas, experiencias, barrio)
- [ ] Integración real con hqbeds (precios/disponibilidad en vivo)
- [ ] Traducciones ES/EN/PT/FR

## Mapa de imágenes (carpeta `images/`)

| Archivo            | Dónde se usa                    |
|--------------------|---------------------------------|
| `logopng.png`      | Logo del nav                    |
| `hero.jpg`         | Hero (toma aérea)               |
| `castelo.jpg`      | Tarjeta "El Castelo"            |
| `house.jpg`        | Tarjeta "La Casa"               |
| `bar.jpg`          | Experiencia "Noche de bar"      |
| `churrasco.jpg`    | Experiencia "Churrasco compartido" |
| `fogata.jpg`       | Experiencia "Fogata & música"   |
| `futbolfavela.jpg` | Experiencia "Fútbol en la favela" |
