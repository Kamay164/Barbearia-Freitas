"""
Otimiza as fotos do site: converte para WebP em dois tamanhos.

Como usar (precisa do Python e da biblioteca Pillow: pip install pillow):
  1. Coloque as fotos originais (JPG ou PNG) em img/originais/ com os nomes:
       hero.jpg, equipe-rafael.jpg, equipe-diego.jpg, equipe-lucas.jpg,
       galeria-1.jpg ... galeria-6.jpg
  2. Rode:  python otimizar-imagens.py
  3. Os arquivos .webp são criados em img/ (é o que o index.html usa).

Equipe e galeria são recortadas no centro. Para a equipe, o recorte segue o
valor de FOCO_X abaixo (0 = esquerda, 1 = direita).
"""
from pathlib import Path
from PIL import Image, ImageOps

PASTA = Path(__file__).parent / "img"
ORIGINAIS = PASTA / "originais"

FOCO_X = {"equipe-diego": 0.74}  # o resto usa 0.5 (centro)

# nome -> (larguras, proporção largura/altura ou None para manter, qualidade)
REGRAS = {
    "hero": ((1920, 1080), None, 70),
    "equipe": ((800, 400), 4 / 5, 78),
    "galeria": ((800, 400), 1, 78),
}


def regra(nome):
    for prefixo, r in REGRAS.items():
        if nome.startswith(prefixo):
            return r
    return None


def main():
    arquivos = sorted(p for p in ORIGINAIS.glob("*") if p.suffix.lower() in (".jpg", ".jpeg", ".png"))
    if not arquivos:
        print(f"Nenhuma foto encontrada em {ORIGINAIS}")
        return

    for arq in arquivos:
        r = regra(arq.stem)
        if not r:
            print(f"Ignorado (nome desconhecido): {arq.name}")
            continue
        larguras, proporcao, qualidade = r
        im = ImageOps.exif_transpose(Image.open(arq)).convert("RGB")

        if proporcao:
            w, h = im.size
            if w / h > proporcao:  # mais larga que o alvo: corta dos lados
                cw = round(h * proporcao)
                x = round((w - cw) * FOCO_X.get(arq.stem, 0.5))
                im = im.crop((x, 0, x + cw, h))
            else:  # mais alta que o alvo: corta em cima e embaixo
                ch = round(w / proporcao)
                y = (h - ch) // 2
                im = im.crop((0, y, w, y + ch))

        for largura in larguras:
            altura = round(largura * im.height / im.width)
            saida = PASTA / f"{arq.stem}-{largura}.webp"
            im.resize((largura, altura), Image.LANCZOS).save(saida, "WEBP", quality=qualidade, method=6)
            print(f"{saida.name}: {saida.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
