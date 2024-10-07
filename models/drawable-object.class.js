class DrawableObject {
    x;
    y;
    scaleFactor;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    draw(ctx) {
        ctx.drawImage(this.img,
            this.x,
            this.y - this.img.naturalHeight * this.scaleFactor,
            this.img.naturalWidth * this.scaleFactor,
            this.img.naturalHeight * this.scaleFactor);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect(
                this.x + this.offset.left * this.offsetFactor,
                this.y - this.img.naturalHeight * this.scaleFactor + this.offset.top * this.offsetFactor,
                this.img.naturalWidth * this.scaleFactor - this.offset.right * this.offsetFactor,
                this.img.naturalHeight * this.scaleFactor - this.offset.top * this.offsetFactor - this.offset.bottom * this.offsetFactor,
            );
            ctx.stroke();
        }
    }
}