class MyTex {
    constructor(font, fontSize, texString) {
        this.fontSize = fontSize;
        this.texString = texString;
        this.font = font;
        textFont(this.font);
        textSize(this.fontSize);
        let texW = textWidth(this.texString);
        let texH = this.fontSize;
        this.texture = createGraphics(texW, texH);
        // console.log(this.texture.width);
    }

    draw() {
        let tex = this.texture;

        tex.background(0);
        tex.fill(255);
        tex.textFont(this.font);
        tex.textSize(this.fontSize);
        tex.textAlign(CENTER);
        // for hindi font use tex.height or tex.height * 0.75
        tex.text(this.texString, tex.width/2, tex.height);
    }
}