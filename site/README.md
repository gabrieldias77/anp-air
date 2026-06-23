# ANP Ar Condicionado — Site Institucional

Site institucional estático (HTML + CSS + JavaScript, sem dependências e sem build).
Qualidade em ar-condicionado desde 2005 — Caieiras/SP e região.

## 📁 Estrutura

```
site/
├── index.html          # Página única com todas as seções
├── css/styles.css      # Estilos (paleta azul derivada do logo)
├── js/main.js          # Menu mobile, galeria, animações, formulário → WhatsApp
├── assets/
│   ├── logo_anp.jpg
│   ├── trabalhos/      # img1..img4 (galeria + hero + sobre)
│   └── clientes/       # drogasil, drogaraia, rd-saude
└── README.md
```

## 🚀 Como visualizar

Basta abrir o `index.html` no navegador. Para evitar bloqueios de caminho relativo,
o ideal é servir por um servidor local:

```bash
cd site
python3 -m http.server 8123
# acesse http://localhost:8123
```

## 🌐 Como publicar (deploy)

É um site 100% estático — sobe em qualquer host:

- **Netlify / Vercel / Cloudflare Pages:** arraste a pasta `site/` (deploy instantâneo).
- **GitHub Pages:** suba o conteúdo de `site/` no repositório e ative o Pages.
- **Hospedagem tradicional:** envie a pasta `site/` por FTP para a `public_html`.

## 🧩 Seções

Início (hero) · Serviços · Sobre · Diferenciais · Trabalhos (galeria com lightbox) ·
Clientes · CTA · Contato (formulário + mapa) · Rodapé.

## ✏️ O que você pode querer ajustar

- **Telefone/WhatsApp:** procure por `5511947219058` (links wa.me/tel) e `(11) 94721-9058` (texto).
- **E-mail:** `sandraanp@terra.com.br`.
- **Redes sociais:** links de Instagram, Facebook e LinkedIn no topo, contato e rodapé.
- **Textos:** todos editáveis diretamente no `index.html`.
- **Imagens:** substitua os arquivos em `assets/trabalhos` e `assets/clientes`.

## 📝 Notas importantes

- **Mapa:** usa **OpenStreetMap** (embed gratuito, sem chave de API). O embed do Google Maps
  foi descartado porque o Google bloqueia o `output=embed` via `X-Frame-Options` (aparece em
  branco). O botão **"Ver rota no Google Maps"** abre o Google normalmente em nova aba.
  Coordenadas usadas: `-23.3503606, -46.7499635` (Av. Marcelino Bressiani, Caieiras).
- **Endereço:** mantive a grafia informada ("Marcelino Bressiane"); no mapa, o OpenStreetMap
  registra a via como "Marcelino Bressian**i**". Vale confirmar a grafia correta.
- **Formulário de contato:** não precisa de servidor — ao enviar, abre o WhatsApp com a
  mensagem já preenchida (nome, serviço, mensagem e telefone). Se quiser receber por e-mail,
  dá para integrar com Formspree, Web3Forms ou similar.
- **"+20 anos":** calculado a partir de 2005.
- **SEO:** título, descrição, Open Graph e dados estruturados (`HVACBusiness`) já incluídos.
